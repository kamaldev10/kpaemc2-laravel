<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Division;
use App\Models\Gallery;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Gallery>
 */
class GalleryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'division_id' => Division::factory(),
            'category_id' => Category::factory(),
            'title' => 'Dokumentasi ' . fake()->words(3, true),
            'description' => fake()->paragraph(),
            'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg',
            'cover_public_id' => 'samples/landscapes/beach-boat',
            'event_date' => fake()->date(),
            'location' => fake()->city(),
            'is_published' => true,
            'sort_order' => fake()->numberBetween(0, 20),
            'is_active' => true,
        ];
    }
}
