<?php

namespace App\Policies;

use App\Enums\RoleTypeEnum;
use App\Models\Contact;
use App\Models\User;

class ContactPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAtLeast(RoleTypeEnum::ADMIN);
    }

    public function view(User $user, Contact $contact): bool
    {
        return $user->isAtLeast(RoleTypeEnum::ADMIN);
    }

    public function update(User $user, Contact $contact): bool
    {
        return $user->isAtLeast(RoleTypeEnum::ADMIN);
    }

    public function delete(User $user, Contact $contact): bool
    {
        return $user->isAtLeast(RoleTypeEnum::ADMIN);
    }
}
