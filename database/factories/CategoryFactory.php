<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $name = ucwords(fake()->words(2, true));
        $slug = Str::slug($name) . '-' . Str::lower(Str::random(5));

        return [
            'slug' => $slug,
            'name' => $name,
            'type' => fake()->randomElement(['post', 'event', 'gallery', 'general']),
            'color' => fake()->hexColor(),
            'sort_order' => fake()->numberBetween(0, 20),
            'is_active' => true,
        ];
    }
}
