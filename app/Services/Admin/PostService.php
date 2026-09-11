<?php

namespace App\Services\Admin;

use App\Models\Post;
use App\Models\User;
use App\Services\CloudinaryService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PostService
{
    public function __construct(
        protected CloudinaryService $cloudinaryService
    ) {}

    /**
     * Get paginated posts with filtering and relationships.
     *
     * @param  array<string, mixed>  $filters
     */
    public function paginate(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = Post::with(['category', 'division', 'user'])
            ->latest('created_at');

        // Search term (title, excerpt, content, author)
        if (! empty($filters['search'])) {
            $query->search($filters['search']);
        }

        // Category filter
        if (! empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        // Division filter
        if (! empty($filters['division_id'])) {
            $query->where('division_id', $filters['division_id']);
        }

        // Status filter: 'published', 'draft', 'archived'
        if (! empty($filters['status'])) {
            match ($filters['status']) {
                'published' => $query->where('is_published', true)->where('is_active', true),
                'draft' => $query->where('is_published', false),
                'archived' => $query->where('is_active', false),
                default => null,
            };
        }

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * Get aggregate metrics for posts dashboard.
     *
     * @return array{total: int, published: int, draft: int, featured: int}
     */
    public function getMetrics(): array
    {
        return [
            'total' => Post::count(),
            'published' => Post::where('is_published', true)->where('is_active', true)->count(),
            'draft' => Post::where('is_published', false)->count(),
            'featured' => Post::where('is_featured', true)->count(),
        ];
    }

    /**
     * Create a new post.
     *
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, ?UploadedFile $coverImage, User $author): Post
    {
        return DB::transaction(function () use ($data, $coverImage, $author) {
            // Excerpt fallback if empty
            if (empty($data['excerpt'])) {
                $stripped = strip_tags((string) ($data['content'] ?? ''));
                $data['excerpt'] = Str::limit($stripped, 160) ?: Str::limit($data['title'] ?? 'Artikel KPA EMC2', 100);
            }

            // Slug generation
            if (empty($data['slug'])) {
                $data['slug'] = $this->generateUniqueSlug($data['title']);
            } else {
                $data['slug'] = Str::slug($data['slug']);
            }

            // Cover image handling
            if ($coverImage instanceof UploadedFile) {
                $upload = $this->cloudinaryService->upload($coverImage, CloudinaryService::FOLDER_POSTS);
                $data['cover_image_url'] = $upload['secure_url'] ?? $upload['url'];
                $data['cover_image_public_id'] = $upload['public_id'];
            } elseif (empty($data['cover_image_url'])) {
                $data['cover_image_url'] = 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg';
            }

            // User ownership
            $data['user_id'] = $author->id;
            $data['created_by'] = $author->id;
            $data['updated_by'] = $author->id;

            if (empty($data['post_date'])) {
                $data['post_date'] = now();
            }

            $post = Post::create($data);

            $this->invalidateCache();

            return $post;
        });
    }

    /**
     * Update an existing post.
     *
     * @param  array<string, mixed>  $data
     */
    public function update(Post $post, array $data, ?UploadedFile $coverImage, User $editor): Post
    {
        return DB::transaction(function () use ($post, $data, $coverImage, $editor) {
            // Slug generation if changed or empty
            if (! empty($data['slug']) && $data['slug'] !== $post->slug) {
                $data['slug'] = $this->generateUniqueSlug($data['slug'], $post->id);
            } elseif (empty($data['slug']) && ! empty($data['title']) && $data['title'] !== $post->title) {
                $data['slug'] = $this->generateUniqueSlug($data['title'], $post->id);
            } else {
                unset($data['slug']);
            }

            // Cover image update
            if ($coverImage instanceof UploadedFile) {
                // Delete old image if exists
                if (! empty($post->cover_image_public_id)) {
                    $this->cloudinaryService->delete($post->cover_image_public_id);
                }

                $upload = $this->cloudinaryService->upload($coverImage, CloudinaryService::FOLDER_POSTS);
                $data['cover_image_url'] = $upload['secure_url'] ?? $upload['url'];
                $data['cover_image_public_id'] = $upload['public_id'];
            }

            $data['updated_by'] = $editor->id;

            $post->update($data);

            $this->invalidateCache();

            return $post->fresh(['category', 'division', 'user']);
        });
    }

    /**
     * Soft delete a post.
     */
    public function delete(Post $post): bool
    {
        $deleted = $post->delete();

        if ($deleted) {
            $this->invalidateCache();
        }

        return (bool) $deleted;
    }

    /**
     * Force delete a post and clean up its media.
     */
    public function forceDelete(Post $post): bool
    {
        if (! empty($post->cover_image_public_id)) {
            $this->cloudinaryService->delete($post->cover_image_public_id);
        }

        $deleted = $post->forceDelete();

        if ($deleted) {
            $this->invalidateCache();
        }

        return (bool) $deleted;
    }

    /**
     * Generate a unique slug for a post.
     */
    public function generateUniqueSlug(string $title, ?string $excludeId = null): string
    {
        $baseSlug = Str::slug($title);
        if (empty($baseSlug)) {
            $baseSlug = 'artikel-' . Str::lower(Str::random(6));
        }

        $slug = $baseSlug;
        $counter = 1;

        while (
            Post::where('slug', $slug)
                ->when($excludeId, fn ($q) => $q->where('id', '!=', $excludeId))
                ->withTrashed()
                ->exists()
        ) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }

    /**
     * Invalidate cached post queries.
     */
    public function invalidateCache(): void
    {
        try {
            if (Cache::supportsTags()) {
                Cache::tags(['posts', 'public_content'])->flush();
            }
        } catch (\Throwable) {
            // Ignored if cache store does not support tags
        }

        Cache::forget('home_posts');
        Cache::forget('latest_posts');
        Cache::forget('featured_posts');
    }
}
