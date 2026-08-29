<?php

namespace Tests\Unit\Models;

use App\Models\Division;
use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DivisionTest extends TestCase
{
    use RefreshDatabase;

    public function test_division_has_many_members_relation(): void
    {
        $division = Division::factory()->create();

        $member = Member::factory()->create([
            'division_id' => $division->id,
            'is_active' => true,
        ]);

        $this->assertTrue($division->members->contains($member));
        $this->assertEquals($division->id, $member->division->id);
    }
}
