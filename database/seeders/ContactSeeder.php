<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        $contacts = [
            [
                'name' => 'Budi Prasetyo (SMK Negeri 1 Jakarta)',
                'email' => 'budi.prasetyo@smkn1jkt.sch.id',
                'subject' => 'Permohonan Narasumber Pelatihan Navigasi Darat Pramuka',
                'message' => 'Salam Lestari! Kami dari Gugus Depan Pramuka SMKN 1 Jakarta bermaksud mengundang rekan-rekan instruktur KPA EMC² untuk menjadi narasumber pelatihan dasar peta kompas bagi siswa kami pada bulan depan.',
                'is_read' => true,
                'ip_address' => '114.125.45.12',
                'is_active' => true,
            ],
            [
                'name' => 'Rina Melati (Komunitas Hijau Lestari)',
                'email' => 'rina.melati@hijoulestari.org',
                'subject' => 'Ajakan Kolaborasi Aksi Bersih Sungai & Penanaman Pohon',
                'message' => 'Halo Pengurus KPA EMC², kami tertarik untuk berkolaborasi dalam kampanye pelestarian daerah aliran sungai (DAS) pada peringatan Hari Bumi mendatang. Mohon informasi kontak narahubung bidang kemitraan.',
                'is_read' => false,
                'ip_address' => '182.253.11.89',
                'is_active' => true,
            ],
        ];

        foreach ($contacts as $contact) {
            Contact::updateOrCreate(
                ['email' => $contact['email'], 'subject' => $contact['subject']],
                $contact
            );
        }
    }
}
