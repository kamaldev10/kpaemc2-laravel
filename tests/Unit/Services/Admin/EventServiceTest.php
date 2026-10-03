<?php

namespace Tests\Unit\Services\Admin;

use App\Models\Category;
use App\Models\Division;
use App\Models\Event;
use App\Models\Registration;
use App\Models\User;
use App\Services\Admin\EventService;
use App\Services\CloudinaryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class EventServiceTest extends TestCase
{
    use RefreshDatabase;

    protected EventService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $cloudinary = app(CloudinaryService::class);
        $this->service = new EventService($cloudinary);
    }

    public function test_paginate_returns_paginated_events_with_relations_and_counts(): void
    {
        $category = Category::factory()->create(['type' => 'event']);
        $division = Division::factory()->create();

        Event::factory()->count(3)->create([
            'category_id' => $category->id,
            'division_id' => $division->id,
        ]);

        $paginator = $this->service->paginate([], 2);

        $this->assertEquals(2, $paginator->count());
        $this->assertEquals(3, $paginator->total());
        $this->assertTrue($paginator->first()->relationLoaded('category'));
        $this->assertTrue($paginator->first()->relationLoaded('division'));
    }

    public function test_paginate_filters_by_search_term(): void
    {
        Event::factory()->create([
            'title' => 'Diksar Angkatan XXXII',
            'location' => 'Gunung Marapi',
        ]);
        Event::factory()->create([
            'title' => 'Seminar Konservasi Mangrove',
            'location' => 'Dumai',
        ]);

        $resultTitle = $this->service->paginate(['search' => 'Diksar']);
        $resultLocation = $this->service->paginate(['search' => 'Dumai']);

        $this->assertEquals(1, $resultTitle->total());
        $this->assertEquals('Diksar Angkatan XXXII', $resultTitle->first()->title);

        $this->assertEquals(1, $resultLocation->total());
        $this->assertEquals('Seminar Konservasi Mangrove', $resultLocation->first()->title);
    }

    public function test_paginate_filters_by_category_and_division(): void
    {
        $cat1 = Category::factory()->create(['type' => 'event']);
        $cat2 = Category::factory()->create(['type' => 'event']);
        $div1 = Division::factory()->create();

        Event::factory()->create(['category_id' => $cat1->id, 'division_id' => $div1->id]);
        Event::factory()->create(['category_id' => $cat2->id]);

        $result = $this->service->paginate(['category_id' => $cat1->id, 'division_id' => $div1->id]);

        $this->assertEquals(1, $result->total());
        $this->assertEquals($cat1->id, $result->first()->category_id);
    }

    public function test_paginate_filters_by_status(): void
    {
        Event::factory()->create([
            'start_date' => now()->addDays(10),
            'end_date' => now()->addDays(12),
            'is_published' => true,
        ]);
        Event::factory()->create([
            'start_date' => now()->subDays(20),
            'end_date' => now()->subDays(18),
            'is_published' => true,
        ]);

        $upcoming = $this->service->paginate(['status' => 'upcoming']);
        $past = $this->service->paginate(['status' => 'past']);

        $this->assertEquals(1, $upcoming->total());
        $this->assertEquals(1, $past->total());
    }

    public function test_create_event_generates_unique_slug_and_assigns_audit(): void
    {
        $actor = User::factory()->create();
        $category = Category::factory()->create(['type' => 'event']);

        $event = $this->service->create([
            'title' => 'Pelatihan Navigasi Darat',
            'type' => 'workshop',
            'category_id' => $category->id,
            'start_date' => now()->addDays(7)->toDateTimeString(),
            'requires_payment' => false,
            'is_published' => true,
        ], null, $actor);

        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'title' => 'Pelatihan Navigasi Darat',
            'slug' => 'pelatihan-navigasi-darat',
            'created_by' => $actor->id,
            'updated_by' => $actor->id,
        ]);
    }

    public function test_update_event_modifies_record(): void
    {
        $actor = User::factory()->create();
        $event = Event::factory()->create(['title' => 'Judul Awal']);

        $updated = $this->service->update($event, [
            'title' => 'Judul Baru Diubah',
            'location' => 'Lokasi Baru',
        ], null, $actor);

        $this->assertEquals('Judul Baru Diubah', $updated->title);
        $this->assertEquals('Lokasi Baru', $updated->location);
        $this->assertEquals($actor->id, $updated->updated_by);
    }

    public function test_delete_event(): void
    {
        $event = Event::factory()->create();

        $result = $this->service->delete($event);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('events', ['id' => $event->id]);
    }

    public function test_get_registrations_filters_by_search_and_status(): void
    {
        $event = Event::factory()->create();

        Registration::create([
            'event_id' => $event->id,
            'registration_code' => 'REG-001',
            'full_name' => 'Ahmad Dahlan',
            'email' => 'ahmad@example.com',
            'phone' => '0811111111',
            'status' => 'pending',
            'is_active' => true,
        ]);

        Registration::create([
            'event_id' => $event->id,
            'registration_code' => 'REG-002',
            'full_name' => 'Siti Nurhaliza',
            'email' => 'siti@example.com',
            'phone' => '0822222222',
            'status' => 'verified',
            'is_active' => true,
        ]);

        $searchResult = $this->service->getRegistrations($event, ['search' => 'Dahlan']);
        $statusResult = $this->service->getRegistrations($event, ['status' => 'verified']);

        $this->assertEquals(1, $searchResult->total());
        $this->assertEquals('Ahmad Dahlan', $searchResult->first()->full_name);

        $this->assertEquals(1, $statusResult->total());
        $this->assertEquals('Siti Nurhaliza', $statusResult->first()->full_name);
    }

    public function test_update_registration_status(): void
    {
        $admin = User::factory()->admin()->create();
        $this->actingAs($admin);

        $event = Event::factory()->create();
        $registration = Registration::create([
            'event_id' => $event->id,
            'registration_code' => 'REG-999',
            'full_name' => 'Peserta Test',
            'email' => 'peserta@example.com',
            'phone' => '0833333333',
            'status' => 'pending',
            'is_active' => true,
        ]);

        $updated = $this->service->updateRegistrationStatus(
            $registration,
            'verified',
            'Pembayaran lunas terkonfirmasi'
        );

        $this->assertEquals('verified', $updated->status);
        $this->assertEquals('Pembayaran lunas terkonfirmasi', $updated->reviewer_notes);
        $this->assertEquals($admin->id, $updated->updated_by);
    }

    public function test_cache_invalidation_clears_keys(): void
    {
        Cache::put('public_events_upcoming', 'cached_events', 3600);
        Cache::put('events_list', 'cached_list', 3600);

        $this->service->invalidateCache();

        $this->assertNull(Cache::get('public_events_upcoming'));
        $this->assertNull(Cache::get('events_list'));
    }
}
