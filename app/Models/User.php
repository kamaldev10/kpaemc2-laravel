<?php

namespace App\Models;

use App\Enums\RoleTypeEnum;

use App\Models\Traits\HasAuditColumns;
use App\Models\Traits\HasUuidKey;
use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasAuditColumns, HasUuidKey;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'avatar_url',
        'avatar_public_id',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
            'role' => RoleTypeEnum::class,
        ];
    }

    /**
     * Check if the user has one of the given roles.
     */
    public function hasRole(RoleTypeEnum ...$roles): bool
    {
        return in_array($this->role, $roles);
    }

    /**
     * Check if the user's role is at least the given minimum role.
     *
     * Hierarchy: EDITOR (1) < ADMIN (2) < SUPER_ADMIN (3)
     */
    public function isAtLeast(RoleTypeEnum $minimumRole): bool
    {
        $hierarchy = [
            RoleTypeEnum::EDITOR->value => 1,
            RoleTypeEnum::ADMIN->value => 2,
            RoleTypeEnum::SUPER_ADMIN->value => 3,
        ];

        $userLevel = $hierarchy[$this->role->value] ?? 0;
        $requiredLevel = $hierarchy[$minimumRole->value] ?? 0;

        return $userLevel >= $requiredLevel;
    }
}
