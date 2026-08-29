# Sprint 26.01 — Core Foundation & Public Shell

| Field | Value |
|---|---|
| **Sprint** | 26.01 |
| **Nama** | Core Foundation & Public Shell |
| **Tanggal Mulai** | 2026-09-01 (Senin) |
| **Tanggal Selesai** | 2026-09-14 (Minggu) |
| **Status** | `active` |
| **PIC** | Full-stack |
| **PRD Ref** | User Story #1, #2 (P1) |

---

## Tujuan Sprint

Membangun **fondasi teknis** yang dibutuhkan seluruh sprint selanjutnya dan mengimplementasikan **2 halaman publik pertama** — Beranda (Home) dan Tentang Kami — lengkap dengan layout, navigasi, dan data dari database.

Setelah sprint ini selesai:
- Pengunjung bisa membuka website dan melihat Beranda dengan Hero Section, Stats Bar, dan konten highlight.
- Pengunjung bisa membuka halaman `/tentang` dan membaca profil organisasi.
- Infrastruktur (Seeder, Cloudinary, PublicLayout, TypeScript types) siap digunakan sprint berikutnya.

---

## Goals & Deliverables

| # | Deliverable | Layer | Prioritas |
|:---:|---|---|:---:|
| 1 | Jalankan semua seeder — database terisi data awal | Database | P0 |
| 2 | `PublicLayout` — Navbar (desktop + mobile drawer) + Footer | Frontend | P0 |
| 3 | `CloudinaryService` — upload, delete, URL builder | Backend | P0 |
| 4 | TypeScript type definitions (`types/`) | Frontend | P0 |
| 5 | Halaman Beranda (`/`) — Hero, StatsBar, Highlights | Frontend | P1 |
| 6 | Halaman Tentang Kami (`/tentang`) — Profil, Visi-Misi, Sejarah | Frontend | P1 |
| 7 | `HomeController` + `AboutController` | Backend | P1 |
| 8 | Route registrasi public (`routes/web.php`) | Backend | P1 |
| 9 | Unit test: `CloudinaryService`, `SiteSettingModel` | Test | P1 |
| 10 | Feature test: GET `/` dan GET `/tentang` | Test | P1 |

---

## Dependency (Prasyarat)

- [x] PostgreSQL 18+ berjalan di port 5433
- [x] 15 migrasi sudah `Ran` (batch 1)
- [x] 12 Eloquent Models tersedia
- [x] 12 Factories + 11 Seeders sudah ditulis
- [ ] Akun Cloudinary (API key, secret, cloud name) — masukkan ke `.env`
- [ ] `npm install` sudah dijalankan

---

## Scope Halaman

### 1. Beranda (`/`)

Sections yang harus ada:
1. **HeroSection** — foto/video alam, tagline, CTA button ("Eksplorasi Kami" + "Daftar Kegiatan")
2. **StatsBar** — 4 angka: Tahun Berdiri, Anggota Aktif, Ekspedisi Sukses, Puncak/Gua Terjelajahi
3. **DivisiHighlight** — 4 kartu divisi (Kaderisasi, SKLH, Litbang, Karata) dengan link ke `/divisi/{slug}`
4. **ArticleHighlight** — 3 artikel terbaru dengan thumbnail, judul, excerpt, tanggal
5. **EventHighlight** — Kegiatan mendatang (maks 2) dengan tanggal dan CTA daftar
6. **CTABanner** — Banner ajakan bergabung dengan tombol ke `/kontak`

### 2. Tentang Kami (`/tentang`)

Sections yang harus ada:
1. **PageHero** — banner halaman dengan judul "Tentang Kami"
2. **ProfilSection** — narasi sejarah pendirian, tahun berdiri, latar belakang
3. **VisiMisiSection** — Visi + list Misi + Kode Etik Pecinta Alam
4. **LogoSection** — makna/filosofi lambang EMC² (data dari `about_infos.org_name`, `logo_url`, `description`)
5. **CTASection** — ajakan ke halaman divisi atau kegiatan

---

## Tech Notes

- Data `about_infos` diambil dengan `AboutInfo::find(1)` — singleton.
- Stats Bar menggunakan kombinasi `SiteSetting::get('stats_*')` untuk nilai yang bisa diedit admin.
- `CloudinaryService` perlu env vars: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
- Layout public menggunakan `resources/js/Pages/Public/` terpisah dari `Pages/Auth/`.
- SSR aktif — hindari `window`/`localStorage` di top-level komponen.
