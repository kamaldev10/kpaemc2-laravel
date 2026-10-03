<?php

namespace Tests\Feature\Admin;

use App\Models\Category;
use App\Models\Division;
use App\Models\Event;
use App\Models\Registration;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class EventCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_to_login_when_accessing_admin_events(): void
    {
        $response = $this->get('/admin/events');

        $response->assertRedirect('/login');
    }

    public function test_editor_cannot_access_admin_events(): void
    {
        $editor = User::factory()->editor()->create();

        $response = $this->actingAs($editor)->get('/admin/events');

        $response->assertStatus(403);
    }

    public function test_admin_can_view_events_index(): void
    {
        $admin = User::factory()->admin()->create();
        Event::factory()->count(3)->create();

        $response = $this->actingAs($admin)->get('/admin/events');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Events/Index')
            ->has('events.data', 3)
            ->has('categories')
            ->has('divisions')
            ->has('metrics')
        );
    }

    public function test_admin_can_view_create_event_page(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->get('/admin/events/create');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Events/Create')
            ->has('categories')
            ->has('divisions')
        );
    }

    public function test_admin_can_store_a_valid_event(): void
    {
        $admin = User::factory()->admin()->create();
        $category = Category::factory()->create(['type' => 'event']);
        $division = Division::factory()->create();

        $eventData = [
            'title' => 'Ekspedisi Rimba Riau 2026',
            'type' => 'ekspedisi',
            'category_id' => $category->id,
            'division_id' => $division->id,
            'location' => 'Taman Nasional Bukit Tiga Puluh',
            'start_date' => now()->addDays(14)->toDateTimeString(),
            'end_date' => now()->addDays(18)->toDateTimeString(),
            'registration_open_at' => now()->toDateTimeString(),
            'registration_close_at' => now()->addDays(10)->toDateTimeString(),
            'max_participants' => 30,
            'requires_payment' => true,
            'payment_amount' => 150000,
            'description' => 'Eksplorasi keanekaragaman hayati dan pemetaan jalur konservasi.',
            'tags' => ['ekspedisi', 'konservasi', 'tnbt'],
            'is_published' => true,
        ];

        $response = $this->actingAs($admin)->post('/admin/events', $eventData);

        $response->assertRedirect('/admin/events');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('events', [
            'title' => 'Ekspedisi Rimba Riau 2026',
            'category_id' => $category->id,
            'division_id' => $division->id,
            'requires_payment' => true,
            'created_by' => $admin->id,
        ]);
    }

    public function test_store_event_validation_fails_on_missing_required_fields(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->post('/admin/events', [
            'title' => '',
            'type' => '',
            'start_date' => '',
        ]);

        $response->assertSessionHasErrors(['title', 'type', 'start_date']);
    }

    public function test_admin_can_view_edit_page(): void
    {
        $admin = User::factory()->admin()->create();
        $event = Event::factory()->create();

        $response = $this->actingAs($admin)->get("/admin/events/{$event->id}/edit");

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Events/Edit')
            ->has('event')
            ->where('event.id', $event->id)
            ->has('categories')
            ->has('divisions')
        );
    }

    public function test_admin_can_update_an_event(): void
    {
        $admin = User::factory()->admin()->create();
        $event = Event::factory()->create(['title' => 'Judul Sebelum Update']);

        $updateData = [
            'title' => 'Judul Setelah Update Berhasil',
            'type' => 'seminar',
            'start_date' => now()->addDays(5)->toDateTimeString(),
            'location' => 'Auditorium FMIPA',
            'is_published' => true,
        ];

        $response = $this->actingAs($admin)->put("/admin/events/{$event->id}", $updateData);

        $response->assertRedirect('/admin/events');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'title' => 'Judul Setelah Update Berhasil',
            'location' => 'Auditorium FMIPA',
        ]);
    }

    public function test_admin_can_delete_an_event(): void
    {
        $admin = User::factory()->admin()->create();
        $event = Event::factory()->create();

        $response = $this->actingAs($admin)->delete("/admin/events/{$event->id}");

        $response->assertRedirect('/admin/events');
        $response->assertSessionHas('success');

        $this->assertDatabaseMissing('events', ['id' => $event->id]);
    }

    public function test_admin_can_view_event_registrations_page(): void
    {
        $admin = User::factory()->admin()->create();
        $event = Event::factory()->create();

        Registration::create([
            'event_id' => $event->id,
            'registration_code' => 'REG-101',
            'full_name' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'phone' => '0812345678',
            'status' => 'pending',
            'is_active' => true,
        ]);

        $response = $this->actingAs($admin)->get("/admin/events/{$event->id}/registrations");

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Events/Registrations')
            ->has('event')
            ->has('registrations.data', 1)
        );
    }

    public function test_admin_can_update_registration_status(): void
    {
        $admin = User::factory()->admin()->create();
        $event = Event::factory()->create();

        $registration = Registration::create([
            'event_id' => $event->id,
            'registration_code' => 'REG-202',
            'full_name' => 'Cynthia Dewi',
            'email' => 'cynthia@example.com',
            'phone' => '0822222222',
            'status' => 'pending',
            'is_active' => true,
        ]);

        $response = $this->actingAs($admin)->patch(
            "/admin/events/{$event->id}/registrations/{$registration->id}",
            [
                'status' => 'verified',
                'reviewer_notes' => 'Dokumen lengkap & pembayaran terkonfirmasi',
            ]
        );

        $response->assertRedirect();
        $this->assertDatabaseHas('registrations', [
            'id' => $registration->id,
            'status' => 'verified',
            'reviewer_notes' => 'Dokumen lengkap & pembayaran terkonfirmasi',
        ]);
    }

    public function test_admin_can_export_registrations_csv(): void
    {
        $admin = User::factory()->admin()->create();
        $event = Event::factory()->create();

        Registration::create([
            'event_id' => $event->id,
            'registration_code' => 'REG-303',
            'full_name' => 'Dimas Arya',
            'email' => 'dimas@example.com',
            'phone' => '0833333333',
            'institution' => 'UNRI',
            'status' => 'verified',
            'is_active' => true,
        ]);

        $response = $this->actingAs($admin)->get("/admin/events/{$event->id}/registrations/export");

        $response->assertOk();
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
    }

    public function test_event_policy_allows_admin_to_manage_and_disallows_editor(): void
    {
        $admin = User::factory()->admin()->create();
        $editor = User::factory()->editor()->create();
        $event = Event::factory()->create();

        $this->assertTrue($admin->can('create', Event::class));
        $this->assertTrue($admin->can('update', $event));
        $this->assertTrue($admin->can('delete', $event));
        $this->assertTrue($admin->can('manageRegistrations', $event));

        $this->assertFalse($editor->can('create', Event::class));
        $this->assertFalse($editor->can('update', $event));
        $this->assertFalse($editor->can('delete', $event));
        $this->assertFalse($editor->can('manageRegistrations', $event));
    }
}
