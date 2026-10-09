<?php

namespace Tests\Feature\Admin;

use App\Enums\RoleTypeEnum;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_to_login(): void
    {
        $response = $this->get('/admin/users');

        $response->assertRedirect('/login');
    }

    public function test_editor_cannot_access_user_management(): void
    {
        $editor = User::factory()->editor()->create();

        $response = $this->actingAs($editor)->get('/admin/users');

        $response->assertStatus(403);
    }

    public function test_admin_cannot_access_user_management(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->get('/admin/users');

        $response->assertStatus(403);
    }

    public function test_super_admin_can_view_user_management_index(): void
    {
        $superAdmin = User::factory()->superAdmin()->create(['name' => 'Super User']);
        $admin = User::factory()->admin()->create(['name' => 'Admin User']);
        $editor = User::factory()->editor()->create(['name' => 'Editor User']);

        $response = $this->actingAs($superAdmin)->get('/admin/users');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Users/Index')
            ->has('users.data', 3)
            ->has('metrics')
            ->where('metrics.total', 3)
            ->where('metrics.super_admin', 1)
            ->where('metrics.admin', 1)
            ->where('metrics.editor', 1)
            ->has('roles')
        );
    }

    public function test_super_admin_can_filter_users_by_role_and_search(): void
    {
        $superAdmin = User::factory()->superAdmin()->create(['name' => 'Root Admin', 'email' => 'root@example.com']);
        User::factory()->admin()->create(['name' => 'Budi Santoso', 'email' => 'budi@example.com']);
        User::factory()->editor()->create(['name' => 'Siti Rahma', 'email' => 'siti@example.com']);

        // Search by name
        $response = $this->actingAs($superAdmin)->get('/admin/users?search=Budi');
        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->has('users.data', 1)
            ->where('users.data.0.name', 'Budi Santoso')
        );

        // Filter by role
        $response = $this->actingAs($superAdmin)->get('/admin/users?role=editor');
        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->has('users.data', 1)
            ->where('users.data.0.name', 'Siti Rahma')
        );
    }

    public function test_super_admin_can_create_new_user_account(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();

        $response = $this->actingAs($superAdmin)->post('/admin/users', [
            'name' => 'Pengurus Baru',
            'email' => 'pengurus.baru@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'admin',
            'is_active' => true,
        ]);

        $response->assertRedirect('/admin/users');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('users', [
            'name' => 'Pengurus Baru',
            'email' => 'pengurus.baru@example.com',
            'role' => RoleTypeEnum::ADMIN->value,
            'is_active' => true,
            'created_by' => $superAdmin->id,
        ]);

        $createdUser = User::where('email', 'pengurus.baru@example.com')->first();
        $this->assertNotNull($createdUser);
        $this->assertTrue(Hash::check('Password123!', $createdUser->password));
        $this->assertNotNull($createdUser->email_verified_at);
    }

    public function test_user_creation_validation_fails_on_duplicate_email(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();
        User::factory()->create(['email' => 'existing@example.com']);

        $response = $this->actingAs($superAdmin)->post('/admin/users', [
            'name' => 'Duplicate User',
            'email' => 'existing@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'editor',
        ]);

        $response->assertSessionHasErrors('email');
    }

    public function test_user_creation_validation_fails_on_password_mismatch(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();

        $response = $this->actingAs($superAdmin)->post('/admin/users', [
            'name' => 'Mismatch User',
            'email' => 'mismatch@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'DifferentPassword!',
            'role' => 'editor',
        ]);

        $response->assertSessionHasErrors('password');
    }

    public function test_super_admin_can_update_user(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();
        $user = User::factory()->editor()->create([
            'name' => 'Old Name',
            'email' => 'old@example.com',
            'is_active' => true,
        ]);

        $response = $this->actingAs($superAdmin)->put("/admin/users/{$user->id}", [
            'name' => 'New Name',
            'email' => 'new@example.com',
            'role' => 'admin',
            'is_active' => false,
        ]);

        $response->assertRedirect('/admin/users');
        $response->assertSessionHas('success');

        $user->refresh();
        $this->assertSame('New Name', $user->name);
        $this->assertSame('new@example.com', $user->email);
        $this->assertSame(RoleTypeEnum::ADMIN, $user->role);
        $this->assertFalse($user->is_active);
        $this->assertSame($superAdmin->id, $user->updated_by);
    }

    public function test_super_admin_can_update_user_password(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();
        $user = User::factory()->admin()->create([
            'password' => Hash::make('OldPassword123!'),
        ]);

        $response = $this->actingAs($superAdmin)->put("/admin/users/{$user->id}", [
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role->value,
            'is_active' => true,
            'password' => 'NewSecretPassword123!',
            'password_confirmation' => 'NewSecretPassword123!',
        ]);

        $response->assertRedirect('/admin/users');

        $user->refresh();
        $this->assertTrue(Hash::check('NewSecretPassword123!', $user->password));
    }

    public function test_super_admin_cannot_demote_or_deactivate_themselves(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();

        // Attempt self-demotion
        $response = $this->actingAs($superAdmin)->put("/admin/users/{$superAdmin->id}", [
            'name' => $superAdmin->name,
            'email' => $superAdmin->email,
            'role' => 'editor',
            'is_active' => true,
        ]);

        $response->assertSessionHasErrors('role');
        $superAdmin->refresh();
        $this->assertSame(RoleTypeEnum::SUPER_ADMIN, $superAdmin->role);

        // Attempt self-deactivation
        $response = $this->actingAs($superAdmin)->put("/admin/users/{$superAdmin->id}", [
            'name' => $superAdmin->name,
            'email' => $superAdmin->email,
            'role' => 'super_admin',
            'is_active' => false,
        ]);

        $response->assertSessionHasErrors('is_active');
        $superAdmin->refresh();
        $this->assertTrue($superAdmin->is_active);
    }

    public function test_super_admin_cannot_delete_themselves(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();

        $response = $this->actingAs($superAdmin)->delete("/admin/users/{$superAdmin->id}");

        $response->assertStatus(403);
        $this->assertDatabaseHas('users', ['id' => $superAdmin->id]);
    }

    public function test_super_admin_can_delete_another_user(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();
        $user = User::factory()->editor()->create();

        $response = $this->actingAs($superAdmin)->delete("/admin/users/{$user->id}");

        $response->assertRedirect('/admin/users');
        $response->assertSessionHas('success');

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
