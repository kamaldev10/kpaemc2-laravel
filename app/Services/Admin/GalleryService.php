<?php

namespace App\Services\Admin;

use App\Models\Gallery;
use App\Models\GalleryItem;
use App\Models\User;
use App\Services\CloudinaryService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class GalleryService
{
    public function __construct(
        protected CloudinaryService $cloudinaryService
    ) {}

    public function paginate(array $filters = [], int $perPage = 12): LengthAwarePaginator
    {
        $query = Gallery::with(['category', 'division'])
            ->withCount('items')
            ->orderByDesc('event_date')
            ->orderByDesc('created_at');

        if (! empty($filters['search'])) {
            $term = trim($filters['search']);
            $query->where(function ($q) use ($term) {
                $q->where('title', 'ILIKE', "%{$term}%")
                    ->orWhere('location', 'ILIKE', "%{$term}%");
            });
        }

        if (! empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (! empty($filters['division_id'])) {
            $query->where('division_id', $filters['division_id']);
        }

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * @param  array<string, mixed>  $data
     * @param  array<UploadedFile>  $photos
     */
    public function create(array $data, ?UploadedFile $coverImage, array $photos, User $actor): Gallery
    {
        return DB::transaction(function () use ($data, $coverImage, $photos, $actor) {
            if ($coverImage instanceof UploadedFile) {
                $upload = $this->cloudinaryService->upload($coverImage, CloudinaryService::FOLDER_GALLERIES);
                $data['cover_url'] = $upload['secure_url'] ?? $upload['url'];
                $data['cover_public_id'] = $upload['public_id'];
            } elseif (! empty($data['cover_url'])) {
                $data['cover_url'] = $data['cover_url'];
            }

            $data['created_by'] = $actor->id;
            $data['updated_by'] = $actor->id;

            $gallery = Gallery::create($data);

            // Upload multiple photos to gallery_items
            foreach ($photos as $idx => $photo) {
                if ($photo instanceof UploadedFile) {
                    $itemUpload = $this->cloudinaryService->upload($photo, CloudinaryService::FOLDER_GALLERIES);
                    GalleryItem::create([
                        'gallery_id' => $gallery->id,
                        'cloudinary_public_id' => $itemUpload['public_id'],
                        'url' => $itemUpload['secure_url'] ?? $itemUpload['url'],
                        'type' => 'image',
                        'sort_order' => $idx,
                        'is_active' => true,
                        'created_by' => $actor->id,
                        'updated_by' => $actor->id,
                    ]);
                }
            }

            // Set first photo as cover if cover is empty
            if (empty($gallery->cover_url) && $gallery->items()->exists()) {
                $firstItem = $gallery->items()->first();
                $gallery->update([
                    'cover_url' => $firstItem->url,
                    'cover_public_id' => $firstItem->cloudinary_public_id,
                ]);
            }

            $this->invalidateCache();

            return $gallery;
        });
    }

    /**
     * @param  array<string, mixed>  $data
     * @param  array<UploadedFile>  $newPhotos
     * @param  array<string>  $deletedItemIds
     */
    public function update(Gallery $gallery, array $data, ?UploadedFile $coverImage, array $newPhotos, array $deletedItemIds, User $actor): Gallery
    {
        return DB::transaction(function () use ($gallery, $data, $coverImage, $newPhotos, $deletedItemIds, $actor) {
            if ($coverImage instanceof UploadedFile) {
                if (! empty($gallery->cover_public_id)) {
                    $this->cloudinaryService->delete($gallery->cover_public_id);
                }

                $upload = $this->cloudinaryService->upload($coverImage, CloudinaryService::FOLDER_GALLERIES);
                $data['cover_url'] = $upload['secure_url'] ?? $upload['url'];
                $data['cover_public_id'] = $upload['public_id'];
            }

            $data['updated_by'] = $actor->id;
            $gallery->update($data);

            // Delete removed items
            if (! empty($deletedItemIds)) {
                $itemsToDelete = GalleryItem::where('gallery_id', $gallery->id)
                    ->whereIn('id', $deletedItemIds)
                    ->get();

                foreach ($itemsToDelete as $item) {
                    if (! empty($item->cloudinary_public_id)) {
                        $this->cloudinaryService->delete($item->cloudinary_public_id);
                    }
                    $item->delete();
                }
            }

            // Upload new additional photos
            $currentMaxOrder = (int) $gallery->items()->max('sort_order');
            foreach ($newPhotos as $idx => $photo) {
                if ($photo instanceof UploadedFile) {
                    $itemUpload = $this->cloudinaryService->upload($photo, CloudinaryService::FOLDER_GALLERIES);
                    GalleryItem::create([
                        'gallery_id' => $gallery->id,
                        'cloudinary_public_id' => $itemUpload['public_id'],
                        'url' => $itemUpload['secure_url'] ?? $itemUpload['url'],
                        'type' => 'image',
                        'sort_order' => $currentMaxOrder + $idx + 1,
                        'is_active' => true,
                        'created_by' => $actor->id,
                        'updated_by' => $actor->id,
                    ]);
                }
            }

            $this->invalidateCache();

            return $gallery->fresh(['category', 'division', 'items']);
        });
    }

    public function delete(Gallery $gallery): bool
    {
        $deleted = $gallery->delete();
        if ($deleted) {
            $this->invalidateCache();
        }

        return (bool) $deleted;
    }

    public function invalidateCache(): void
    {
        try {
            if (Cache::supportsTags()) {
                Cache::tags(['galleries', 'public_galleries'])->flush();
            }
        } catch (\Throwable) {}

        Cache::forget('public_galleries_latest');
    }
}
