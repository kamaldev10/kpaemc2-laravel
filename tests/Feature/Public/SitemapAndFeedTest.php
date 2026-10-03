<?php

namespace Tests\Feature\Public;

use App\Models\Event;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SitemapAndFeedTest extends TestCase
{
    use RefreshDatabase;

    public function test_sitemap_xml_returns_valid_xml(): void
    {
        Post::factory()->create([
            'title' => 'Ekspedisi Bukit Raya',
            'slug' => 'ekspedisi-bukit-raya',
            'is_published' => true,
            'is_active' => true,
        ]);

        Event::factory()->create([
            'title' => 'Latihan Dasar SAR',
            'slug' => 'latihan-dasar-sar',
            'is_active' => true,
        ]);

        $response = $this->get('/sitemap.xml');

        $response->assertOk();
        $response->assertHeader('Content-Type', 'application/xml; charset=utf-8');
        $this->assertStringContainsString('<loc>', $response->getContent());
        $this->assertStringContainsString('ekspedisi-bukit-raya', $response->getContent());
        $this->assertStringContainsString('latihan-dasar-sar', $response->getContent());
    }

    public function test_rss_feed_returns_valid_feed(): void
    {
        Post::factory()->create([
            'title' => 'Penanaman Mangrove 2026',
            'slug' => 'penanaman-mangrove-2026',
            'is_published' => true,
            'is_active' => true,
        ]);

        $response = $this->get('/feed.xml');

        $response->assertOk();
        $this->assertStringContainsString('Penanaman Mangrove 2026', $response->getContent());
        $this->assertStringContainsString('<rss version="2.0"', $response->getContent());
    }

    public function test_public_gallery_page_is_accessible(): void
    {
        $response = $this->get('/gallery');
        $response->assertOk();
    }
}
