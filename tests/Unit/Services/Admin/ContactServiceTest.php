<?php

namespace Tests\Unit\Services\Admin;

use App\Models\Contact;
use App\Models\User;
use App\Services\Admin\ContactService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactServiceTest extends TestCase
{
    use RefreshDatabase;

    protected ContactService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new ContactService();
    }

    public function test_get_paginated_contacts_and_unread_count(): void
    {
        Contact::factory()->count(3)->create(['is_read' => false]);
        Contact::factory()->count(2)->create(['is_read' => true]);

        $paginated = $this->service->getPaginatedContacts();
        $this->assertEquals(5, $paginated->total());

        $unreadCount = $this->service->getUnreadCount();
        $this->assertEquals(3, $unreadCount);

        $unreadOnly = $this->service->getPaginatedContacts(null, 'unread');
        $this->assertEquals(3, $unreadOnly->total());
    }

    public function test_mark_as_read(): void
    {
        $user = User::factory()->admin()->create();
        $contact = Contact::factory()->create(['is_read' => false]);

        $this->service->markAsRead($contact, $user);

        $this->assertTrue($contact->fresh()->is_read);
    }

    public function test_mark_all_as_read(): void
    {
        $user = User::factory()->admin()->create();
        Contact::factory()->count(4)->create(['is_read' => false]);

        $this->service->markAllAsRead($user);

        $this->assertEquals(0, $this->service->getUnreadCount());
    }

    public function test_delete_contact(): void
    {
        $user = User::factory()->admin()->create();
        $contact = Contact::factory()->create();

        $result = $this->service->deleteContact($contact, $user);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('contacts', ['id' => $contact->id]);
    }
}
