<?php

namespace Tests\Feature\Public;

use App\Models\AboutInfo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_index_page_can_be_rendered(): void
    {
        AboutInfo::factory()->create(['is_active' => true]);

        $response = $this->get(route('contact.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Contact/Index')
            ->has('aboutInfo')
            ->has('siteSettings')
        );
    }

    public function test_public_user_can_submit_contact_message(): void
    {
        $response = $this->post(route('contact.store'), [
            'name' => 'Ahmad Rabbani',
            'email' => 'rabbani@example.com',
            'subject' => 'Permohonan Kerjasama Ekspedisi',
            'message' => 'Halo KPA EMC2, kami dari komunitas pecinta alam ingin mengajak kolaborasi riset karst.',
        ]);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('contacts', [
            'name' => 'Ahmad Rabbani',
            'email' => 'rabbani@example.com',
            'subject' => 'Permohonan Kerjasama Ekspedisi',
        ]);
    }
}
