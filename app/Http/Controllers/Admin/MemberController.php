<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreMemberRequest;
use App\Http\Requests\Admin\UpdateMemberRequest;
use App\Http\Resources\Admin\MemberResource;
use App\Models\Division;
use App\Models\Member;
use App\Services\Admin\MemberService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MemberController extends Controller
{
    public function __construct(
        protected MemberService $memberService
    ) {}

    /**
     * Display a listing of members.
     */
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'division_id', 'status', 'is_pengurus']);

        $members = $this->memberService->paginate($filters, 10);

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $metrics = $this->memberService->getMetrics();

        return Inertia::render('Admin/Members/Index', [
            'members' => MemberResource::collection($members),
            'divisions' => $divisions,
            'filters' => $filters,
            'metrics' => $metrics,
        ]);
    }

    /**
     * Show the form for creating a new member.
     */
    public function create(Request $request): Response
    {
        $this->authorizeAction('create', Member::class);

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Members/Create', [
            'divisions' => $divisions,
        ]);
    }

    /**
     * Store a newly created member in storage.
     */
    public function store(StoreMemberRequest $request): RedirectResponse
    {
        $member = $this->memberService->create(
            $request->validated(),
            $request->file('avatar'),
            $request->user()
        );

        return redirect()
            ->route('admin.members.index')
            ->with('success', "Data anggota \"{$member->name}\" berhasil ditambahkan.");
    }

    /**
     * Show the form for editing the specified member.
     */
    public function edit(Request $request, Member $member): Response
    {
        if ($request->user()->cannot('update', $member)) {
            abort(403, 'Anda tidak memiliki izin untuk mengedit data anggota ini.');
        }

        $member->load('division');

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Members/Edit', [
            'member' => new MemberResource($member),
            'divisions' => $divisions,
        ]);
    }

    /**
     * Update the specified member in storage.
     */
    public function update(UpdateMemberRequest $request, Member $member): RedirectResponse
    {
        $updated = $this->memberService->update(
            $member,
            $request->validated(),
            $request->file('avatar'),
            $request->user()
        );

        return redirect()
            ->route('admin.members.index')
            ->with('success', "Data anggota \"{$updated->name}\" berhasil diperbarui.");
    }

    /**
     * Remove the specified member from storage.
     */
    public function destroy(Request $request, Member $member): RedirectResponse
    {
        if ($request->user()->cannot('delete', $member)) {
            abort(403, 'Anda tidak memiliki izin untuk menghapus data anggota ini.');
        }

        $this->memberService->delete($member);

        return redirect()
            ->route('admin.members.index')
            ->with('success', 'Data anggota berhasil dihapus.');
    }

    /**
     * Helper to authorize user for a given ability.
     */
    protected function authorizeAction(string $ability, string|object $target): void
    {
        $user = request()->user();
        if (! $user || ! $user->can($ability, $target)) {
            abort(403, 'Akses ditolak.');
        }
    }
}
