<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = $request->user();

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'content_source' => $this->content_source,
            'cover_image_url' => $this->cover_image_url,
            'cover_image_public_id' => $this->cover_image_public_id,
            'cover_image_source' => $this->cover_image_source,
            'author_name' => $this->author_name,
            'tags' => $this->tags ?? [],
            'is_featured' => (bool) $this->is_featured,
            'is_published' => (bool) $this->is_published,
            'published_at' => $this->published_at?->toIso8601String(),
            'post_date' => $this->post_date?->toIso8601String(),
            'is_active' => (bool) $this->is_active,
            'category_id' => $this->category_id,
            'division_id' => $this->division_id,
            'user_id' => $this->user_id,
            'category' => $this->whenLoaded('category', function () {
                return $this->category ? [
                    'id' => $this->category->id,
                    'name' => $this->category->name,
                    'slug' => $this->category->slug,
                    'color' => $this->category->color,
                ] : null;
            }),
            'division' => $this->whenLoaded('division', function () {
                return $this->division ? [
                    'id' => $this->division->id,
                    'name' => $this->division->name,
                    'slug' => $this->division->slug,
                ] : null;
            }),
            'author' => $this->whenLoaded('user', function () {
                return $this->user ? [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'email' => $this->user->email,
                ] : null;
            }),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
            'can' => [
                'update' => $user ? $user->can('update', $this->resource) : false,
                'delete' => $user ? $user->can('delete', $this->resource) : false,
            ],
        ];
    }
}
