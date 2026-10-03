<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateAboutInfoRequest;
use App\Http\Requests\Admin\UpdateSiteSettingsRequest;
use App\Models\SiteSetting;
use App\Services\Admin\SettingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function __construct(
        protected SettingService $settingService
    ) {}

    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', SiteSetting::class);

        $settings = $this->settingService->getAllSettings();
        $settingsMap = $this->settingService->getSettingsMap();
        $aboutInfo = $this->settingService->getAboutInfo();

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
            'settingsMap' => $settingsMap,
            'aboutInfo' => $aboutInfo,
        ]);
    }

    public function updateSettings(UpdateSiteSettingsRequest $request): RedirectResponse
    {
        $this->settingService->updateSettings($request->validated('settings'), $request->user());

        return back()->with('success', 'Pengaturan situs berhasil diperbarui.');
    }

    public function updateAboutInfo(UpdateAboutInfoRequest $request): RedirectResponse
    {
        $this->settingService->updateAboutInfo(
            $request->safe()->except(['logo', 'cover']),
            $request->file('logo'),
            $request->file('cover'),
            $request->user()
        );

        return back()->with('success', 'Informasi profil tentang organisasi berhasil diperbarui.');
    }
}
