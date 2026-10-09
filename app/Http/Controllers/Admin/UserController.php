<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RoleTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Http\Resources\Admin\UserResource;
use App\Models\User;
use App\Services\Admin\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {}

    /**
     * Display a listing of users (Super Admin only).
     */
    public function index(Request $request): Response
    {
        if ($request->user()->cannot('viewAny', User::class)) {
            abort(403, 'Hanya Super Admin yang memiliki hak akses ke manajemen pengguna.');
        }

        $perPage = (int) $request->input('per_page', 10);
        if (! in_array($perPage, [10, 20, 50, 100])) {
            $perPage = 10;
        }

        $filters = $request->only(['search', 'role', 'is_active']);
        $filters['per_page'] = (string) $perPage;

        $users = $this->userService->paginate($filters, $perPage);
        $metrics = $this->userService->getMetrics();

        $roles = array_map(fn (RoleTypeEnum $role) => [
            'value' => $role->value,
            'label' => $role->label(),
        ], RoleTypeEnum::cases());

        return Inertia::render('Admin/Users/Index', [
            'users' => UserResource::collection($users),
            'filters' => $filters,
            'metrics' => $metrics,
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created user.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $user = $this->userService->create(
            $request->validated(),
            $request->user()
        );

        return redirect()
            ->route('admin.users.index')
            ->with('success', "Pengguna \"{$user->name}\" berhasil ditambahkan.");
    }

    /**
     * Update the specified user.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $updated = $this->userService->update(
            $user,
            $request->validated(),
            $request->user()
        );

        return redirect()
            ->route('admin.users.index')
            ->with('success', "Pengguna \"{$updated->name}\" berhasil diperbarui.");
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($request->user()->cannot('delete', $user)) {
            abort(403, 'Aksi ditolak: Anda tidak memiliki izin untuk menghapus akun ini.');
        }

        $this->userService->delete($user, $request->user());

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'Pengguna berhasil dihapus.');
    }
}
