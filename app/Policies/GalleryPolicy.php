<?php

namespace App\Policies;

use App\Enums\RoleTypeEnum;
use App\Models\Gallery;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class GalleryPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAtLeast(RoleTypeEnum::EDITOR);
    }

    public function view(User $user, Gallery $gallery): bool
    {
        return $user->isAtLeast(RoleTypeEnum::EDITOR);
    }

    public function create(User $user): bool
    {
        return $user->isAtLeast(RoleTypeEnum::ADMIN);
    }

    public function update(User $user, Gallery $gallery): Response
    {
        if ($user->isAtLeast(RoleTypeEnum::ADMIN)) {
            return Response::allow();
        }

        if ($user->hasRole(RoleTypeEnum::EDITOR) && $gallery->created_by === $user->id) {
            return Response::allow();
        }

        return Response::deny('Anda tidak memiliki izin untuk mengubah album galeri ini.');
    }

    public function delete(User $user, Gallery $gallery): Response
    {
        if ($user->isAtLeast(RoleTypeEnum::ADMIN)) {
            return Response::allow();
        }

        if ($user->hasRole(RoleTypeEnum::EDITOR) && $gallery->created_by === $user->id) {
            return Response::allow();
        }

        return Response::deny('Anda tidak memiliki izin untuk menghapus album galeri ini.');
    }
}
