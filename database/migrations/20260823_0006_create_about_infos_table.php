<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('about_infos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('org_name');
            $table->string('founded_date', 100)->default('10 Oktober 1984');
            $table->string('motto', 500)->default('Bergerak Satu Asa, Berbekal Alam Lestari!');
            $table->text('description');
            $table->text('vision');
            $table->jsonb('mission');
            $table->string('active_term', 100)->default('2025/2026');
            $table->jsonb('org_structure');
            $table->string('logo_url', 500)->nullable();
            $table->string('logo_public_id', 300)->nullable();
            $table->string('cover_url', 500)->nullable();
            $table->string('cover_public_id', 300)->nullable();
            $table->boolean('is_active')->default(true);
            $table->foreignUuid('created_by')->nullable()->index()->constrained('users')->nullOnDelete();
            $table->foreignUuid('updated_by')->nullable()->index()->constrained('users')->nullOnDelete();
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_infos');
    }
};
