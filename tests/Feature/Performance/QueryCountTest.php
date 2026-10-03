<?php

namespace Tests\Feature\Performance;

use App\Models\AboutInfo;
use App\Models\Category;
use App\Models\Division;
use App\Models\Event;
use App\Models\Gallery;
use App\Models\GalleryItem;
use App\Models\Member;
use App\Models\Post;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class QueryCountTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Seed basic operational data
        AboutInfo::factory()->create(['is_active' => true]);

        SiteSetting::insert([
            ['id' => (string) \Illuminate\Support\Str::uuid(), 'key' => 'organization_name', 'value' => 'KPA EMC²', 'group' => 'general', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => (string) \Illuminate\Support\Str::uuid(), 'key' => 'contact_email', 'value' => 'info@kpa-emc2.org', 'group' => 'contact', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        $divisions = Division::factory()->count(4)->create(['is_active' => true]);
        $categories = Category::factory()->count(3)->create(['is_active' => true, 'type' => 'post']);

        foreach ($divisions as $division) {
            Member::factory()->count(5)->create([
                'division_id' => $division->id,
                'is_active' => true,
                'is_pengurus' => true,
                'batch_year' => 2024,
            ]);

            Post::factory()->count(3)->create([
                'division_id' => $division->id,
                'category_id' => $categories->first()->id,
                'is_published' => true,
                'is_active' => true,
            ]);

            Event::factory()->count(2)->create([
                'division_id' => $division->id,
                'category_id' => $categories->first()->id,
                'is_published' => true,
                'is_active' => true,
                'start_date' => now()->addDays(5),
            ]);

            $gallery = Gallery::factory()->create([
                'division_id' => $division->id,
                'category_id' => $categories->first()->id,
                'is_published' => true,
                'is_active' => true,
            ]);

            GalleryItem::factory()->count(3)->create([
                'gallery_id' => $gallery->id,
                'is_active' => true,
            ]);
        }
    }

    public function test_homepage_query_count_is_optimized(): void
    {
        DB::enableQueryLog();

        $response = $this->get('/');
        $response->assertStatus(200);

        $queries = DB::getQueryLog();
        $this->assertLessThanOrEqual(12, count($queries), 'Homepage executes too many database queries.');
    }

    public function test_posts_index_query_count_is_optimized(): void
    {
        DB::enableQueryLog();

        $response = $this->get('/posts');
        $response->assertStatus(200);

        $queries = DB::getQueryLog();
        $this->assertLessThanOrEqual(10, count($queries), 'Posts index executes too many database queries.');
    }

    public function test_events_index_query_count_is_optimized(): void
    {
        DB::enableQueryLog();

        $response = $this->get('/events');
        $response->assertStatus(200);

        $queries = DB::getQueryLog();
        $this->assertLessThanOrEqual(8, count($queries), 'Events index executes too many database queries.');
    }

    public function test_structure_index_query_count_is_optimized(): void
    {
        DB::enableQueryLog();

        $response = $this->get('/structure');
        $response->assertStatus(200);

        $queries = DB::getQueryLog();
        $this->assertLessThanOrEqual(8, count($queries), 'Structure index executes too many database queries.');
    }

    public function test_gallery_index_query_count_is_optimized(): void
    {
        DB::enableQueryLog();

        $response = $this->get('/gallery');
        $response->assertStatus(200);

        $queries = DB::getQueryLog();
        $this->assertLessThanOrEqual(12, count($queries), 'Gallery index executes too many database queries.');
    }

    public function test_admin_members_index_query_count_is_optimized(): void
    {
        $user = User::factory()->create(['role' => 'admin']);

        DB::enableQueryLog();

        $response = $this->actingAs($user)->get('/admin/members');
        $response->assertStatus(200);

        $queries = DB::getQueryLog();
        $this->assertLessThanOrEqual(12, count($queries), 'Admin members index executes too many database queries.');
    }
}
