# Progress Tracker — KPA EMC² Web Portal

> **Terakhir Diperbarui:** 2026-10-04
> **Sprint Terakhir:** Sprint 26.05 (Phase 4 Completion — Check Status, Dashboard Stats, Gender Select)
> **Branch Aktif:** `master`

---

## 1. Roadmap & Status Sprint

### Sprint 26.01 — Core Portal & Public Website (SELESAI ✅)
- [x] Desain skema basis data, model Eloquent, traits (`HasAuditColumns`, `HasUuidKey`), migrasi, dan seeder.
- [x] Service integrasi Cloudinary (`CloudinaryService`).
- [x] Mock-First Frontend & Typed MockData (`resources/js/mocks/`).
- [x] Halaman Publik: Home, About, Posts, Events, Structure, Contact.

---

### Sprint 26.02 — Admin Dashboard & Manajemen Konten (SELESAI ✅)
- [x] Auth & Role Foundation (`RoleTypeEnum`, `EnsureAdmin` middleware).
- [x] Admin Layout & Sidebar UI (`AdminLayout`, `AdminSidebar`, `AdminNavbar`).
- [x] Admin CRUD – Articles & Posts (`/admin/posts`).
- [x] Admin CRUD – Members (`/admin/members`).
- [x] Admin CRUD – Events & Registrations (`/admin/events`).
- [x] Background Jobs & CI/CD workflow.

---

### Sprint 26.03 — CMS Completion, SEO & Public Polish (SELESAI ✅)
Dokumen acuan: `docs/planning/26.03/tasks.md`

| Section | Modul                                | Layer | Status     | Keterangan |
| ------- | ------------------------------------ | ----- | ---------- | ---------- |
| **1**   | **Admin CRUD – Categories**          | FULL  | ✅ Selesai | `CategoryController`, `CategoryService`, `CategoryPolicy`, Index with Modal Create/Edit. |
| **2**   | **Admin CRUD – Media Galleries**     | FULL  | ✅ Selesai | `GalleryController`, `GalleryService` (Cloudinary multi-photo upload), Index/Create/Edit. |
| **3**   | **Admin Site Settings & About Info** | FULL  | ✅ Selesai | `SettingController`, `SettingService`, dynamic mission & settings tabbed editor. |
| **4**   | **Admin Contact Inquiries Inbox**    | FULL  | ✅ Selesai | `ContactController`, `ContactService`, inbox view, mark as read, delete. |
| **5**   | **SEO, Sitemap, RSS Feed & Gallery** | FULL  | ✅ Selesai | Dynamic `/sitemap.xml`, `/feed.xml`, GA4 tracker, and public `/gallery` with lightbox. |

---

### Sprint 26.04 — Mock Decommissioning & Database Optimization (SELESAI ✅)
Dokumen acuan: `docs/planning/26.04/tasks.md`

| Section | Modul                                              | Layer   | Status     | Keterangan |
| ------- | -------------------------------------------------- | ------- | ---------- | ---------- |
| **1**   | **Mock Decommissioning**                           | FE/BE   | ✅ Selesai | Hapus seluruh file `resources/js/mocks/*`, `mockData.ts`, refaktor 16 berkas page/component. |
| **2**   | **PostgreSQL Composite & Trigram Indexes**         | DB      | ✅ Selesai | Migrasi index komposit dan GIN trigram (`members`, `events`, `galleries`, `posts`). |
| **3**   | **Members Default Sort & Filter**                  | BE/FE   | ✅ Selesai | Default sort `batch_year` desc, default filter `is_pengurus=true`. |
| **4**   | **Pagination & Page Limit (10, 20, 50, 100)**      | FULL    | ✅ Selesai | `AdminPagination` dan `Pagination` component dengan page limit (10, 20, 50, 100, default 10). |
| **5**   | **N+1 Prevention & Caching Layer**                 | BE      | ✅ Selesai | Selective eager loading dan SettingService/CategoryService cache. |
| **6**   | **Performance Benchmark Test**                    | TEST    | ✅ Selesai | `tests/Feature/Performance/QueryCountTest.php` 100% lulus. |

---

### Sprint 26.05 — Account Settings, Profile Security & Phase 4 Completion (SELESAI ✅)
Dokumen acuan: `docs/planning/26.05/tasks.md`

| Section | Modul                                              | Layer   | Status     | Keterangan |
| ------- | -------------------------------------------------- | ------- | ---------- | ---------- |
| **1**   | **Pengaturan Akun & Profil Admin**                 | FULL    | ✅ Selesai | `AccountController`, routing `/admin/account`, sidebar menu, `Admin/Account/Index.tsx`. |
| **2**   | **Lupa Password & Reset Password Restyle**         | FE      | ✅ Selesai | Restyle `ForgotPassword.tsx` dan `ResetPassword.tsx` dengan theme portal ungu EMC². |
| **3**   | **Cek Status Pendaftaran (`/events/check-status`)** | FULL    | ✅ Selesai | GET (form) + POST (lookup by code+email). Halaman baru `CheckStatus.tsx`. |
| **4**   | **Gender Select di Form Registrasi**               | FE      | ✅ Selesai | Tambahkan `<select>` gender Laki-laki/Perempuan di `Events/Show.tsx`. |
| **5**   | **Admin Dashboard Real Stats**                     | BE/FE   | ✅ Selesai | `DashboardController` query DB nyata; `Dashboard.tsx` tampilkan stat + alert badge. |
| **6**   | **Custom Migration Creator & Index Rules**         | BE/DOCS | ✅ Selesai | Format `YYYYMMDD_XXXX` & penambahan rules optimasi database di migration docs. |
| **7**   | **Feature Tests — Registration & Check Status**    | TEST    | ✅ Selesai | 4 test baru untuk event registration lifecycle & check status. |

---

## 2. Test Suite Health

- Total Tests Passing: **176 tests** (100% pass)
- Total Assertions: **730 assertions**
- Frontend Build: `npm run build` (0 TypeScript errors, SSR & Client bundles clean)
- Database: PostgreSQL (Port 5433)
- Media Storage: Cloudinary Zero-BLOB Architecture
