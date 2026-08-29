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
        Schema::create('divisions', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('slug', 100)->unique();
            $table->string('name', 150);
            $table->string('icon_name', 100)->nullable();
            $table->string('cover_url', 500)->nullable();
            $table->string('cover_public_id', 300)->nullable();
            $table->string('short_description', 500)->nullable();
            $table->text('full_description')->nullable();
            $table->jsonb('study_materials')->nullable();
            $table->jsonb('equipment')->nullable();
            $table->smallInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->foreignId('created_by')->nullable()->index()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->index()->constrained('users')->nullOnDelete();
            $table->timestampsTz();

            $table->index('sort_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('divisions');
    }
};
