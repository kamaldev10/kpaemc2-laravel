<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Post;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $baseUrl = url('/');

        $staticPages = [
            ['url' => "{$baseUrl}/", 'priority' => '1.0', 'changefreq' => 'daily', 'lastmod' => now()->toAtomString()],
            ['url' => "{$baseUrl}/about", 'priority' => '0.8', 'changefreq' => 'monthly', 'lastmod' => now()->toAtomString()],
            ['url' => "{$baseUrl}/posts", 'priority' => '0.9', 'changefreq' => 'daily', 'lastmod' => now()->toAtomString()],
            ['url' => "{$baseUrl}/events", 'priority' => '0.9', 'changefreq' => 'daily', 'lastmod' => now()->toAtomString()],
            ['url' => "{$baseUrl}/structure", 'priority' => '0.7', 'changefreq' => 'monthly', 'lastmod' => now()->toAtomString()],
            ['url' => "{$baseUrl}/gallery", 'priority' => '0.7', 'changefreq' => 'weekly', 'lastmod' => now()->toAtomString()],
            ['url' => "{$baseUrl}/contact", 'priority' => '0.6', 'changefreq' => 'monthly', 'lastmod' => now()->toAtomString()],
        ];

        $posts = Post::where('is_published', true)
            ->where('is_active', true)
            ->orderByDesc('published_at')
            ->get(['slug', 'updated_at', 'published_at']);

        $events = Event::where('is_active', true)
            ->where('is_published', true)
            ->orderByDesc('start_date')
            ->get(['slug', 'updated_at']);

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($staticPages as $page) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$page['url']}</loc>\n";
            $xml .= "    <lastmod>{$page['lastmod']}</lastmod>\n";
            $xml .= "    <changefreq>{$page['changefreq']}</changefreq>\n";
            $xml .= "    <priority>{$page['priority']}</priority>\n";
            $xml .= "  </url>\n";
        }

        foreach ($posts as $post) {
            $postUrl = "{$baseUrl}/posts/{$post->slug}";
            $lastmod = ($post->updated_at ?? $post->published_at ?? now())->toAtomString();

            $xml .= "  <url>\n";
            $xml .= "    <loc>{$postUrl}</loc>\n";
            $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
            $xml .= "    <changefreq>weekly</changefreq>\n";
            $xml .= "    <priority>0.8</priority>\n";
            $xml .= "  </url>\n";
        }

        foreach ($events as $event) {
            $eventUrl = "{$baseUrl}/events/{$event->slug}";
            $lastmod = ($event->updated_at ?? now())->toAtomString();

            $xml .= "  <url>\n";
            $xml .= "    <loc>{$eventUrl}</loc>\n";
            $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
            $xml .= "    <changefreq>weekly</changefreq>\n";
            $xml .= "    <priority>0.7</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=utf-8',
        ]);
    }
}
