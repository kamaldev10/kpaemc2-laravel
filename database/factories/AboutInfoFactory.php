<?php

namespace Database\Factories;

use App\Models\AboutInfo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AboutInfo>
 */
class AboutInfoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'org_name' => 'Kelompok Pecinta Alam EMC²',
            'founded_date' => '10 Oktober 1984',
            'motto' => 'Bergerak Satu Asa, Berbekal Alam Lestari!',
            'description' => 'Organisasi pecinta alam mahasiswa yang berdedikasi dalam petualangan alam bebas dan pelestarian lingkungan hidup.',
            'vision' => 'Menjadi wadah pembinaan generasi muda yang berkarakter, tangguh, dan peduli terhadap kelestarian alam.',
            'mission' => [
                'Menyelenggarakan kegiatan penjelajahan alam bebas yang berwawasan lingkungan.',
                'Melakukan aksi nyata konservasi dan penghijauan lingkungan hidup.',
                'Membina kebersamaan, kepemimpinan, dan kemandirian anggota.',
            ],
            'active_term' => '2025/2026',
            'org_structure' => [
                ['position' => 'Ketua', 'name' => 'Ahmad Fajar', 'batch' => '2022'],
                ['position' => 'Sekretaris', 'name' => 'Siti Nurhaliza', 'batch' => '2023'],
                ['position' => 'Staff Ahli Arsip Data & Rumah Tangga', 'name' => 'Dewi Lestari', 'batch' => '2023'],
                ['position' => 'Bendahara', 'name' => 'Budi Santoso', 'batch' => '2023'],
            ],
            'logo_url' => 'https://res.cloudinary.com/dh7fjuxue/image/upload/v1788021964/logoemc.png',
            'logo_public_id' => 'logoemc',
            'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
            'cover_public_id' => 'samples/landscapes/nature-mountains',
            'is_active' => true,
        ];
    }
}
