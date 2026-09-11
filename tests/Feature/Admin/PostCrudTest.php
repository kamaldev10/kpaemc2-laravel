<?php

namespace Tests\Feature\Admin;

use App\Enums\RoleTypeEnum;
use App\Models\Category;
use App\Models\Division;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PostCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_to_login_when_accessing_admin_posts(): void
    {
        $response = $this->get('/admin/posts');

        $response->assertRedirect('/login');
    }

    public function test_editor_cannot_access_admin_posts(): void
    {
        $editor = User::factory()->editor()->create();

        $response = $this->actingAs($editor)->get('/admin/posts');

        $response->assertStatus(403);
    }

    public function test_admin_can_view_posts_index(): void
    {
        $admin = User::factory()->admin()->create();
        $category = Category::factory()->create(['type' => 'post']);

        Post::factory()->count(3)->create([
            'category_id' => $category->id,
            'user_id' => $admin->id,
        ]);

        $response = $this->actingAs($admin)->get('/admin/posts');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Posts/Index')
            ->has('posts.data', 3)
            ->has('categories')
            ->has('divisions')
            ->has('metrics')
        );
    }

    public function test_admin_can_view_create_post_page(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->get('/admin/posts/create');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Posts/Create')
            ->has('categories')
            ->has('divisions')
        );
    }

    public function test_admin_can_store_a_valid_post(): void
    {
        $admin = User::factory()->admin()->create();
        $category = Category::factory()->create(['type' => 'post']);
        $division = Division::factory()->create();

        $postData = [
            'title' => 'Eksplorasi Hutan Adat Kampar',
            'slug' => 'eksplorasi-hutan-adat-kampar',
            'excerpt' => 'Catatan ekspedisi singkat.',
            'content' => 'Konten lengkap eksplorasi hutan adat Kampar.',
            'category_id' => $category->id,
            'division_id' => $division->id,
            'author_name' => 'Tim Ekspedisi',
            'tags' => ['ekspedisi', 'konservasi'],
            'is_published' => true,
            'is_featured' => true,
        ];

        $response = $this->actingAs($admin)->post('/admin/posts', $postData);

        $response->assertRedirect('/admin/posts');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('posts', [
            'title' => 'Eksplorasi Hutan Adat Kampar',
            'slug' => 'eksplorasi-hutan-adat-kampar',
            'category_id' => $category->id,
            'division_id' => $division->id,
            'user_id' => $admin->id,
            'is_published' => true,
            'is_featured' => true,
        ]);
    }

    public function test_store_post_validation_fails_on_missing_required_fields(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->post('/admin/posts', [
            'title' => '',
            'content' => '',
        ]);

        $response->assertSessionHasErrors(['title', 'content']);
    }

    public function test_admin_can_view_edit_page(): void
    {
        $admin = User::factory()->admin()->create();
        $post = Post::factory()->create(['user_id' => $admin->id]);

        $response = $this->actingAs($admin)->get("/admin/posts/{$post->id}/edit");

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Posts/Edit')
            ->has('post')
            ->where('post.id', $post->id)
            ->has('categories')
            ->has('divisions')
        );
    }

    public function test_admin_can_update_a_post(): void
    {
        $admin = User::factory()->admin()->create();
        $post = Post::factory()->create(['user_id' => $admin->id]);

        $updateData = [
            'title' => 'Judul Setelah Diperbarui',
            'slug' => 'judul-setelah-diperbarui',
            'excerpt' => 'Ringkasan diperbarui',
            'content' => 'Konten setelah diedit secara komprehensif.',
            'is_published' => true,
        ];

        $response = $this->actingAs($admin)->put("/admin/posts/{$post->id}", $updateData);

        $response->assertRedirect('/admin/posts');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'title' => 'Judul Setelah Diperbarui',
            'slug' => 'judul-setelah-diperbarui',
        ]);
    }

    public function test_admin_can_delete_a_post(): void
    {
        $admin = User::factory()->admin()->create();
        $post = Post::factory()->create(['user_id' => $admin->id]);

        $response = $this->actingAs($admin)->delete("/admin/posts/{$post->id}");

        $response->assertRedirect('/admin/posts');
        $response->assertSessionHas('success');

        $this->assertSoftDeleted('posts', ['id' => $post->id]);
    }

    public function test_super_admin_can_manage_any_post(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();
        $otherUser = User::factory()->admin()->create();
        $post = Post::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->actingAs($superAdmin)->delete("/admin/posts/{$post->id}");

        $response->assertRedirect('/admin/posts');
        $this->assertSoftDeleted('posts', ['id' => $post->id]);
    }

    public function test_articles_route_alias_redirects_to_posts(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->get('/admin/articles');

        $response->assertRedirect('/admin/posts');
    }

    public function test_post_policy_allows_editor_to_update_own_post_only(): void
    {
        $editor = User::factory()->editor()->create();
        $otherUser = User::factory()->create();

        $ownPost = Post::factory()->create(['user_id' => $editor->id]);
        $otherPost = Post::factory()->create(['user_id' => $otherUser->id]);

        $this->assertTrue($editor->can('update', $ownPost));
        $this->assertFalse($editor->can('update', $otherPost));
    }
}
