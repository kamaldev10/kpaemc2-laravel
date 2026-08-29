<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Registration;
use Illuminate\Database\Seeder;

class RegistrationSeeder extends Seeder
{
    public function run(): void
    {
        $eventSL = Event::where('slug', 'sekolah-lingkungan-angkatan-x-2026')->first();
        $eventSem = Event::where('slug', 'seminar-nasional-karst-2026')->first();

        if ($eventSL) {
            Registration::updateOrCreate(
                ['registration_code' => 'EMC-SL2026-001'],
                [
                    'event_id' => $eventSL->id,
                    'full_name' => 'Dimas Aditya Rahman',
                    'email' => 'dimas.aditya@gmail.com',
                    'phone' => '081234567891',
                    'gender' => 'M',
                    'birth_date' => '2004-05-14',
                    'place_of_birth' => 'Jakarta',
                    'address' => 'Jl. Margonda Raya No. 12, Depok',
                    'institution' => 'Universitas Indonesia',
                    'major' => 'Biologi',
                    'occupation' => 'Mahasiswa',
                    'motivation' => 'Ingin berkontribusi nyata dalam aksi penanaman mangrove dan riset ekosistem pesisir.',
                    'photo_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
                    'photo_public_id' => 'samples/people/smiling-man',
                    'document_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/animals/kitten-playing.jpg',
                    'document_public_id' => 'samples/animals/kitten-playing',
                    'extra_data' => [
                        'emergency_contact' => 'Ibu Rahmawati (081298765432)',
                        'tshirt_size' => 'L',
                        'medical_history' => 'Tidak ada riwayat penyakit berat',
                    ],
                    'payment_proof_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg',
                    'payment_proof_public_id' => 'samples/landscapes/beach-boat',
                    'status' => 'verified',
                    'reviewer_notes' => 'Pembayaran lunas via transfer Bank Mandiri. Berkas lengkap.',
                    'is_active' => true,
                ]
            );

            Registration::updateOrCreate(
                ['registration_code' => 'EMC-SL2026-002'],
                [
                    'event_id' => $eventSL->id,
                    'full_name' => 'Nadia Putri Maharani',
                    'email' => 'nadia.putri@gmail.com',
                    'phone' => '081234567892',
                    'gender' => 'F',
                    'birth_date' => '2005-09-20',
                    'place_of_birth' => 'Bogor',
                    'address' => 'Jl. Pajajaran No. 45, Bogor',
                    'institution' => 'Institut Pertanian Bogor',
                    'major' => 'Konservasi Sumberdaya Hutan',
                    'occupation' => 'Mahasiswa',
                    'motivation' => 'Memperluas jejaring relawan konservasi lingkungan dan mempelajari advokasi lingkungan.',
                    'photo_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/kitchen-bar.jpg',
                    'photo_public_id' => 'samples/people/kitchen-bar',
                    'document_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/animals/kitten-playing.jpg',
                    'document_public_id' => 'samples/animals/kitten-playing',
                    'extra_data' => [
                        'emergency_contact' => 'Ayah Bambang (081311223344)',
                        'tshirt_size' => 'M',
                        'medical_history' => 'Alergi dingin ringan',
                    ],
                    'payment_proof_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg',
                    'payment_proof_public_id' => 'samples/landscapes/beach-boat',
                    'status' => 'pending',
                    'reviewer_notes' => null,
                    'is_active' => true,
                ]
            );
        }

        if ($eventSem) {
            Registration::updateOrCreate(
                ['registration_code' => 'EMC-SEM2026-001'],
                [
                    'event_id' => $eventSem->id,
                    'full_name' => 'Dr. Hendra Gunawan, M.Si',
                    'email' => 'hendra.gunawan@univ.ac.id',
                    'phone' => '081399887766',
                    'gender' => 'M',
                    'birth_date' => '1985-03-12',
                    'place_of_birth' => 'Bandung',
                    'address' => 'Komplek Dosen ITB, Bandung',
                    'institution' => 'Pusat Riset Karst & Speleologi',
                    'major' => 'Geologi Lingkungan',
                    'occupation' => 'Dosen / Peneliti',
                    'motivation' => 'Diskusi ilmiah dan kolaborasi pemetaan hidrogeologi kawasan karst.',
                    'photo_url' => null,
                    'photo_public_id' => null,
                    'document_url' => null,
                    'document_public_id' => null,
                    'extra_data' => [
                        'attendance_mode' => 'Offline',
                        'institution_type' => 'Akademisi / Peneliti',
                    ],
                    'payment_proof_url' => null,
                    'payment_proof_public_id' => null,
                    'status' => 'verified',
                    'reviewer_notes' => 'Tamu undangan / Narasumber sesi diskusi.',
                    'is_active' => true,
                ]
            );
        }
    }
}
