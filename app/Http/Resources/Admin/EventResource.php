<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
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
            'slug' => $this->slug,
            'category_id' => $this->category_id,
            'division_id' => $this->division_id,
            'title' => $this->title,
            'type' => $this->type,
            'description' => $this->description,
            'cover_url' => $this->cover_url,
            'cover_public_id' => $this->cover_public_id,
            'location' => $this->location,
            'start_date' => $this->start_date?->toIso8601String(),
            'end_date' => $this->end_date?->toIso8601String(),
            'registration_open_at' => $this->registration_open_at?->toIso8601String(),
            'registration_close_at' => $this->registration_close_at?->toIso8601String(),
            'max_participants' => $this->max_participants,
            'requires_payment' => (bool) $this->requires_payment,
            'payment_amount' => $this->payment_amount ? (float) $this->payment_amount : null,
            'form_fields' => $this->form_fields ?? [],
            'tags' => $this->tags ?? [],
            'is_published' => (bool) $this->is_published,
            'is_active' => (bool) $this->is_active,
            'is_registration_open' => $this->isRegistrationOpen(),
            'registrations_count' => $this->registrations_count ?? 0,
            'category' => $this->whenLoaded('category', function () {
                return $this->category ? [
                    'id' => $this->category->id,
                    'name' => $this->category->name,
                    'slug' => $this->category->slug,
                ] : null;
            }),
            'division' => $this->whenLoaded('division', function () {
                return $this->division ? [
                    'id' => $this->division->id,
                    'name' => $this->division->name,
                    'slug' => $this->division->slug,
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
