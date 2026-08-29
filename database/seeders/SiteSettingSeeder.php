<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General
            [
                'key' => 'site_title',
                'value' => 'Kelompok Pecinta Alam EMC²',
                'group' => 'general',
                'description' => 'Nama resmi organisasi yang ditampilkan di header dan judul halaman web.',
            ],
            [
                'key' => 'site_tagline',
                'value' => 'Bergerak Satu Asa, Berbekal Alam Lestari!',
                'group' => 'general',
                'description' => 'Motto / slogan organisasi.',
            ],
            [
                'key' => 'site_description',
                'value' => 'Portal resmi Kelompok Pecinta Alam EMC² — Wadah pembinaan kepemimpinan, penjelajahan alam bebas beretika, dan aksi nyata pelestarian lingkungan hidup.',
                'group' => 'seo',
                'description' => 'Deskripsi meta default untuk search engine (SEO).',
            ],

            // Contact & Secretariat
            [
                'key' => 'contact_email',
                'value' => 'sekretariat@kpa-emc2.org',
                'group' => 'contact',
                'description' => 'Alamat email resmi sekretariat untuk publik.',
            ],
            [
                'key' => 'contact_whatsapp',
                'value' => '6281234567890',
                'group' => 'contact',
                'description' => 'Nomor WhatsApp resmi (format internasional 62...).',
            ],
            [
                'key' => 'contact_address',
                'value' => 'Gedung Pusat Kegiatan Mahasiswa (PKM) Lt. 2, Kampus Utama, Jakarta',
                'group' => 'contact',
                'description' => 'Alamat lengkap sekretariat KPA EMC².',
            ],

            // Social Media
            [
                'key' => 'social_instagram',
                'value' => 'https://instagram.com/kpa_emc2',
                'group' => 'social',
                'description' => 'Tautan akun Instagram resmi KPA EMC².',
            ],
            [
                'key' => 'social_youtube',
                'value' => 'https://youtube.com/@kpa_emc2',
                'group' => 'social',
                'description' => 'Tautan channel YouTube dokumentasi ekspedisi.',
            ],
            [
                'key' => 'social_github',
                'value' => 'https://github.com/kpa-emc2',
                'group' => 'social',
                'description' => 'Repositori portal web open source KPA EMC².',
            ],
        ];

        foreach ($settings as $setting) {
            $setting['is_active'] = true;
            SiteSetting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
