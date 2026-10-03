<?php

namespace App\Policies;

use App\Enums\RoleTypeEnum;
use App\Models\Event;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class EventPolicy
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
    public function view(User $user, Event $event): bool
    {
        return $user->isAtLeast(RoleTypeEnum::EDITOR);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isAtLeast(RoleTypeEnum::ADMIN);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Event $event): Response
    {
        if ($user->isAtLeast(RoleTypeEnum::ADMIN)) {
            return Response::allow();
        }

        if ($user->hasRole(RoleTypeEnum::EDITOR) && $event->created_by === $user->id) {
            return Response::allow();
        }

        return Response::deny('Anda tidak memiliki izin untuk mengubah kegiatan ini.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Event $event): Response
    {
        if ($user->isAtLeast(RoleTypeEnum::ADMIN)) {
            return Response::allow();
        }

        if ($user->hasRole(RoleTypeEnum::EDITOR) && $event->created_by === $user->id) {
            return Response::allow();
        }

        return Response::deny('Anda tidak memiliki izin untuk menghapus kegiatan ini.');
    }

    /**
     * Determine whether the user can manage registrations for the event.
     */
    public function manageRegistrations(User $user, Event $event): bool
    {
        return $user->isAtLeast(RoleTypeEnum::ADMIN);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Event $event): bool
    {
        return $user->isAtLeast(RoleTypeEnum::ADMIN);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Event $event): bool
    {
        return $user->hasRole(RoleTypeEnum::SUPER_ADMIN);
    }
}
