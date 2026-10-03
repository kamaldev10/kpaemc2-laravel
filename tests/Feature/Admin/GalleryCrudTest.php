<?php

namespace Tests\Feature\Admin;

use App\Models\Category;
use App\Models\Gallery;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class GalleryCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_to_login(): void
    {
        $response = $this->get('/admin/galleries');

        $response->assertRedirect('/login');
    }

    public function test_admin_can_view_galleries_index(): void
    {
        $admin = User::factory()->admin()->create();
        Gallery::factory()->count(2)->create();

        $response = $this->actingAs($admin)->get('/admin/galleries');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Galleries/Index')
            ->has('galleries.data', 2)
        );
    }

    public function test_admin_can_store_gallery(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->post('/admin/galleries', [
            'title' => 'Album Diksar 2026',
            'location' => 'Riau',
            'event_date' => now()->toDateString(),
            'is_published' => true,
        ]);

        $response->assertRedirect('/admin/galleries');
        $this->assertDatabaseHas('galleries', [
            'title' => 'Album Diksar 2026',
            'created_by' => $admin->id,
        ]);
    }

    public function test_admin_can_update_gallery(): void
    {
        $admin = User::factory()->admin()->create();
        $gallery = Gallery::factory()->create(['title' => 'Album Lama']);

        $response = $this->actingAs($admin)->put("/admin/galleries/{$gallery->id}", [
            'title' => 'Album Diperbarui',
            'is_published' => true,
        ]);

        $response->assertRedirect('/admin/galleries');
        $this->assertDatabaseHas('galleries', [
            'id' => $gallery->id,
            'title' => 'Album Diperbarui',
        ]);
    }

    public function test_admin_can_delete_gallery(): void
    {
        $admin = User::factory()->admin()->create();
        $gallery = Gallery::factory()->create();

        $response = $this->actingAs($admin)->delete("/admin/galleries/{$gallery->id}");

        $response->assertRedirect('/admin/galleries');
        $this->assertSoftDeleted('galleries', ['id' => $gallery->id]);
    }
}
