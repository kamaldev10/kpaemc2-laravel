<?php

namespace Database\Seeders;

use App\Models\AboutInfo;
use Illuminate\Database\Seeder;

class AboutInfoSeeder extends Seeder
{
    public function run(): void
    {
        AboutInfo::updateOrCreate(
            ['id' => 1],
            [
                'org_name' => 'Kelompok Pecinta Alam EMC²',
                'founded_date' => '10 Oktober 1984',
                'motto' => 'Bergerak Satu Asa, Berbekal Alam Lestari!',
                'description' => 'Kelompok Pecinta Alam EMC² (KPA EMC²) adalah organisasi kepecintaalaman tingkat perguruan tinggi yang didirikan pada tanggal 10 Oktober 1984. Berlandaskan semangat persaudaraan, petualangan alam bebas beretika, riset ilmiah, kepedulian sosial kemasyarakatan, dan komitmen pelestarian lingkungan hidup berkelanjutan.',
                'vision' => 'Menjadi organisasi pecinta alam terkemuka yang melahirkan insan akademis berkarakter tangguh, berwawasan ilmiah, berjiwa sosial tinggi, serta menjadi pelopor gerakan pelestarian lingkungan hidup.',
                'mission' => [
                    'Menyelenggarakan sistem kaderisasi dan pendidikan kepecintaalaman yang sistematis, aman, dan berkarakter.',
                    'Melaksanakan program pengabdian masyarakat, Sekolah Lingkungan, dan aksi nyata konservasi lingkungan hidup.',
                    'Mengembangkan riset ilmiah, eksplorasi alam bebas, dan kajian penelitian pengembangan (Litbang).',
                    'Mengelola tata kelola organisasi, kerumahtanggaan (Karata), dan inventarisasi logistik yang profesional.',
                ],
                'active_term' => '2025/2026',
                'org_structure' => [
                    [
                        'level' => 'Inti Pimpinan',
                        'position' => 'Ketua',
                        'name' => 'Fajar Pratama',
                        'nrp' => 'EMC.2022.045',
                        'batch' => '2022',
                    ],
                    [
                        'level' => 'Inti Pimpinan',
                        'position' => 'Sekretaris',
                        'name' => 'Annisa Rahmawati',
                        'nrp' => 'EMC.2023.051',
                        'batch' => '2023',
                    ],
                    [
                        'level' => 'Staff Khusus Sekretariat',
                        'position' => 'Staff Ahli Arsip Data & Rumah Tangga',
                        'name' => 'Dewi Lestari',
                        'nrp' => 'EMC.2023.053',
                        'batch' => '2023',
                        'reports_to' => 'Sekretaris',
                    ],
                    [
                        'level' => 'Inti Pimpinan',
                        'position' => 'Bendahara',
                        'name' => 'Rian Hidayat',
                        'nrp' => 'EMC.2022.048',
                        'batch' => '2022',
                    ],
                    [
                        'level' => 'Divisi Operasional',
                        'position' => 'Kepala Divisi Kaderisasi',
                        'name' => 'Bagus Setiawan',
                        'nrp' => 'EMC.2023.055',
                        'batch' => '2023',
                        'division' => 'Kaderisasi',
                    ],
                    [
                        'level' => 'Divisi Operasional',
                        'position' => 'Kepala Divisi SKLH',
                        'name' => 'Siti Aisyah',
                        'nrp' => 'EMC.2023.058',
                        'batch' => '2023',
                        'division' => 'SKLH',
                    ],
                    [
                        'level' => 'Divisi Operasional',
                        'position' => 'Kepala Divisi Litbang',
                        'name' => 'Bayu Wicaksono',
                        'nrp' => 'EMC.2023.057',
                        'batch' => '2023',
                        'division' => 'Litbang',
                    ],
                    [
                        'level' => 'Divisi Operasional',
                        'position' => 'Kepala Divisi Karata',
                        'name' => 'Dimas Nugraha',
                        'nrp' => 'EMC.2023.061',
                        'batch' => '2023',
                        'division' => 'Karata',
                    ],
                ],
                'logo_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/logo.png',
                'logo_public_id' => 'samples/logo',
                'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
                'cover_public_id' => 'samples/landscapes/nature-mountains',
                'is_active' => true,
            ]
        );
    }
}
