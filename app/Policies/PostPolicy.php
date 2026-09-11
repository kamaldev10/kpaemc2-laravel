<?php

namespace App\Policies;

use App\Enums\RoleTypeEnum;
use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PostPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->isAtLeast(RoleTypeEnum::EDITOR);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Post $post): bool
    {
        return $user->isAtLeast(RoleTypeEnum::EDITOR);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isAtLeast(RoleTypeEnum::EDITOR);
    }

    /**
     * Determine whether the user can update the model.
     * SUPER_ADMIN & ADMIN can update any post.
     * EDITOR can only update their own post.
     */
    public function update(User $user, Post $post): Response
    {
        if ($user->isAtLeast(RoleTypeEnum::ADMIN)) {
            return Response::allow();
        }

        if ($user->hasRole(RoleTypeEnum::EDITOR) && ($post->user_id === $user->id || $post->created_by === $user->id)) {
            return Response::allow();
        }

        return Response::deny('Anda tidak memiliki izin untuk mengubah artikel ini.');
    }

    /**
     * Determine whether the user can delete the model.
     * SUPER_ADMIN & ADMIN can delete any post.
     * EDITOR can only delete their own post.
     */
    public function delete(User $user, Post $post): Response
    {
        if ($user->isAtLeast(RoleTypeEnum::ADMIN)) {
            return Response::allow();
        }

        if ($user->hasRole(RoleTypeEnum::EDITOR) && ($post->user_id === $user->id || $post->created_by === $user->id)) {
            return Response::allow();
        }

        return Response::deny('Anda tidak memiliki izin untuk menghapus artikel ini.');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Post $post): bool
    {
        return $user->isAtLeast(RoleTypeEnum::ADMIN);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Post $post): bool
    {
        return $user->hasRole(RoleTypeEnum::SUPER_ADMIN);
    }
}
