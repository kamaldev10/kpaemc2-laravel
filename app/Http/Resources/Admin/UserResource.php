<?php

namespace App\Http\Resources\Admin;

use App\Enums\RoleTypeEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role instanceof \BackedEnum ? $this->role->value : $this->role,
            'role_label' => $this->role instanceof RoleTypeEnum ? $this->role->label() : ($this->role ? ucfirst(str_replace('_', ' ', (string) $this->role)) : null),
            'avatar_url' => $this->avatar_url,
            'avatar_public_id' => $this->avatar_public_id,
            'is_active' => (bool) $this->is_active,
            'email_verified_at' => $this->email_verified_at?->toIso8601String(),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
            'can' => [
                'update' => $user ? $user->can('update', $this->resource) : false,
                'delete' => $user ? $user->can('delete', $this->resource) : false,
                'is_self' => $user ? $user->id === $this->id : false,
            ],
        ];
    }
}
