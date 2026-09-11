<?php

namespace Tests\Unit\Services\Admin;

use App\Models\Category;
use App\Models\Division;
use App\Models\Post;
use App\Models\User;
use App\Services\Admin\PostService;
use App\Services\CloudinaryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class PostServiceTest extends TestCase
{
    use RefreshDatabase;

    protected PostService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $cloudinary = app(CloudinaryService::class);
        $this->service = new PostService($cloudinary);
    }

    public function test_paginate_returns_paginated_posts_with_relations(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['type' => 'post']);
        $division = Division::factory()->create();

        Post::factory()->count(5)->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'division_id' => $division->id,
        ]);

        $paginator = $this->service->paginate([], 3);

        $this->assertEquals(3, $paginator->count());
        $this->assertEquals(5, $paginator->total());
        $this->assertTrue($paginator->first()->relationLoaded('category'));
        $this->assertTrue($paginator->first()->relationLoaded('division'));
    }

    public function test_paginate_filters_by_search_term(): void
    {
        $user = User::factory()->create();
        Post::factory()->create([
            'user_id' => $user->id,
            'title' => 'Ekspedisi Merapi Singgalang',
            'excerpt' => 'Catatan perjalanan',
        ]);
        Post::factory()->create([
            'user_id' => $user->id,
            'title' => 'Latihan Navigasi Darat',
            'excerpt' => 'Materi orienteering',
        ]);

        $result = $this->service->paginate(['search' => 'Merapi']);

        $this->assertEquals(1, $result->total());
        $this->assertEquals('Ekspedisi Merapi Singgalang', $result->first()->title);
    }

    public function test_paginate_filters_by_status(): void
    {
        $user = User::factory()->create();
        Post::factory()->create([
            'user_id' => $user->id,
            'is_published' => true,
            'is_active' => true,
        ]);
        Post::factory()->create([
            'user_id' => $user->id,
            'is_published' => false,
            'is_active' => true,
        ]);

        $published = $this->service->paginate(['status' => 'published']);
        $drafts = $this->service->paginate(['status' => 'draft']);

        $this->assertEquals(1, $published->total());
        $this->assertEquals(1, $drafts->total());
    }

    public function test_create_generates_unique_slug_and_assigns_user(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['type' => 'post']);

        $post = $this->service->create([
            'title' => 'Menjelajah Rimba Sumatera',
            'excerpt' => 'Sebuah ringkasan ekspedisi.',
            'content' => 'Isi lengkap laporan ekspedisi.',
            'category_id' => $category->id,
            'is_published' => true,
            'tags' => ['ekspedisi', 'rimba'],
        ], null, $user);

        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'title' => 'Menjelajah Rimba Sumatera',
            'slug' => 'menjelajah-rimba-sumatera',
            'user_id' => $user->id,
            'created_by' => $user->id,
        ]);

        $this->assertEquals(['ekspedisi', 'rimba'], $post->tags);
    }

    public function test_create_handles_slug_collisions(): void
    {
        $user = User::factory()->create();

        $post1 = $this->service->create([
            'title' => 'Konservasi Mangrove',
            'content' => 'Konten pertama',
        ], null, $user);

        $post2 = $this->service->create([
            'title' => 'Konservasi Mangrove',
            'content' => 'Konten kedua',
        ], null, $user);

        $this->assertEquals('konservasi-mangrove', $post1->slug);
        $this->assertEquals('konservasi-mangrove-1', $post2->slug);
    }

    public function test_update_modifies_post_and_updates_audit_column(): void
    {
        $user = User::factory()->create();
        $editor = User::factory()->create();

        $post = $this->service->create([
            'title' => 'Judul Awal',
            'content' => 'Konten awal',
        ], null, $user);

        $updated = $this->service->update($post, [
            'title' => 'Judul Baru yang Diperbarui',
            'content' => 'Konten diperbarui',
            'is_published' => true,
        ], null, $editor);

        $this->assertEquals('Judul Baru yang Diperbarui', $updated->title);
        $this->assertEquals('judul-baru-yang-diperbarui', $updated->slug);
        $this->assertEquals($editor->id, $updated->updated_by);
    }

    public function test_delete_soft_deletes_post(): void
    {
        $user = User::factory()->create();
        $post = $this->service->create([
            'title' => 'Artikel Akan Dihapus',
            'content' => 'Konten hapus',
        ], null, $user);

        $result = $this->service->delete($post);

        $this->assertTrue($result);
        $this->assertSoftDeleted('posts', ['id' => $post->id]);
    }

    public function test_cache_invalidation_clears_keys(): void
    {
        Cache::put('home_posts', 'cached_data', 3600);
        Cache::put('latest_posts', 'cached_data', 3600);

        $this->service->invalidateCache();

        $this->assertNull(Cache::get('home_posts'));
        $this->assertNull(Cache::get('latest_posts'));
    }
}
