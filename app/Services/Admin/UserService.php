<?php

namespace App\Services\Admin;

use App\Enums\RoleTypeEnum;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserService
{
    /**
     * Paginate users with filter conditions.
     */
    public function paginate(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = User::query()
            ->orderByRaw("CASE WHEN role = 'super_admin' THEN 1 WHEN role = 'admin' THEN 2 ELSE 3 END")
            ->orderBy('name');

        if (! empty($filters['search'])) {
            $term = trim($filters['search']);
            $query->where(function ($q) use ($term) {
                $q->where('name', 'ILIKE', "%{$term}%")
                    ->orWhere('email', 'ILIKE', "%{$term}%");
            });
        }

        if (! empty($filters['role'])) {
            $query->where('role', $filters['role']);
        }

        if (isset($filters['is_active']) && $filters['is_active'] !== '') {
            $isActive = filter_var($filters['is_active'], FILTER_VALIDATE_BOOLEAN);
            $query->where('is_active', $isActive);
        }

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * Get aggregate user metrics for dashboard and cards.
     */
    public function getMetrics(): array
    {
        return [
            'total' => User::count(),
            'super_admin' => User::where('role', RoleTypeEnum::SUPER_ADMIN)->count(),
            'admin' => User::where('role', RoleTypeEnum::ADMIN)->count(),
            'editor' => User::where('role', RoleTypeEnum::EDITOR)->count(),
            'active' => User::where('is_active', true)->count(),
        ];
    }

    /**
     * Create a new user account.
     */
    public function create(array $data, User $actor): User
    {
        $data['password'] = Hash::make($data['password']);
        $data['email_verified_at'] = now();
        $data['created_by'] = $actor->id;
        $data['updated_by'] = $actor->id;

        return User::create($data);
    }

    /**
     * Update an existing user account with safety checks.
     */
    public function update(User $user, array $data, User $actor): User
    {
        // Safety: Prevent self-lockout / self-demotion
        if ($actor->id === $user->id) {
            $roleValue = $data['role'] instanceof RoleTypeEnum ? $data['role']->value : ($data['role'] ?? null);
            if ($roleValue && $roleValue !== RoleTypeEnum::SUPER_ADMIN->value) {
                throw ValidationException::withMessages([
                    'role' => 'Anda tidak dapat mengubah peran akun Anda sendiri.',
                ]);
            }

            if (isset($data['is_active']) && ! $data['is_active']) {
                throw ValidationException::withMessages([
                    'is_active' => 'Anda tidak dapat menonaktifkan akun Anda sendiri.',
                ]);
            }
        }

        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $data['updated_by'] = $actor->id;

        $user->update($data);

        return $user->fresh();
    }

    /**
     * Delete a user account with safety check against self-deletion.
     */
    public function delete(User $user, User $actor): bool
    {
        if ($actor->id === $user->id) {
            throw ValidationException::withMessages([
                'user' => 'Anda tidak dapat menghapus akun Anda sendiri.',
            ]);
        }

        return (bool) $user->delete();
    }
}
