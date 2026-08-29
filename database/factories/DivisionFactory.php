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
        $name = 'Divisi ' . ucwords(fake()->words(2, true));
        $slug = Str::slug($name) . '-' . Str::lower(Str::random(5));

        return [
            'slug' => $slug,
            'name' => $name,
            'icon_name' => fake()->randomElement(['Users', 'TreePine', 'Compass', 'Home']),
            'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
            'cover_public_id' => 'samples/landscapes/nature-mountains',
            'short_description' => fake()->sentence(10),
            'full_description' => fake()->paragraphs(3, true),
            'study_materials' => ['Materi Dasar 1', 'Materi Praktik 2', 'Kajian Lapangan 3'],
            'equipment' => ['Perlengkapan Standar 1', 'Alat Operasional 2'],
            'sort_order' => fake()->numberBetween(1, 10),
            'is_active' => true,
        ];
    }
}
