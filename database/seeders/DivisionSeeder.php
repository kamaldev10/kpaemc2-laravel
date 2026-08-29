<?php

namespace Database\Seeders;

use App\Models\Division;
use Illuminate\Database\Seeder;

class DivisionSeeder extends Seeder
{
    public function run(): void
    {
        $divisions = [
            [
                'slug' => 'kaderisasi',
                'name' => 'Divisi Kaderisasi',
                'icon_name' => 'users',
                'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/boy-snow-hoodie.jpg',
                'cover_public_id' => 'samples/people/boy-snow-hoodie',
                'short_description' => 'Bertanggung jawab atas regenerasi organisasi, proses rekrutmen, Sekolah Lingkungan, serta pembinaan mental dan karakter anggota.',
                'full_description' => 'Divisi Kaderisasi merupakan jantung regenerasi KPA EMC². Divisi ini merancang dan mengawal seluruh tahapan kaderisasi mulai dari sosialisasi, bimbingan fisik dan mental, materi dasar kepecintaalaman, Sekolah Lingkungan, hingga pemantapan anggota muda menuju jenjang anggota penuh.',
                'study_materials' => ['Manajemen Organisasi & Kepemimpinan', 'Etika & Kode Etik Pecinta Alam', 'Kurikulum Sekolah Lingkungan', 'Pembinaan Karakter & Mental'],
                'equipment' => ['Buku Panduan Kaderisasi', 'Modul Sekolah Lingkungan Lapangan', 'Perlengkapan Simulasi Lapangan'],
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'slug' => 'sklh',
                'name' => 'Divisi SKLH (Sosial Kemasyarakatan & Lingkungan Hidup)',
                'icon_name' => 'leaf',
                'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
                'cover_public_id' => 'samples/landscapes/nature-mountains',
                'short_description' => 'Fokus pada pengabdian masyarakat, Sekolah Lingkungan, advokasi kelestarian alam, aksi penanaman pohon, dan tanggap darurat bencana.',
                'full_description' => 'Divisi Sosial Kemasyarakatan & Lingkungan Hidup (SKLH) adalah garda terdepan aksi sosial dan konservasi KPA EMC². Bertanggung jawab menyelenggarakan program unggulan Sekolah Lingkungan bagi generasi muda, aksi pelestarian ekosistem (reboisasi, pembersihan DAS), edukasi mitigasi sampah, serta pemberdayaan masyarakat sekitar kawasan alam.',
                'study_materials' => ['Pendidikan Konservasi Lingkungan (Sekolah Lingkungan)', 'Analisis Ekologi & Kerusakan Lingkungan', 'Manajemen Tanggap Darurat Bencana (SAR & Baksos)', 'Pengabdian Masyarakat Berbasis Lingkungan'],
                'equipment' => ['Modul Sekolah Lingkungan', 'Perangkat Uji Kualitas Air & Tanah', 'Alat Pembibitan & Penanaman Pohon', 'Perlengkapan Posko Baksos & Logistik'],
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'slug' => 'litbang',
                'name' => 'Divisi Litbang (Penelitian & Pengembangan)',
                'icon_name' => 'book-open',
                'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg',
                'cover_public_id' => 'samples/landscapes/beach-boat',
                'short_description' => 'Mengembangkan kajian ilmiah, riset keanekaragaman hayati/bentang alam, inovasi teknologi outdoor, serta evaluasi program kerja.',
                'full_description' => 'Divisi Penelitian dan Pengembangan (Litbang) bertugas meningkatkan kapasitas intelektual dan teknis organisasi. Mencakup riset lapangan saat ekspedisi (flora, fauna, geomorfologi, hidrologi), pengujian kelayakan alat outdoor, pemetaan digital/GIS, publikasi artikel penjelajahan, serta evaluasi berkala kinerja organisasi.',
                'study_materials' => ['Metodologi Penelitian Lapangan & GIS', 'Analisis Kelayakan & Pengujian Alat Outdoor', 'Penyusunan Artikel & Dokumentasi Ilmiah', 'Evaluasi Strategis Organisasi'],
                'equipment' => ['GPS Tracker & Kompas Geologi', 'Perangkat Lunak Pemetaan (GIS/QGIS)', 'Kamera Trap & Sensor Lapangan', 'Arsip Riset & Artikel Ekspedisi'],
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'slug' => 'karata',
                'name' => 'Divisi Karata (Kepala Rumah Tangga)',
                'icon_name' => 'home',
                'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
                'cover_public_id' => 'samples/landscapes/nature-mountains',
                'short_description' => 'Mengelola sekretariat, pemeliharaan dan inventarisasi peralatan petualangan alam bebas, serta tata kelola logistik operasional.',
                'full_description' => 'Divisi Karata bertanggung jawab penuh atas kenyamanan, ketertiban, dan pemeliharaan rumah tangga sekretariat KPA EMC². Divisi ini mengelola sistem inventarisasi seluruh alat outdoor (tenda, tali, alat panjat, perahu, alat masak), prosedur peminjaman alat, perawatan rutin agar safety standar terjaga, serta logistik umum sekretariat.',
                'study_materials' => ['Manajemen Logistik & Inventarisasi Barang', 'Standar Pemeliharaan & Safety Alat Outdoor', 'Tata Kelola & Sanitasi Sekretariat', 'Sistem Administrasi Peminjaman Alat'],
                'equipment' => ['Gudang Alat & Rak Inventaris Standar', 'Buku & Aplikasi Inventaris Digital', 'Perangkat Pembersih & Perawatan Alat (Dry Box, Lubricant)', 'Toolkit Reparasi Tenda & Perlengkapan'],
                'sort_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($divisions as $division) {
            Division::updateOrCreate(['slug' => $division['slug']], $division);
        }
    }
}
