<?php

namespace Tests\Feature\Admin;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CategoryCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_to_login(): void
    {
        $response = $this->get('/admin/categories');

        $response->assertRedirect('/login');
    }

    public function test_admin_can_view_categories_index(): void
    {
        $admin = User::factory()->admin()->create();
        Category::factory()->count(3)->create();

        $response = $this->actingAs($admin)->get('/admin/categories');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Categories/Index')
            ->has('categories.data', 3)
        );
    }

    public function test_admin_can_store_category(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->post('/admin/categories', [
            'name' => 'Ekspedisi Alam',
            'type' => 'event',
            'color' => '#8b5cf6',
        ]);

        $response->assertRedirect('/admin/categories');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('categories', [
            'name' => 'Ekspedisi Alam',
            'slug' => 'ekspedisi-alam',
            'type' => 'event',
        ]);
    }

    public function test_admin_can_update_category(): void
    {
        $admin = User::factory()->admin()->create();
        $category = Category::factory()->create(['name' => 'Kategori Lama']);

        $response = $this->actingAs($admin)->put("/admin/categories/{$category->id}", [
            'name' => 'Kategori Baru',
            'type' => 'post',
        ]);

        $response->assertRedirect('/admin/categories');
        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'name' => 'Kategori Baru',
        ]);
    }

    public function test_admin_can_delete_category(): void
    {
        $admin = User::factory()->admin()->create();
        $category = Category::factory()->create();

        $response = $this->actingAs($admin)->delete("/admin/categories/{$category->id}");

        $response->assertRedirect('/admin/categories');
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }
}
