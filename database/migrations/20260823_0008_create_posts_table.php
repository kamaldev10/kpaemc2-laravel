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
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignUuid('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->foreignUuid('division_id')->nullable()->constrained('divisions')->nullOnDelete();
            $table->string('title', 500);
            $table->string('slug', 600)->unique();
            $table->text('excerpt');
            $table->text('content');
            $table->string('content_source', 500)->nullable();
            $table->string('cover_image_url', 500);
            $table->string('cover_image_public_id', 300)->nullable();
            $table->string('cover_image_source', 500)->nullable();
            $table->string('author_name', 255)->nullable();
            $table->jsonb('tags')->default('[]');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(false);
            $table->timestampTz('published_at')->nullable();
            $table->timestampTz('post_date')->useCurrent();
            $table->boolean('is_active')->default(true);
            $table->foreignUuid('created_by')->nullable()->index()->constrained('users')->nullOnDelete();
            $table->foreignUuid('updated_by')->nullable()->index()->constrained('users')->nullOnDelete();
            $table->timestampsTz();
            $table->softDeletesTz();

            $table->index('category_id');
            $table->index('division_id');
            $table->index('user_id');
        });

        // Add check constraint to ensure tags is always a JSON array
        DB::statement("ALTER TABLE posts ADD CONSTRAINT check_posts_tags_array CHECK (jsonb_typeof(tags) = 'array')");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
