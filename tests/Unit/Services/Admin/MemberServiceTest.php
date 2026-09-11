<?php

namespace Tests\Unit\Services\Admin;

use App\Models\Division;
use App\Models\Member;
use App\Models\User;
use App\Services\Admin\MemberService;
use App\Services\CloudinaryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class MemberServiceTest extends TestCase
{
    use RefreshDatabase;

    protected MemberService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $cloudinary = app(CloudinaryService::class);
        $this->service = new MemberService($cloudinary);
    }

    public function test_paginate_returns_paginated_members_with_division(): void
    {
        $division = Division::factory()->create();
        Member::factory()->count(5)->create([
            'division_id' => $division->id,
        ]);

        $paginator = $this->service->paginate([], 3);

        $this->assertEquals(3, $paginator->count());
        $this->assertEquals(5, $paginator->total());
        $this->assertTrue($paginator->first()->relationLoaded('division'));
    }

    public function test_paginate_filters_by_search_term(): void
    {
        Member::factory()->create([
            'name' => 'Aditya Pratama',
            'member_number' => 'EMC.2023.001',
            'major' => 'Biologi',
        ]);
        Member::factory()->create([
            'name' => 'Budi Santoso',
            'member_number' => 'EMC.2022.099',
            'major' => 'Fisika',
        ]);

        $resultByName = $this->service->paginate(['search' => 'Aditya']);
        $resultByNia = $this->service->paginate(['search' => '099']);

        $this->assertEquals(1, $resultByName->total());
        $this->assertEquals('Aditya Pratama', $resultByName->first()->name);

        $this->assertEquals(1, $resultByNia->total());
        $this->assertEquals('Budi Santoso', $resultByNia->first()->name);
    }

    public function test_paginate_filters_by_division(): void
    {
        $div1 = Division::factory()->create();
        $div2 = Division::factory()->create();

        Member::factory()->create(['division_id' => $div1->id]);
        Member::factory()->create(['division_id' => $div2->id]);

        $result = $this->service->paginate(['division_id' => $div1->id]);

        $this->assertEquals(1, $result->total());
        $this->assertEquals($div1->id, $result->first()->division_id);
    }

    public function test_paginate_filters_by_status(): void
    {
        Member::factory()->create(['status' => 'active']);
        Member::factory()->create(['status' => 'alumni']);

        $active = $this->service->paginate(['status' => 'active']);
        $alumni = $this->service->paginate(['status' => 'alumni']);

        $this->assertEquals(1, $active->total());
        $this->assertEquals(1, $alumni->total());
    }

    public function test_paginate_filters_by_is_pengurus(): void
    {
        Member::factory()->create(['is_pengurus' => true]);
        Member::factory()->create(['is_pengurus' => false]);

        $pengurus = $this->service->paginate(['is_pengurus' => '1']);
        $nonPengurus = $this->service->paginate(['is_pengurus' => '0']);

        $this->assertEquals(1, $pengurus->total());
        $this->assertEquals(1, $nonPengurus->total());
    }

    public function test_create_member_stores_record_and_assigns_audit_fields(): void
    {
        $actor = User::factory()->create();
        $division = Division::factory()->create();

        $member = $this->service->create([
            'name' => 'Fitra Wardana',
            'member_number' => 'EMC.2024.012',
            'division_id' => $division->id,
            'position' => 'Staff Humas',
            'batch_year' => 2024,
            'major' => 'Sistem Informasi',
            'status' => 'active',
            'is_pengurus' => true,
        ], null, $actor);

        $this->assertDatabaseHas('members', [
            'id' => $member->id,
            'name' => 'Fitra Wardana',
            'member_number' => 'EMC.2024.012',
            'division_id' => $division->id,
            'created_by' => $actor->id,
            'updated_by' => $actor->id,
            'is_pengurus' => true,
        ]);
    }

    public function test_update_member_modifies_record_and_updates_audit(): void
    {
        $actor = User::factory()->create();
        $editor = User::factory()->create();

        $member = $this->service->create([
            'name' => 'Nama Lama',
            'member_number' => 'EMC.2020.001',
            'status' => 'regular',
        ], null, $actor);

        $updated = $this->service->update($member, [
            'name' => 'Nama Baru Diperbarui',
            'position' => 'Ketua Umum',
            'is_pengurus' => true,
        ], null, $editor);

        $this->assertEquals('Nama Baru Diperbarui', $updated->name);
        $this->assertEquals('Ketua Umum', $updated->position);
        $this->assertTrue($updated->is_pengurus);
        $this->assertEquals($editor->id, $updated->updated_by);
    }

    public function test_delete_soft_deletes_member(): void
    {
        $actor = User::factory()->create();
        $member = $this->service->create([
            'name' => 'Anggota Hapus',
            'member_number' => 'EMC.2021.999',
        ], null, $actor);

        $result = $this->service->delete($member);

        $this->assertTrue($result);
        $this->assertSoftDeleted('members', ['id' => $member->id]);
    }

    public function test_cache_invalidation_clears_keys(): void
    {
        Cache::put('public_structure_members', 'cached_data', 3600);
        Cache::put('members_list', 'cached_data', 3600);

        $this->service->invalidateCache();

        $this->assertNull(Cache::get('public_structure_members'));
        $this->assertNull(Cache::get('members_list'));
    }
}
