<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_to_login_when_accessing_admin(): void
    {
        $response = $this->get('/admin');

        $response->assertRedirect('/login');
    }

    public function test_editor_is_forbidden_from_admin_dashboard(): void
    {
        $editor = User::factory()->editor()->create();

        $response = $this->actingAs($editor)->get('/admin');

        $response->assertStatus(403);
    }

    public function test_admin_can_access_admin_dashboard(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->get('/admin');

        $response->assertOk();
    }

    public function test_super_admin_can_access_admin_dashboard(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();

        $response = $this->actingAs($superAdmin)->get('/admin');

        $response->assertOk();
    }

    public function test_unverified_admin_is_redirected_to_verify_email(): void
    {
        $unverifiedAdmin = User::factory()->admin()->unverified()->create();

        $response = $this->actingAs($unverifiedAdmin)->get('/admin');

        $response->assertRedirect('/verify-email');
    }
}
