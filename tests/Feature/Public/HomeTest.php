<?php

namespace Tests\Feature\Public;

use App\Models\AboutInfo;
use App\Models\Division;
use App\Models\Event;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomeTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_can_be_rendered_successfully(): void
    {
        $about = AboutInfo::factory()->create([
            'org_name' => 'KPA EMC²',
            'is_active' => true,
        ]);

        $division = Division::factory()->create(['is_active' => true]);
        $post = Post::factory()->create(['is_published' => true, 'is_active' => true]);
        $event = Event::factory()->create(['is_published' => true, 'is_active' => true]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Home')
            ->has('aboutInfo')
            ->has('divisions')
            ->has('latestPosts')
            ->has('upcomingEvents')
            ->has('siteSettings')
        );
    }
}
