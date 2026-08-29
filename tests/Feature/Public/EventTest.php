<?php

namespace Tests\Feature\Public;

use App\Models\Category;
use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class EventTest extends TestCase
{
    use RefreshDatabase;

    public function test_events_index_page_can_be_rendered(): void
    {
        $category = Category::factory()->create(['type' => 'event', 'is_active' => true]);

        Event::factory()->count(4)->create([
            'category_id' => $category->id,
            'is_published' => true,
            'is_active' => true,
        ]);

        $response = $this->get(route('events.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Events/Index')
            ->has('events.data', 4)
            ->has('filters')
        );
    }

    public function test_events_show_page_can_be_rendered(): void
    {
        $category = Category::factory()->create(['type' => 'event', 'is_active' => true]);

        $event = Event::factory()->create([
            'category_id' => $category->id,
            'title' => 'Sekolah Lingkungan Nasional',
            'slug' => 'sekolah-lingkungan-nasional',
            'is_published' => true,
            'is_active' => true,
        ]);

        $response = $this->get(route('events.show', 'sekolah-lingkungan-nasional'));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Events/Show')
            ->has('event')
            ->where('event.slug', 'sekolah-lingkungan-nasional')
            ->has('relatedEvents')
        );
    }

    public function test_participant_can_register_for_an_open_event(): void
    {
        $event = Event::factory()->create([
            'slug' => 'open-diksar-test',
            'is_published' => true,
            'is_active' => true,
            'registration_open_at' => now()->subDay(),
            'registration_close_at' => now()->addDays(5),
        ]);

        $response = $this->post(route('events.register', 'open-diksar-test'), [
            'full_name' => 'Fulan bin Fulan',
            'email' => 'fulan@example.com',
            'phone' => '081234567890',
            'gender' => 'male',
            'institution' => 'FMIPA UNRI',
            'motivation' => 'Ingin belajar survival dan konservasi alam.',
        ]);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('registrations', [
            'event_id' => $event->id,
            'full_name' => 'Fulan bin Fulan',
            'email' => 'fulan@example.com',
        ]);
    }
}
