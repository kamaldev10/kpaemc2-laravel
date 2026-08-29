<?php

namespace Tests\Feature\Public;

use App\Models\AboutInfo;
use App\Models\Division;
use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class StructureTest extends TestCase
{
    use RefreshDatabase;

    public function test_structure_index_page_can_be_rendered(): void
    {
        AboutInfo::factory()->create([
            'is_active' => true,
        ]);

        $division = Division::factory()->create([
            'is_active' => true,
        ]);

        Member::factory()->count(3)->create([
            'division_id' => $division->id,
            'is_active' => true,
            'is_pengurus' => true,
        ]);

        $response = $this->get(route('structure.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Structure/Index')
            ->has('members', 3)
            ->has('divisions', 1)
            ->has('aboutInfo')
        );
    }
}
