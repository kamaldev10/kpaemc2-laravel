<?php

namespace Tests\Feature\Admin;

use App\Models\AboutInfo;
use App\Models\SiteSetting;
use App\Models\User;
use App\Services\CloudinaryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Mockery;
use Tests\TestCase;

class SettingCrudTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $cloudinaryMock = Mockery::mock(CloudinaryService::class);
        $cloudinaryMock->shouldReceive('upload')->andReturn([
            'url' => 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
            'secure_url' => 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
            'public_id' => 'sample_id',
            'format' => 'jpg',
        ]);
        $cloudinaryMock->shouldReceive('delete')->andReturn(true);
        $cloudinaryMock->shouldReceive('url')->andReturn('https://res.cloudinary.com/demo/image/upload/sample.jpg');
        $this->app->instance(CloudinaryService::class, $cloudinaryMock);
    }

    public function test_editor_cannot_access_settings(): void
    {
        $editor = User::factory()->editor()->create();

        $response = $this->actingAs($editor)->get(route('admin.settings.index'));
        $response->assertForbidden();
    }

    public function test_admin_can_view_settings(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->get(route('admin.settings.index'));
        $response->assertOk();
    }

    public function test_admin_can_update_settings(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->put(route('admin.settings.update'), [
            'settings' => [
                'site_title' => 'Portal Baru KPA EMC²',
                'contact_email' => 'admin@kpa-emc2.org',
            ],
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('site_settings', [
            'key' => 'site_title',
            'value' => 'Portal Baru KPA EMC²',
        ]);
    }

    public function test_admin_can_update_about_info(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->post(route('admin.settings.about.update'), [
            'org_name' => 'KPA EMC² FMIPA UNRI',
            'founded_date' => '10 Oktober 1984',
            'motto' => 'Lestari Alam Kita',
            'description' => 'Deskripsi organisasi pecinta alam...',
            'vision' => 'Visi organisasi...',
            'mission' => ['Misi 1', 'Misi 2'],
            'active_term' => '2025/2026',
            'logo' => UploadedFile::fake()->image('logo.png'),
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('about_infos', [
            'org_name' => 'KPA EMC² FMIPA UNRI',
            'motto' => 'Lestari Alam Kita',
        ]);
    }
}
