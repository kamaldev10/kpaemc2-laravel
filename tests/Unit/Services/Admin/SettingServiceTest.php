<?php

namespace Tests\Unit\Services\Admin;

use App\Models\AboutInfo;
use App\Models\SiteSetting;
use App\Models\User;
use App\Services\Admin\SettingService;
use App\Services\CloudinaryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Mockery;
use Tests\TestCase;

class SettingServiceTest extends TestCase
{
    use RefreshDatabase;

    protected SettingService $service;
    protected $cloudinaryMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->cloudinaryMock = Mockery::mock(CloudinaryService::class);
        $this->service = new SettingService($this->cloudinaryMock);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_all_settings_and_map(): void
    {
        SiteSetting::create([
            'key' => 'test_site_name',
            'value' => 'KPA EMC2 Test',
            'group' => 'general',
            'is_active' => true,
        ]);

        $settings = $this->service->getAllSettings();
        $this->assertNotEmpty($settings);

        $map = $this->service->getSettingsMap();
        $this->assertEquals('KPA EMC2 Test', $map['test_site_name']);
    }

    public function test_update_settings(): void
    {
        $user = User::factory()->superAdmin()->create();

        $this->service->updateSettings([
            'site_title' => 'Updated Title',
            'contact_email' => 'updated@emc2.org',
            'social_instagram' => 'https://instagram.com/kpa_emc2',
        ], $user);

        $this->assertDatabaseHas('site_settings', [
            'key' => 'site_title',
            'value' => 'Updated Title',
            'group' => 'general',
        ]);

        $this->assertDatabaseHas('site_settings', [
            'key' => 'contact_email',
            'value' => 'updated@emc2.org',
            'group' => 'contact',
        ]);
    }

    public function test_update_about_info(): void
    {
        $user = User::factory()->superAdmin()->create();

        $logoFile = UploadedFile::fake()->image('logo.png');
        $coverFile = UploadedFile::fake()->image('cover.jpg');

        $this->cloudinaryMock->shouldReceive('upload')
            ->twice()
            ->andReturn([
                'url' => 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
                'secure_url' => 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
                'public_id' => 'about-images/sample',
                'format' => 'jpg',
            ]);

        $about = $this->service->updateAboutInfo([
            'org_name' => 'KPA EMC2 FMIPA UNRI',
            'founded_date' => '10 Oktober 1984',
            'motto' => 'Lestari!',
            'description' => 'Organisasi pecinta alam',
            'vision' => 'Visi kami',
            'mission' => ['Misi 1', 'Misi 2'],
            'active_term' => '2025/2026',
        ], $logoFile, $coverFile, $user);

        $this->assertInstanceOf(AboutInfo::class, $about);
        $this->assertDatabaseHas('about_infos', [
            'org_name' => 'KPA EMC2 FMIPA UNRI',
            'motto' => 'Lestari!',
        ]);
    }
}
