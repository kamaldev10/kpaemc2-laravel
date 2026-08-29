<?php

namespace Database\Seeders;

use App\Models\Division;
use App\Models\Member;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    public function run(): void
    {
        $divisions = Division::all()->keyBy('slug');

        $members = [
            // 1. Inti Pimpinan: Ketua
            [
                'member_number' => 'EMC.2022.045',
                'name' => 'Fajar Pratama',
                'division_id' => null,
                'position' => 'Ketua',
                'batch_year' => 2022,
                'major' => 'Teknik Informatika',
                'phone' => '081234567801',
                'email' => 'fajar.pratama@kpa-emc2.org',
                'status' => 'regular',
                'bio' => 'Ketua KPA EMC² periode 2025/2026. Berpengalaman dalam ekspedisi gunung hutan dan manajemen organisasi.',
                'avatar_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
                'avatar_public_id' => 'samples/people/smiling-man',
                'is_visible' => true,
                'sort_order' => 1,
                'is_active' => true,
            ],
            // 2. Inti Pimpinan: Sekretaris
            [
                'member_number' => 'EMC.2023.051',
                'name' => 'Annisa Rahmawati',
                'division_id' => null,
                'position' => 'Sekretaris',
                'batch_year' => 2023,
                'major' => 'Ilmu Lingkungan',
                'phone' => '081234567802',
                'email' => 'annisa.rahma@kpa-emc2.org',
                'status' => 'regular',
                'bio' => 'Sekretaris KPA EMC². Mengkoordinasikan tata kelola administrasi, surat menyurat, dan supervisi arsip data organisasi.',
                'avatar_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/kitchen-bar.jpg',
                'avatar_public_id' => 'samples/people/kitchen-bar',
                'is_visible' => true,
                'sort_order' => 2,
                'is_active' => true,
            ],
            // 3. Staff Khusus: Staff Ahli Arsip Data & Rumah Tangga
            [
                'member_number' => 'EMC.2023.053',
                'name' => 'Dewi Lestari',
                'division_id' => null,
                'position' => 'Staff Ahli Arsip Data & Rumah Tangga',
                'batch_year' => 2023,
                'major' => 'Sistem Informasi',
                'phone' => '081234567803',
                'email' => 'dewi.lestari@kpa-emc2.org',
                'status' => 'regular',
                'bio' => 'Staff Ahli di bawah Sekretaris. Bertanggung jawab atas digitalisasi arsip dokumen, database anggota, dan tata kelola kerumahtanggaan.',
                'avatar_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
                'avatar_public_id' => 'samples/people/smiling-man',
                'is_visible' => true,
                'sort_order' => 3,
                'is_active' => true,
            ],
            // 4. Inti Pimpinan: Bendahara
            [
                'member_number' => 'EMC.2022.048',
                'name' => 'Rian Hidayat',
                'division_id' => null,
                'position' => 'Bendahara',
                'batch_year' => 2022,
                'major' => 'Manajemen Keuangan',
                'phone' => '081234567804',
                'email' => 'rian.hidayat@kpa-emc2.org',
                'status' => 'regular',
                'bio' => 'Bendahara KPA EMC². Mengelola tata kelola keuangan, perbendaharaan kas, dan audit anggaran kegiatan organisasi.',
                'avatar_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/boy-snow-hoodie.jpg',
                'avatar_public_id' => 'samples/people/boy-snow-hoodie',
                'is_visible' => true,
                'sort_order' => 4,
                'is_active' => true,
            ],
            // 5. Kadiv Kaderisasi
            [
                'member_number' => 'EMC.2023.055',
                'name' => 'Bagus Setiawan',
                'division_id' => $divisions['kaderisasi']->id ?? null,
                'position' => 'Kepala Divisi Kaderisasi',
                'batch_year' => 2023,
                'major' => 'Psikologi',
                'phone' => '081234567805',
                'email' => 'bagus.kaderisasi@kpa-emc2.org',
                'status' => 'regular',
                'bio' => 'Kepala Divisi Kaderisasi. Bertanggung jawab atas penyelenggaraan DIKLATSAR dan pembinaan anggota muda.',
                'avatar_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
                'avatar_public_id' => 'samples/people/smiling-man',
                'is_visible' => true,
                'sort_order' => 5,
                'is_active' => true,
            ],
            // 6. Kadiv SKLH
            [
                'member_number' => 'EMC.2023.058',
                'name' => 'Siti Aisyah',
                'division_id' => $divisions['sklh']->id ?? null,
                'position' => 'Kepala Divisi SKLH',
                'batch_year' => 2023,
                'major' => 'Ilmu Lingkungan',
                'phone' => '081234567806',
                'email' => 'siti.sklh@kpa-emc2.org',
                'status' => 'regular',
                'bio' => 'Kepala Divisi SKLH. Koordinator utama program Sekolah Lingkungan dan aksi konservasi mangrove & reboisasi.',
                'avatar_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/kitchen-bar.jpg',
                'avatar_public_id' => 'samples/people/kitchen-bar',
                'is_visible' => true,
                'sort_order' => 6,
                'is_active' => true,
            ],
            // 7. Kadiv Litbang
            [
                'member_number' => 'EMC.2023.057',
                'name' => 'Bayu Wicaksono',
                'division_id' => $divisions['litbang']->id ?? null,
                'position' => 'Kepala Divisi Litbang',
                'batch_year' => 2023,
                'major' => 'Teknik Geologi',
                'phone' => '081234567807',
                'email' => 'bayu.litbang@kpa-emc2.org',
                'status' => 'regular',
                'bio' => 'Kepala Divisi Penelitian & Pengembangan. Fokus pada pemetaan GIS kawasan karst dan pengujian alat outdoor.',
                'avatar_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
                'avatar_public_id' => 'samples/people/smiling-man',
                'is_visible' => true,
                'sort_order' => 7,
                'is_active' => true,
            ],
            // 8. Kadiv Karata
            [
                'member_number' => 'EMC.2023.061',
                'name' => 'Dimas Nugraha',
                'division_id' => $divisions['karata']->id ?? null,
                'position' => 'Kepala Divisi Karata',
                'batch_year' => 2023,
                'major' => 'Teknik Mesin',
                'phone' => '081234567808',
                'email' => 'dimas.karata@kpa-emc2.org',
                'status' => 'regular',
                'bio' => 'Kepala Divisi Kepala Rumah Tangga. Mengelola inventarisasi peralatan outdoor dan kenyamanan sekretariat.',
                'avatar_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
                'avatar_public_id' => 'samples/people/smiling-man',
                'is_visible' => true,
                'sort_order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($members as $member) {
            Member::updateOrCreate(['member_number' => $member['member_number']], $member);
        }
    }
}
