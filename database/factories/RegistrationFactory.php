<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\Registration;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Registration>
 */
class RegistrationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'event_id' => Event::factory(),
            'registration_code' => 'EMC-' . strtoupper(fake()->bothify('??####')),
            'full_name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone' => '08' . fake()->numerify('##########'),
            'gender' => fake()->randomElement(['M', 'F']),
            'birth_date' => fake()->date('Y-m-d', '2005-01-01'),
            'place_of_birth' => fake()->city(),
            'address' => fake()->address(),
            'institution' => 'Universitas Indonesia',
            'major' => fake()->randomElement(['Ilmu Komputer', 'Biologi', 'Teknik Mesin', 'Hukum']),
            'occupation' => 'Mahasiswa',
            'motivation' => 'Ingin memperdalam wawasan tentang kelestarian alam dan petualangan alam bebas.',
            'photo_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
            'photo_public_id' => 'samples/people/smiling-man',
            'document_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/animals/kitten-playing.jpg',
            'document_public_id' => 'samples/animals/kitten-playing',
            'extra_data' => [
                'emergency_contact' => '081234567890 (Ibu)',
                'medical_history' => 'Tidak ada',
                'tshirt_size' => 'L',
            ],
            'payment_proof_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg',
            'payment_proof_public_id' => 'samples/landscapes/beach-boat',
            'status' => 'pending',
            'reviewer_notes' => null,
            'is_active' => true,
        ];
    }

    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'verified',
            'reviewer_notes' => 'Bukti pembayaran valid, berkas lengkap.',
        ]);
    }

    public function accepted(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'accepted',
            'reviewer_notes' => 'Peserta resmi diterima.',
        ]);
    }
}
