<?php

namespace Database\Factories;

use App\Models\Division;
use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Member>
 */
class MemberFactory extends Factory
{
    public function definition(): array
    {
        return [
            'member_number' => 'EMC.' . fake()->unique()->numerify('####.###'),
            'name' => fake()->name(),
            'division_id' => Division::factory(),
            'position' => fake()->randomElement(['Anggota Aktif', 'Kepala Divisi', 'Staff Ahli', 'Humas', 'Logistik']),
            'batch_year' => fake()->numberBetween(2018, 2025),
            'major' => fake()->randomElement(['Teknik Informatika', 'Sistem Informasi', 'Ilmu Lingkungan', 'Biologi', 'Kehutanan', 'Kimia', 'Fisika', 'Matematika']),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'status' => 'regular',
            'bio' => fake()->sentence(12),
            'avatar_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
            'avatar_public_id' => 'samples/people/smiling-man',
            'is_pengurus' => fake()->boolean(40),
            'sort_order' => fake()->numberBetween(0, 50),
            'is_active' => true,
        ];
    }
}
