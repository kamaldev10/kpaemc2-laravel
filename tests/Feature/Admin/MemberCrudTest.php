<?php

namespace Tests\Feature\Admin;

use App\Models\Division;
use App\Models\Member;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class MemberCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_to_login_when_accessing_admin_members(): void
    {
        $response = $this->get('/admin/members');

        $response->assertRedirect('/login');
    }

    public function test_editor_cannot_access_admin_members(): void
    {
        $editor = User::factory()->editor()->create();

        $response = $this->actingAs($editor)->get('/admin/members');

        $response->assertStatus(403);
    }

    public function test_admin_can_view_members_index(): void
    {
        $admin = User::factory()->admin()->create();
        $division = Division::factory()->create();

        Member::factory()->count(3)->create([
            'division_id' => $division->id,
        ]);

        $response = $this->actingAs($admin)->get('/admin/members');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Members/Index')
            ->has('members.data', 3)
            ->has('divisions')
            ->has('metrics')
        );
    }

    public function test_admin_can_view_create_member_page(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->get('/admin/members/create');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Members/Create')
            ->has('divisions')
        );
    }

    public function test_admin_can_store_a_valid_member(): void
    {
        $admin = User::factory()->admin()->create();
        $division = Division::factory()->create();

        $memberData = [
            'name' => 'Fajar Al-Hafiz',
            'member_number' => 'EMC.2023.088',
            'division_id' => $division->id,
            'position' => 'Staff Logistik',
            'batch_year' => 2023,
            'major' => 'Kehutanan',
            'phone' => '081234567890',
            'email' => 'fajar@kpa-emc2.org',
            'status' => 'active',
            'is_pengurus' => true,
            'sort_order' => 5,
        ];

        $response = $this->actingAs($admin)->post('/admin/members', $memberData);

        $response->assertRedirect('/admin/members');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('members', [
            'name' => 'Fajar Al-Hafiz',
            'member_number' => 'EMC.2023.088',
            'division_id' => $division->id,
            'is_pengurus' => true,
            'created_by' => $admin->id,
        ]);
    }

    public function test_store_member_validation_fails_on_missing_required_fields(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->post('/admin/members', [
            'name' => '',
            'member_number' => '',
        ]);

        $response->assertSessionHasErrors(['name', 'member_number']);
    }

    public function test_store_member_fails_on_duplicate_member_number(): void
    {
        $admin = User::factory()->admin()->create();

        Member::factory()->create([
            'member_number' => 'EMC.DUPLICATE.001',
        ]);

        $response = $this->actingAs($admin)->post('/admin/members', [
            'name' => 'Anggota Baru',
            'member_number' => 'EMC.DUPLICATE.001',
            'status' => 'regular',
        ]);

        $response->assertSessionHasErrors(['member_number']);
    }

    public function test_admin_can_view_edit_page(): void
    {
        $admin = User::factory()->admin()->create();
        $member = Member::factory()->create();

        $response = $this->actingAs($admin)->get("/admin/members/{$member->id}/edit");

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Members/Edit')
            ->has('member')
            ->where('member.id', $member->id)
            ->has('divisions')
        );
    }

    public function test_admin_can_update_a_member(): void
    {
        $admin = User::factory()->admin()->create();
        $member = Member::factory()->create([
            'name' => 'Nama Sebelum Edit',
            'member_number' => 'EMC.2022.010',
        ]);

        $updateData = [
            'name' => 'Nama Setelah Diperbarui',
            'member_number' => 'EMC.2022.010',
            'position' => 'Ketua Bidang Konservasi',
            'status' => 'active',
            'is_pengurus' => true,
        ];

        $response = $this->actingAs($admin)->put("/admin/members/{$member->id}", $updateData);

        $response->assertRedirect('/admin/members');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('members', [
            'id' => $member->id,
            'name' => 'Nama Setelah Diperbarui',
            'position' => 'Ketua Bidang Konservasi',
        ]);
    }

    public function test_admin_can_delete_a_member(): void
    {
        $admin = User::factory()->admin()->create();
        $member = Member::factory()->create();

        $response = $this->actingAs($admin)->delete("/admin/members/{$member->id}");

        $response->assertRedirect('/admin/members');
        $response->assertSessionHas('success');

        $this->assertSoftDeleted('members', ['id' => $member->id]);
    }

    public function test_super_admin_can_manage_members(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();
        $member = Member::factory()->create();

        $response = $this->actingAs($superAdmin)->delete("/admin/members/{$member->id}");

        $response->assertRedirect('/admin/members');
        $this->assertSoftDeleted('members', ['id' => $member->id]);
    }

    public function test_member_policy_allows_admin_to_manage_and_disallows_editor(): void
    {
        $admin = User::factory()->admin()->create();
        $editor = User::factory()->editor()->create();
        $member = Member::factory()->create();

        $this->assertTrue($admin->can('create', Member::class));
        $this->assertTrue($admin->can('update', $member));
        $this->assertTrue($admin->can('delete', $member));

        $this->assertFalse($editor->can('create', Member::class));
        $this->assertFalse($editor->can('update', $member));
        $this->assertFalse($editor->can('delete', $member));
    }
}
