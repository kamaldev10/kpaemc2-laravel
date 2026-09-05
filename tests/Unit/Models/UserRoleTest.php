<?php

namespace Tests\Unit\Models;

use App\Enums\RoleTypeEnum;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserRoleTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_role_is_cast_to_role_type_enum(): void
    {
        $user = User::factory()->superAdmin()->create();

        $this->assertInstanceOf(RoleTypeEnum::class, $user->role);
        $this->assertSame(RoleTypeEnum::SUPER_ADMIN, $user->role);
    }

    public function test_user_has_role_matches_exact_role(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();
        $admin = User::factory()->admin()->create();
        $editor = User::factory()->editor()->create();

        $this->assertTrue($superAdmin->hasRole(RoleTypeEnum::SUPER_ADMIN));
        $this->assertFalse($superAdmin->hasRole(RoleTypeEnum::ADMIN));

        $this->assertTrue($admin->hasRole(RoleTypeEnum::ADMIN));
        $this->assertFalse($admin->hasRole(RoleTypeEnum::EDITOR));

        $this->assertTrue($editor->hasRole(RoleTypeEnum::EDITOR));
        $this->assertFalse($editor->hasRole(RoleTypeEnum::SUPER_ADMIN));
    }

    public function test_user_has_role_accepts_multiple_roles(): void
    {
        $admin = User::factory()->admin()->create();

        $this->assertTrue($admin->hasRole(RoleTypeEnum::SUPER_ADMIN, RoleTypeEnum::ADMIN));
        $this->assertFalse($admin->hasRole(RoleTypeEnum::SUPER_ADMIN, RoleTypeEnum::EDITOR));
    }

    public function test_user_is_at_least_respects_hierarchy(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();
        $admin = User::factory()->admin()->create();
        $editor = User::factory()->editor()->create();

        // SUPER_ADMIN is at least SUPER_ADMIN, ADMIN, and EDITOR
        $this->assertTrue($superAdmin->isAtLeast(RoleTypeEnum::SUPER_ADMIN));
        $this->assertTrue($superAdmin->isAtLeast(RoleTypeEnum::ADMIN));
        $this->assertTrue($superAdmin->isAtLeast(RoleTypeEnum::EDITOR));

        // ADMIN is at least ADMIN and EDITOR, but NOT SUPER_ADMIN
        $this->assertFalse($admin->isAtLeast(RoleTypeEnum::SUPER_ADMIN));
        $this->assertTrue($admin->isAtLeast(RoleTypeEnum::ADMIN));
        $this->assertTrue($admin->isAtLeast(RoleTypeEnum::EDITOR));

        // EDITOR is only at least EDITOR
        $this->assertFalse($editor->isAtLeast(RoleTypeEnum::SUPER_ADMIN));
        $this->assertFalse($editor->isAtLeast(RoleTypeEnum::ADMIN));
        $this->assertTrue($editor->isAtLeast(RoleTypeEnum::EDITOR));
    }
}
