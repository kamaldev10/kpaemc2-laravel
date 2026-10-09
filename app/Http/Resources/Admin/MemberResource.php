<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberResource extends JsonResource
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
            'member_number' => $this->member_number,
            'name' => $this->name,
            'division_id' => $this->division_id,
            'position' => $this->position,
            'batch_year' => $this->batch_year,
            'major' => $this->major instanceof \BackedEnum ? $this->major->value : $this->major,
            'major_label' => $this->major instanceof \App\Enums\DepartmentMajorEnum ? $this->major->label() : ($this->major ? ucfirst(str_replace('_', ' ', (string) $this->major)) : null),
            'phone' => $this->phone,
            'email' => $this->email,
            'status' => $this->status instanceof \BackedEnum ? $this->status->value : $this->status,
            'status_label' => $this->status instanceof \App\Enums\MemberStatusEnum ? $this->status->label() : ($this->status ? ucfirst((string) $this->status) : null),
            'bio' => $this->bio,
            'avatar_url' => $this->avatar_url,
            'avatar_public_id' => $this->avatar_public_id,
            'is_pengurus' => (bool) $this->is_pengurus,
            'sort_order' => (int) $this->sort_order,
            'is_active' => (bool) $this->is_active,
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
