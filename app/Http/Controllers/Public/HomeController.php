<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Division;
use App\Models\Event;
use App\Models\Post;
use App\Services\Admin\SettingService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        protected SettingService $settingService
    ) {}

    /**
     * Display the public homepage.
     */
    public function index(): Response
    {
        $aboutInfo = $this->settingService->getAboutInfo();
        $settingsMap = $this->settingService->getSettingsMap();

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'short_description', 'icon_name', 'cover_url', 'cover_public_id']);

        $latestPosts = Post::with(['category:id,name,slug,color', 'division:id,name,slug'])
            ->published()
            ->latest('published_at')
            ->take(3)
            ->get(['id', 'title', 'slug', 'excerpt', 'cover_image_url', 'category_id', 'division_id', 'author_name', 'published_at', 'is_featured', 'tags']);

        $upcomingEvents = Event::with(['category:id,name,slug,color', 'division:id,name,slug,icon_name'])
            ->where('is_active', true)
            ->where('is_published', true)
            ->where(function ($query) {
                $query->where('start_date', '>=', now())
                    ->orWhereNull('start_date');
            })
            ->orderBy('start_date')
            ->take(2)
            ->get(['id', 'title', 'slug', 'description', 'cover_url', 'location', 'start_date', 'end_date', 'category_id', 'division_id', 'is_published', 'is_active', 'registration_close_at']);

        $siteSettings = [
            'stats_years_active' => $settingsMap['stats_years_active'] ?? '15',
            'stats_members_count' => $settingsMap['stats_members_count'] ?? '140+',
            'stats_expeditions_count' => $settingsMap['stats_expeditions_count'] ?? '52',
            'stats_summits_count' => $settingsMap['stats_summits_count'] ?? '86',
            'organization_tagline' => $settingsMap['organization_tagline'] ?? 'Bergerak Satu Asa, Berbekal Alam Lestari',
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
