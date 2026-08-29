# Planning Rules & Conventions — KPA EMC² Web Portal

> **Project:** Portal Resmi KPA EMC² · **Framework:** Laravel 13 + React 19 + Inertia.js · **DB:** PostgreSQL 18+

Dokumen ini mendefinisikan aturan baku, konvensi, dan panduan perencanaan sprint yang **wajib dipatuhi** oleh seluruh kontributor pengembangan portal web KPA EMC².

---

## 1. Prinsip Dasar Pengembangan

1. **Database First** — Setiap perubahan atau penambahan fitur harus diawali dengan analisis dan perubahan skema database. Tidak ada implementasi fitur tanpa migrasi yang valid.
2. **Documentation Driven** — Setiap sprint wajib memiliki dokumen spesifikasi sebelum coding dimulai. Dokumen adalah kontrak kerja.
3. **MockData First (Frontend)** — Sebelum integrasi dengan server/backend, pengembangan UI/Frontend **wajib** menggunakan MockData yang terstruktur dan strictly typed per fitur (`resources/js/mocks/`). UI harus terverifikasi visual dan responsif sebelum dihubungkan ke Controller/Inertia props.
4. **Mobile First** — Semua komponen UI dirancang untuk mobile (`< 640px`) terlebih dahulu, kemudian diperluas ke tablet dan desktop.
5. **Zero Downtime Philosophy** — Perubahan database pada environment production menggunakan teknik non-blocking (add column nullable, `CREATE INDEX CONCURRENTLY`, dsb).
6. **Zero-BLOB Storage** — Tidak ada binary/file yang disimpan langsung ke database. Semua media melalui cloud (saat ini Cloudinary CDN).

---

## 2. Definisi Sprint

| Aturan                         | Nilai                                  |
| ------------------------------ | -------------------------------------- |
| **Durasi 1 Sprint**            | 2 minggu (14 hari kalender)            |
| **Sprint dimulai**             | Senin pekan pertama                    |
| **Sprint berakhir**            | Minggu pekan kedua                     |
| **Review Sprint**              | Hari terakhir sprint — demo & evaluasi |
| **Planning Sprint berikutnya** | Setelah review sprint selesai          |

### Status Sprint:

| Status      | Keterangan                              |
| ----------- | --------------------------------------- |
| `planning`  | Sprint sedang direncanakan, belum aktif |
| `active`    | Sprint sedang berjalan                  |
| `completed` | Sprint selesai & telah di-review        |
| `on-hold`   | Sprint ditangguhkan sementara           |

---

## 3. Struktur Dokumen Sprint

Setiap sprint disimpan dalam **1 folder** di `docs/planning/` dengan nama format:

```
{YY}.{NO}/
```

- `YY` → 2 digit tahun sprint dimulai
- `NO` → 2 digit nomor urut sprint (01, 02, dst.)

Contoh:
```
docs/planning/
  26.01/              ← Sprint 1, tahun 2026
    overview.md       ← Sprint overview, goals, timeline, dependency
    tasks.md          ← Task breakdown per layer (tabel tugas)
    file-map.md       ← Daftar file yang akan dibuat/diubah
    dod.md            ← Definition of Done & Acceptance Criteria
  26.02/
    overview.md
    tasks.md
    file-map.md
    dod.md
  26.03/
    ...
```

### File Wajib per Folder Sprint:

| File | Isi |
|---|---|
| `overview.md` | Nomor sprint, tanggal mulai/selesai, status, tujuan, dependency |
| `tasks.md` | Task breakdown per layer/domain dalam format tabel |
| `file-map.md` | Daftar lengkap file yang dibuat, diubah, atau dihapus |
| `dod.md` | Checklist Definition of Done + Acceptance Criteria per fitur |

> File tambahan boleh ditambahkan sesuai kebutuhan sprint (misal: `api-contract.md`, `ui-mockup.md`, `test-cases.md`, dll).

---

## 4. Konvensi Penamaan

### A. File PHP (Laravel)

| Jenis             | Format                           | Contoh                                |
| ----------------- | -------------------------------- | ------------------------------------- |
| Model             | `PascalCase.php`                 | `GalleryItem.php`                     |
| Migration         | `YYYYMMDD_XXXX_action_table.php` | `20260901_0001_add_meta_to_posts.php` |
| Controller        | `PascalCaseController.php`       | `PostController.php`                  |
| Filament Resource | `PascalCaseResource.php`         | `PostResource.php`                    |
| Seeder            | `PascalCaseSeeder.php`           | `PostSeeder.php`                      |
| Factory           | `PascalCaseFactory.php`          | `PostFactory.php`                     |
| Service           | `PascalCaseService.php`          | `CloudinaryService.php`               |
| Request           | `ActionModelRequest.php`         | `StorePostRequest.php`                |
| Trait             | `PascalCaseTrait.php`            | `HasAuditColumns.php`                 |

### B. File TypeScript/React (Frontend)

| Jenis           | Format           | Contoh           |
| --------------- | ---------------- | ---------------- |
| React Page      | `PascalCase.tsx` | `PostDetail.tsx` |
| React Component | `PascalCase.tsx` | `PostCard.tsx`   |
| Custom Hook     | `camelCase.ts`   | `usePosts.ts`    |
| Type Definition | `camelCase.ts`   | `post.ts`        |
| Mock Data       | `camelCase.ts`   | `homeMock.ts`    |

### C. Direktori

```
app/
  Filament/
    Resources/         # Filament CRUD Resources
    Widgets/           # Dashboard widgets
  Http/
    Controllers/
      Public/          # Controller untuk public-facing routes
    Requests/          # Form Request Validation
  Models/
    Traits/            # Reusable model traits
  Services/            # Business logic services

resources/js/
  Pages/
    Public/            # Halaman public website
      Home.tsx
      About.tsx
      Divisions/
      Posts/
      Galleries/
      Events/
      Contact.tsx
    Auth/              # Login, dll (existing)
  Components/
    Public/
      Layout/          # Navbar, Footer, Layout wrapper
      Cards/           # PostCard, EventCard, MemberCard, dll
      Sections/        # HeroSection, StatsBar, dll
      UI/              # Button, Badge, Modal, Lightbox, dll
  mocks/               # MockData terstruktur per fitur (WAJIB sebelum backend sync)
    homeMock.ts
    aboutMock.ts
    divisionMock.ts
    postMock.ts
    memberMock.ts
  types/               # TypeScript interfaces/types
  hooks/               # Custom React hooks

docs/
  planning/            # Dokumen sprint planning (file ini)
  database/            # Dokumentasi skema database
  migrations/          # Panduan & manifest migrasi
```

---

## 5. Konvensi Kode

### A. Laravel / PHP

- **PSR-12** untuk semua file PHP.
- Selalu gunakan **Form Request** untuk validasi input (`app/Http/Requests/`).
- Semua query di Model menggunakan **Eloquent scope** untuk query berulang.
- Tidak boleh ada `DB::raw()` tanpa alasan kuat yang terdokumentasi.
- Setiap route controller menggunakan **Resource Controller** jika memungkinkan.
- Tipe return method selalu dideklarasikan secara eksplisit.

### B. React / TypeScript

- Semua komponen menggunakan **TypeScript** — tidak ada `any` kecuali terpaksa dengan komentar alasan.
- Props komponen dideklarasikan sebagai `interface`, bukan `type`.
- Custom hook dimulai dengan prefix `use` (`usePosts`, `useEvent`, dll).
- Tidak ada inline styling — semua menggunakan **Tailwind CSS utility classes**.
- Komponen UI yang digunakan berulang diletakkan di `Components/UI/`.

---

## 6. Git & Version Control Rules

### Branch Strategy:

```
main              ← Production-ready code only
master            ← Integration/staging branch (default working branch)
feature/{slug}    ← Fitur baru (dari develop)
fix/{slug}        ← Bug fix (dari develop atau main)
chore/{slug}      ← Maintenance, dependency update, docs
```

### Commit Message Format (Conventional Commits):

```
{type}({scope}): {short description}

type:
  feat     → fitur baru
  fix      → bug fix
  docs     → perubahan dokumentasi
  style    → formatting, tidak ada perubahan logika
  refactor → refactoring kode
  test     → tambah/ubah test
  chore    → maintenance, build, dependency

scope:
  db, model, filament, api, ui, auth, seeder, migration, cloudinary, ...

Contoh:
  feat(filament): add PostResource with rich text editor
  fix(model): fix HasAuditColumns boot order on user creation
  docs(planning): add sprint-2 planning document
  feat(ui): implement HeroSection with Cloudinary background
```

---

## 7. Definition of Done (DoD) — Global

Task dinyatakan **DONE** hanya jika **seluruh** kriteria berikut terpenuhi:

- [ ] Kode sudah ditulis dan berfungsi sesuai spesifikasi
- [ ] Tidak ada syntax error (PHP: `php -l`, TS: `tsc --noEmit`)
- [ ] Form validation sudah diimplementasikan (server-side wajib)
- [ ] **MockData per fitur dibuat di `resources/js/mocks/`** dan UI/komponen telah diverifikasi visual sebelum diintegrasikan ke Controller
- [ ] **Unit test sudah ditulis dan lulus** untuk setiap komponen/class/method baru
- [ ] **Integration test ditulis** jika task melibatkan lebih dari 1 layer (DB ↔ Model ↔ Controller)
- [ ] Semua test suite lulus: `php artisan test` tanpa failure
- [ ] Tidak ada console error di browser
- [ ] Tampilan responsif di mobile (< 640px) dan desktop (> 1280px)
- [ ] Tidak ada data yang di-hardcode — semua dari database/config (atau mock file untuk frontend development)
- [ ] Jika ada migration baru: sudah diuji `migrate` + `migrate:rollback`
- [ ] Dokumentasi di-update jika ada perubahan arsitektur/skema

---

## 8. Aturan Testing

### Prinsip Umum:

- **Unit Testing adalah WAJIB** — setiap class, method, atau logika baru harus memiliki unit test.
- **Integration Testing diperlukan** jika task melibatkan alur lintas layer (request → controller → model → database).
- Semua test ditulis menggunakan **Pest PHP** (default Laravel modern) atau PHPUnit.
- Test file mengikuti struktur direktori mirroring dari `app/`:

```
tests/
  Unit/
    Models/            # Test Eloquent model logic, scopes, casts
    Services/          # Test CloudinaryService, dll
    Traits/            # Test HasAuditColumns, dll
  Feature/
    Auth/              # Test login, logout, akses role
    Filament/          # Test Filament resource CRUD (integration)
    Public/            # Test public-facing route & controller response
    Api/               # Test endpoint jika ada
```

### Unit Test — Aturan:

| Target | Wajib Ditest |
|---|---|
| **Model** | Relasi (`hasMany`, `belongsTo`, dll), scope (`scopeActive`, `scopePublished`), cast (JSONB, enum), accessor/mutator |
| **Service** | Semua method publik di `Services/` |
| **Trait** | `HasAuditColumns` — pastikan `created_by`/`updated_by` terisi otomatis |
| **Form Request** | Validasi rules (happy path + edge case gagal) |
| **Helper/Utility** | Semua fungsi helper kustom |

### Integration Test — Kapan Diperlukan:

| Kondisi | Test Diperlukan |
|---|---|
| Endpoint publik baru (GET/POST) | ✅ Wajib — test response, status code, data shape |
| Filament Resource CRUD baru | ✅ Wajib — test create/edit/delete via Filament testing helpers |
| Alur multi-step (misal: daftar event → kirim email) | ✅ Wajib |
| Perubahan pada middleware/auth | ✅ Wajib |
| Query database kompleks (join, JSONB, full-text search) | ✅ Disarankan |

### Naming Convention Test:

```php
// Unit Test — deskripsikan perilaku yang ditest
it('sets created_by automatically when model is created')
it('returns only active members via scope')
it('casts tags as array from jsonb column')

// Integration Test — deskripsikan skenario end-to-end
it('allows superadmin to create a post')
it('returns 403 when committee accesses division management')
it('stores registration and generates unique code')
```

### Command:

```bash
php artisan test                        # Jalankan semua test
php artisan test --filter=PostTest      # Filter test tertentu
php artisan test --coverage             # Dengan code coverage (butuh Xdebug/PCOV)
php artisan test tests/Unit/            # Unit test saja
php artisan test tests/Feature/         # Integration/Feature test saja
```

### Coverage Target (Minimum):

| Layer | Coverage Target |
|---|---|
| Models (logic, scope, cast) | ≥ 80% |
| Services | ≥ 90% |
| Controllers (public routes) | ≥ 70% |
| Form Requests | ≥ 85% |

---

## 9. Aturan Khusus per Layer

### Database / Migration:

- Tidak boleh mengubah file migrasi yang sudah dijalankan di production.
- Setiap migration baru wajib memiliki method `down()` yang valid.
- Kolom baru di tabel yang sudah ada **harus NULLABLE** atau memiliki default value.

### Filament Admin Panel:

- Setiap Resource **wajib** mengimplementasikan kontrol akses berdasarkan `role` user.
- Upload file di Filament **wajib** melalui `CloudinaryService` — tidak boleh disimpan ke local disk.
- Semua list/table view menggunakan pagination (max 25 per page default).

### Public Frontend (React/Inertia):

- **MockData First Workflow**: Sebelum controller Laravel / endpoint backend siap dan terhubung, frontend wajib membangun dan menggunakan mock data terstruktur di `resources/js/mocks/{feature}Mock.ts` yang sesuai dengan TypeScript interface. UI diverifikasi visual dan responsivitasnya secara terisolasi sebelum di-bind ke Inertia props.
- Data dari controller ke React page dikirim via **Inertia props**.
- SEO Meta (title, description, OpenGraph) wajib diimplementasikan di **setiap** page menggunakan Inertia `<Head>`.
- Gambar dari Cloudinary **wajib** menyertakan transformasi minimal: `f_auto,q_auto`.
- Komponen & section UI harus modular, menerima typed props, dan dapat menggunakan mock data sebagai default/fallback saat pengembangan.

---

## 10. Roadmap Sprint

| Sprint | Nama                           |  Durasi  |   Status   | Fokus Utama                                                                                    |
| :----: | ------------------------------ | :------: | :--------: | ---------------------------------------------------------------------------------------------- |
| **1**  | Core Setup & Foundation        | 2 Minggu |  `active`  | Seeding data awal, Cloudinary service, Filament panel setup, Layout & Auth dasar React/Inertia |
| **2**  | Public Profile & Content       | 2 Minggu | `planning` | Beranda, Tentang Kami, Divisi, Struktur Kepengurusan & Anggota                                 |
| **3**  | Media, Articles & SEO          | 2 Minggu | `planning` | Modul Artikel, Galeri Foto/Video, Filament Resources konten, SEO & OpenGraph                   |
| **4**  | Events, Registrations & Polish | 2 Minggu | `planning` | Modul Kegiatan, Form Pendaftaran Dinamis, Halaman Kontak, Export CSV, QA & Optimasi            |

---

## 11. Tech Stack Reference

| Layer                | Teknologi    | Versi            |
| -------------------- | ------------ | ---------------- |
| Backend Framework    | Laravel      | 13               |
| Language Backend     | PHP          | 8.5              |
| Database             | PostgreSQL   | 18+              |
| ORM                  | Eloquent     | (bawaan Laravel) |
| Admin Panel          | Filament PHP | v3.3             |
| Testing Framework    | Pest PHP     | v3               |
| Frontend Framework   | React        | 19               |
| SSR/Routing Adapter  | Inertia.js   | v2               |
| Styling              | Tailwind CSS | v3               |
| Build Tool           | Vite         | v8               |
| Language Frontend    | TypeScript   | v5               |
| Media CDN            | Cloudinary   | —                |
| Icon Library         | Lucide React | v1               |
| Accessible Component | Headless UI  | v2               |
