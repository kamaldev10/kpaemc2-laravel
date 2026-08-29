<?php

namespace Database\Factories;

use App\Models\Gallery;
use App\Models\GalleryItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<GalleryItem>
 */
class GalleryItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'gallery_id' => Gallery::factory(),
            'cloudinary_public_id' => 'samples/landscapes/nature-mountains',
            'url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
            'type' => 'photo',
            'caption' => fake()->sentence(8),
            'width' => 1920,
            'height' => 1080,
            'sort_order' => fake()->numberBetween(0, 10),
            'is_active' => true,
        ];
    }
}
