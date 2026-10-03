<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('CREATE EXTENSION IF NOT EXISTS "pg_trgm"');

            // 1. Members Indexes (Batch year desc & pengurus optimization)
            DB::statement('CREATE INDEX IF NOT EXISTS idx_members_batch_pengurus_active ON members (batch_year DESC, is_pengurus, is_active) WHERE deleted_at IS NULL');
            DB::statement('CREATE INDEX IF NOT EXISTS idx_members_division_batch ON members (division_id, batch_year DESC, sort_order ASC) WHERE deleted_at IS NULL');
            DB::statement('CREATE INDEX IF NOT EXISTS idx_members_name_trgm ON members USING GIN (name gin_trgm_ops)');

            // 2. Events Indexes
            DB::statement('CREATE INDEX IF NOT EXISTS idx_events_title_trgm ON events USING GIN (title gin_trgm_ops)');
            DB::statement('CREATE INDEX IF NOT EXISTS idx_events_location_trgm ON events USING GIN (location gin_trgm_ops)');
            DB::statement('CREATE INDEX IF NOT EXISTS idx_events_published_start_date ON events (is_published, is_active, start_date ASC)');

            // 3. Galleries Indexes
            DB::statement('CREATE INDEX IF NOT EXISTS idx_galleries_title_trgm ON galleries USING GIN (title gin_trgm_ops)');
            DB::statement('CREATE INDEX IF NOT EXISTS idx_galleries_cat_div ON galleries (category_id, division_id, event_date DESC) WHERE deleted_at IS NULL');

            // 4. Posts Composite Indexes
            DB::statement('CREATE INDEX IF NOT EXISTS idx_posts_cat_div_pub ON posts (category_id, division_id, is_published, is_active, published_at DESC) WHERE deleted_at IS NULL');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('DROP INDEX IF EXISTS idx_posts_cat_div_pub');
            DB::statement('DROP INDEX IF EXISTS idx_galleries_cat_div');
            DB::statement('DROP INDEX IF EXISTS idx_galleries_title_trgm');
            DB::statement('DROP INDEX IF EXISTS idx_events_published_start_date');
            DB::statement('DROP INDEX IF EXISTS idx_events_location_trgm');
            DB::statement('DROP INDEX IF EXISTS idx_events_title_trgm');
            DB::statement('DROP INDEX IF EXISTS idx_members_name_trgm');
            DB::statement('DROP INDEX IF EXISTS idx_members_division_batch');
            DB::statement('DROP INDEX IF EXISTS idx_members_batch_pengurus_active');
        }
    }
};
