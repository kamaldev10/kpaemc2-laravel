<h1 align="center">Portal Resmi KPA EMC²</h1>
<p align="center">
  <strong>Eksplorasi Mahasiswa Cinta Alam² — Official Web Portal & Content Management System</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-13.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel 13">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/Inertia.js-2.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js 2">
  <img src="https://img.shields.io/badge/PostgreSQL-18+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL 18+">
  <img src="https://img.shields.io/badge/Filament-3.3-FFA800?style=for-the-badge&logo=filament&logoColor=black" alt="Filament v3">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5">
</p>

---

## 📌 Tentang Proyek

**Portal Resmi KPA EMC²** adalah platform web terpadu yang memadukan _Company Profile_, _Media Center & Jurnal Ekspedisi Alam_, serta _Sistem Pendaftaran Kegiatan Terpadu_ untuk organisasi mahasiswa pecinta alam **KPA EMC²**.

Portal ini dirancang untuk menyelesaikan fragmentasi informasi profil organisasi, mengarsipkan catatan perjalanan ekspedisi ke dalam database yang _searchable_, mempermudah registrasi peserta kegiatan terbuka secara digital, serta mendistribusikan dokumentasi media berkualitas tinggi secara efisien tanpa membebani server lokal.

---

## 🚀 Fitur Utama

### 1. Public Portal (React + Inertia.js)

- **Beranda Interaktif (`/`)**: Hero banner alam, statistik pencapaian counter, sorotan 4 divisi, artikel terkini, dan kegiatan mendatang.
- **Tentang Kami (`/tentang`)**: Narasi sejarah pendirian, visi & misi terstruktur, filosofi lambang organisasi, dan Kode Etik Pecinta Alam Indonesia.
- **Divisi Operasional (`/divisi`, `/divisi/{slug}`)**: Informasi detail 4 Divisi Operasional (Kaderisasi, SKLH, Litbang, Karata) dan Inti Pimpinan.
- **Struktur Kepengurusan (`/struktur`)**: Bagan organisasi hierarkis, profil pengurus (nama, NRP/NIA, foto, jabatan), dan filter interaktif.
- **Artikel & Jurnal Alam (`/artikel`, `/artikel/{slug}`)**: Publikasi catatan ekspedisi dengan pencarian cepat berbasis PostgreSQL `pg_trgm`, filter kategori, tag JSONB, rich text render, dan tombol _Share to WhatsApp_.
- **Galeri Dokumentasi (`/galeri`)**: Portofolio visual foto dan video ekspedisi dengan tampilan responsif, filter kategori, dan _lightbox preview_.
- **Katalog & Registrasi Event (`/events`, `/events/{slug}/register`)**: Daftar kegiatan terbuka dengan formulir pendaftaran dinamis (`JSONB` custom fields), upload berkas/bukti transfer, kode registrasi unik, dan fitur cek status mandiri (`/events/check-status`).
- **Kontak & Sekretariat (`/kontak`)**: Peta lokasi sekretariat, form pesan masuk dengan pencatatan IP (`INET`), dan tautan media sosial resmi.

### 2. Admin & CMS Panel (Filament PHP v3)

- **Dashboard Analitik (`/admin`)**: Ringkasan data statistik pendaftar event, artikel, galeri, dan pesan masuk.
- **Role-Based Access Control**: Pembagian hak akses berjenjang (`superadmin`, `editor`, `committee`).
- **Manajemen Konten Lengkap**: CRUD Artikel, Kategori, Galeri, Divisi, Data Anggota, dan Pengaturan Situs Global.
- **Manajemen Event & Pendaftar**: Verifikasi pendaftar, monitoring kuota, dan fitur **Export Data Pendaftar ke Excel/CSV**.
- **Media Management via Cloudinary**: Upload gambar terintegrasi langsung ke Cloudinary CDN dengan kompresi WebP otomatis (Zero-BLOB Storage).

---

## 🛠️ Tech Stack

| Layer                  | Teknologi                  | Versi / Keterangan                     |
| ---------------------- | -------------------------- | -------------------------------------- |
| **Backend Framework**  | Laravel                    | 13.x                                   |
| **Backend Runtime**    | PHP                        | 8.3+ (Tested on 8.5)                   |
| **Database Engine**    | PostgreSQL                 | 18+ (Extension: `pg_trgm`, `unaccent`) |
| **Admin Panel**        | Filament PHP               | 3.3.x                                  |
| **Frontend Framework** | React                      | 19.x                                   |
| **SPA / SSR Bridge**   | Inertia.js                 | 2.0.x (SSR via `resources/js/ssr.tsx`) |
| **Client Routing**     | Ziggy                      | 2.x                                    |
| **Styling & UI**       | Tailwind CSS + Headless UI | Tailwind v3.x + Headless UI v2         |
| **Iconography**        | Lucide React               | 1.x                                    |
| **Media CDN**          | Cloudinary                 | REST API / Zero-BLOB Architecture      |
| **Testing Suite**      | PHPUnit / Pest PHP         | PHPUnit 12.x                           |
| **Build Tool**         | Vite                       | 8.x                                    |

---

## 📋 Prasyarat Sistem

Sebelum menjalankan proyek, pastikan perangkat lokal Anda telah terpasang:

- **PHP** `>= 8.3` dengan ekstensi: `pdo_pgsql`, `pgsql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`, `curl`.
- **Composer** `>= 2.x`
- **Node.js** `>= 20.x` & **npm** `>= 10.x`
- **PostgreSQL** `>= 16` (Default konfigurasi lokal menggunakan port `5433`).

---

## ⚙️ Panduan Instalasi & Setup Lokal

### 1. Clone Repository

```bash
git clone https://github.com/username/kpa-emc2-web.git
cd kpa-emc2-web
```

### 2. Install Dependensi

```bash
# Dependensi PHP
composer install

# Dependensi Frontend (Node/JS)
npm install
```

### 3. Konfigurasi Environment (`.env`)

Salin file template `.env.example`:

```bash
cp .env.example .env
```

Sesuaikan variabel konfigurasi database dan aplikasi di `.env`:

```dotenv
APP_NAME="KPA EMC² Website"   # WAJIB dikutip karena mengandung spasi & karakter khusus
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5433                  # Port PostgreSQL lokal
DB_DATABASE=kpa_emc2_db
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password

# Konfigurasi Media CDN (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name
```

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Eksekusi Migrasi & Seeder Database

Pastikan database `kpa_emc2_db` sudah dibuat di PostgreSQL Anda, kemudian jalankan:

```bash
php artisan migrate --seed
```

> Perintah ini akan mengeksekusi 15 file migrasi dan mengisikan data master divisi, kategori, user pengurus default, profil organisasi, dan artikel sampel.

### 6. Build Asset Frontend

```bash
npm run build
```

---

## 💻 Menjalankan Server Pengembangan

Jalankan server backend Laravel dan server Vite secara bersamaan:

```bash
# Opsi 1: Menjalankan di dua terminal terpisah
php artisan serve     # Terminal 1 -> http://localhost:8000
npm run dev           # Terminal 2 -> Vite Hot-Reload

# Opsi 2: Menggunakan runner concurrent Laravel
composer dev
```

Akses portal di browser:

- **Public Portal**: [http://localhost:8000](http://localhost:8000)
- **Admin Panel**: [http://localhost:8000/admin](http://localhost:8000/admin)

---

## 🧪 Verifikasi & Pengujian (Quality Assurance)

Sebelum melakukan commit kode, pastikan seluruh siklus verifikasi berikut lulus:

```bash
# 1. Menjalankan seluruh test suite (Unit & Feature)
php artisan test

# 2. Type-checking TypeScript
npx tsc --noEmit

# 3. Linter kode JavaScript/TypeScript
npm run lint

# 4. Verifikasi format kode Prettier
npm run format:check
```

---

## 📂 Struktur Direktori Utama

```
kpa-emc2-web/
├── app/
│   ├── Filament/Resources/       # Resource CRUD Admin Panel
│   ├── Http/Controllers/Public/   # Controller halaman publik
│   ├── Http/Requests/            # Form Request Validation
│   ├── Models/                   # Eloquent Models (menggunakan HasAuditColumns)
│   └── Services/                 # Business logic (CloudinaryService, dll)
├── database/
│   ├── migrations/               # 15 Migrasi skema database (PostgreSQL 18+)
│   ├── seeders/                  # 11 Seeder data master & sampel
│   └── factories/                # Model factories untuk testing
├── resources/
│   ├── js/
│   │   ├── Components/Public/    # Komponen UI publik (Layout, Cards, Sections, UI)
│   │   ├── Pages/Public/         # Halaman publik (Home, About, Divisions, Posts, dll)
│   │   ├── mocks/                # Typed MockData per fitur (MockData First workflow)
│   │   ├── types/                # Definisi TypeScript interfaces
│   │   └── hooks/                # Custom React hooks
│   └── views/app.blade.php       # Template root Inertia
├── routes/
│   ├── web.php                   # Route publik & autentikasi
│   └── console.php               # Jadwal perintah artisan
├── tests/
│   ├── Unit/                     # Unit test Models, Services, Traits
│   └── Feature/                  # Feature/Integration test endpoints & auth
├── docs/                         # Dokumentasi teknis, PRD, database, & planning sprint
├── AGENTS.md                     # Konteks dan aturan untuk AI agents
└── GEMINI.md                     # Konteks spesifik Gemini CLI
```

---

## 📚 Indeks Dokumentasi Proyek

Dokumentasi lengkap proyek tersimpan di folder `docs/`:

| Dokumen                                 | Lokasi File                                                                                                                          | Deskripsi                                                           |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **Product Requirements Document (PRD)** | [`docs/PRD_Company_Profile_KPA_EMC2.md`](file:///home/ali-musthafa-kamal/projects/kpa-emc2-web/docs/PRD_Company_Profile_KPA_EMC2.md) | Spesifikasi lengkap, user stories, acceptance criteria, dan roadmap |
| **Planning Rules & Conventions**        | [`docs/planning/planning_rules.md`](file:///home/ali-musthafa-kamal/projects/kpa-emc2-web/docs/planning/planning_rules.md)           | Aturan baku, konvensi kode, Git workflow, testing rules, dan DoD    |
| **Sprint 26.01 Planning**               | [`docs/planning/26.01/overview.md`](file:///home/ali-musthafa-kamal/projects/kpa-emc2-web/docs/planning/26.01/overview.md)           | Rencana Sprint 1: Core Setup, PublicLayout, Beranda, Tentang Kami   |
| **Sprint 26.02 Planning**               | [`docs/planning/26.02/overview.md`](file:///home/ali-musthafa-kamal/projects/kpa-emc2-web/docs/planning/26.02/overview.md)           | Rencana Sprint 2: Halaman Divisi, Struktur Organisasi, Artikel      |
| **Database Tables Overview**            | [`docs/database/db_tables.md`](file:///home/ali-musthafa-kamal/projects/kpa-emc2-web/docs/database/db_tables.md)                     | Gambaran umum 15 tabel database                                     |
| **Database Table Details**              | [`docs/database/db_table_details.md`](file:///home/ali-musthafa-kamal/projects/kpa-emc2-web/docs/database/db_table_details.md)       | Detail kolom, tipe data, default, dan constraint                    |
| **Database Relations**                  | [`docs/database/db_relations.md`](file:///home/ali-musthafa-kamal/projects/kpa-emc2-web/docs/database/db_relations.md)               | Relasi antar tabel dan Foreign Key                                  |
| **Database Business Rules**             | [`docs/database/db_rules.md`](file:///home/ali-musthafa-kamal/projects/kpa-emc2-web/docs/database/db_rules.md)                       | 5 kolom audit, Zero-BLOB policy, JSONB array constraints            |
| **Migration Runbook**                   | [`docs/migrations/migration_rules.md`](file:///home/ali-musthafa-kamal/projects/kpa-emc2-web/docs/migrations/migration_rules.md)     | Panduan eksekusi migrasi, rollback, dan skenario evolusi skema      |

---

## 👥 Struktur Organisasi KPA EMC²

- **Inti Pimpinan**: Ketua · Sekretaris (_Staff Ahli Arsip Data & Rumah Tangga_) · Bendahara
- **Divisi Operasional**:
  1. **Kaderisasi** — Pendidikan, rekrutmen, dan pembinaan anggota
  2. **SKLH** — Sosial Kemasyarakatan & Lingkungan Hidup
  3. **Litbang** — Penelitian, pengembangan ilmu kepecintaalaman & jurnal ekspedisi
  4. **Karata** — Kepala Rumah Tangga, fasilitas & logistik basecamp

---

## 📄 Lisensi

Proyek ini dikembangkan khusus untuk organisasi **KPA EMC² (Eksplorasi Mahasiswa Cinta Alam²)**. Hak Cipta dilindungi undang-undang.
