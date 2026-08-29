# Tasks — Sprint 26.01

> Layer: DB = Database/Seeder · BE = Laravel Backend · FE = React/TypeScript · MOCK = Frontend MockData · TEST = Pest/PHPUnit

---

## Week 1 (2026-09-01 ~ 09-07)

### Layer: Database & Backend Infrastructure

| # | Task | Layer | Estimasi | Status |
|:---:|---|:---:|:---:|:---:|
| 1.1 | Jalankan `php artisan db:seed` — verifikasi semua tabel terisi | DB | 0.5 jam | ⬜ |
| 1.2 | Buat `CloudinaryService` di `app/Services/CloudinaryService.php` | BE | 2 jam | ⬜ |
| 1.3 | Tambah env vars Cloudinary ke `.env` dan `.env.example` | BE | 0.5 jam | ⬜ |
| 1.4 | Buat `HomeController` (`app/Http/Controllers/Public/HomeController.php`) | BE | 1 jam | ⬜ |
| 1.5 | Buat `AboutController` (`app/Http/Controllers/Public/AboutController.php`) | BE | 1 jam | ⬜ |
| 1.6 | Daftarkan public routes di `routes/web.php` | BE | 0.5 jam | ⬜ |

### Layer: Frontend Infrastructure & MockData

| # | Task | Layer | Estimasi | Status |
|:---:|---|:---:|:---:|:---:|
| 1.7 | Buat TypeScript types: `resources/js/types/index.d.ts` (global PageProps, User) | FE | 1 jam | ⬜ |
| 1.8 | Buat TypeScript types: `resources/js/types/about.ts` (AboutInfo, OrgStructure) | FE | 0.5 jam | ⬜ |
| 1.9 | Buat TypeScript types: `resources/js/types/site.ts` (SiteSetting) | FE | 0.5 jam | ⬜ |
| 1.10 | Buat TypeScript types: `resources/js/types/division.ts`, `post.ts`, `event.ts` | FE | 1 jam | ⬜ |
| 1.11 | **Buat MockData Beranda** (`resources/js/mocks/homeMock.ts`) | MOCK | 1 jam | ⬜ |
| 1.12 | **Buat MockData Tentang Kami** (`resources/js/mocks/aboutMock.ts`) | MOCK | 1 jam | ⬜ |
| 1.13 | Buat `PublicLayout` wrapper (`resources/js/Components/Public/Layout/PublicLayout.tsx`) | FE | 2 jam | ⬜ |
| 1.14 | Buat `Navbar` component — desktop nav + mobile hamburger drawer | FE | 3 jam | ⬜ |
| 1.15 | Buat `Footer` component | FE | 1.5 jam | ⬜ |

---

## Week 2 (2026-09-08 ~ 09-14)

### Layer: Halaman Beranda (/) — Mock-Driven lalu Integrasi

| # | Task | Layer | Estimasi | Status |
|:---:|---|:---:|:---:|:---:|
| 2.1 | Buat `HeroSection` component (mock/Cloudinary bg + CTA buttons) | FE | 2.5 jam | ⬜ |
| 2.2 | Buat `StatsBar` component (counter angka pencapaian via mock data) | FE | 1.5 jam | ⬜ |
| 2.3 | Buat `DivisionHighlight` component (4 kartu divisi via mock data) | FE | 2 jam | ⬜ |
| 2.4 | Buat `ArticleHighlight` component (3 artikel terbaru via mock data) | FE | 2 jam | ⬜ |
| 2.5 | Buat `EventHighlight` component (kegiatan mendatang via mock data) | FE | 1.5 jam | ⬜ |
| 2.6 | Buat `CTABanner` component | FE | 1 jam | ⬜ |
| 2.7 | Buat halaman `Home.tsx` — susun sections & verifikasi visual dengan `homeMock.ts` | FE | 1.5 jam | ⬜ |
| 2.8 | Integrasi: Hubungkan `HomeController` dengan data DB & bind ke `Home.tsx` | BE | 1.5 jam | ⬜ |

### Layer: Halaman Tentang Kami (/tentang) — Mock-Driven lalu Integrasi

| # | Task | Layer | Estimasi | Status |
|:---:|---|:---:|:---:|:---:|
| 2.9 | Buat `PageHero` component (reusable banner) | FE | 1 jam | ⬜ |
| 2.10 | Buat `ProfilSection` component (sejarah + narasi via `aboutMock.ts`) | FE | 1.5 jam | ⬜ |
| 2.11 | Buat `VisiMisiSection` component (Visi + Misi + Kode Etik via `aboutMock.ts`) | FE | 2 jam | ⬜ |
| 2.12 | Buat `LogoSection` component (filosofi lambang via `aboutMock.ts`) | FE | 1.5 jam | ⬜ |
| 2.13 | Buat halaman `About.tsx` — susun sections, verifikasi visual dengan `aboutMock.ts` | FE | 1 jam | ⬜ |
| 2.14 | Integrasi: Hubungkan `AboutController` dengan `about_infos` DB & bind ke `About.tsx` | BE | 1 jam | ⬜ |

### Layer: Testing

| # | Task | Layer | Estimasi | Status |
|:---:|---|:---:|:---:|:---:|
| 2.15 | Unit test: `CloudinaryService` — mock HTTP calls, test upload/delete/url | TEST | 2 jam | ⬜ |
| 2.16 | Unit test: `SiteSetting::get()` — happy path + missing key fallback | TEST | 0.5 jam | ⬜ |
| 2.17 | Unit test: `HasAuditColumns` — created_by/updated_by auto-fill | TEST | 1 jam | ⬜ |
| 2.18 | Feature test: `GET /` — status 200, Inertia component `Public/Home`, data shape | TEST | 1 jam | ⬜ |
| 2.19 | Feature test: `GET /tentang` — status 200, Inertia component `Public/About`, aboutInfo present | TEST | 0.5 jam | ⬜ |

---

## Summary Estimasi

| Layer | Total Estimasi |
|---|---|
| Database | 0.5 jam |
| Backend | 6.5 jam |
| MockData | 2 jam |
| Frontend | 25.5 jam |
| Testing | 5 jam |
| **Total** | **~39.5 jam** |

> Untuk 2 minggu (14 hari) pengerjaan solo, ini realistis dengan pace ~3-4 jam/hari.
