<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('slug', 200)->unique();
            $table->foreignUuid('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->foreignUuid('division_id')->nullable()->constrained('divisions')->nullOnDelete();
            $table->string('title', 300);
            $table->string('type', 100);
            $table->text('description')->nullable();
            $table->string('cover_url', 500)->nullable();
            $table->string('cover_public_id', 300)->nullable();
            $table->string('location', 300)->nullable();
            $table->timestampTz('start_date');
            $table->timestampTz('end_date')->nullable();
            $table->timestampTz('registration_open_at')->nullable();
            $table->timestampTz('registration_close_at')->nullable();
            $table->integer('max_participants')->nullable();
            $table->boolean('requires_payment')->default(false);
            $table->decimal('payment_amount', 12, 2)->nullable();
            $table->jsonb('form_fields')->nullable();
            $table->jsonb('tags')->default('[]');
            $table->boolean('is_published')->default(false);
            $table->boolean('is_active')->default(true);
            $table->foreignUuid('created_by')->nullable()->index()->constrained('users')->nullOnDelete();
            $table->foreignUuid('updated_by')->nullable()->index()->constrained('users')->nullOnDelete();
            $table->timestampsTz();

            $table->index('category_id');
            $table->index('division_id');
            $table->index('type');
        });

        // Add check constraint to ensure tags is always a JSON array
        DB::statement("ALTER TABLE events ADD CONSTRAINT check_events_tags_array CHECK (jsonb_typeof(tags) = 'array')");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
