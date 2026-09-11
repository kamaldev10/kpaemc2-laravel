# Code & Design Conventions — KPA EMC² Web Portal

> Pedoman standar arsitektur kode, penamaan, struktur direktori, dan gaya penulisan.

---

## 1. Bahasa Penulisan

- **Komunikasi Pengguna & UI Label:**
  - Komunikasi di chat: **Bahasa Indonesia**.
  - Label antarmuka pengguna (UI): **Bahasa Indonesia** (contoh: *"Portal Pengurus"*, *"Tulis Artikel Baru"*, *"Diterbitkan"*, *"Draf"*).
- **Kode Program & Komentar:**
  - Semua nama file, class, method, variable, migration table/column: **Bahasa Inggris** (contoh: `PostController`, `StorePostRequest`, `is_published`).
  - Komentar kode (*docblocks*, inline comments): **Bahasa Inggris**.
  - Pesan Git Commit: **Bahasa Inggris** (format Conventional Commits).

---

## 2. Backend (Laravel)

### Architecture Layering
- **Controller:** Wajib tetap tipis (*thin controller*). Tanggung jawab hanya menerima request, memanggil service/action, dan mengembalikan response (`Inertia::render` atau `redirect`).
- **FormRequest:** Wajib untuk semua endpoint create/update. Letakkan di `app/Http/Requests/Admin/` (untuk admin) atau `app/Http/Requests/Public/`.
- **Service Layer:** Semua business logic, transaksi database, pemrosesan media, dan invalidasi cache berada di `app/Services/Admin/` atau `app/Services/`.
- **Policy:** Otorisasi akses model menggunakan Policy di `app/Policies/`.
- **Resource:** Transformasi payload response JSON/Inertia menggunakan `JsonResource` di `app/Http/Resources/Admin/`.

### Naming Conventions
- Model: `SingularPascalCase` (contoh: `Post`, `Member`, `Event`).
- Controller: `{Entity}Controller` (contoh: `PostController`, `DashboardController`).
- Request: `Store{Entity}Request`, `Update{Entity}Request`.
- Service: `{Entity}Service`.
- Policy: `{Entity}Policy`.
- Resource: `{Entity}Resource`.

---

## 3. Frontend (React + Inertia + TypeScript)

### Komponen & Halaman
- Penamaan file komponen: `PascalCase.tsx` (contoh: `RichTextEditor.tsx`, `AdminSidebar.tsx`).
- Lokasi halaman Admin: `resources/js/Pages/Admin/{Module}/` (contoh: `Index.tsx`, `Create.tsx`, `Edit.tsx`).
- Semua halaman admin dibungkus dalam `<AdminLayout title="..." breadcrumbs={...}>`.
- Selalu gunakan Lucide React untuk ikon: `<Calendar className="h-4 w-4" />`.
- Styling: Gunakan utilitas Tailwind CSS murni (dilarang menggunakan inline CSS `style={{...}}` kecuali untuk kalkulasi dinamis seperti minHeight atau color hex).

### TypeScript Standards
- Selalu gunakan `interface` daripada `type` untuk mendefinisikan objek/props.
- Hindari penggunaan `any`. Gunakan type spesifik atau `unknown` dengan type guard jika dinamis.
- Gunakan typed `useForm<FormData>` untuk semua form input Inertia.

---

## 4. Git & Commit Conventions

- **Branch Kerja Utama:** `master`
- **Pemisahan Fitur:** Bedakan commit berdasarkan modul/fitur secara atomik.
- **Prefix Tipe Commit:**
  - `feat(...)`: Fitur baru (backend atau frontend)
  - `fix(...)`: Perbaikan bug
  - `test(...)`: Penambahan atau perbaikan unit/feature test
  - `docs(...)`: Dokumentasi atau perbaikan planning tasks
  - `refactor(...)`: Restrukturisasi kode tanpa perubahan fitur
- **Contoh Pesan Commit:**
  - `feat(admin-post): implement PostController, service, requests, resource, and policy`
  - `feat(admin-post): implement Post index, create, edit pages with rich text editor`
  - `test(admin-post): add unit and feature tests for admin post CRUD`
