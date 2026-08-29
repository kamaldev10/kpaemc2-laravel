<?php

namespace App\Models;

use App\Models\Traits\HasAuditColumns;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasAuditColumns;

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
        ];
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === 'superadmin';
    }

    public function isEditor(): bool
    {
        return in_array($this->role, ['superadmin', 'editor']);
    }

    public function isCommittee(): bool
    {
        return in_array($this->role, ['superadmin', 'committee']);
    }
}
