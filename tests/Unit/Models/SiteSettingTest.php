<?php

namespace Tests\Unit\Models;

use App\Models\SiteSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SiteSettingTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_returns_stored_setting_value(): void
    {
        SiteSetting::create([
            'key' => 'org_motto',
            'value' => 'Lestari Alamku',
            'is_public' => true,
            'is_active' => true,
        ]);

        $value = SiteSetting::get('org_motto');

        $this->assertEquals('Lestari Alamku', $value);
    }

    public function test_get_returns_default_value_when_key_does_not_exist(): void
    {
        $value = SiteSetting::get('non_existent_key', 'Default Fallback');

        $this->assertEquals('Default Fallback', $value);
    }

    public function test_get_returns_default_value_when_setting_is_inactive(): void
    {
        SiteSetting::create([
            'key' => 'secret_code',
            'value' => '12345',
            'is_public' => true,
            'is_active' => false,
        ]);

        $value = SiteSetting::get('secret_code', 'fallback');

        $this->assertEquals('fallback', $value);
    }
}
