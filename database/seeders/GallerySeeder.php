<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Division;
use App\Models\Gallery;
use App\Models\GalleryItem;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::where('type', 'gallery')->get()->keyBy('slug');
        $divisions = Division::all()->keyBy('slug');

        // 1. Album Riset Litbang
        $album1 = Gallery::updateOrCreate(
            ['title' => 'Dokumentasi Riset Lapangan Divisi Litbang'],
            [
                'division_id' => $divisions['litbang']->id ?? null,
                'category_id' => $categories['galeri-ekspedisi']->id ?? null,
                'description' => 'Koleksi foto kegiatan penelitian lapangan, pengujian alat, dan pemetaan kawasan alam.',
                'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
                'cover_public_id' => 'samples/landscapes/nature-mountains',
                'event_date' => '2025-08-17',
                'location' => 'Kawasan Karst & Pegunungan Jawa Barat',
                'is_published' => true,
                'sort_order' => 1,
                'is_active' => true,
            ]
        );

        $items1 = [
            ['cloudinary_public_id' => 'samples/landscapes/nature-mountains', 'url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg', 'caption' => 'Pengambilan sampel uji kualitas air dan tanah', 'width' => 1920, 'height' => 1080, 'sort_order' => 1],
            ['cloudinary_public_id' => 'samples/landscapes/beach-boat', 'url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg', 'caption' => 'Pemetaan jalur dan plot vegetasi flora', 'width' => 1920, 'height' => 1080, 'sort_order' => 2],
        ];

        foreach ($items1 as $item) {
            $item['gallery_id'] = $album1->id;
            $item['type'] = 'photo';
            $item['is_active'] = true;
            GalleryItem::updateOrCreate(
                ['gallery_id' => $album1->id, 'sort_order' => $item['sort_order']],
                $item
            );
        }

        // 2. Album Sekolah Lingkungan SKLH
        $album2 = Gallery::updateOrCreate(
            ['title' => 'Dokumentasi Sekolah Lingkungan Divisi SKLH'],
            [
                'division_id' => $divisions['sklh']->id ?? null,
                'category_id' => $categories['galeri-kegiatan']->id ?? null,
                'description' => 'Aksi penanaman bibit pohon mangrove dan edukasi ekologi bersama pelajar.',
                'cover_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg',
                'cover_public_id' => 'samples/landscapes/beach-boat',
                'event_date' => '2025-11-20',
                'location' => 'Kawasan Konservasi Hutan Mangrove Muara Gembong',
                'is_published' => true,
                'sort_order' => 2,
                'is_active' => true,
            ]
        );

        $items2 = [
            ['cloudinary_public_id' => 'samples/landscapes/beach-boat', 'url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg', 'caption' => 'Peserta Sekolah Lingkungan menanam bibit mangrove', 'width' => 1920, 'height' => 1080, 'sort_order' => 1],
        ];

        foreach ($items2 as $item) {
            $item['gallery_id'] = $album2->id;
            $item['type'] = 'photo';
            $item['is_active'] = true;
            GalleryItem::updateOrCreate(
                ['gallery_id' => $album2->id, 'sort_order' => $item['sort_order']],
                $item
            );
        }
    }
}
