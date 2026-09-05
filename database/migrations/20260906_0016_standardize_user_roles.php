<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Standardize user role values to match App\Enums\RoleTypeEnum.
 *
 * Old values  →  New values
 * ---------      ----------
 * superadmin  →  super_admin
 * committee   →  admin        (committee is promoted to admin role)
 * editor      →  editor       (unchanged)
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('users')
            ->where('role', 'superadmin')
            ->update(['role' => 'super_admin']);

        DB::table('users')
            ->where('role', 'committee')
            ->update(['role' => 'admin']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('users')
            ->where('role', 'super_admin')
            ->update(['role' => 'superadmin']);

        DB::table('users')
            ->where('role', 'admin')
            ->update(['role' => 'committee']);
    }
};
