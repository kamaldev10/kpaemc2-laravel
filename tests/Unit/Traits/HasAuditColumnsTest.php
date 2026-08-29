<?php

namespace Tests\Unit\Traits;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HasAuditColumnsTest extends TestCase
{
    use RefreshDatabase;

    public function test_created_by_is_filled_when_user_is_authenticated(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $category = Category::create([
            'name' => 'Gunung Hutan',
            'slug' => 'gunung-hutan',
            'type' => 'post',
        ]);

        $this->assertEquals($user->id, $category->created_by);
        $this->assertEquals($user->id, $category->updated_by);
    }

    public function test_updated_by_is_updated_when_model_is_modified(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $this->actingAs($user1);
        $category = Category::create([
            'name' => 'Caving',
            'slug' => 'caving',
            'type' => 'post',
        ]);

        $this->actingAs($user2);
        $category->update(['name' => 'Speleologi & Caving']);

        $category->refresh();
        $this->assertEquals($user1->id, $category->created_by);
        $this->assertEquals($user2->id, $category->updated_by);
    }

    public function test_is_active_defaults_to_true(): void
    {
        $category = Category::create([
            'name' => 'Arung Jeram',
            'slug' => 'arung-jeram',
            'type' => 'post',
        ]);

        $this->assertTrue($category->is_active);
    }
}
