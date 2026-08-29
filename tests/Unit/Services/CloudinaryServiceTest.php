<?php

namespace Tests\Unit\Services;

use App\Services\CloudinaryService;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class CloudinaryServiceTest extends TestCase
{
    protected CloudinaryService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new CloudinaryService();
    }

    public function test_url_generates_correct_delivery_url(): void
    {
        Config::set('services.cloudinary.cloud_name', 'test_cloud');
        $service = new CloudinaryService();

        $url = $service->url('kpa_emc2/sample_photo', 'f_auto,q_auto,w_800');

        $this->assertEquals(
            'https://res.cloudinary.com/test_cloud/image/upload/f_auto,q_auto,w_800/kpa_emc2/sample_photo',
            $url
        );
    }

    public function test_url_generates_default_transformations_when_empty(): void
    {
        Config::set('services.cloudinary.cloud_name', 'test_cloud');
        $service = new CloudinaryService();

        $url = $service->url('sample_image');

        $this->assertEquals(
            'https://res.cloudinary.com/test_cloud/image/upload/f_auto,q_auto/sample_image',
            $url
        );
    }

    public function test_url_accepts_array_of_transformations(): void
    {
        Config::set('services.cloudinary.cloud_name', 'test_cloud');
        $service = new CloudinaryService();

        $url = $service->url('sample_image', ['f_auto', 'q_auto', 'w_400', 'h_300', 'c_fill']);

        $this->assertEquals(
            'https://res.cloudinary.com/test_cloud/image/upload/f_auto,q_auto,w_400,h_300,c_fill/sample_image',
            $url
        );
    }

    public function test_upload_returns_mock_data_when_credentials_not_set(): void
    {
        Config::set('services.cloudinary.cloud_name', '');
        Config::set('services.cloudinary.api_key', '');
        Config::set('services.cloudinary.api_secret', '');

        $service = new CloudinaryService();
        $result = $service->upload('https://example.com/photo.jpg');

        $this->assertArrayHasKey('url', $result);
        $this->assertArrayHasKey('secure_url', $result);
        $this->assertArrayHasKey('public_id', $result);
        $this->assertEquals('jpg', $result['format']);
    }

    public function test_upload_calls_cloudinary_api_when_credentials_set(): void
    {
        Config::set('services.cloudinary.cloud_name', 'my_cloud');
        Config::set('services.cloudinary.api_key', '123456');
        Config::set('services.cloudinary.api_secret', 'secret789');

        Http::fake([
            'https://api.cloudinary.com/v1_1/my_cloud/image/upload' => Http::response([
                'url' => 'http://res.cloudinary.com/my_cloud/image/upload/v1/kpa_emc2/test.jpg',
                'secure_url' => 'https://res.cloudinary.com/my_cloud/image/upload/v1/kpa_emc2/test.jpg',
                'public_id' => 'kpa_emc2/test',
                'format' => 'jpg',
                'width' => 1024,
                'height' => 768,
            ], 200),
        ]);

        $service = new CloudinaryService();
        $result = $service->upload('https://example.com/photo.jpg', 'kpa_emc2', ['outdoor', 'summit']);

        $this->assertEquals('https://res.cloudinary.com/my_cloud/image/upload/v1/kpa_emc2/test.jpg', $result['secure_url']);
        $this->assertEquals('kpa_emc2/test', $result['public_id']);
    }

    public function test_delete_returns_true_when_credentials_empty(): void
    {
        Config::set('services.cloudinary.cloud_name', '');
        $service = new CloudinaryService();

        $this->assertTrue($service->delete('some_public_id'));
    }

    public function test_delete_calls_cloudinary_destroy_api(): void
    {
        Config::set('services.cloudinary.cloud_name', 'my_cloud');
        Config::set('services.cloudinary.api_key', '123456');
        Config::set('services.cloudinary.api_secret', 'secret789');

        Http::fake([
            'https://api.cloudinary.com/v1_1/my_cloud/image/destroy' => Http::response([
                'result' => 'ok',
            ], 200),
        ]);

        $service = new CloudinaryService();
        $deleted = $service->delete('kpa_emc2/test_delete');

        $this->assertTrue($deleted);
    }
}
