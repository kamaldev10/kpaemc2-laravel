<?php

namespace Tests\Feature\Admin;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_editor_cannot_access_contacts_inbox(): void
    {
        $editor = User::factory()->editor()->create();

        $response = $this->actingAs($editor)->get(route('admin.contacts.index'));
        $response->assertForbidden();
    }

    public function test_admin_can_view_contacts_inbox(): void
    {
        $admin = User::factory()->admin()->create();
        Contact::factory()->count(3)->create();

        $response = $this->actingAs($admin)->get(route('admin.contacts.index'));
        $response->assertOk();
    }

    public function test_admin_can_mark_contact_as_read(): void
    {
        $admin = User::factory()->admin()->create();
        $contact = Contact::factory()->create(['is_read' => false]);

        $response = $this->actingAs($admin)->patch(route('admin.contacts.read', $contact));
        $response->assertRedirect();
        $this->assertTrue($contact->fresh()->is_read);
    }

    public function test_admin_can_mark_all_contacts_as_read(): void
    {
        $admin = User::factory()->admin()->create();
        Contact::factory()->count(3)->create(['is_read' => false]);

        $response = $this->actingAs($admin)->post(route('admin.contacts.read-all'));
        $response->assertRedirect();
        $this->assertEquals(0, Contact::where('is_read', false)->count());
    }

    public function test_admin_can_delete_contact(): void
    {
        $admin = User::factory()->admin()->create();
        $contact = Contact::factory()->create();

        $response = $this->actingAs($admin)->delete(route('admin.contacts.destroy', $contact));
        $response->assertRedirect();
        $this->assertDatabaseMissing('contacts', ['id' => $contact->id]);
    }
}
