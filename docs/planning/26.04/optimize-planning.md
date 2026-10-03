# Database Optimization & Mock Decommissioning Plan — Sprint 26.04

---

## 1. Arsitektur Target (Zero-Mock & Zero-N+1)

```
                       ┌──────────────────────────────┐
                       │       Inertia Client         │
                       │ (100% Real DB Props, No Mock)│
                       └──────────────┬───────────────┘
                                      │ HTTP Request
                                      ▼
                       ┌──────────────────────────────┐
                       │      Laravel Controller      │
                       └──────────────┬───────────────┘
                                      │
                 ┌────────────────────┴───────────────────┐
                 │ Cache Hit                              │ Cache Miss
                 ▼                                        ▼
    ┌─────────────────────────┐             ┌─────────────────────────┐
    │     Redis / Memory      │             │   PostgreSQL Optimizer  │
    │  (Settings, About, Cat) │             │ (Eager Loaded + GIN/idx)│
    └─────────────────────────┘             └────────────┬────────────┘
                                                         │ EXPLAIN ANALYZE
                                                         ▼
                                            ┌─────────────────────────┐
                                            │      Index Scans        │
                                            │ (Sub-10ms query exec)   │
                                            └─────────────────────────┘
```

---

## 2. Rencana Penghapusan Mock Data (Phase 1)

### 2.1 Berkas yang Dihapus Permanen:

- `resources/js/mocks/aboutMock.ts`
- `resources/js/mocks/contactMock.ts`
- `resources/js/mocks/divisionMock.ts`
- `resources/js/mocks/eventMock.ts`
- `resources/js/mocks/homeMock.ts`
- `resources/js/mocks/memberMock.ts`
- `resources/js/mocks/postMock.ts`
- `resources/js/utils/mockData.ts`

### 2.2 Berkas yang Direfaktor:

1. `app/Http/Middleware/HandleInertiaRequests.php` (hapus `use_mock_data`).
2. `resources/js/types/index.d.ts` (hapus `use_mock_data`).
3. `resources/js/Pages/Public/Home.tsx`
4. `resources/js/Pages/Public/About.tsx`
5. `resources/js/Pages/Public/Posts/Index.tsx`
6. `resources/js/Pages/Public/Posts/Show.tsx`
7. `resources/js/Pages/Public/Events/Index.tsx`
8. `resources/js/Pages/Public/Events/Show.tsx`
9. `resources/js/Pages/Public/Structure/Index.tsx`
10. `resources/js/Pages/Public/Contact/Index.tsx`
11. `resources/js/Components/Public/Sections/*.tsx` (Hero, Profil, VisiMisi, DivisionHighlight, ArticleHighlight, EventHighlight, StatsBar, LogoSection).

---

## 3. Rencana Optimasi Database & Query (Phase 2)

### 3.1 Audit & Resolusi N+1 Query

- **`HomeController`**:
    - `Post::with(['category:id,name,slug', 'author:id,name,avatar_url'])`
    - `Event::with(['category:id,name,slug', 'division:id,name,code'])`
    - Total queries target: `<= 6 queries`.
- **`PostController` (Public & Admin)**:
    - Select kolom spesifik, eager load `category` dan `author`.
    - Full-text search dengan trigram index pada `title` & `content`.
- **`EventController` (Public & Admin)**:
    - Eager load `category`, `division`, dan `withCount('registrations')`.
- **`MemberController` / `StructureController`**:
    - Eager load `division:id,name,code,slug`.
- **`GalleryController` (Public & Admin)**:
    - Eager load `category`, `division`, dan relasi `items` terurut.

### 3.2 Migrasi Indeks Komposit & Trigram PostgreSQL

Buat migrasi: `database/migrations/xxxx_optimize_database_indexes_and_trigram.php`:

1. `CREATE EXTENSION IF NOT EXISTS pg_trgm;`
2. **Posts**:
    - Composite Index: `(is_published, is_active, published_at DESC)`
    - GIN Trigram Index: `posts_title_trgm_idx` on `title gin_trgm_ops`
3. **Events**:
    - Composite Index: `(is_published, is_active, start_date ASC)`
    - GIN Trigram Index: `events_title_trgm_idx` on `title gin_trgm_ops`
4. **Members**:
    - Composite Index: `(is_active, division_id, sort_order ASC)`
    - GIN Trigram Index: `members_name_trgm_idx` on `full_name gin_trgm_ops`
5. **Galleries**:
    - Composite Index: `(is_published, is_active, event_date DESC)`
    - GIN Trigram Index: `galleries_title_trgm_idx` on `title gin_trgm_ops`
6. **Gallery Items**:
    - Composite Index: `(gallery_id, sort_order ASC)`
7. **Registrations**:
    - Composite Index: `(event_id, status, created_at DESC)`

---

## 4. Rencana Caching & Seeder Verification (Phase 3)

1. **Tagless/Tagged Fast Cache**:
    - `AboutInfo` cached 24h (`about_info_active`), invalidated on save.
    - `SiteSettings` cached 24h (`site_settings_all`), invalidated on save.
    - `Divisions` list cached 24h (`divisions_active_list`), invalidated on save.
    - `Categories` list cached 24h (`categories_active_list`), invalidated on save.
2. **Comprehensive Seeder Update**:
    - Pastikan `DatabaseSeeder` mengisi data realistis (BPH, 4 Divisi, 10+ Anggota per divisi, 10+ Artikel lengkap markdown, 6+ Kegiatan lampau & mendatang, 6+ Album Galeri dengan item foto Cloudinary, Pengaturan situs lengkap).

---

## 5. Automated Benchmark & Verification (Phase 4)

1. Feature Test: `tests/Feature/Performance/QueryCountTest.php`:
    - `assertQueryCountLessThan(8)` pada `/` (Beranda).
    - `assertQueryCountLessThan(5)` pada `/about`.
    - `assertQueryCountLessThan(5)` pada `/posts`.
    - `assertQueryCountLessThan(5)` pada `/events`.
    - `assertQueryCountLessThan(5)` pada `/structure`.
    - `assertQueryCountLessThan(5)` pada `/gallery`.
2. Full suite run: `php artisan test` (harus 100% pass).
3. Frontend build: `npm run build` (0 TS errors).
