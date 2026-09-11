# GEMINI.md — AI Context File
# Portal Resmi KPA EMC² Web

> File ini adalah panduan utama untuk AI Assistant (Gemini / Antigravity, Claude, Cursor, Copilot) yang bekerja pada proyek ini.
> **WAJIB:** Baca folder memori proyek di `docs/memory/` sebelum memulai tindakan apapun.

---

## 1. Memori Hidup Proyek (Wajib Dibaca)

Sebelum membuat kode atau merencanakan task, buka dan baca file-file berikut:
1. [`docs/memory/overview.md`](./docs/memory/overview.md) — Arsitektur proyek, entitas, dan struktur direktori
2. [`docs/memory/progress.md`](./docs/memory/progress.md) — Status sprint aktif dan pencapaian terkini
3. [`docs/memory/decisions.md`](./docs/memory/decisions.md) — Keputusan teknis penting (ADR)
4. [`docs/memory/gotchas.md`](./docs/memory/gotchas.md) — Catatan bug, keanehan teknis, dan port DB 5433
5. [`docs/memory/rules.md`](./docs/memory/rules.md) — Aturan mutlak (Hard Rules)
6. [`docs/memory/conventions.md`](./docs/memory/conventions.md) — Konvensi penamaan dan penataan kode

---

## 2. Ringkasan Arsitektur & Teknologi

- **Backend:** Laravel 13 (PHP 8.5)
- **Database:** PostgreSQL 18+ pada Port **`5433`** (non-default)
- **Frontend:** React 19 + Inertia.js v2 + TypeScript 5 + Tailwind CSS v3
- **Media CDN:** Cloudinary via `App\Services\CloudinaryService` (**Zero-BLOB Policy**)
- **Admin Dashboard:** Custom Inertia Admin (`/admin`) guarded by `EnsureAdmin` middleware
- **Role System:** `App\Enums\RoleTypeEnum` (`SUPER_ADMIN`, `ADMIN`, `EDITOR`)
- **Testing:** PHPUnit (`php artisan test`)

---

## 3. Perilaku Wajib AI

1. **Bahasa:** Berkomunikasi dalam **Bahasa Indonesia**. Tulis kode, docblock, dan git commit dalam **Bahasa Inggris**.
2. **Kualitas Kode:** Tulis kode **production-ready**. Dilarang meninggalkan stub kosong atau `TODO` tanpa implementasi.
3. **Clean Architecture:** Controller harus tipis. Logika bisnis di `App\Services\Admin\*`, validasi di `FormRequest`, otorisasi di `Policy`.
4. **Verifikasi:** Sebelum menganggap task selesai, selalu jalankan:
   - `php artisan test` (harus 100% lulus)
   - `npm run build` (harus 0 error TypeScript)
5. **Git Workflow:** Commit di branch `master` secara atomik per-fitur menggunakan format Conventional Commits.
