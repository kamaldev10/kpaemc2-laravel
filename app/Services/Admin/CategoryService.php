<?php

namespace App\Services\Admin;

use App\Models\Category;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class CategoryService
{
    public function paginate(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Category::withCount(['posts', 'events', 'galleries'])
            ->orderBy('type')
            ->orderBy('sort_order')
            ->orderBy('name');

        if (! empty($filters['search'])) {
            $term = trim($filters['search']);
            $query->where(function ($q) use ($term) {
                $q->where('name', 'ILIKE', "%{$term}%")
                    ->orWhere('slug', 'ILIKE', "%{$term}%");
            });
        }

        if (! empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        return $query->paginate($perPage)->withQueryString();
    }

    public function create(array $data, User $actor): Category
    {
        $data['slug'] = $this->generateUniqueSlug($data['slug'] ?? $data['name']);
        $data['created_by'] = $actor->id;
        $data['updated_by'] = $actor->id;

        $category = Category::create($data);
        $this->invalidateCache();

        return $category;
    }

    public function update(Category $category, array $data, User $actor): Category
    {
        if (! empty($data['slug']) && $data['slug'] !== $category->slug) {
            $data['slug'] = $this->generateUniqueSlug(Str::slug($data['slug']), $category->id);
        } elseif (empty($data['slug']) && ! empty($data['name']) && $data['name'] !== $category->name) {
            $data['slug'] = $this->generateUniqueSlug(Str::slug($data['name']), $category->id);
        }

        $data['updated_by'] = $actor->id;

        $category->update($data);
        $this->invalidateCache();

        return $category->fresh();
    }

    public function delete(Category $category): bool
    {
        $deleted = $category->delete();
        if ($deleted) {
            $this->invalidateCache();
        }

        return (bool) $deleted;
    }

    public function invalidateCache(): void
    {
        try {
            if (Cache::supportsTags()) {
                Cache::tags(['categories', 'posts', 'events'])->flush();
            }
        } catch (\Throwable) {}

        Cache::forget('categories_list');
    }

    protected function generateUniqueSlug(string $baseSlug, ?string $excludeId = null): string
    {
        $slug = Str::slug($baseSlug) ?: 'category';
        $originalSlug = $slug;
        $counter = 1;

        while (true) {
            $query = Category::where('slug', $slug);
            if ($excludeId) {
                $query->where('id', '!=', $excludeId);
            }

            if (! $query->exists()) {
                return $slug;
            }

            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }
    }
}
