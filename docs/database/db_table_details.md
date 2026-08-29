# Table Details — KPA EMC² Web Portal

> **Engine:** PostgreSQL 18+ · **Laravel Migrations** · **Eloquent ORM**
>
> **Standar Arsitektur:**
>
> 1. **Total 12 Tabel:** Taksonomi disatukan ke dalam `categories` (menghapus redundansi `tags`/`post_tag`).
> 2. **Relasi Divisi Terpadu:** `posts`, `events`, `galleries`, `members` berelasi opsional ke `divisions` (`division_id` NULLABLE).
> 3. **5 Kolom Audit Log Wajib:** `is_active`, `created_by`, `updated_by`, `created_at`, `updated_at`.
> 4. **Zero-BLOB Policy:** Seluruh aset media disimpan di Cloudinary (`*_url` & `*_public_id`).

---

## Schema Detail

---

### 1. `users`

Admin/staff accounts for Filament Admin Panel with role-based access.

| Column              | PostgreSQL Type                       | Constraint                        | Description                                       |
| ------------------- | ------------------------------------- | --------------------------------- | ------------------------------------------------- |
| `id`                | `BIGINT GENERATED ALWAYS AS IDENTITY` | PRIMARY KEY                       | Unique ID                                         |
| `name`              | `VARCHAR(255)`                        | NOT NULL                          | Full name                                         |
| `email`             | `VARCHAR(255)`                        | NOT NULL, UNIQUE                  | Login email                                       |
| `email_verified_at` | `TIMESTAMPTZ`                         | NULLABLE                          | Email verification time                           |
| `password`          | `VARCHAR(255)`                        | NOT NULL                          | bcrypt hash                                       |
| `role`              | `VARCHAR(50)`                         | NOT NULL, DEFAULT `'editor'`      | Access level: `superadmin`, `editor`, `committee` |
| `avatar_url`        | `VARCHAR(500)`                        | NULLABLE                          | Cloudinary HTTPS CDN URL                          |
| `avatar_public_id`  | `VARCHAR(300)`                        | NULLABLE                          | Cloudinary Public ID for delete/replace           |
| `remember_token`    | `VARCHAR(100)`                        | NULLABLE                          |                                                   |
| `is_active`         | `BOOLEAN`                             | NOT NULL, DEFAULT `true`          | Status akun aktif/nonaktif                        |
| `created_by`        | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL | Superadmin pembuat                                |
| `updated_by`        | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL | Superadmin pengedit terakhir                      |
| `created_at`        | `TIMESTAMPTZ`                         | NULLABLE                          |                                                   |
| `updated_at`        | `TIMESTAMPTZ`                         | NULLABLE                          |                                                   |

**Indexes & Constraints:**

- `UNIQUE(email)`
- `CHECK(role IN ('superadmin', 'editor', 'committee'))`
- `INDEX(created_by)`
- `INDEX(updated_by)`

---

### 2. `about_infos`

Singleton table (`id=1`). Stores all "About Us" page content.

| Column            | PostgreSQL Type | Constraint                                                      | Description                                   |
| ----------------- | --------------- | --------------------------------------------------------------- | --------------------------------------------- |
| `id`              | `SMALLINT`      | PRIMARY KEY, DEFAULT `1`                                        | Singleton — always row 1                      |
| `org_name`        | `VARCHAR(255)`  | NOT NULL                                                        | Official organization name                    |
| `founded_date`    | `VARCHAR(100)`  | NOT NULL, DEFAULT `'10 Oktober 1984'`                           | Founding date (textual)                       |
| `motto`           | `VARCHAR(500)`  | NOT NULL, DEFAULT `'Bergerak Satu Asa, Berbekal Alam Lestari!'` | Organization motto                            |
| `description`     | `TEXT`          | NOT NULL                                                        | Short organization description                |
| `vision`          | `TEXT`          | NOT NULL                                                        | Vision statement                              |
| `mission`         | `JSONB`         | NOT NULL                                                        | Mission points array — `["Poin 1", "Poin 2"]` |
| `active_term`     | `VARCHAR(100)`  | NOT NULL                                                        | Current leadership term, e.g. `"2025/2026"`   |
| `org_structure`   | `JSONB`         | NOT NULL                                                        | Leadership chart: `[{position, name, ...}]`   |
| `logo_url`        | `VARCHAR(500)`  | NULLABLE                                                        | Cloudinary HTTPS CDN URL                      |
| `logo_public_id`  | `VARCHAR(300)`  | NULLABLE                                                        | Cloudinary Public ID                          |
| `cover_url`       | `VARCHAR(500)`  | NULLABLE                                                        | Cloudinary HTTPS CDN URL                      |
| `cover_public_id` | `VARCHAR(300)`  | NULLABLE                                                        | Cloudinary Public ID                          |
| `is_active`       | `BOOLEAN`       | NOT NULL, DEFAULT `true`                                        | Lifecycle status                              |
| `created_by`      | `BIGINT`        | FK→`users.id`, NULLABLE, SET NULL                               |                                               |
| `updated_by`      | `BIGINT`        | FK→`users.id`, NULLABLE, SET NULL                               |                                               |
| `created_at`      | `TIMESTAMPTZ`   | NULLABLE                                                        |                                               |
| `updated_at`      | `TIMESTAMPTZ`   | NULLABLE                                                        |                                               |

---

### 3. `divisions`

Operational divisions of KPA EMC² (Kaderisasi, SKLH, Litbang, Karata) with activity detail and training materials.

| Column              | PostgreSQL Type                         | Constraint                        | Description                                       |
| ------------------- | --------------------------------------- | --------------------------------- | ------------------------------------------------- |
| `id`                | `SMALLINT GENERATED ALWAYS AS IDENTITY` | PRIMARY KEY                       | Max 10 rows — `SMALLINT`                          |
| `slug`              | `VARCHAR(100)`                          | NOT NULL, UNIQUE                  | e.g. `kaderisasi`, `sklh`, `litbang`, `karata`    |
| `name`              | `VARCHAR(150)`                          | NOT NULL                          | Official division name                            |
| `icon_name`         | `VARCHAR(100)`                          | NULLABLE                          | Lucide React icon name or custom SVG key          |
| `cover_url`         | `VARCHAR(500)`                          | NULLABLE                          | Cloudinary HTTPS CDN URL                          |
| `cover_public_id`   | `VARCHAR(300)`                          | NULLABLE                          | Cloudinary Public ID                              |
| `short_description` | `VARCHAR(500)`                          | NULLABLE                          | Brief description (card view)                     |
| `full_description`  | `TEXT`                                  | NULLABLE                          | Full description (detail page)                    |
| `study_materials`   | `JSONB`                                 | NULLABLE                          | Training material list: `["Navigasi Darat", ...]` |
| `equipment`         | `JSONB`                                 | NULLABLE                          | Core equipment list                               |
| `sort_order`        | `SMALLINT`                              | NOT NULL, DEFAULT `0`             | Display order in UI                               |
| `is_active`         | `BOOLEAN`                               | NOT NULL, DEFAULT `true`          | Tampil di menu & landing page                     |
| `created_by`        | `BIGINT`                                | FK→`users.id`, NULLABLE, SET NULL |                                                   |
| `updated_by`        | `BIGINT`                                | FK→`users.id`, NULLABLE, SET NULL |                                                   |
| `created_at`        | `TIMESTAMPTZ`                           | NULLABLE                          |                                                   |
| `updated_at`        | `TIMESTAMPTZ`                           | NULLABLE                          |                                                   |

**Indexes:**

- `UNIQUE(slug)`
- `INDEX(sort_order)`

---

### 4. `members`

KPA EMC² member roster with division assignment, position, and batch year.

| Column             | PostgreSQL Type                       | Constraint                            | Description                                     |
| ------------------ | ------------------------------------- | ------------------------------------- | ----------------------------------------------- |
| `id`               | `BIGINT GENERATED ALWAYS AS IDENTITY` | PRIMARY KEY                           |                                                 |
| `member_number`    | `VARCHAR(50)`                         | NOT NULL, UNIQUE                      | NRP/NIA — unique member ID                      |
| `name`             | `VARCHAR(255)`                        | NOT NULL                              | Full name                                       |
| `division_id`      | `SMALLINT`                            | FK→`divisions.id`, NULLABLE, SET NULL | Primary division                                |
| `position`         | `VARCHAR(150)`                        | NULLABLE                              | Structural role (e.g. Ketua, Sekretaris, Kadiv) |
| `batch_year`       | `SMALLINT`                            | NULLABLE                              | Induction year / batch (e.g. `2022`)            |
| `major`            | `VARCHAR(255)`                        | NULLABLE                              | Academic major / study program                  |
| `phone`            | `VARCHAR(20)`                         | NULLABLE                              |                                                 |
| `email`            | `VARCHAR(255)`                        | NULLABLE                              |                                                 |
| `status`           | `VARCHAR(50)`                         | NOT NULL, DEFAULT `'regular'`         | Status: `regular`, `honorary`, `inactive`       |
| `bio`              | `TEXT`                                | NULLABLE                              | Short biography                                 |
| `avatar_url`       | `VARCHAR(500)`                        | NULLABLE                              | Cloudinary HTTPS CDN URL                        |
| `avatar_public_id` | `VARCHAR(300)`                        | NULLABLE                              | Cloudinary Public ID                            |
| `is_visible`       | `BOOLEAN`                             | NOT NULL, DEFAULT `true`              | Show on public member page                      |
| `sort_order`       | `INTEGER`                             | NOT NULL, DEFAULT `0`                 | Display order                                   |
| `is_active`        | `BOOLEAN`                             | NOT NULL, DEFAULT `true`              | Lifecycle status                                |
| `created_by`       | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL     |                                                 |
| `updated_by`       | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL     |                                                 |
| `created_at`       | `TIMESTAMPTZ`                         | NULLABLE                              |                                                 |
| `updated_at`       | `TIMESTAMPTZ`                         | NULLABLE                              |                                                 |
| `deleted_at`       | `TIMESTAMPTZ`                         | NULLABLE                              | Soft deletes                                    |

**Indexes & Constraints:**

- `UNIQUE(member_number)`
- `CHECK(status IN ('regular', 'honorary', 'inactive'))`
- `INDEX(division_id)`
- `INDEX(batch_year)`
- `INDEX(division_id, status, sort_order) WHERE is_visible = true AND is_active = true AND deleted_at IS NULL` (Partial Index)

---

### 5. `categories`

Unified taxonomy table for categorizing articles, events, and galleries.

| Column       | PostgreSQL Type                       | Constraint                        | Description                                          |
| ------------ | ------------------------------------- | --------------------------------- | ---------------------------------------------------- |
| `id`         | `BIGINT GENERATED ALWAYS AS IDENTITY` | PRIMARY KEY                       |                                                      |
| `slug`       | `VARCHAR(100)`                        | NOT NULL, UNIQUE                  | e.g. `ekspedisi`, `sekolah-lingkungan`, `konservasi` |
| `name`       | `VARCHAR(150)`                        | NOT NULL                          | Display label                                        |
| `type`       | `VARCHAR(50)`                         | NOT NULL, DEFAULT `'general'`     | Usage: `post`, `event`, `gallery`, `general`         |
| `color`      | `VARCHAR(20)`                         | NULLABLE                          | Badge hex color, e.g. `#2D7D32`                      |
| `sort_order` | `SMALLINT`                            | NOT NULL, DEFAULT `0`             |                                                      |
| `is_active`  | `BOOLEAN`                             | NOT NULL, DEFAULT `true`          |                                                      |
| `created_by` | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL |                                                      |
| `updated_by` | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL |                                                      |
| `created_at` | `TIMESTAMPTZ`                         | NULLABLE                          |                                                      |
| `updated_at` | `TIMESTAMPTZ`                         | NULLABLE                          |                                                      |

**Indexes & Constraints:**

- `UNIQUE(slug)`
- `CHECK(type IN ('post', 'event', 'gallery', 'general'))`
- `INDEX(type)`
- `INDEX USING GIN (name gin_trgm_ops)` (`pg_trgm` autocomplete category search)

---

### 6. `posts`

Articles, expedition journals, nature tips, and educational content. Berelasi opsional ke `categories` dan `divisions`.

| Column                  | PostgreSQL Type                       | Constraint                             | Description                                       |
| ----------------------- | ------------------------------------- | -------------------------------------- | ------------------------------------------------- |
| `id`                    | `BIGINT GENERATED ALWAYS AS IDENTITY` | PRIMARY KEY                            |                                                   |
| `user_id`               | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL      | Author (admin user)                               |
| `category_id`           | `BIGINT`                              | FK→`categories.id`, NULLABLE, SET NULL | Article category                                  |
| `division_id`           | `SMALLINT`                            | FK→`divisions.id`, NULLABLE, SET NULL  | Divisi pelaksana/topik (opsional)                 |
| `title`                 | `VARCHAR(500)`                        | NOT NULL                               | Article title                                     |
| `slug`                  | `VARCHAR(600)`                        | NOT NULL, UNIQUE                       | URL-friendly slug                                 |
| `excerpt`               | `TEXT`                                | NOT NULL                               | Short summary                                     |
| `content`               | `TEXT`                                | NOT NULL                               | Body content (rich text / HTML)                   |
| `content_source`        | `VARCHAR(500)`                        | NULLABLE                               | Content credit/source URL                         |
| `cover_image_url`       | `VARCHAR(500)`                        | NOT NULL                               | Cloudinary HTTPS CDN URL                          |
| `cover_image_public_id` | `VARCHAR(300)`                        | NULLABLE                               | Cloudinary Public ID                              |
| `cover_image_source`    | `VARCHAR(500)`                        | NULLABLE                               | Cover photo credit                                |
| `author_name`           | `VARCHAR(255)`                        | NULLABLE                               | Display author name                               |
| `tags`                  | `JSONB`                               | NOT NULL, DEFAULT `'[]'::jsonb`        | Tags array `string[]`: `["survival", "navigasi"]` |
| `is_featured`           | `BOOLEAN`                             | NOT NULL, DEFAULT `false`              | Pin to homepage highlights                        |
| `is_published`          | `BOOLEAN`                             | NOT NULL, DEFAULT `false`              | Draft vs published                                |
| `published_at`          | `TIMESTAMPTZ`                         | NULLABLE                               | Scheduled publish time                            |
| `post_date`             | `TIMESTAMPTZ`                         | NOT NULL, DEFAULT `CURRENT_TIMESTAMP`  | Article date                                      |
| `is_active`             | `BOOLEAN`                             | NOT NULL, DEFAULT `true`               | Lifecycle status                                  |
| `created_by`            | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL      |                                                   |
| `updated_by`            | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL      |                                                   |
| `created_at`            | `TIMESTAMPTZ`                         | NULLABLE                               |                                                   |
| `updated_at`            | `TIMESTAMPTZ`                         | NULLABLE                               |                                                   |
| `deleted_at`            | `TIMESTAMPTZ`                         | NULLABLE                               | Soft deletes                                      |

**Indexes & Constraints:**

- `UNIQUE(slug)`
- `CHECK(jsonb_typeof(tags) = 'array')` (Database-level array validation)
- `INDEX(category_id)`
- `INDEX(division_id)`
- `INDEX(user_id)`
- `INDEX(published_at DESC) WHERE is_published = true AND is_active = true AND deleted_at IS NULL` (Partial Index for feed)
- `INDEX(is_featured) WHERE is_published = true AND is_active = true AND deleted_at IS NULL`
- `INDEX USING GIN (tags)` (PostgreSQL JSONB GIN index for tag filtering)
- `INDEX USING GIN (to_tsvector('indonesian', title || ' ' || excerpt || ' ' || content))` (Full-Text Search)
- `INDEX USING GIN (title gin_trgm_ops)` (`pg_trgm` typo-tolerant substring search)

---

### 7. `galleries`

Photo/video album collections grouped by division, category, or event.

| Column            | PostgreSQL Type                       | Constraint                             | Description                        |
| ----------------- | ------------------------------------- | -------------------------------------- | ---------------------------------- |
| `id`              | `BIGINT GENERATED ALWAYS AS IDENTITY` | PRIMARY KEY                            |                                    |
| `division_id`     | `SMALLINT`                            | FK→`divisions.id`, NULLABLE, SET NULL  | Division-specific album (opsional) |
| `category_id`     | `BIGINT`                              | FK→`categories.id`, NULLABLE, SET NULL | Kategori album                     |
| `title`           | `VARCHAR(255)`                        | NOT NULL                               | Album title                        |
| `description`     | `TEXT`                                | NULLABLE                               | Album description                  |
| `cover_url`       | `VARCHAR(500)`                        | NULLABLE                               | Cloudinary HTTPS CDN URL           |
| `cover_public_id` | `VARCHAR(300)`                        | NULLABLE                               | Cloudinary Public ID for deletion  |
| `event_date`      | `DATE`                                | NULLABLE                               | Activity date                      |
| `location`        | `VARCHAR(255)`                        | NULLABLE                               | Activity location                  |
| `is_published`    | `BOOLEAN`                             | NOT NULL, DEFAULT `false`              |                                    |
| `sort_order`      | `INTEGER`                             | NOT NULL, DEFAULT `0`                  |                                    |
| `is_active`       | `BOOLEAN`                             | NOT NULL, DEFAULT `true`               |                                    |
| `created_by`      | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL      |                                    |
| `updated_by`      | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL      |                                    |
| `created_at`      | `TIMESTAMPTZ`                         | NULLABLE                               |                                    |
| `updated_at`      | `TIMESTAMPTZ`                         | NULLABLE                               |                                    |
| `deleted_at`      | `TIMESTAMPTZ`                         | NULLABLE                               | Soft deletes                       |

**Indexes:**

- `INDEX(division_id)`
- `INDEX(category_id)`
- `INDEX(event_date DESC) WHERE is_published = true AND is_active = true AND deleted_at IS NULL`

---

### 8. `gallery_items`

Individual photo or video inside an album.

| Column                 | PostgreSQL Type                       | Constraint                        | Description                                  |
| ---------------------- | ------------------------------------- | --------------------------------- | -------------------------------------------- |
| `id`                   | `BIGINT GENERATED ALWAYS AS IDENTITY` | PRIMARY KEY                       |                                              |
| `gallery_id`           | `BIGINT`                              | FK→`galleries.id`, CASCADE DELETE |                                              |
| `cloudinary_public_id` | `VARCHAR(300)`                        | NOT NULL                          | Cloudinary Public ID for deletion/transforms |
| `url`                  | `VARCHAR(500)`                        | NOT NULL                          | Cloudinary HTTPS secure URL                  |
| `type`                 | `VARCHAR(20)`                         | NOT NULL, DEFAULT `'photo'`       | `photo` or `video`                           |
| `caption`              | `VARCHAR(500)`                        | NULLABLE                          |                                              |
| `width`                | `INTEGER`                             | NULLABLE                          | Original width (pixels)                      |
| `height`               | `INTEGER`                             | NULLABLE                          | Original height (pixels)                     |
| `sort_order`           | `INTEGER`                             | NOT NULL, DEFAULT `0`             | Order within album                           |
| `is_active`            | `BOOLEAN`                             | NOT NULL, DEFAULT `true`          |                                              |
| `created_by`           | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL |                                              |
| `updated_by`           | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL |                                              |
| `created_at`           | `TIMESTAMPTZ`                         | NULLABLE                          |                                              |
| `updated_at`           | `TIMESTAMPTZ`                         | NULLABLE                          |                                              |
| `deleted_at`           | `TIMESTAMPTZ`                         | NULLABLE                          | Soft deletes                                 |

**Indexes & Constraints:**

- `CHECK(type IN ('photo', 'video'))`
- `INDEX(gallery_id, sort_order) WHERE is_active = true AND deleted_at IS NULL`

---

### 9. `events`

Organized activities or programs that KPA EMC² opens for public or member registration. Berelasi opsional ke `categories` dan `divisions`.

**Event types supported:** Sekolah Lingkungan, Seminar Lingkungan, Aksi Konservasi, Pengabdian Masyarakat, EMC Expo, Open Recruitment, Ekspedisi Bersama, dsb.

| Column                  | PostgreSQL Type                       | Constraint                                                              | Description                                                                           |
| ----------------------- | ------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `id`                    | `BIGINT GENERATED ALWAYS AS IDENTITY` | PRIMARY KEY                                                             |                                                                                       |
| `slug`                  | `VARCHAR(200)`                        | NOT NULL, UNIQUE                                                        | URL-friendly — e.g. `sekolah-lingkungan-2026`                                         |
| `category_id`           | `BIGINT`                              | FK→`categories.id`, NULLABLE, SET NULL                                  | Kategori event (e.g. `sekolah-lingkungan`)                                            |
| `division_id`           | `SMALLINT`                            | FK→`divisions.id`, NULLABLE, SET NULL                                   | Divisi penyelenggara (e.g. `Konservasi`)                                              |
| `title`                 | `VARCHAR(300)`                        | NOT NULL                                                                | Event title                                                                           |
| `type`                  | `VARCHAR(100)`                        | NOT NULL                                                                | Event type key: `seminar`, `conservation`, `community-service`, `expo`, `recruitment` |
| `description`           | `TEXT`                                | NULLABLE                                                                | Public event description                                                              |
| `cover_url`             | `VARCHAR(500)`                        | NULLABLE                                                                | Cloudinary HTTPS CDN URL                                                              |
| `cover_public_id`       | `VARCHAR(300)`                        | NULLABLE                                                                | Cloudinary Public ID                                                                  |
| `location`              | `VARCHAR(300)`                        | NULLABLE                                                                | Venue or online platform                                                              |
| `start_date`            | `TIMESTAMPTZ`                         | NOT NULL                                                                | Event start datetime                                                                  |
| `end_date`              | `TIMESTAMPTZ`                         | NULLABLE                                                                | Event end datetime                                                                    |
| `registration_open_at`  | `TIMESTAMPTZ`                         | NULLABLE                                                                | Registration opens — null = open immediately                                          |
| `registration_close_at` | `TIMESTAMPTZ`                         | NULLABLE                                                                | Registration deadline — null = no deadline                                            |
| `max_participants`      | `INTEGER`                             | NULLABLE                                                                | Quota cap — null = unlimited                                                          |
| `requires_payment`      | `BOOLEAN`                             | NOT NULL, DEFAULT `false`                                               | Whether event has registration fee                                                    |
| `payment_amount`        | `NUMERIC(12,2)`                       | NULLABLE                                                                | Fee amount (IDR)                                                                      |
| `form_fields`           | `JSONB`                               | NULLABLE                                                                | Custom fields schema per event: `[{key, label, type, required}]`                      |
| `tags`                  | `JSONB`                               | NOT NULL, DEFAULT `'[]'::jsonb`, CHECK (`jsonb_typeof(tags) = 'array'`) | Tags array `string[]`: `["sekolah-lingkungan", "edukasi"]`                            |
| `is_published`          | `BOOLEAN`                             | NOT NULL, DEFAULT `false`                                               | Visible on public site                                                                |
| `is_active`             | `BOOLEAN`                             | NOT NULL, DEFAULT `true`                                                | Status kegiatan aktif                                                                 |
| `created_by`            | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL                                       | Admin who created event                                                               |
| `updated_by`            | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL                                       | Admin who last updated                                                                |
| `created_at`            | `TIMESTAMPTZ`                         | NULLABLE                                                                |                                                                                       |
| `updated_at`            | `TIMESTAMPTZ`                         | NULLABLE                                                                |                                                                                       |

**Indexes & Constraints:**

- `UNIQUE(slug)`
- `CHECK(jsonb_typeof(tags) = 'array')` (Database-level array validation)
- `INDEX(category_id)`
- `INDEX(division_id)`
- `INDEX(type)`
- `INDEX(start_date DESC) WHERE is_published = true AND is_active = true`
- `INDEX(registration_close_at) WHERE is_active = true`
- `INDEX USING GIN (tags)` (PostgreSQL JSONB GIN index for tag filtering)
- `INDEX USING GIN (form_fields)` (JSONB GIN index)

---

### 10. `registrations`

General participant registrations — one row per person per event.

| Column                    | PostgreSQL Type                       | Constraint                        | Description                                                               |
| ------------------------- | ------------------------------------- | --------------------------------- | ------------------------------------------------------------------------- |
| `id`                      | `BIGINT GENERATED ALWAYS AS IDENTITY` | PRIMARY KEY                       |                                                                           |
| `event_id`                | `BIGINT`                              | FK→`events.id`, CASCADE DELETE    | Parent event                                                              |
| `registration_code`       | `VARCHAR(30)`                         | NOT NULL, UNIQUE                  | Public lookup code — e.g. `EMC-SL2026-001`                                |
| `full_name`               | `VARCHAR(255)`                        | NOT NULL                          | Participant's full name                                                   |
| `email`                   | `VARCHAR(255)`                        | NOT NULL                          |                                                                           |
| `phone`                   | `VARCHAR(20)`                         | NOT NULL                          | Active WhatsApp number                                                    |
| `gender`                  | `VARCHAR(10)`                         | NULLABLE                          | Optional — `M` or `F`                                                     |
| `birth_date`              | `DATE`                                | NULLABLE                          | Optional                                                                  |
| `place_of_birth`          | `VARCHAR(150)`                        | NULLABLE                          | Optional                                                                  |
| `address`                 | `TEXT`                                | NULLABLE                          | Full residential address                                                  |
| `institution`             | `VARCHAR(255)`                        | NULLABLE                          | University, school, or organization                                       |
| `major`                   | `VARCHAR(255)`                        | NULLABLE                          | Academic major / field                                                    |
| `occupation`              | `VARCHAR(255)`                        | NULLABLE                          | Job title or student status                                               |
| `motivation`              | `TEXT`                                | NULLABLE                          | Motivation / reason for joining                                           |
| `photo_url`               | `VARCHAR(500)`                        | NULLABLE                          | Cloudinary HTTPS CDN URL                                                  |
| `photo_public_id`         | `VARCHAR(300)`                        | NULLABLE                          | Cloudinary Public ID                                                      |
| `document_url`            | `VARCHAR(500)`                        | NULLABLE                          | Cloudinary HTTPS CDN URL                                                  |
| `document_public_id`      | `VARCHAR(300)`                        | NULLABLE                          | Cloudinary Public ID                                                      |
| `extra_data`              | `JSONB`                               | NULLABLE                          | Participant values matching `events.form_fields`                          |
| `payment_proof_url`       | `VARCHAR(500)`                        | NULLABLE                          | Cloudinary HTTPS CDN URL                                                  |
| `payment_proof_public_id` | `VARCHAR(300)`                        | NULLABLE                          | Cloudinary Public ID                                                      |
| `status`                  | `VARCHAR(50)`                         | NOT NULL, DEFAULT `'pending'`     | Review status: `pending`, `verified`, `accepted`, `rejected`, `cancelled` |
| `reviewer_notes`          | `TEXT`                                | NULLABLE                          | Internal organizer notes                                                  |
| `is_active`               | `BOOLEAN`                             | NOT NULL, DEFAULT `true`          | Status keikutsertaan aktif                                                |
| `created_by`              | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL | NULL jika submit publik                                                   |
| `updated_by`              | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL | Admin yang verifikasi status                                              |
| `created_at`              | `TIMESTAMPTZ`                         | NULLABLE                          | Submission time                                                           |
| `updated_at`              | `TIMESTAMPTZ`                         | NULLABLE                          |                                                                           |

**Indexes & Constraints:**

- `UNIQUE(registration_code)`
- `CHECK(gender IN ('M', 'F') OR gender IS NULL)`
- `CHECK(status IN ('pending', 'verified', 'accepted', 'rejected', 'cancelled'))`
- `INDEX(event_id, status) WHERE is_active = true`
- `INDEX(email)`
- `INDEX USING GIN (extra_data)` (Query custom field answers natively)

---

### 11. `contacts`

Inbound messages from the public contact form.

| Column       | PostgreSQL Type                       | Constraint                        | Description                           |
| ------------ | ------------------------------------- | --------------------------------- | ------------------------------------- |
| `id`         | `BIGINT GENERATED ALWAYS AS IDENTITY` | PRIMARY KEY                       |                                       |
| `name`       | `VARCHAR(255)`                        | NOT NULL                          | Sender name                           |
| `email`      | `VARCHAR(255)`                        | NOT NULL                          | Sender email                          |
| `subject`    | `VARCHAR(500)`                        | NOT NULL                          | Message subject                       |
| `message`    | `TEXT`                                | NOT NULL                          | Message body                          |
| `is_read`    | `BOOLEAN`                             | NOT NULL, DEFAULT `false`         | Read status in admin                  |
| `ip_address` | `INET`                                | NULLABLE                          | Native PostgreSQL IPv4/IPv6 data type |
| `is_active`  | `BOOLEAN`                             | NOT NULL, DEFAULT `true`          | Lifecycle status                      |
| `created_by` | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL | NULL untuk pesan masuk publik         |
| `updated_by` | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL | Admin yang memproses                  |
| `created_at` | `TIMESTAMPTZ`                         | NULLABLE                          |                                       |
| `updated_at` | `TIMESTAMPTZ`                         | NULLABLE                          |                                       |

**Indexes:**

- `INDEX(is_read, created_at DESC)`

---

### 12. `site_settings`

Global website configuration as key-value pairs. Managed via Filament.

| Column        | PostgreSQL Type                       | Constraint                        | Description                                            |
| ------------- | ------------------------------------- | --------------------------------- | ------------------------------------------------------ |
| `id`          | `BIGINT GENERATED ALWAYS AS IDENTITY` | PRIMARY KEY                       |                                                        |
| `key`         | `VARCHAR(150)`                        | NOT NULL, UNIQUE                  | e.g. `site_title`, `instagram_url`, `whatsapp_contact` |
| `value`       | `TEXT`                                | NULLABLE                          | Setting value                                          |
| `group`       | `VARCHAR(100)`                        | NOT NULL, DEFAULT `'general'`     | Filament grouping (`social`, `contact`, `seo`)         |
| `description` | `VARCHAR(500)`                        | NULLABLE                          | Admin-facing label/hint                                |
| `is_active`   | `BOOLEAN`                             | NOT NULL, DEFAULT `true`          | Status konfigurasi aktif                               |
| `created_by`  | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL |                                                        |
| `updated_by`  | `BIGINT`                              | FK→`users.id`, NULLABLE, SET NULL |                                                        |
| `created_at`  | `TIMESTAMPTZ`                         | NULLABLE                          |                                                        |
| `updated_at`  | `TIMESTAMPTZ`                         | NULLABLE                          |                                                        |

**Indexes:**

- `UNIQUE(key)`
- `INDEX(group)`
