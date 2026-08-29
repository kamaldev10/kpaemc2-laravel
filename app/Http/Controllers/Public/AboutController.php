<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\AboutInfo;
use App\Models\Division;
use App\Models\Member;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    /**
     * Display the public About Us page (with integrated Divisi & Struktur).
     */
    public function index(): Response
    {
        $aboutInfo = AboutInfo::where('is_active', true)->first();

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'slug',
                'icon_name',
                'short_description',
                'full_description',
                'cover_url',
                'cover_public_id',
                'study_materials',
                'equipment',
                'sort_order',
            ]);

        $featuredMembers = Member::where('is_active', true)
            ->whereNotNull('avatar_url')
            ->where('avatar_url', '!=', '')
            ->orderBy('id')
            ->get([
                'id',
                'name',
                'member_number',
                'major',
                'position',
                'batch_year',
                'status',
                'avatar_url',
            ]);

        $siteSettings = [
            'contact_address' => SiteSetting::get('contact_address', 'Sekretariat KPA EMC², Kampus FMIPA Universitas Riau, Pekanbaru, Riau, Indonesia'),
            'contact_email' => SiteSetting::get('contact_email', 'sekretariat@kpa-emc2.org'),
            'contact_phone' => SiteSetting::get('contact_phone', '+62 812-3456-7890'),
            'social_instagram' => SiteSetting::get('social_instagram', 'https://instagram.com/kpa_emc2'),
        ];

        return Inertia::render('Public/About', [
            'aboutInfo' => $aboutInfo,
            'divisions' => $divisions,
            'featuredMembers' => $featuredMembers,
            'siteSettings' => $siteSettings,
        ]);
    }
}
