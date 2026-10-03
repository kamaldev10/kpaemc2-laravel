<?php

namespace App\Services\Admin;

use App\Models\AboutInfo;
use App\Models\SiteSetting;
use App\Models\User;
use App\Services\CloudinaryService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class SettingService
{
    public const CACHE_KEY_SETTINGS = 'site_settings_all';
    public const CACHE_KEY_ABOUT = 'about_info_active';
    public const CACHE_TTL = 86400; // 24 hours

    public function __construct(
        protected CloudinaryService $cloudinary
    ) {}

    /**
     * Get all active site settings (cached).
     *
     * @return Collection<int, SiteSetting>
     */
    public function getAllSettings(): Collection
    {
        $cached = Cache::get(self::CACHE_KEY_SETTINGS);
        if ($cached instanceof Collection) {
            return $cached;
        }

        Cache::forget(self::CACHE_KEY_SETTINGS);

        $settings = SiteSetting::where('is_active', true)->orderBy('group')->orderBy('key')->get();
        try {
            Cache::put(self::CACHE_KEY_SETTINGS, $settings, self::CACHE_TTL);
        } catch (\Throwable) {
            // ignore cache write error
        }

        return $settings;
    }

    /**
     * Get settings as key => value dictionary.
     *
     * @return array<string, string|null>
     */
    public function getSettingsMap(): array
    {
        return $this->getAllSettings()->pluck('value', 'key')->toArray();
    }

    /**
     * Update or create multiple settings at once.
     *
     * @param  array<string, mixed>  $settingsKeyValues
     * @param  User  $user
     * @return void
     */
    public function updateSettings(array $settingsKeyValues, User $user): void
    {
        DB::transaction(function () use ($settingsKeyValues, $user) {
            foreach ($settingsKeyValues as $key => $value) {
                // Determine group if creating new
                $group = 'general';
                if (str_starts_with($key, 'contact_')) {
                    $group = 'contact';
                } elseif (str_starts_with($key, 'social_')) {
                    $group = 'social';
                } elseif (str_starts_with($key, 'seo_') || str_starts_with($key, 'site_description') || str_starts_with($key, 'google_')) {
                    $group = 'seo';
                }

                $setting = SiteSetting::firstOrNew(['key' => $key]);
                if (! $setting->exists) {
                    $setting->group = $group;
                    $setting->created_by = $user->id;
                }

                $setting->value = is_null($value) ? null : (string) $value;
                $setting->updated_by = $user->id;
                $setting->is_active = true;
                $setting->save();
            }
        });

        Cache::forget(self::CACHE_KEY_SETTINGS);
    }

    /**
     * Get the active AboutInfo (cached).
     */
    public function getAboutInfo(): ?AboutInfo
    {
        $cached = Cache::get(self::CACHE_KEY_ABOUT);
        if ($cached instanceof AboutInfo) {
            return $cached;
        }

        Cache::forget(self::CACHE_KEY_ABOUT);

        $about = AboutInfo::where('is_active', true)->first();
        if ($about) {
            try {
                Cache::put(self::CACHE_KEY_ABOUT, $about, self::CACHE_TTL);
            } catch (\Throwable) {
                // ignore cache write error
            }
        }

        return $about;
    }

    /**
     * Update or create the active AboutInfo.
     *
     * @param  array<string, mixed>  $data
     * @param  UploadedFile|null  $logoFile
     * @param  UploadedFile|null  $coverFile
     * @param  User  $user
     * @return AboutInfo
     */
    public function updateAboutInfo(array $data, ?UploadedFile $logoFile, ?UploadedFile $coverFile, User $user): AboutInfo
    {
        return DB::transaction(function () use ($data, $logoFile, $coverFile, $user) {
            $about = AboutInfo::where('is_active', true)->first() ?? new AboutInfo();

            if (! $about->exists) {
                $about->created_by = $user->id;
            }
            $about->updated_by = $user->id;

            // Handle logo upload
            if ($logoFile) {
                if (! empty($about->logo_public_id)) {
                    $this->cloudinary->delete($about->logo_public_id);
                }
                $upload = $this->cloudinary->upload($logoFile, CloudinaryService::FOLDER_ABOUT, ['about', 'logo']);
                $about->logo_url = $upload['secure_url'] ?? $upload['url'];
                $about->logo_public_id = $upload['public_id'];
            }

            // Handle cover upload
            if ($coverFile) {
                if (! empty($about->cover_public_id)) {
                    $this->cloudinary->delete($about->cover_public_id);
                }
                $upload = $this->cloudinary->upload($coverFile, CloudinaryService::FOLDER_ABOUT, ['about', 'cover']);
                $about->cover_url = $upload['secure_url'] ?? $upload['url'];
                $about->cover_public_id = $upload['public_id'];
            }

            $about->org_name = $data['org_name'] ?? $about->org_name ?? 'KPA EMC²';
            $about->founded_date = $data['founded_date'] ?? $about->founded_date ?? '10 Oktober 1984';
            $about->motto = $data['motto'] ?? $about->motto ?? '';
            $about->description = $data['description'] ?? $about->description ?? '';
            $about->vision = $data['vision'] ?? $about->vision ?? '';
            $about->mission = is_array($data['mission'] ?? null) ? array_values(array_filter($data['mission'])) : ($about->mission ?? []);
            $about->active_term = $data['active_term'] ?? $about->active_term ?? '';
            $about->org_structure = is_array($data['org_structure'] ?? null) ? $data['org_structure'] : ($about->org_structure ?? []);
            $about->is_active = true;

            $about->save();

            Cache::forget(self::CACHE_KEY_ABOUT);

            return $about;
        });
    }
}
