<?php

namespace Tests\Unit\Services\Admin;

use App\Models\Category;
use App\Models\User;
use App\Services\Admin\CategoryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryServiceTest extends TestCase
{
    use RefreshDatabase;

    protected CategoryService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new CategoryService;
    }

    public function test_paginate_filters_by_search_and_type(): void
    {
        Category::factory()->create(['name' => 'Konservasi Alam', 'type' => 'post']);
        Category::factory()->create(['name' => 'Pendidikan DIKSAR', 'type' => 'event']);

        $search = $this->service->paginate(['search' => 'Konservasi']);
        $type = $this->service->paginate(['type' => 'event']);

        $this->assertEquals(1, $search->total());
        $this->assertEquals('Konservasi Alam', $search->first()->name);

        $this->assertEquals(1, $type->total());
        $this->assertEquals('Pendidikan DIKSAR', $type->first()->name);
    }

    public function test_create_category_generates_slug_and_assigns_audit(): void
    {
        $actor = User::factory()->create();

        $category = $this->service->create([
            'name' => 'Flora & Fauna Riau',
            'type' => 'post',
            'color' => '#10b981',
        ], $actor);

        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'name' => 'Flora & Fauna Riau',
            'slug' => 'flora-fauna-riau',
            'created_by' => $actor->id,
        ]);
    }

    public function test_update_category_modifies_record(): void
    {
        $actor = User::factory()->create();
        $category = Category::factory()->create(['name' => 'Nama Awal']);

        $updated = $this->service->update($category, [
            'name' => 'Nama Diubah',
            'color' => '#f59e0b',
        ], $actor);

        $this->assertEquals('Nama Diubah', $updated->name);
        $this->assertEquals($actor->id, $updated->updated_by);
    }

    public function test_delete_category(): void
    {
        $category = Category::factory()->create();

        $result = $this->service->delete($category);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }
}
