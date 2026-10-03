<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GalleryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $request->user();

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'cover_url' => $this->cover_url,
            'cover_public_id' => $this->cover_public_id,
            'event_date' => $this->event_date ? (is_string($this->event_date) ? $this->event_date : $this->event_date->format('Y-m-d')) : null,
            'location' => $this->location,
            'category_id' => $this->category_id,
            'division_id' => $this->division_id,
            'is_published' => (bool) $this->is_published,
            'sort_order' => (int) $this->sort_order,
            'is_active' => (bool) $this->is_active,
            'items_count' => $this->items_count ?? $this->items()->count(),
            'items' => $this->whenLoaded('items', function () {
                return $this->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'url' => $item->url,
                        'caption' => $item->caption,
                        'sort_order' => $item->sort_order,
                    ];
                });
            }),
            'category' => $this->whenLoaded('category', function () {
                return $this->category ? [
                    'id' => $this->category->id,
                    'name' => $this->category->name,
                ] : null;
            }),
            'division' => $this->whenLoaded('division', function () {
                return $this->division ? [
                    'id' => $this->division->id,
                    'name' => $this->division->name,
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
