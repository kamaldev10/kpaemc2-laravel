<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\AboutInfo;
use App\Models\Division;
use App\Models\Event;
use App\Models\Post;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the public homepage.
     */
    public function index(): Response
    {
        $aboutInfo = AboutInfo::where('is_active', true)->first();

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'short_description', 'icon_name', 'cover_url', 'cover_public_id']);

        $latestPosts = Post::with('category')
            ->published()
            ->latest('published_at')
            ->take(3)
            ->get();

        $upcomingEvents = Event::with('category')
            ->where('is_active', true)
            ->where('is_published', true)
            ->where(function ($query) {
                $query->where('start_date', '>=', now())
                    ->orWhereNull('start_date');
            })
            ->orderBy('start_date')
            ->take(2)
            ->get();

        $siteSettings = [
            'stats_years_active' => SiteSetting::get('stats_years_active', '15'),
            'stats_members_count' => SiteSetting::get('stats_members_count', '140+'),
            'stats_expeditions_count' => SiteSetting::get('stats_expeditions_count', '52'),
            'stats_summits_count' => SiteSetting::get('stats_summits_count', '86'),
            'organization_tagline' => SiteSetting::get('organization_tagline', 'Bergerak Satu Asa, Berbekal Alam Lestari'),
        ];

        return Inertia::render('Public/Home', [
            'aboutInfo' => $aboutInfo,
            'divisions' => $divisions,
            'latestPosts' => $latestPosts,
            'upcomingEvents' => $upcomingEvents,
            'siteSettings' => $siteSettings,
        ]);
    }
}
