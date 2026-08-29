<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Division;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->sentence(6);

        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'division_id' => Division::factory(),
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(2),
            'content' => '<p>' . implode('</p><p>', fake()->paragraphs(4)) . '</p>',
            'content_source' => fake()->optional()->url(),
            'cover_image_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
            'cover_image_public_id' => 'samples/landscapes/nature-mountains',
            'cover_image_source' => 'Dokumentasi KPA EMC²',
            'author_name' => fake()->name(),
            'tags' => ['survival', 'gunung', 'ekspedisi', 'navigasi'],
            'is_featured' => fake()->boolean(20),
            'is_published' => true,
            'published_at' => now(),
            'post_date' => now(),
            'is_active' => true,
        ];
    }
}
