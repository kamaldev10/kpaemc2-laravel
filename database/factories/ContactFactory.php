<?php

namespace Database\Factories;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Contact>
 */
class ContactFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'subject' => fake()->sentence(5),
            'message' => fake()->paragraph(3),
            'is_read' => fake()->boolean(30),
            'ip_address' => fake()->ipv4(),
            'is_active' => true,
        ];
    }
}
