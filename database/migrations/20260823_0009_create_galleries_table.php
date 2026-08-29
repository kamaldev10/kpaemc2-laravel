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
        Schema::create('galleries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('division_id')->nullable()->constrained('divisions')->nullOnDelete();
            $table->foreignUuid('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->string('cover_url', 500)->nullable();
            $table->string('cover_public_id', 300)->nullable();
            $table->date('event_date')->nullable();
            $table->string('location', 255)->nullable();
            $table->boolean('is_published')->default(false);
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->foreignUuid('created_by')->nullable()->index()->constrained('users')->nullOnDelete();
            $table->foreignUuid('updated_by')->nullable()->index()->constrained('users')->nullOnDelete();
            $table->timestampsTz();
            $table->softDeletesTz();

            $table->index('division_id');
            $table->index('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galleries');
    }
};
