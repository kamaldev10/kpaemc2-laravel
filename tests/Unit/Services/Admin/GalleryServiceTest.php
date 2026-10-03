<?php

namespace Tests\Unit\Services\Admin;

use App\Models\Category;
use App\Models\Division;
use App\Models\Gallery;
use App\Models\GalleryItem;
use App\Models\User;
use App\Services\Admin\GalleryService;
use App\Services\CloudinaryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GalleryServiceTest extends TestCase
{
    use RefreshDatabase;

    protected GalleryService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $cloudinary = app(CloudinaryService::class);
        $this->service = new GalleryService($cloudinary);
    }

    public function test_paginate_filters_by_search_and_category(): void
    {
        $category = Category::factory()->create(['type' => 'gallery']);
        Gallery::factory()->create([
            'title' => 'Ekspedisi Kerinci',
            'category_id' => $category->id,
        ]);
        Gallery::factory()->create([
            'title' => 'DIKSAR XXXII',
        ]);

        $search = $this->service->paginate(['search' => 'Kerinci']);
        $catFilter = $this->service->paginate(['category_id' => $category->id]);

        $this->assertEquals(1, $search->total());
        $this->assertEquals('Ekspedisi Kerinci', $search->first()->title);

        $this->assertEquals(1, $catFilter->total());
    }

    public function test_create_gallery_stores_record_and_assigns_audit(): void
    {
        $actor = User::factory()->create();

        $gallery = $this->service->create([
            'title' => 'Dokumentasi Susur Sungai Kampar',
            'location' => 'Kampar Kiri',
            'event_date' => now()->toDateString(),
            'is_published' => true,
        ], null, [], $actor);

        $this->assertDatabaseHas('galleries', [
            'id' => $gallery->id,
            'title' => 'Dokumentasi Susur Sungai Kampar',
            'created_by' => $actor->id,
        ]);
    }

    public function test_update_gallery_modifies_record(): void
    {
        $actor = User::factory()->create();
        $gallery = Gallery::factory()->create(['title' => 'Judul Awal']);

        $updated = $this->service->update($gallery, [
            'title' => 'Judul Baru Diubah',
        ], null, [], [], $actor);

        $this->assertEquals('Judul Baru Diubah', $updated->title);
        $this->assertEquals($actor->id, $updated->updated_by);
    }

    public function test_delete_gallery(): void
    {
        $gallery = Gallery::factory()->create();

        $result = $this->service->delete($gallery);

        $this->assertTrue($result);
        $this->assertSoftDeleted('galleries', ['id' => $gallery->id]);
    }
}
