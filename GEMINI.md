# GEMINI.md — AI Context File
# Portal Resmi KPA EMC² Web

> File ini adalah konteks utama untuk AI assistant (Gemini, Claude, Cursor, Copilot, dll) yang bekerja pada project ini.
> Baca file ini **sebelum** melakukan perubahan apapun.

---

## Project Overview

**Nama Proyek:** Portal Resmi KPA EMC² (Eksplorasi Mahasiswa Cinta Alam²)
**Jenis:** Company Profile + CMS + Event Registration System
**Stack:** Laravel 13 + React 19 + Inertia.js + Filament PHP v3 + PostgreSQL 18+
**Media CDN:** Cloudinary (zero-BLOB — tidak ada file/binary di database)
**Environment:** PHP 8.5 · Node.js · Vite 8 · Tailwind CSS v3

---

## Struktur Direktori Penting

```
kpa-emc2-web/
├── app/
│   ├── Filament/Resources/     # Filament CRUD admin panel
│   ├── Filament/Widgets/       # Dashboard widgets
│   ├── Http/
│   │   ├── Controllers/Public/ # Public-facing route controllers
│   │   └── Requests/           # Form Request Validation
│   ├── Models/                 # Eloquent models
│   │   └── Traits/             # HasAuditColumns, dll
│   └── Services/               # Business logic (CloudinaryService, dll)
├── database/
│   ├── migrations/             # Format: YYYYMMDD_XXXX_action_table.php
│   ├── seeders/
│   └── factories/
├── resources/js/
│   ├── Pages/
│   │   ├── Public/             # Halaman public website (React/Inertia)
│   │   └── Auth/               # Halaman autentikasi
│   ├── Components/
│   │   └── Public/
│   │       ├── Layout/         # Navbar, Footer, wrapper
│   │       ├── Cards/          # PostCard, EventCard, dll
│   │       ├── Sections/       # HeroSection, StatsBar, dll
│   │       └── UI/             # Button, Badge, Modal, Lightbox
│   ├── hooks/                  # Custom React hooks
│   └── types/                  # TypeScript interfaces
├── tests/
│   ├── Unit/                   # Unit test per class/method
│   └── Feature/                # Integration/feature test
└── docs/
    ├── planning/               # Sprint planning documents
    │   ├── planning_rules.md   # Aturan & konvensi project (BACA INI)
    │   ├── 26.01/              # Sprint 1
    │   ├── 26.02/              # Sprint 2
    │   └── ...
    ├── database/               # Dokumentasi skema & relasi DB
    └── migrations/             # Panduan & manifest migrasi
```

---

## Aturan Wajib — Baca Sebelum Coding

### 1. Database
- **PostgreSQL 18+** pada port `5433` (local). DB name: `kpa_emc2_db`.
- Semua tabel memiliki **5 kolom audit wajib**: `is_active`, `created_by`, `updated_by`, `created_at`, `updated_at`.
- **Zero-BLOB**: Tidak ada binary/file di database. Media disimpan ke Cloudinary, hanya `*_url VARCHAR(500)` dan `*_public_id VARCHAR(300)` yang masuk DB.
- Format migration: `YYYYMMDD_XXXX_action_table.php` (contoh: `20260901_0001_add_slug_to_posts.php`).
- **Jangan ubah** file migrasi yang sudah dijalankan (`Ran`). Buat migration baru.
- Kolom baru pada tabel existing **harus** `NULLABLE` atau punya `default`.

### 2. Models
- Semua model menggunakan trait `HasAuditColumns` (`app/Models/Traits/HasAuditColumns.php`).
- Trait ini auto-fill `created_by`/`updated_by` via `Auth::id()` pada create/update event.
- Tags pada `posts` dan `events` adalah `JSONB` dengan DB-level CHECK: `jsonb_typeof(tags) = 'array'`.
- Kolom `ip_address` pada `contacts` menggunakan native PostgreSQL `INET` type.

### 3. Filament Admin Panel
- Panel tersedia di `/admin`.
- 3 role user: `superadmin`, `editor`, `committee`.
- Setiap Filament Resource **wajib** mengimplementasikan kontrol akses berdasarkan `role`.
- Upload file **wajib** melalui `CloudinaryService` — tidak boleh ke local disk.
- Pagination default: 25 per halaman.

### 4. Frontend (React/Inertia)
- **MockData First**: Sebelum integrasi controller/backend, wajib buat mock dataset typed di `resources/js/mocks/{feature}Mock.ts`. Verifikasi visual dan responsivitas UI menggunakan mock data sebelum dihubungkan ke server.
- Data controller → React page via **Inertia props** (bukan AJAX fetch langsung).
- **SEO Meta wajib** di setiap page menggunakan Inertia `<Head>` (title, description, OG tags).
- Gambar dari Cloudinary **wajib** transformasi minimal: `f_auto,q_auto`.
- Tidak ada inline styling — hanya **Tailwind CSS utility classes**.
- Props komponen menggunakan `interface`, bukan `type`.
- Tidak ada `any` di TypeScript kecuali terpaksa + ada komentar alasan.

### 5. Testing
- **Unit test WAJIB** untuk setiap class, method, atau logika baru.
- **Integration/Feature test** wajib jika lintas layer (DB ↔ Model ↔ Controller).
- Gunakan **Pest PHP** (default di project ini).
- Semua test harus lulus sebelum task dianggap selesai: `php artisan test`.

### 6. Git Commits
Format **Conventional Commits**:
```
feat(scope): deskripsi singkat
fix(scope): deskripsi singkat
docs(scope): deskripsi singkat

scope: db | model | filament | ui | auth | seeder | migration | cloudinary | test
```

---

## Struktur Divisi KPA EMC²

```
Inti Pimpinan:
  - Ketua
  - Sekretaris
      └── Staff: Staff Ahli Arsip Data & Rumah Tangga
  - Bendahara

Divisi Operasional (4 divisi):
  1. Kaderisasi
  2. SKLH  (Sosial Kemasyarakatan & Lingkungan Hidup)
  3. Litbang (Penelitian & Pengembangan)
  4. Karata (Kepala Rumah Tangga)
```

> ⚠️ Jabatan inti TANPA kata "Umum" — cukup "Ketua", "Sekretaris", "Bendahara".

---

## Database — 15 Tabel (urutan dependency)

| No | Tabel | Keterangan |
|:---:|---|---|
| 1 | `users` | Auth, role: superadmin/editor/committee |
| 2 | `cache`, `cache_locks` | Session cache |
| 3 | `jobs`, `job_batches`, `failed_jobs` | Queue jobs |
| 4 | `divisions` | 4 divisi resmi (SMALLINT PK) |
| 5 | `categories` | Taksonomi (type: post/event/gallery/general) |
| 6 | `about_infos` | Singleton id=1, profil org + org_structure JSONB |
| 7 | `members` | Roster pengurus + soft deletes |
| 8 | `posts` | Artikel + tags JSONB + GIN index |
| 9 | `galleries` | Album foto/video + soft deletes |
| 10 | `gallery_items` | Item media Cloudinary (CASCADE on delete) |
| 11 | `events` | Kegiatan + form_fields JSONB + tags JSONB |
| 12 | `registrations` | Pendaftar event (CASCADE on delete) |
| 13 | `contacts` | Pesan masuk (ip_address: INET type) |
| 14 | `site_settings` | Key-value global config |
| 15 | `pg_trgm`, `unaccent`, GIN & Partial Indexes | PostgreSQL extensions + performance indexes |

---

## Command Cheatsheet

```bash
# Database
php artisan migrate                    # Jalankan migrasi
php artisan migrate:fresh --seed       # Reset + migrate + seed
php artisan migrate:status             # Status migrasi
php artisan db:seed                    # Seed saja
php artisan db:show                    # Info database

# Generate
php artisan make:model Nama -mfsc      # Model + migration + factory + seeder + controller
php artisan make:filament-resource Nama --generate  # Filament Resource

# Testing
php artisan test                       # Semua test
php artisan test tests/Unit/           # Unit saja
php artisan test tests/Feature/        # Feature saja
php artisan test --filter=NamaTest     # Filter spesifik

# Dev server
php artisan serve                      # Backend (port 8000)
npm run dev                            # Frontend Vite (hot-reload)

# Cache
php artisan optimize:clear             # Clear semua cache
php artisan route:list                 # List semua route
```

---

## Dokumentasi Lengkap

| Dokumen | Path |
|---|---|
| PRD (Product Requirements) | `docs/PRD_Company_Profile_KPA_EMC2.md` |
| Planning Rules & Konvensi | `docs/planning/planning_rules.md` |
| Skema Tabel Database | `docs/database/db_tables.md` |
| Detail Kolom & Tipe Data | `docs/database/db_table_details.md` |
| Relasi Antar Tabel | `docs/database/db_relations.md` |
| Aturan DB (Audit, BLOB, dll) | `docs/database/db_rules.md` |
| Manifest Migrasi | `docs/migrations/migration_manifest.md` |
| Panduan Migrasi & Runbook | `docs/migrations/migration_rules.md` |
| Sprint Planning | `docs/planning/{YY}.{NO}/` |
| Aturan Dependensi & Audit | `.agents/rules/dependencies.md` |

---

## Environment Variables Kritis

```env
APP_NAME="KPA EMC² Website"     # WAJIB dikutip — ada spasi & karakter khusus
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5433                    # Bukan 5432 (non-default PostgreSQL port)
DB_DATABASE=kpa_emc2_db
DB_USERNAME=postgres
```

---

*Diperbarui: 2026-08-29 · Sprint aktif: 26.01*
