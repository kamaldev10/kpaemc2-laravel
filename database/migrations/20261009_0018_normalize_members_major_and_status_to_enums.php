<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Normalize status values in members table
        DB::table('members')
            ->whereIn('status', ['Anggota Biasa', 'active'])
            ->update(['status' => 'regular']);

        DB::table('members')
            ->whereIn('status', ['Anggota Luar Biasa', 'honorary'])
            ->update(['status' => 'honorary']);

        DB::table('members')
            ->whereIn('status', ['Non Aktif', 'inactive'])
            ->update(['status' => 'inactive']);

        // Set default for unknown status
        DB::table('members')
            ->whereNotIn('status', ['regular', 'honorary', 'inactive'])
            ->orWhereNull('status')
            ->update(['status' => 'regular']);

        // Normalize major values in members table
        DB::table('members')->where('major', 'Sistem Informasi')->update(['major' => 'sistem_informasi']);
        DB::table('members')->whereIn('major', ['Manajemen Informatika', 'Manajeman Informatika'])->update(['major' => 'manajemen_informatika']);
        DB::table('members')->where('major', 'Biologi')->update(['major' => 'biologi']);
        DB::table('members')->where('major', 'Fisika')->update(['major' => 'fisika']);
        DB::table('members')->where('major', 'Kimia')->update(['major' => 'kimia']);
        DB::table('members')->where('major', 'Matematika')->update(['major' => 'matematika']);
        DB::table('members')->where('major', 'Statistika')->update(['major' => 'statistika']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No loss of meaning on rollback
    }
};
