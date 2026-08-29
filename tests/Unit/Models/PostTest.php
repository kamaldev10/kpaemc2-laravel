<?php

namespace Tests\Unit\Models;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public function test_post_scope_published_filters_only_published_and_active_posts(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $publishedPost = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'is_published' => true,
            'is_active' => true,
        ]);

        $draftPost = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'is_published' => false,
            'is_active' => true,
        ]);

        $inactivePost = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'is_published' => true,
            'is_active' => false,
        ]);

        $publishedResults = Post::published()->get();

        $this->assertTrue($publishedResults->contains($publishedPost));
        $this->assertFalse($publishedResults->contains($draftPost));
        $this->assertFalse($publishedResults->contains($inactivePost));
    }

    public function test_post_scope_search_matches_title_and_excerpt(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $matchingPost = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'Ekspedisi Khusus Gunung Djadi',
            'excerpt' => 'Catatan penjelajahan rimba',
            'tags' => ['ekspedisi', 'gunung'],
            'is_published' => true,
            'is_active' => true,
        ]);

        $otherPost = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'Pelatihan Navigasi Darat',
            'excerpt' => 'Materi kompas bidik dan peta',
            'tags' => ['navigasi', 'kompas'],
            'is_published' => true,
            'is_active' => true,
        ]);

        $searchResults = Post::search('Ekspedisi')->get();

        $this->assertTrue($searchResults->contains($matchingPost));
        $this->assertFalse($searchResults->contains($otherPost));
    }
}
