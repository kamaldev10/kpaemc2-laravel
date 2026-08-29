# Database Rules — KPA EMC² Web Portal

## Engine & Connection

```
Engine:   PostgreSQL 18.6 (Ubuntu 18.6-0ubuntu0.26.04.1)
Host:     127.0.0.1
Port:     5433  ← non-default, always verify .env
Database: kpa_emc2_db
User:     postgres
Driver:   pdo_pgsql (php-pgsql must be installed)
```

---

## Mandatory Audit Columns (ALL tables)

Every application table must have these 5 columns:

```php
$table->boolean('is_active')->default(true)->index();
$table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete()->index();
$table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete()->index();
$table->timestampsTz();  // created_at + updated_at (timezone-aware)
```

**Enforcement:** `app/Models/Traits/HasAuditColumns.php` auto-fills `created_by`/`updated_by` from `Auth::id()` in model boot hooks. All 12 models use this trait.

---

## Zero-BLOB Policy

**Never store binary data in PostgreSQL.**

```
❌  $table->binary('photo');
❌  $table->text('file_content');

✅  $table->string('photo_url', 500)->nullable();       // Cloudinary CDN URL
✅  $table->string('photo_public_id', 300)->nullable(); // Cloudinary public ID
```

All media goes through `CloudinaryService`. The `*_public_id` column enables deletion and transformation via Cloudinary API.

---

## Migration Naming Convention

```
YYYYMMDD_XXXX_action_table_name.php
```

- `YYYYMMDD` — date the migration was created
- `XXXX` — zero-padded 4-digit sequence number (0001, 0002, ...)
- `action` — `create`, `add`, `drop`, `alter`, `rename`
- `table_name` — snake_case table name

**Examples:**

```
20260823_0001_create_users_table.php         ✅
20260901_0001_add_slug_to_posts_table.php    ✅
0001_01_01_000000_create_users_table.php     ❌ (old Laravel default)
```

---

## Migration Rules

1. **Never modify a `Ran` migration.** Check with `php artisan migrate:status`.
2. Every migration must have a valid `down()` method for rollback.
3. Adding columns to existing tables: column must be `->nullable()` or have `->default(value)`.
4. New indexes on large tables: use `CREATE INDEX CONCURRENTLY` via `DB::statement()` for zero-downtime.
5. Always test: `php artisan migrate && php artisan migrate:rollback` before committing.

---

## JSONB Columns

### Posts & Events — Tags

```php
// Migration
$table->jsonb('tags')->default('[]');

// DB-level CHECK constraint (set via DB::statement after Schema::create)
DB::statement("ALTER TABLE posts ADD CONSTRAINT check_posts_tags_array CHECK (jsonb_typeof(tags) = 'array')");

// GIN index for fast @> queries
DB::statement('CREATE INDEX idx_posts_tags_gin ON posts USING GIN (tags)');
```

**Always pass an array:**

```php
Post::create(['tags' => ['alam', 'ekspedisi']]);  ✅
Post::create(['tags' => 'alam']);                  ❌ violates CHECK constraint
```

### Events — form_fields

```php
$table->jsonb('form_fields')->default('[]');
// No array CHECK — flexible structure for dynamic registration forms
// Structure: [{"name": "nim", "type": "text", "required": true, "label": "NIM"}, ...]
```

### AboutInfo — org_structure

```php
$table->jsonb('org_structure')->nullable();
// Structure: {"leadership": [...], "divisions": [...]}
```

---

## Native PostgreSQL Types & Primary Keys

All application tables strictly use **UUID v7 / v4** primary keys (`$table->uuid('id')->primary()`) and UUID foreign keys (`$table->foreignUuid(...)`). All Eloquent models use `Illuminate\Database\Eloquent\Concerns\HasUuids`.

| Column                         | Table                   | Type       | Notes                                              |
| ------------------------------ | ----------------------- | ---------- | -------------------------------------------------- |
| `id`                           | ALL tables              | `UUID`     | Primary key (`$table->uuid('id')->primary()`)      |
| `created_by`, `updated_by`     | ALL tables              | `UUID`     | Audit columns (`$table->foreignUuid(...)`)         |
| `ip_address`                   | `contacts`              | `INET`     | Use `->ipAddress()` in migration (maps to INET)    |
| `tags`                         | `posts`, `events`       | `JSONB`    | With GIN index + CHECK constraint                  |
| `form_fields`, `org_structure` | `events`, `about_infos` | `JSONB`    | No constraint                                      |

---

## PostgreSQL Extensions (migration 0015)

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;    -- trigram similarity for search
CREATE EXTENSION IF NOT EXISTS unaccent;   -- accent-insensitive search
```

These enable:

- Fast full-text similarity search on `posts.title`, `posts.content`
- Accent-insensitive queries: `WHERE unaccent(title) ILIKE unaccent('%ekspedisi%')`

---

## Index Strategy

| Index Type       | When to Use                                                  | Example                                                    |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| B-Tree (default) | FK columns, `is_active`, `status`, sortable columns          | `->index()`                                                |
| GIN              | JSONB columns (`tags`)                                       | `DB::statement('CREATE INDEX ... USING GIN ...')`          |
| Partial          | Boolean filters (`is_active = true`, `status = 'published'`) | `DB::statement('CREATE INDEX ... WHERE is_active = true')` |
| Composite        | Frequently queried together                                  | `$table->index(['event_id', 'status'])`                    |

---

## Soft Deletes

Tables with `SoftDeletes` (use `->softDeletesTz()`):

- `members`
- `galleries`

All Eloquent queries on soft-deletable models automatically exclude `deleted_at IS NOT NULL` rows.

---

## Seeder Order (dependency-safe)

```
UserSeeder          ← must run first (FK: created_by/updated_by)
DivisionSeeder
CategorySeeder
AboutInfoSeeder
MemberSeeder        ← depends on divisions, users
PostSeeder          ← depends on categories, users
GallerySeeder       ← depends on categories, users
EventSeeder         ← depends on categories, users
RegistrationSeeder  ← depends on events, users
ContactSeeder
SiteSettingSeeder
```

---

## Key Constraints Cheatsheet

```sql
-- CHECK constraints
check_posts_tags_array  CHECK (jsonb_typeof(tags) = 'array')   -- posts
check_events_tags_array CHECK (jsonb_typeof(tags) = 'array')   -- events

-- Unique constraints
users.email             UNIQUE
categories.slug         UNIQUE
posts.slug              UNIQUE
galleries.slug          UNIQUE
events.slug             UNIQUE
members (name, division_id) -- logical uniqueness, check in application layer

-- Cascade rules
gallery_items.gallery_id  ON DELETE CASCADE   (gallery deleted → items deleted)
registrations.event_id    ON DELETE CASCADE   (event deleted → registrations deleted)
```
