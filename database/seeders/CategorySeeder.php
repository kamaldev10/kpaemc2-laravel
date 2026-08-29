<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            // Kategori Artikel / Post
            ['slug' => 'ekspedisi', 'name' => 'Ekspedisi & Penjelajahan', 'type' => 'post', 'color' => '#1B5E20', 'sort_order' => 1],
            ['slug' => 'konservasi-alam', 'name' => 'Konservasi & Edukasi', 'type' => 'post', 'color' => '#2E7D32', 'sort_order' => 2],
            ['slug' => 'tips-outdoor', 'name' => 'Tips & Wawasan Alam Bebas', 'type' => 'post', 'color' => '#E65100', 'sort_order' => 3],
            ['slug' => 'kabar-organisasi', 'name' => 'Kabar Organisasi & Alumni', 'type' => 'post', 'color' => '#0277BD', 'sort_order' => 4],
            ['slug' => 'kolaborasi', 'name' => 'Kolaborasi', 'type' => 'post', 'color' => '#6B21A8', 'sort_order' => 5],

            // Kategori Kegiatan / Event
            ['slug' => 'sekolah-lingkungan', 'name' => 'Sekolah Lingkungan', 'type' => 'event', 'color' => '#2E7D32', 'sort_order' => 1],
            ['slug' => 'seminar-workshop', 'name' => 'Seminar & Workshop', 'type' => 'event', 'color' => '#1565C0', 'sort_order' => 2],
            ['slug' => 'open-recruitment', 'name' => 'Penerimaan Anggota Baru', 'type' => 'event', 'color' => '#C2185B', 'sort_order' => 3],
            ['slug' => 'pengabdian-masyarakat', 'name' => 'Pengabdian Masyarakat & Baksos', 'type' => 'event', 'color' => '#00838F', 'sort_order' => 4],

            // Kategori Galeri
            ['slug' => 'galeri-ekspedisi', 'name' => 'Galeri Ekspedisi', 'type' => 'gallery', 'color' => '#4E342E', 'sort_order' => 1],
            ['slug' => 'galeri-kegiatan', 'name' => 'Galeri Kegiatan & Acara', 'type' => 'gallery', 'color' => '#37474F', 'sort_order' => 2],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
