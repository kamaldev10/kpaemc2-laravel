<?php

namespace Tests\Feature\Public;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public function test_posts_index_page_can_be_rendered_with_paginated_posts(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['type' => 'post', 'is_active' => true]);

        Post::factory()->count(8)->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'is_published' => true,
            'is_active' => true,
        ]);

        $response = $this->get(route('posts.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Posts/Index')
            ->has('posts.data', 6) // per_page is 6
            ->has('categories', 1)
            ->has('filters')
        );
    }

    public function test_posts_index_can_filter_by_search_query(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['type' => 'post', 'is_active' => true]);

        $matchPost = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'Ekspedisi Khusus Puncak Djadi',
            'tags' => ['ekspedisi'],
            'is_published' => true,
            'is_active' => true,
        ]);

        $otherPost = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'Riset Botani Rimbang Baling',
            'tags' => ['riset', 'botani'],
            'is_published' => true,
            'is_active' => true,
        ]);

        $response = $this->get(route('posts.index', ['search' => 'Ekspedisi']));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Posts/Index')
            ->has('posts.data', 1)
            ->where('posts.data.0.title', 'Ekspedisi Khusus Puncak Djadi')
        );
    }

    public function test_post_show_page_can_be_rendered_with_valid_slug(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['type' => 'post', 'is_active' => true]);

        $post = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'Jejak Rimba Sumatra',
            'slug' => 'jejak-rimba-sumatra',
            'is_published' => true,
            'is_active' => true,
        ]);

        $response = $this->get(route('posts.show', 'jejak-rimba-sumatra'));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Posts/Show')
            ->has('post')
            ->where('post.slug', 'jejak-rimba-sumatra')
            ->has('relatedPosts')
        );
    }

    public function test_post_show_returns_404_on_invalid_slug(): void
    {
        $response = $this->get(route('posts.show', 'invalid-slug-404'));

        $response->assertStatus(404);
    }
}
