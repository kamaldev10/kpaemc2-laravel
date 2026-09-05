<?php

namespace App\Enums;

/**
 * Enum representing the possible role types in the system.
 * Used by middleware, policies, and any role‑based checks.
 */
enum RoleTypeEnum: string
{
    case SUPER_ADMIN = 'super_admin';
    case ADMIN = 'admin';
    case EDITOR = 'editor';

    /**
     * Get a human‑readable label for the role.
     */
    public function label(): string
    {
        return match ($this) {
            self::SUPER_ADMIN => 'Super Admin',
            self::ADMIN => 'Admin',
            self::EDITOR => 'Editor',
        };
    }
}
