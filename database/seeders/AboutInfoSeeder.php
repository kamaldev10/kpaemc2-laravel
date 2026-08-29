<?php

namespace Database\Seeders;

use App\Models\AboutInfo;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AboutInfoSeeder extends Seeder
{
    public function run(): void
    {
        AboutInfo::updateOrCreate(
            ['org_name' => 'KPA EMC²'],
            [
                'founded_date' => '10 Oktober 1984',
                'motto' => 'Bergerak Satu Asa, Berbekal Alam Lestari',
                'description' => 'KPA EMC² adalah organisasi kemahasiswaan milik FMIPA UNRI yang bertujuan menghimpun, membina, mengedukasi, dan menyalurkan potensi mahasiswa FMIPA UNRI, serta berkontribusi menjaga kelestarian dan keseimbangan lingkungan hidup.',
                'vision' => 'Terwujudnya organisasi pecinta alam yang bertakwa kepada Tuhan Yang Maha Esa, berkarakter, berkualitas, serta berpartisipasi dalam pengembangan ilmu pengetahuan dan teknologi untuk mendukung pelestarian lingkungan hidup.',
                'mission' => [
                    'Mengembangkan eksistensi organisasi di dalam maupun di luar universitas.',
                    'Membentuk generasi yang bermoral, berkarakter dan intelektual.',
                    'Berkontribusi dalam kegiatan sosial dan menjaga pelestarian lingkungan hidup.',
                    'Menjalin silaturahmi baik kepada sesama pecinta alam maupun lembaga lain.',
                ],
                'active_term' => '2025',
                'org_structure' => [
                    [
                        'image' => '/images/struktur-2025.png',
                        'period' => '2025',
                        'chairmanName' => 'Desti Seri Fatimah',
                    ],
                    [
                        'image' => '/images/struktur-2024.png',
                        'period' => '2023-2024',
                        'chairmanName' => 'Muhammad Farhan',
                    ],
                    [
                        'image' => '/images/struktur-2023.png',
                        'period' => '2022-2023',
                        'chairmanName' => 'Rina Noviana',
                    ],
                    [
                        'image' => '/images/struktur-2023.png',
                        'period' => '2021',
                        'chairmanName' => 'Muhammad Ahlunnazah',
                    ],
                ],
                'logo_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/logo.png',
                'logo_public_id' => 'samples/logo',
                'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
                'cover_public_id' => 'samples/landscapes/nature-mountains',
                'is_active' => true,
                'updated_at' => Carbon::parse('2025-07-16 07:20:09.79'),
            ]
        );
    }
}
