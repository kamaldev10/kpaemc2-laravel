<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Division;
use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Event>
 */
class EventFactory extends Factory
{
    public function definition(): array
    {
        $baseTitle = fake()->randomElement([
            'Sekolah Lingkungan Angkatan',
            'Seminar Nasional Konservasi Hutan',
            'Aksi Bersih Sungai & Mangrove',
            'EMC Outdoor Expo',
            'Penerimaan Anggota Muda',
            'Pelatihan Basic Navigation & Rescue',
        ]);
        $title = $baseTitle . ' ' . fake()->unique()->numerify('###');

        return [
            'slug' => Str::slug($title . '-' . fake()->unique()->numerify('#####')),
            'category_id' => Category::factory(),
            'division_id' => Division::factory(),
            'title' => $title,
            'type' => fake()->randomElement(['seminar', 'conservation', 'community-service', 'expo', 'recruitment']),
            'description' => fake()->paragraphs(3, true),
            'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
            'cover_public_id' => 'samples/landscapes/nature-mountains',
            'location' => 'Sekretariat KPA EMC² / Kampus Utama',
            'start_date' => now()->addDays(14),
            'end_date' => now()->addDays(16),
            'registration_open_at' => now()->subDays(5),
            'registration_close_at' => now()->addDays(10),
            'max_participants' => 50,
            'requires_payment' => true,
            'payment_amount' => 50000.00,
            'form_fields' => [
                ['key' => 'emergency_contact', 'label' => 'Kontak Darurat (Ortu/Wali)', 'type' => 'text', 'required' => true],
                ['key' => 'medical_history', 'label' => 'Riwayat Penyakit Khusus', 'type' => 'text', 'required' => false],
                ['key' => 'tshirt_size', 'label' => 'Ukuran Kaos (S/M/L/XL/XXL)', 'type' => 'select', 'required' => true],
            ],
            'tags' => ['sekolah-lingkungan', 'edukasi', 'konservasi', 'pendaftaran'],
            'is_published' => true,
            'is_active' => true,
        ];
    }
}
