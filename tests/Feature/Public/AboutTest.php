<?php

namespace Tests\Feature\Public;

use App\Models\AboutInfo;
use App\Models\Division;
use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AboutTest extends TestCase
{
    use RefreshDatabase;

    public function test_about_page_can_be_rendered_successfully(): void
    {
        $about = AboutInfo::factory()->create([
            'org_name' => 'KPA EMC²',
            'is_active' => true,
        ]);

        $division = Division::factory()->create(['is_active' => true]);
        $member = Member::factory()->create([
            'is_active' => true,
            'avatar_url' => 'https://res.cloudinary.com/dh7fjuxue/image/upload/v1/sample.jpg',
        ]);

        $response = $this->get('/about');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/About')
            ->has('aboutInfo')
            ->has('divisions')
            ->has('featuredMembers')
            ->has('siteSettings')
        );
    }
}
