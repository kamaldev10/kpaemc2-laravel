<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Division;
use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::where('type', 'event')->get()->keyBy('slug');
        $divisions = Division::all()->keyBy('slug');

        $events = [
            [
                'title' => 'Sekolah Lingkungan Angkatan X (2026)',
                'slug' => 'sekolah-lingkungan-angkatan-x-2026',
                'category_id' => $categories['sekolah-lingkungan']->id ?? null,
                'division_id' => $divisions['sklh']->id ?? null, // Diselenggarakan oleh Divisi SKLH
                'type' => 'conservation',
                'description' => 'Program pendidikan dan pelatihan lingkungan hidup untuk pelajar dan mahasiswa se-Jabodetabek yang diselenggarakan oleh Divisi SKLH. Peserta akan mendapatkan materi ekologi, manajemen sampah, serta praktik lapangan penanaman 1.000 bibit mangrove.',
                'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
                'cover_public_id' => 'samples/landscapes/nature-mountains',
                'location' => 'Pusat Konservasi Muara Gembong, Bekasi',
                'start_date' => now()->addDays(30),
                'end_date' => now()->addDays(32),
                'registration_open_at' => now()->subDays(5),
                'registration_close_at' => now()->addDays(20),
                'max_participants' => 60,
                'requires_payment' => true,
                'payment_amount' => 75000.00,
                'form_fields' => [
                    ['key' => 'emergency_contact', 'label' => 'Kontak Darurat (Nama & No. WhatsApp)', 'type' => 'text', 'required' => true],
                    ['key' => 'tshirt_size', 'label' => 'Ukuran Kaos Peserta (S / M / L / XL / XXL)', 'type' => 'select', 'required' => true],
                    ['key' => 'medical_history', 'label' => 'Riwayat Alergi / Penyakit Bawaan', 'type' => 'text', 'required' => false],
                ],
                'tags' => ['sekolah-lingkungan', 'sklh', 'konservasi', 'mangrove', 'edukasi-alam'],
                'is_published' => true,
                'is_active' => true,
            ],
            [
                'title' => 'Seminar & Workshop Riset Alam: Eksplorasi Kawasan Karst Indonesia',
                'slug' => 'seminar-riset-karst-2026',
                'category_id' => $categories['seminar-workshop']->id ?? null,
                'division_id' => $divisions['litbang']->id ?? null, // Diselenggarakan oleh Divisi Litbang
                'type' => 'seminar',
                'description' => 'Seminar dan workshop ilmiah Divisi Litbang mengupas metodologi pemetaan bentang karst, hidrologi air bawah tanah, dan teknologi pemetaan GIS alam bebas.',
                'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
                'cover_public_id' => 'samples/landscapes/nature-mountains',
                'location' => 'Auditorium Kampus & Zoom Webinar',
                'start_date' => now()->addDays(15),
                'end_date' => now()->addDays(15),
                'registration_open_at' => now()->subDays(10),
                'registration_close_at' => now()->addDays(14),
                'max_participants' => 200,
                'requires_payment' => false,
                'payment_amount' => 0.00,
                'form_fields' => [
                    ['key' => 'attendance_mode', 'label' => 'Pilihan Kehadiran (Offline / Online Zoom)', 'type' => 'select', 'required' => true],
                    ['key' => 'institution_type', 'label' => 'Kategori Peserta (Mahasiswa/Umum/Akademisi)', 'type' => 'text', 'required' => true],
                ],
                'tags' => ['seminar', 'litbang', 'karst', 'gis', 'riset-alam'],
                'is_published' => true,
                'is_active' => true,
            ],
            [
                'title' => 'Penerimaan Anggota Muda (Sekolah Lingkungan) KPA EMC² XXXVIII',
                'slug' => 'open-recruitment-anggota-muda-xxxviii',
                'category_id' => $categories['open-recruitment']->id ?? null,
                'division_id' => $divisions['kaderisasi']->id ?? null, // Diselenggarakan oleh Divisi Kaderisasi
                'type' => 'recruitment',
                'description' => 'Sekolah Lingkungan XXXVIII yang dikoordinasikan oleh Divisi Kaderisasi untuk membentuk calon anggota pecinta alam yang berkarakter, mandiri, dan peduli kelestarian lingkungan hidup.',
                'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg',
                'cover_public_id' => 'samples/landscapes/beach-boat',
                'location' => 'Sekretariat KPA EMC² & Kawasan Konservasi Alam',
                'start_date' => now()->addDays(45),
                'end_date' => now()->addDays(50),
                'registration_open_at' => now()->subDays(3),
                'registration_close_at' => now()->addDays(35),
                'max_participants' => 40,
                'requires_payment' => true,
                'payment_amount' => 150000.00,
                'form_fields' => [
                    ['key' => 'nim', 'label' => 'Nomor Induk Mahasiswa (NIM)', 'type' => 'text', 'required' => true],
                    ['key' => 'faculty', 'label' => 'Fakultas / Program Studi', 'type' => 'text', 'required' => true],
                    ['key' => 'emergency_contact', 'label' => 'Nomor Telepon Orang Tua / Wali', 'type' => 'text', 'required' => true],
                    ['key' => 'blood_type', 'label' => 'Golongan Darah (A/B/AB/O)', 'type' => 'text', 'required' => true],
                ],
                'tags' => ['sekolah-lingkungan', 'kaderisasi', 'recruitment', 'anggota-baru', 'kpa-emc2'],
                'is_published' => true,
                'is_active' => true,
            ],
        ];

        foreach ($events as $eventData) {
            Event::updateOrCreate(['slug' => $eventData['slug']], $eventData);
        }
    }
}
