# Progress Tracker — KPA EMC² Web Portal

> **Terakhir Diperbarui:** 2026-09-12
> **Sprint Aktif:** Sprint 26.02 (Admin Dashboard & Content Management)
> **Branch Aktif:** `master`

---

## 1. Roadmap & Status Sprint

### Sprint 26.01 — Core Portal & Public Website (SELESAI ✅)

- [x] Desain skema basis data, model Eloquent, traits (`HasAuditColumns`, `HasUuidKey`), migrasi, dan seeder.
- [x] Service integrasi Cloudinary (`CloudinaryService`).
- [x] Mock-First Frontend & Typed MockData (`resources/js/mocks/`).
- [x] Halaman Publik:
    - [x] Home (`/`)
    - [x] About / Profil Organisasi (`/about`)
    - [x] Posts / Artikel & Berita (`/posts`, `/posts/{slug}`)
    - [x] Events / Agenda & Registrasi (`/events`, `/events/{slug}`)
    - [x] Structure & Anggota (`/structure`)
    - [x] Contact Form (`/contact`)
- [x] Pembersihan legacy route aliases Bahasa Indonesia (`/tentang`, `/artikel`, `/kegiatan`, `/kontak`).

---

### Sprint 26.02 — Admin Dashboard & Manajemen Konten (SEDANG BERJALAN ⏳)

Dokumen acuan: `docs/planning/26.02/tasks.md`

| Section | Modul                             | Layer    | Status        | Keterangan                                                                                                                                                                                                      |
| ------- | --------------------------------- | -------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1**   | **Auth & Role Foundation**        | BE & SEC | ✅ Selesai    | `RoleTypeEnum`, migrasi role, User method `isAtLeast()`, `EnsureAdmin` middleware, fix intended login redirect.                                                                                                 |
| **2**   | **Admin Layout UI**               | FE       | ✅ Selesai    | `AdminLayout`, `AdminSidebar` (role-filtered), `AdminNavbar`, dynamic breadcrumbs, user dropdown, flash alerts.                                                                                                 |
| **3**   | **Admin CRUD – Articles & Posts** | FULL     | ✅ Selesai    | `PostController`, `ArticleController`, `StorePostRequest`, `UpdatePostRequest`, `PostService`, `PostResource`, `PostPolicy`, `RichTextEditor`, `ImageUploader`, Index/Create/Edit pages, 20 unit/feature tests. |
| **4**   | **Admin CRUD – Members**          | FULL     | ✅ Selesai    | Pengurus & Anggota: `MemberController`, `MemberService`, `StoreMemberRequest`, `UpdateMemberRequest`, `MemberResource`, `MemberPolicy`, `AvatarUploader`, Index/Create/Edit, 21 unit/feature tests. |
| **5**   | **Admin CRUD – Events**           | FULL     | ⏳ Berikutnya | Agenda Kegiatan & Pendaftaran: `EventController`, `EventService`, list peserta registrasi.                                                                                                                      |
| **6**   | **Site Settings, Polish & QA**    | FULL     | ⏳ Menunggu   | Pengaturan situs dinamis (`SiteSetting`), audit trail, full regression testing.                                                                                                                                 |

---

## 2. Test Suite Health

- Total Tests Passing: **106 tests** (100% pass)
- Assertions: **449 assertions**
- Frontend Build: `npm run build` (0 TypeScript errors, SSR & Client bundles clean)
- Lint & Code Style: ESLint & Prettier passing

---

## 3. Catatan Tiap Sesi Baru

Setiap AI yang melanjutkan task berikutnya (misal: Section 4 - Admin CRUD Members):

1. Periksa `docs/planning/26.02/tasks.md` untuk detail task layer BE/FE/TEST.
2. Ikuti pola arsitektur yang sudah berhasil dibangun di Section 3:
    - Request validation: `app/Http/Requests/Admin/`
    - Business logic & Cloudinary: `app/Services/Admin/`
    - Resource formatter: `app/Http/Resources/Admin/`
    - Policy otorisasi: `app/Policies/`
    - Controller: `app/Http/Controllers/Admin/`
    - Frontend: `resources/js/Pages/Admin/Members/` menggunakan `AdminLayout`
    - Testing: `tests/Unit/Services/Admin/` dan `tests/Feature/Admin/`
3. Perbarui file `progress.md` ini setelah task selesai.
