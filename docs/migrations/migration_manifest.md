# Migration Manifest & Specifications — KPA EMC² Web Portal

> **Target Database:** PostgreSQL 18+ · **Schema Version:** 1.0.0 · **Naming Format:** `YYYYMMDD_XXXX` (`20260823_0001` s/d `20260823_0015`)

---

## 1. `20260823_0001_create_users_table.php`

**Tabel:** `users`, `password_reset_tokens`, `sessions`

### Kolom `users`:
- `id`: `BIGINT GENERATED ALWAYS AS IDENTITY` (PK)
- `name`: `VARCHAR(255)` (NOT NULL)
- `email`: `VARCHAR(255)` (NOT NULL, UNIQUE)
- `email_verified_at`: `TIMESTAMPTZ` (NULLABLE)
- `password`: `VARCHAR(255)` (NOT NULL)
- `role`: `VARCHAR(50)` (NOT NULL, DEFAULT `'editor'`)
- `avatar_url`: `VARCHAR(500)` (NULLABLE)
- `avatar_public_id`: `VARCHAR(300)` (NULLABLE)
- `remember_token`: `VARCHAR(100)` (NULLABLE)
- `is_active`: `BOOLEAN` (NOT NULL, DEFAULT `true`)
- `created_by`: `BIGINT` (FK→`users.id`, NULLABLE, ON DELETE SET NULL)
- `updated_by`: `BIGINT` (FK→`users.id`, NULLABLE, ON DELETE SET NULL)
- `created_at`, `updated_at`: `TIMESTAMPTZ` (NULLABLE)

---

## 2. `20260823_0002_create_cache_table.php`

**Tabel:** `cache`, `cache_locks`

---

## 3. `20260823_0003_create_jobs_table.php`

**Tabel:** `jobs`, `job_batches`, `failed_jobs`

---

## 4. `20260823_0004_create_divisions_table.php`

**Tabel:** `divisions`

### Kolom:
- `id`: `SMALLINT GENERATED ALWAYS AS IDENTITY` (PK)
- `slug`: `VARCHAR(100)` (NOT NULL, UNIQUE)
- `name`: `VARCHAR(150)` (NOT NULL)
- `icon_name`: `VARCHAR(100)` (NULLABLE)
- `cover_url`: `VARCHAR(500)` (NULLABLE)
- `cover_public_id`: `VARCHAR(300)` (NULLABLE)
- `short_description`: `VARCHAR(500)` (NULLABLE)
- `full_description`: `TEXT` (NULLABLE)
- `study_materials`: `JSONB` (NULLABLE)
- `equipment`: `JSONB` (NULLABLE)
- `sort_order`: `SMALLINT` (NOT NULL, DEFAULT `0`)
- `is_active`: `BOOLEAN` (NOT NULL, DEFAULT `true`)
- `created_by`: `BIGINT` (FK→`users.id`, NULLABLE, ON DELETE SET NULL)
- `updated_by`: `BIGINT` (FK→`users.id`, NULLABLE, ON DELETE SET NULL)
- `created_at`, `updated_at`: `TIMESTAMPTZ` (NULLABLE)

---

## 5. `20260823_0005_create_categories_table.php`

**Tabel:** `categories`

### Kolom:
- `id`: `BIGINT GENERATED ALWAYS AS IDENTITY` (PK)
- `slug`: `VARCHAR(100)` (NOT NULL, UNIQUE)
- `name`: `VARCHAR(150)` (NOT NULL)
- `type`: `VARCHAR(50)` (NOT NULL, DEFAULT `'general'`)
- `color`: `VARCHAR(20)` (NULLABLE)
- `sort_order`: `SMALLINT` (NOT NULL, DEFAULT `0`)
- `is_active`: `BOOLEAN` (NOT NULL, DEFAULT `true`)
- `created_by`: `BIGINT` (FK→`users.id`, NULLABLE, ON DELETE SET NULL)
- `updated_by`: `BIGINT` (FK→`users.id`, NULLABLE, ON DELETE SET NULL)
- `created_at`, `updated_at`: `TIMESTAMPTZ` (NULLABLE)

---

## 6. `20260823_0006_create_about_infos_table.php`

**Tabel:** `about_infos` (Singleton)

### Kolom:
- `id`: `SMALLINT` (PK, DEFAULT `1`)
- `org_name`: `VARCHAR(255)` (NOT NULL)
- `founded_date`: `VARCHAR(100)` (NOT NULL, DEFAULT `'10 Oktober 1984'`)
- `motto`: `VARCHAR(500)` (NOT NULL, DEFAULT `'Bergerak Satu Asa, Berbekal Alam Lestari!'`)
- `description`: `TEXT` (NOT NULL)
- `vision`: `TEXT` (NOT NULL)
- `mission`: `JSONB` (NOT NULL)
- `active_term`: `VARCHAR(100)` (NOT NULL, DEFAULT `'2025/2026'`)
- `org_structure`: `JSONB` (NOT NULL)
- `logo_url`: `VARCHAR(500)` (NULLABLE)
- `logo_public_id`: `VARCHAR(300)` (NULLABLE)
- `cover_url`: `VARCHAR(500)` (NULLABLE)
- `cover_public_id`: `VARCHAR(300)` (NULLABLE)
- `is_active`: `BOOLEAN` (NOT NULL, DEFAULT `true`)
- `created_by`: `BIGINT` (FK→`users.id`, NULLABLE, ON DELETE SET NULL)
- `updated_by`: `BIGINT` (FK→`users.id`, NULLABLE, ON DELETE SET NULL)
- `created_at`, `updated_at`: `TIMESTAMPTZ` (NULLABLE)

---

## 7. `20260823_0007_create_members_table.php`

**Tabel:** `members`

### Kolom:
- `id`: `BIGINT GENERATED ALWAYS AS IDENTITY` (PK)
- `member_number`: `VARCHAR(50)` (NOT NULL, UNIQUE)
- `name`: `VARCHAR(255)` (NOT NULL)
- `division_id`: `SMALLINT` (FK→`divisions.id`, NULLABLE, ON DELETE SET NULL)
- `position`: `VARCHAR(150)` (NULLABLE)
- `batch_year`: `SMALLINT` (NULLABLE)
- `major`: `VARCHAR(255)` (NULLABLE)
- `phone`: `VARCHAR(20)` (NULLABLE)
- `email`: `VARCHAR(255)` (NULLABLE)
- `status`: `VARCHAR(50)` (NOT NULL, DEFAULT `'regular'`)
- `bio`: `TEXT` (NULLABLE)
- `avatar_url`: `VARCHAR(500)` (NULLABLE)
- `avatar_public_id`: `VARCHAR(300)` (NULLABLE)
- `is_visible`: `BOOLEAN` (NOT NULL, DEFAULT `true`)
- `sort_order`: `INTEGER` (NOT NULL, DEFAULT `0`)
- `is_active`: `BOOLEAN` (NOT NULL, DEFAULT `true`)
- `created_by`: `BIGINT` (FK→`users.id`, NULLABLE, SET NULL)
- `updated_by`: `BIGINT` (FK→`users.id`, NULLABLE, SET NULL)
- `created_at`, `updated_at`: `TIMESTAMPTZ` (NULLABLE)
- `deleted_at`: `TIMESTAMPTZ` (NULLABLE, Soft Deletes)

---

## 8. `20260823_0008_create_posts_table.php`

**Tabel:** `posts`

### Kolom:
- `id`: `BIGINT GENERATED ALWAYS AS IDENTITY` (PK)
- `user_id`: `BIGINT` (FK→`users.id`, NULLABLE, SET NULL)
- `category_id`: `BIGINT` (FK→`categories.id`, NULLABLE, SET NULL)
- `division_id`: `SMALLINT` (FK→`divisions.id`, NULLABLE, SET NULL)
- `title`: `VARCHAR(500)` (NOT NULL)
- `slug`: `VARCHAR(600)` (NOT NULL, UNIQUE)
- `excerpt`: `TEXT` (NOT NULL)
- `content`: `TEXT` (NOT NULL)
- `content_source`: `VARCHAR(500)` (NULLABLE)
- `cover_image_url`: `VARCHAR(500)` (NOT NULL)
- `cover_image_public_id`: `VARCHAR(300)` (NULLABLE)
- `cover_image_source`: `VARCHAR(500)` (NULLABLE)
- `author_name`: `VARCHAR(255)` (NULLABLE)
- `tags`: `JSONB` (NOT NULL, DEFAULT `'[]'::jsonb`)
- `is_featured`: `BOOLEAN` (NOT NULL, DEFAULT `false`)
- `is_published`: `BOOLEAN` (NOT NULL, DEFAULT `false`)
- `published_at`: `TIMESTAMPTZ` (NULLABLE)
- `post_date`: `TIMESTAMPTZ` (NOT NULL, DEFAULT `CURRENT_TIMESTAMP`)
- `is_active`: `BOOLEAN` (NOT NULL, DEFAULT `true`)
- `created_by`, `updated_by`: `BIGINT` (FK→`users.id`, NULLABLE, SET NULL)
- `created_at`, `updated_at`: `TIMESTAMPTZ` (NULLABLE)
- `deleted_at`: `TIMESTAMPTZ` (NULLABLE, Soft Deletes)

**Constraint:**
- `CONSTRAINT check_posts_tags_array CHECK (jsonb_typeof(tags) = 'array')`

---

## 9. `20260823_0009_create_galleries_table.php`

**Tabel:** `galleries`

### Kolom:
- `id`: `BIGINT GENERATED ALWAYS AS IDENTITY` (PK)
- `division_id`: `SMALLINT` (FK→`divisions.id`, NULLABLE, SET NULL)
- `category_id`: `BIGINT` (FK→`categories.id`, NULLABLE, SET NULL)
- `title`: `VARCHAR(255)` (NOT NULL)
- `description`: `TEXT` (NULLABLE)
- `cover_url`: `VARCHAR(500)` (NULLABLE)
- `cover_public_id`: `VARCHAR(300)` (NULLABLE)
- `event_date`: `DATE` (NULLABLE)
- `location`: `VARCHAR(255)` (NULLABLE)
- `is_published`: `BOOLEAN` (NOT NULL, DEFAULT `false`)
- `sort_order`: `INTEGER` (NOT NULL, DEFAULT `0`)
- `is_active`: `BOOLEAN` (NOT NULL, DEFAULT `true`)
- `created_by`, `updated_by`: `BIGINT` (FK→`users.id`, NULLABLE, SET NULL)
- `created_at`, `updated_at`: `TIMESTAMPTZ` (NULLABLE)
- `deleted_at`: `TIMESTAMPTZ` (NULLABLE, Soft Deletes)

---

## 10. `20260823_0010_create_gallery_items_table.php`

**Tabel:** `gallery_items`

### Kolom:
- `id`: `BIGINT GENERATED ALWAYS AS IDENTITY` (PK)
- `gallery_id`: `BIGINT` (FK→`galleries.id`, ON DELETE CASCADE)
- `cloudinary_public_id`: `VARCHAR(300)` (NOT NULL)
- `url`: `VARCHAR(500)` (NOT NULL)
- `type`: `VARCHAR(20)` (NOT NULL, DEFAULT `'photo'`)
- `caption`: `VARCHAR(500)` (NULLABLE)
- `width`: `INTEGER` (NULLABLE)
- `height`: `INTEGER` (NULLABLE)
- `sort_order`: `INTEGER` (NOT NULL, DEFAULT `0`)
- `is_active`: `BOOLEAN` (NOT NULL, DEFAULT `true`)
- `created_by`, `updated_by`: `BIGINT` (FK→`users.id`, NULLABLE, SET NULL)
- `created_at`, `updated_at`: `TIMESTAMPTZ` (NULLABLE)
- `deleted_at`: `TIMESTAMPTZ` (NULLABLE, Soft Deletes)

---

## 11. `20260823_0011_create_events_table.php`

**Tabel:** `events`

### Kolom:
- `id`: `BIGINT GENERATED ALWAYS AS IDENTITY` (PK)
- `slug`: `VARCHAR(200)` (NOT NULL, UNIQUE)
- `category_id`: `BIGINT` (FK→`categories.id`, NULLABLE, SET NULL)
- `division_id`: `SMALLINT` (FK→`divisions.id`, NULLABLE, SET NULL)
- `title`: `VARCHAR(300)` (NOT NULL)
- `type`: `VARCHAR(100)` (NOT NULL)
- `description`: `TEXT` (NULLABLE)
- `cover_url`: `VARCHAR(500)` (NULLABLE)
- `cover_public_id`: `VARCHAR(300)` (NULLABLE)
- `location`: `VARCHAR(300)` (NULLABLE)
- `start_date`: `TIMESTAMPTZ` (NOT NULL)
- `end_date`: `TIMESTAMPTZ` (NULLABLE)
- `registration_open_at`: `TIMESTAMPTZ` (NULLABLE)
- `registration_close_at`: `TIMESTAMPTZ` (NULLABLE)
- `max_participants`: `INTEGER` (NULLABLE)
- `requires_payment`: `BOOLEAN` (NOT NULL, DEFAULT `false`)
- `payment_amount`: `NUMERIC(12,2)` (NULLABLE)
- `form_fields`: `JSONB` (NULLABLE)
- `tags`: `JSONB` (NOT NULL, DEFAULT `'[]'::jsonb`)
- `is_published`: `BOOLEAN` (NOT NULL, DEFAULT `false`)
- `is_active`: `BOOLEAN` (NOT NULL, DEFAULT `true`)
- `created_by`, `updated_by`: `BIGINT` (FK→`users.id`, NULLABLE, SET NULL)
- `created_at`, `updated_at`: `TIMESTAMPTZ` (NULLABLE)

**Constraint:**
- `CONSTRAINT check_events_tags_array CHECK (jsonb_typeof(tags) = 'array')`

---

## 12. `20260823_0012_create_registrations_table.php`

**Tabel:** `registrations`

### Kolom:
- `id`: `BIGINT GENERATED ALWAYS AS IDENTITY` (PK)
- `event_id`: `BIGINT` (FK→`events.id`, ON DELETE CASCADE)
- `registration_code`: `VARCHAR(30)` (NOT NULL, UNIQUE)
- `full_name`: `VARCHAR(255)` (NOT NULL)
- `email`: `VARCHAR(255)` (NOT NULL)
- `phone`: `VARCHAR(20)` (NOT NULL)
- `gender`: `VARCHAR(10)` (NULLABLE)
- `birth_date`: `DATE` (NULLABLE)
- `place_of_birth`: `VARCHAR(150)` (NULLABLE)
- `address`: `TEXT` (NULLABLE)
- `institution`: `VARCHAR(255)` (NULLABLE)
- `major`: `VARCHAR(255)` (NULLABLE)
- `occupation`: `VARCHAR(255)` (NULLABLE)
- `motivation`: `TEXT` (NULLABLE)
- `photo_url`: `VARCHAR(500)` (NULLABLE)
- `photo_public_id`: `VARCHAR(300)` (NULLABLE)
- `document_url`: `VARCHAR(500)` (NULLABLE)
- `document_public_id`: `VARCHAR(300)` (NULLABLE)
- `extra_data`: `JSONB` (NULLABLE)
- `payment_proof_url`: `VARCHAR(500)` (NULLABLE)
- `payment_proof_public_id`: `VARCHAR(300)` (NULLABLE)
- `status`: `VARCHAR(50)` (NOT NULL, DEFAULT `'pending'`)
- `reviewer_notes`: `TEXT` (NULLABLE)
- `is_active`: `BOOLEAN` (NOT NULL, DEFAULT `true`)
- `created_by`, `updated_by`: `BIGINT` (FK→`users.id`, NULLABLE, SET NULL)
- `created_at`, `updated_at`: `TIMESTAMPTZ` (NULLABLE)

---

## 13. `20260823_0013_create_contacts_table.php`

**Tabel:** `contacts`

### Kolom:
- `id`: `BIGINT GENERATED ALWAYS AS IDENTITY` (PK)
- `name`: `VARCHAR(255)` (NOT NULL)
- `email`: `VARCHAR(255)` (NOT NULL)
- `subject`: `VARCHAR(500)` (NOT NULL)
- `message`: `TEXT` (NOT NULL)
- `is_read`: `BOOLEAN` (NOT NULL, DEFAULT `false`)
- `ip_address`: `INET` (NULLABLE)
- `is_active`: `BOOLEAN` (NOT NULL, DEFAULT `true`)
- `created_by`, `updated_by`: `BIGINT` (FK→`users.id`, NULLABLE, SET NULL)
- `created_at`, `updated_at`: `TIMESTAMPTZ` (NULLABLE)

---

## 14. `20260823_0014_create_site_settings_table.php`

**Tabel:** `site_settings`

### Kolom:
- `id`: `BIGINT GENERATED ALWAYS AS IDENTITY` (PK)
- `key`: `VARCHAR(150)` (NOT NULL, UNIQUE)
- `value`: `TEXT` (NULLABLE)
- `group`: `VARCHAR(100)` (NOT NULL, DEFAULT `'general'`)
- `description`: `VARCHAR(500)` (NULLABLE)
- `is_active`: `BOOLEAN` (NOT NULL, DEFAULT `true`)
- `created_by`, `updated_by`: `BIGINT` (FK→`users.id`, NULLABLE, SET NULL)
- `created_at`, `updated_at`: `TIMESTAMPTZ` (NULLABLE)

---

## 15. `20260823_0015_create_pg_extensions_and_indexes.php`

**Fungsi:** Menyiapkan ekstensi PostgreSQL, partial indexes, dan GIN indexes.

### Ekstensi:
- `pg_trgm`: Untuk typo-tolerant substring search pada `posts.title` dan `categories.name`.
- `unaccent`: Untuk pencarian teks tanpa aksen.

### Partial Indexes:
- `idx_members_public_roster`: `ON members (division_id, status, sort_order) WHERE is_visible = true AND is_active = true AND deleted_at IS NULL`
- `idx_posts_published_feed`: `ON posts (published_at DESC) WHERE is_published = true AND is_active = true AND deleted_at IS NULL`
- `idx_posts_featured`: `ON posts (is_featured) WHERE is_published = true AND is_active = true AND deleted_at IS NULL`
- `idx_galleries_public`: `ON galleries (event_date DESC) WHERE is_published = true AND is_active = true AND deleted_at IS NULL`
- `idx_gallery_items_active`: `ON gallery_items (gallery_id, sort_order) WHERE is_active = true AND deleted_at IS NULL`
- `idx_events_active_public`: `ON events (start_date DESC) WHERE is_published = true AND is_active = true`
- `idx_registrations_active`: `ON registrations (event_id, status) WHERE is_active = true`

### GIN Indexes:
- `idx_categories_name_trgm`: `ON categories USING GIN (name gin_trgm_ops)`
- `idx_posts_title_trgm`: `ON posts USING GIN (title gin_trgm_ops)`
- `idx_posts_tags_gin`: `ON posts USING GIN (tags)`
- `idx_posts_fts`: `ON posts USING GIN (to_tsvector('indonesian', title || ' ' || excerpt || ' ' || content))`
- `idx_events_tags_gin`: `ON events USING GIN (tags)`
- `idx_events_form_fields_gin`: `ON events USING GIN (form_fields)`
- `idx_registrations_extra_data_gin`: `ON registrations USING GIN (extra_data)`
