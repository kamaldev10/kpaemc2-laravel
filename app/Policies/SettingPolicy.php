<?php

namespace App\Policies;

use App\Enums\RoleTypeEnum;
use App\Models\User;

class SettingPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAtLeast(RoleTypeEnum::ADMIN);
    }

    public function update(User $user): bool
    {
        return $user->isAtLeast(RoleTypeEnum::ADMIN);
    }
}
