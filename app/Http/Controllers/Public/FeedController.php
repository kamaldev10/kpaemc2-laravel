<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\SiteSetting;
use Illuminate\Http\Response;

class FeedController extends Controller
{
    public function index(): Response
    {
        $siteTitle = SiteSetting::get('site_title', 'Kelompok Pecinta Alam EMC²');
        $siteDescription = SiteSetting::get('site_description', 'Portal resmi KPA EMC² FMIPA UNRI');
        $baseUrl = url('/');

        $posts = Post::where('is_published', true)
            ->where('is_active', true)
            ->orderByDesc('published_at')
            ->limit(30)
            ->get();

        $lastBuildDate = $posts->first()?->published_at?->toRfc2822String() ?? now()->toRfc2822String();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">' . "\n";
        $xml .= "  <channel>\n";
        $xml .= "    <title><![CDATA[{$siteTitle}]]></title>\n";
        $xml .= "    <link>{$baseUrl}</link>\n";
        $xml .= "    <description><![CDATA[{$siteDescription}]]></description>\n";
        $xml .= "    <language>id-ID</language>\n";
        $xml .= "    <lastBuildDate>{$lastBuildDate}</lastBuildDate>\n";
        $xml .= "    <atom:link href=\"{$baseUrl}/feed.xml\" rel=\"self\" type=\"application/rss+xml\" />\n";

        foreach ($posts as $post) {
            $postUrl = "{$baseUrl}/posts/{$post->slug}";
            $pubDate = ($post->published_at ?? $post->created_at)->toRfc2822String();
            $excerpt = htmlspecialchars(strip_tags($post->excerpt ?? substr($post->content ?? '', 0, 200)));

            $xml .= "    <item>\n";
            $xml .= "      <title><![CDATA[{$post->title}]]></title>\n";
            $xml .= "      <link>{$postUrl}</link>\n";
            $xml .= "      <guid isPermaLink=\"true\">{$postUrl}</guid>\n";
            $xml .= "      <pubDate>{$pubDate}</pubDate>\n";
            $xml .= "      <description><![CDATA[{$excerpt}]]></description>\n";
            if ($post->cover_url) {
                $xml .= "      <enclosure url=\"{$post->cover_url}\" type=\"image/jpeg\" />\n";
            }
            $xml .= "    </item>\n";
        }

        $xml .= "  </channel>\n";
        $xml .= '</rss>';

        return response($xml, 200, [
            'Content-Type' => 'application/rss+xml; charset=utf-8',
        ]);
    }
}
