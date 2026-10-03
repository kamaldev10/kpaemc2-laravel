<?php

namespace App\Policies;

use App\Enums\RoleTypeEnum;
use App\Models\Category;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CategoryPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAtLeast(RoleTypeEnum::EDITOR);
    }

    public function view(User $user, Category $category): bool
    {
        return $user->isAtLeast(RoleTypeEnum::EDITOR);
    }

    public function create(User $user): bool
    {
        return $user->isAtLeast(RoleTypeEnum::ADMIN);
    }

    public function update(User $user, Category $category): Response
    {
        return $user->isAtLeast(RoleTypeEnum::ADMIN)
            ? Response::allow()
            : Response::deny('Hanya admin yang dapat mengubah kategori.');
    }

    public function delete(User $user, Category $category): Response
    {
        return $user->isAtLeast(RoleTypeEnum::ADMIN)
            ? Response::allow()
            : Response::deny('Hanya admin yang dapat menghapus kategori.');
    }
}
