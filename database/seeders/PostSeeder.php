<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Division;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::first();
        $categories = Category::where('type', 'post')->get()->keyBy('slug');
        $divisions = Division::all()->keyBy('slug');

        $posts = [
            [
                'title' => 'Hasil Riset Lapangan Litbang: Analisis Kualitas Air dan Hidrologi Kawasan Karst',
                'excerpt' => 'Kajian mendalam Divisi Litbang KPA EMC² mengenai tandon air bawah tanah dan keanekaragaman biota perguaan.',
                'content' => '<p>Divisi Penelitian dan Pengembangan (Litbang) KPA EMC² telah merampungkan survei berkala kualitas air tanah pada kawasan tangkapan karst. Hasil uji menunjukkan tingkat kemurnian alami yang tinggi namun rentan terhadap pencemaran limbah permukaan.</p><p>Rekomendasi konservasi telah diserahkan kepada pihak pengelola kawasan dan masyarakat setempat guna menjaga keberlanjutan sumber air bersih.</p>',
                'category_id' => $categories['ekspedisi']->id ?? null,
                'division_id' => $divisions['litbang']->id ?? null,
                'cover_image_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
                'cover_image_public_id' => 'samples/landscapes/nature-mountains',
                'cover_image_source' => 'Dokumentasi Divisi Litbang KPA EMC²',
                'author_name' => 'Bayu Wicaksono',
                'tags' => ['litbang', 'riset-alam', 'karst', 'hidrologi', 'konservasi'],
                'is_featured' => true,
                'is_published' => true,
                'published_at' => now()->subDays(10),
            ],
            [
                'title' => 'Aksi Nyata Divisi SKLH: Penanaman 1.000 Mangrove Bersama Siswa Sekolah Lingkungan',
                'excerpt' => 'Kolaborasi generasi muda dalam memitigasi abrasi pantai dan memulihkan ekosistem pesisir utara.',
                'content' => '<p>Divisi Sosial Kemasyarakatan & Lingkungan Hidup (SKLH) KPA EMC² kembali menggelar aksi lapangan penanaman 1.000 bibit mangrove. Kegiatan ini diikuti oleh 60 siswa perwakilan SMA/SMK dalam rangkaian program Sekolah Lingkungan.</p>',
                'category_id' => $categories['konservasi-alam']->id ?? null,
                'division_id' => $divisions['sklh']->id ?? null,
                'cover_image_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg',
                'cover_image_public_id' => 'samples/landscapes/beach-boat',
                'cover_image_source' => 'Dokumentasi Divisi SKLH',
                'author_name' => 'Siti Aisyah',
                'tags' => ['sklh', 'sekolah-lingkungan', 'mangrove', 'pengabdian-masyarakat'],
                'is_featured' => true,
                'is_published' => true,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Panduan Manajemen Logistik & Standar Perawatan Alat Petualangan Outdoor',
                'excerpt' => 'Tips dari Divisi Karata untuk memastikan tenda, tali, dan perlengkapan alam bebas awet serta berstandar safety tinggi.',
                'content' => '<p>Peralatan outdoor adalah instrumen keselamatan utama dalam setiap kegiatan penjelajahan. Divisi Karata (Kepala Rumah Tangga) membagikan prosedur standar pembersihan dry-cleaning tenda, pencucian tali statis/dinamis, hingga inspeksi kelayakan hardware panjat.</p>',
                'category_id' => $categories['tips-outdoor']->id ?? null,
                'division_id' => $divisions['karata']->id ?? null,
                'cover_image_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
                'cover_image_public_id' => 'samples/landscapes/nature-mountains',
                'cover_image_source' => 'Divisi Karata KPA EMC²',
                'author_name' => 'Dimas Nugraha',
                'tags' => ['karata', 'manajemen-alat', 'logistik', 'safety-outdoor', 'tips'],
                'is_featured' => false,
                'is_published' => true,
                'published_at' => now()->subDays(2),
            ],
        ];

        foreach ($posts as $postData) {
            $postData['slug'] = Str::slug($postData['title']);
            $postData['user_id'] = $admin->id ?? null;
            $postData['is_active'] = true;
            $postData['post_date'] = $postData['published_at'] ?? now();

            Post::updateOrCreate(['slug' => $postData['slug']], $postData);
        }
    }
}
