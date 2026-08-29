<?php

namespace Database\Factories;

use App\Models\Division;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Division>
 */
class DivisionFactory extends Factory
{
    public function definition(): array
    {
        $divisionData = fake()->unique()->randomElement([
            [
                'name' => 'Divisi Kaderisasi',
                'slug' => 'kaderisasi',
                'icon_name' => 'users',
                'short' => 'Regenerasi, rekrutmen, dan DIKLATSAR anggota muda.',
            ],
            [
                'name' => 'Divisi SKLH',
                'slug' => 'sklh',
                'icon_name' => 'leaf',
                'short' => 'Sosial kemasyarakatan, Sekolah Lingkungan, dan konservasi alam.',
            ],
            [
                'name' => 'Divisi Litbang',
                'slug' => 'litbang',
                'icon_name' => 'book-open',
                'short' => 'Penelitian, kajian ilmiah, eksplorasi, dan pengembangan organisasi.',
            ],
            [
                'name' => 'Divisi Karata',
                'slug' => 'karata',
                'icon_name' => 'home',
                'short' => 'Kepala Rumah Tangga, inventaris alat outdoor, dan operasional sekretariat.',
            ],
        ]);

        return [
            'slug' => $divisionData['slug'],
            'name' => $divisionData['name'],
            'icon_name' => $divisionData['icon_name'],
            'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
            'cover_public_id' => 'samples/landscapes/nature-mountains',
            'short_description' => $divisionData['short'],
            'full_description' => fake()->paragraphs(3, true),
            'study_materials' => ['Materi Dasar 1', 'Materi Praktik 2', 'Kajian Lapangan 3'],
            'equipment' => ['Perlengkapan Standar 1', 'Alat Operasional 2'],
            'sort_order' => fake()->numberBetween(1, 10),
            'is_active' => true,
        ];
    }
}
