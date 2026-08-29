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
		// Only run PostgreSQL-specific extensions and partial indexes on PostgreSQL connection
		if (DB::getDriverName() === 'pgsql') {
			// 1. Extensions
			DB::statement('CREATE EXTENSION IF NOT EXISTS "pg_trgm"');
			DB::statement('CREATE EXTENSION IF NOT EXISTS "unaccent"');

			// 2. Partial Indexes
			DB::statement('CREATE INDEX IF NOT EXISTS idx_members_public_roster ON members (division_id, status, sort_order) WHERE is_visible = true AND is_active = true AND deleted_at IS NULL');
			DB::statement('CREATE INDEX IF NOT EXISTS idx_posts_published_feed ON posts (published_at DESC) WHERE is_published = true AND is_active = true AND deleted_at IS NULL');
			DB::statement('CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts (is_featured) WHERE is_published = true AND is_active = true AND deleted_at IS NULL');
			DB::statement('CREATE INDEX IF NOT EXISTS idx_galleries_public ON galleries (event_date DESC) WHERE is_published = true AND is_active = true AND deleted_at IS NULL');
			DB::statement('CREATE INDEX IF NOT EXISTS idx_gallery_items_active ON gallery_items (gallery_id, sort_order) WHERE is_active = true AND deleted_at IS NULL');
			DB::statement('CREATE INDEX IF NOT EXISTS idx_events_active_public ON events (start_date DESC) WHERE is_published = true AND is_active = true');
			DB::statement('CREATE INDEX IF NOT EXISTS idx_registrations_active ON registrations (event_id, status) WHERE is_active = true');

			// 3. GIN & Trigram Indexes
			DB::statement('CREATE INDEX IF NOT EXISTS idx_categories_name_trgm ON categories USING GIN (name gin_trgm_ops)');
			DB::statement('CREATE INDEX IF NOT EXISTS idx_posts_title_trgm ON posts USING GIN (title gin_trgm_ops)');
			DB::statement('CREATE INDEX IF NOT EXISTS idx_posts_tags_gin ON posts USING GIN (tags)');
			DB::statement("CREATE INDEX IF NOT EXISTS idx_posts_fts ON posts USING GIN (to_tsvector('indonesian', title || ' ' || excerpt || ' ' || content))");
			DB::statement('CREATE INDEX IF NOT EXISTS idx_events_tags_gin ON events USING GIN (tags)');
			DB::statement('CREATE INDEX IF NOT EXISTS idx_events_form_fields_gin ON events USING GIN (form_fields)');
			DB::statement('CREATE INDEX IF NOT EXISTS idx_registrations_extra_data_gin ON registrations USING GIN (extra_data)');
		}
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		if (DB::getDriverName() === 'pgsql') {
			DB::statement('DROP INDEX IF EXISTS idx_registrations_extra_data_gin');
			DB::statement('DROP INDEX IF EXISTS idx_events_form_fields_gin');
			DB::statement('DROP INDEX IF EXISTS idx_events_tags_gin');
			DB::statement('DROP INDEX IF EXISTS idx_posts_fts');
			DB::statement('DROP INDEX IF EXISTS idx_posts_tags_gin');
			DB::statement('DROP INDEX IF EXISTS idx_posts_title_trgm');
			DB::statement('DROP INDEX IF EXISTS idx_categories_name_trgm');
			DB::statement('DROP INDEX IF EXISTS idx_registrations_active');
			DB::statement('DROP INDEX IF EXISTS idx_events_active_public');
			DB::statement('DROP INDEX IF EXISTS idx_gallery_items_active');
			DB::statement('DROP INDEX IF EXISTS idx_galleries_public');
			DB::statement('DROP INDEX IF EXISTS idx_posts_featured');
			DB::statement('DROP INDEX IF EXISTS idx_posts_published_feed');
			DB::statement('DROP INDEX IF EXISTS idx_members_public_roster');
		}
	}
};
