# Overview — KPA EMC² Web Portal

> Gambaran umum permanen proyek. Diperbarui hanya saat ada perubahan fundamental (stack, domain, struktur direktori).

---

## Identitas Proyek

- **Nama:** Portal Resmi KPA EMC² (Eksplorasi Mahasiswa Cinta Alam²)
- **Organisasi:** Kelompok Pecinta Alam – Fakultas MIPA, Universitas Riau
- **Jenis Sistem:** Company Profile + CMS + Event Registration System
- **URL Target:** Website resmi organisasi
- **Media CDN:** Cloudinary (**Zero-BLOB** — dilarang menyimpan biner gambar/file ke PostgreSQL)

---

## Tech Stack

| Layer | Teknologi | Versi |
|---|---|---|
| Backend Framework | Laravel | 13 |
| Bahasa Backend | PHP | 8.5 |
| Database | PostgreSQL | 18+ |
| DB Port | — | **5433** (non-default, wajib diingat) |
| Admin Panel Tambahan | Filament PHP | v3.3 |
| Frontend | React | 19 |
| Frontend SSR | Inertia.js | v2 |
| Routing JS | Ziggy | v2 |
| Build Tool | Vite | v8 |
| Bahasa Frontend | TypeScript | v5 |
| Styling | Tailwind CSS | v3 |
| Komponen UI | Headless UI | v2 |
| Icon | Lucide React | v1 |
| Testing | PHPUnit | 12 |
| Media CDN | Cloudinary | REST API |

---

## Domain & Entitas Utama

| Entitas | Model | Tabel | Keterangan |
|---|---|---|---|
| Artikel & Berita | `Post` | `posts` | UUID PK, memiliki slug unik, cover image via Cloudinary, kategori, divisi, tags (JSONB) |
| Kategori | `Category` | `categories` | type: `post`, `event`, `gallery` |
| Kegiatan/Agenda | `Event` | `events` | Sama seperti Post, ditambah start/end date & registrasi |
| Pengurus/Anggota | `Member` | `members` | Foto avatar via Cloudinary, divisi, tahun jabatan |
| Divisi | `Division` | `divisions` | Daftar divisi kepengurusan |
| Pengaturan Situs | `SiteSetting` | `site_settings` | Key-value config dinamis |
| User Admin | `User` | `users` | Role: SUPER_ADMIN, ADMIN, EDITOR |
| Kontak | `Contact` | `contacts` | Pesan masuk dari form kontak publik |

---

## Struktur Direktori Kunci

```
kpa-emc2-web/
├── docs/
│   ├── memory/                     ← AI Memory folder (BACA INI)
│   ├── planning/
│   │   ├── planning_rules.md       ← Konvensi & aturan proyek (baca sebelum coding)
│   │   ├── 26.01/                  ← Sprint 1 (selesai)
│   │   └── 26.02/                  ← Sprint 2 (aktif)
│   ├── database/                   ← Skema dan relasi DB
│   └── migrations/                 ← Panduan dan manifest migrasi
│
├── app/
│   ├── Enums/
│   │   └── RoleTypeEnum.php        ← SUPER_ADMIN | ADMIN | EDITOR
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/              ← Admin Inertia controllers
│   │   │   └── Public/             ← Public-facing controllers
│   │   ├── Middleware/
│   │   │   └── EnsureAdmin.php     ← Proteksi route /admin/*
│   │   ├── Requests/Admin/         ← FormRequest untuk admin CRUD
│   │   └── Resources/Admin/        ← JsonResource untuk Inertia response
│   ├── Models/
│   │   └── Traits/
│   │       ├── HasAuditColumns.php ← Auto created_by/updated_by
│   │       └── HasUuidKey.php      ← UUID primary key
│   ├── Policies/                   ← Authorization policies
│   └── Services/
│       ├── CloudinaryService.php   ← Upload/delete gambar ke Cloudinary
│       └── Admin/
│           └── PostService.php     ← Business logic artikel
│
├── resources/js/
│   ├── Layouts/
│   │   ├── AdminLayout.tsx         ← Layout admin (sidebar + navbar + flash alerts)
│   │   ├── PublicLayout.tsx        ← Layout halaman publik
│   │   └── AuthenticatedLayout.tsx
│   ├── Pages/
│   │   ├── Admin/                  ← Halaman admin panel (Inertia)
│   │   │   ├── Dashboard.tsx
│   │   │   └── Posts/              ← Index, Create, Edit
│   │   └── Public/                 ← Halaman website publik
│   ├── Components/
│   │   ├── Admin/
│   │   │   ├── Editor/RichTextEditor.tsx
│   │   │   ├── Form/ImageUploader.tsx
│   │   │   └── Layout/             ← Sidebar, Navbar, Breadcrumbs, UserDropdown
│   │   └── Public/
│   ├── mocks/                      ← TypeScript mock data (Mock-First workflow)
│   └── types/                      ← TypeScript interfaces
│       ├── index.d.ts
│       ├── post.ts
│       └── admin.d.ts
│
├── routes/
│   ├── web.php                     ← Public + Admin Inertia routes
│   └── auth.php                    ← Auth routes (registrasi publik dinonaktifkan)
│
├── tests/
│   ├── Feature/
│   │   ├── Admin/                  ← Admin CRUD feature tests
│   │   └── Public/                 ← Public route tests
│   └── Unit/
│       ├── Models/                 ← Model unit tests
│       └── Services/Admin/         ← Service unit tests
│
├── GEMINI.md                       ← AI context root (Gemini/Antigravity)
├── AGENTS.md                       ← AI context root (Codex/Claude Agents)
├── .cursor/PROMPT.md               ← Cursor IDE context
├── .gemini/PROMPT.md               ← Gemini CLI context
└── .agents/rules/                  ← Detail rules per-kategori
```

---

## Dua Admin Engine yang Berdampingan

Proyek ini memiliki **dua admin engine** yang berjalan berdampingan di path yang sama (`/admin`):

1. **Custom Inertia Admin** (`/admin`) — admin dashboard buatan sendiri dengan React + Inertia.js.
   - Route: `routes/web.php`, controller: `App\Http\Controllers\Admin\*`
   - Protected by: `auth + verified + EnsureAdmin` middleware
2. **Filament PHP** (`/admin/login`, dll) — Filament panel sebagai fallback / pengembangan masa depan.
   - Provider: `app/Providers/Filament/AdminPanelProvider.php`
   - Custom Inertia `GET /admin` mengambil prioritas dari Filament.
