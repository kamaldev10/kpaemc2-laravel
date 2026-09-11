<?php

namespace App\Services\Admin;

use App\Models\Member;
use App\Models\User;
use App\Services\CloudinaryService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class MemberService
{
    public function __construct(
        protected CloudinaryService $cloudinaryService
    ) {}

    /**
     * Get paginated members with filtering and relationships.
     *
     * @param  array<string, mixed>  $filters
     */
    public function paginate(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = Member::with(['division'])
            ->orderBy('sort_order')
            ->orderBy('name');

        // Search term (name, member_number, position, major)
        if (! empty($filters['search'])) {
            $term = trim($filters['search']);
            $query->where(function ($q) use ($term) {
                $q->where('name', 'ILIKE', "%{$term}%")
                    ->orWhere('member_number', 'ILIKE', "%{$term}%")
                    ->orWhere('position', 'ILIKE', "%{$term}%")
                    ->orWhere('major', 'ILIKE', "%{$term}%");
            });
        }

        // Division filter
        if (! empty($filters['division_id'])) {
            $query->where('division_id', $filters['division_id']);
        }

        // Status filter (regular, active, alumni, honorary)
        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        // Is Pengurus filter
        if (isset($filters['is_pengurus']) && $filters['is_pengurus'] !== '') {
            $isPengurus = filter_var($filters['is_pengurus'], FILTER_VALIDATE_BOOLEAN);
            $query->where('is_pengurus', $isPengurus);
        }

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * Get summary metrics for members dashboard.
     *
     * @return array{total: int, pengurus: int, active: int, alumni: int}
     */
    public function getMetrics(): array
    {
        return [
            'total' => Member::count(),
            'pengurus' => Member::where('is_pengurus', true)->count(),
            'active' => Member::whereIn('status', ['active', 'regular'])->count(),
            'alumni' => Member::where('status', 'alumni')->count(),
        ];
    }

    /**
     * Create a new member.
     *
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, ?UploadedFile $avatar, User $actor): Member
    {
        return DB::transaction(function () use ($data, $avatar, $actor) {
            // Avatar image handling
            if ($avatar instanceof UploadedFile) {
                $upload = $this->cloudinaryService->upload($avatar, CloudinaryService::FOLDER_MEMBERS);
                $data['avatar_url'] = $upload['secure_url'] ?? $upload['url'];
                $data['avatar_public_id'] = $upload['public_id'];
            }

            $data['created_by'] = $actor->id;
            $data['updated_by'] = $actor->id;

            $member = Member::create($data);

            $this->invalidateCache();

            return $member;
        });
    }

    /**
     * Update an existing member.
     *
     * @param  array<string, mixed>  $data
     */
    public function update(Member $member, array $data, ?UploadedFile $avatar, User $actor): Member
    {
        return DB::transaction(function () use ($member, $data, $avatar, $actor) {
            // Avatar update
            if ($avatar instanceof UploadedFile) {
                // Delete old avatar from Cloudinary if exists
                if (! empty($member->avatar_public_id)) {
                    $this->cloudinaryService->delete($member->avatar_public_id);
                }

                $upload = $this->cloudinaryService->upload($avatar, CloudinaryService::FOLDER_MEMBERS);
                $data['avatar_url'] = $upload['secure_url'] ?? $upload['url'];
                $data['avatar_public_id'] = $upload['public_id'];
            }

            $data['updated_by'] = $actor->id;

            $member->update($data);

            $this->invalidateCache();

            return $member->fresh(['division']);
        });
    }

    /**
     * Soft delete a member.
     */
    public function delete(Member $member): bool
    {
        $deleted = $member->delete();

        if ($deleted) {
            $this->invalidateCache();
        }

        return (bool) $deleted;
    }

    /**
     * Force delete a member and clean up Cloudinary assets.
     */
    public function forceDelete(Member $member): bool
    {
        if (! empty($member->avatar_public_id)) {
            $this->cloudinaryService->delete($member->avatar_public_id);
        }

        $deleted = $member->forceDelete();

        if ($deleted) {
            $this->invalidateCache();
        }

        return (bool) $deleted;
    }

    /**
     * Invalidate member and organizational structure cache.
     */
    public function invalidateCache(): void
    {
        try {
            if (Cache::supportsTags()) {
                Cache::tags(['members', 'structure'])->flush();
            }
        } catch (\Throwable) {
            // Ignored if cache driver does not support tags
        }

        Cache::forget('public_structure_members');
        Cache::forget('members_list');
    }
}
