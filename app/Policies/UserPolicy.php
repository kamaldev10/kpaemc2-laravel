<?php

namespace App\Policies;

use App\Enums\RoleTypeEnum;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasRole(RoleTypeEnum::SUPER_ADMIN);
    }

    public function view(User $user, User $model): bool
    {
        return $user->hasRole(RoleTypeEnum::SUPER_ADMIN);
    }

    public function create(User $user): bool
    {
        return $user->hasRole(RoleTypeEnum::SUPER_ADMIN);
    }

    public function update(User $user, User $model): bool
    {
        return $user->hasRole(RoleTypeEnum::SUPER_ADMIN);
    }

    public function delete(User $user, User $model): Response
    {
        if (! $user->hasRole(RoleTypeEnum::SUPER_ADMIN)) {
            return Response::deny('Hanya Super Admin yang dapat menghapus akun pengguna.');
        }

        if ($user->id === $model->id) {
            return Response::deny('Anda tidak dapat menghapus akun Anda sendiri.');
        }

        return Response::allow();
    }
}
