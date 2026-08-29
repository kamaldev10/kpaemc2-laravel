# File Map — Sprint 26.01

Daftar lengkap file yang **dibuat (NEW)**, **diubah (MOD)**, atau **dihapus (DEL)** pada sprint ini.

---

## Backend (Laravel)

### New Files

| File | Keterangan |
|---|---|
| `app/Services/CloudinaryService.php` | Service untuk upload, delete, dan URL builder Cloudinary |
| `app/Http/Controllers/Public/HomeController.php` | Controller untuk route `/` |
| `app/Http/Controllers/Public/AboutController.php` | Controller untuk route `/tentang` |
| `tests/Unit/Services/CloudinaryServiceTest.php` | Unit test CloudinaryService |
| `tests/Unit/Models/SiteSettingTest.php` | Unit test SiteSetting::get() helper |
| `tests/Unit/Traits/HasAuditColumnsTest.php` | Unit test HasAuditColumns trait |
| `tests/Feature/Public/HomeTest.php` | Feature test GET / |
| `tests/Feature/Public/AboutTest.php` | Feature test GET /tentang |

### Modified Files

| File | Perubahan |
|---|---|
| `routes/web.php` | Tambah route `GET /` → HomeController, `GET /tentang` → AboutController |
| `.env.example` | Tambah placeholder `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_URL` |

---

## Frontend (React / TypeScript)

### New Files — Types

| File | Keterangan |
|---|---|
| `resources/js/types/index.d.ts` | Global PageProps, User, PaginatedResource |
| `resources/js/types/about.ts` | AboutInfo, OrgStructure interface |
| `resources/js/types/site.ts` | SiteSetting interface |
| `resources/js/types/division.ts` | Division interface (untuk digunakan di Home) |
| `resources/js/types/post.ts` | Post, Category interface (untuk ArticleHighlight) |
| `resources/js/types/event.ts` | Event interface (untuk EventHighlight) |

### New Files — MockData (WAJIB sebelum Integrasi Server)

| File | Keterangan |
|---|---|
| `resources/js/mocks/homeMock.ts` | Mock dataset lengkap Beranda (Hero, Stats, 4 Divisions, 3 Posts, 2 Events) |
| `resources/js/mocks/aboutMock.ts` | Mock dataset lengkap Tentang Kami (Profil, Visi, Misi, Kode Etik, Filosofi Logo) |

### New Files — Layout Components

| File | Keterangan |
|---|---|
| `resources/js/Components/Public/Layout/PublicLayout.tsx` | Layout wrapper: Navbar + children + Footer |
| `resources/js/Components/Public/Layout/Navbar.tsx` | Navigasi desktop + mobile drawer (Headless UI Dialog) |
| `resources/js/Components/Public/Layout/Footer.tsx` | Footer dengan link, sosial media, copyright |

### New Files — Reusable UI Components

| File | Keterangan |
|---|---|
| `resources/js/Components/Public/UI/PageHero.tsx` | Reusable page banner (title, subtitle, background image) |
| `resources/js/Components/Public/UI/CTABanner.tsx` | Banner CTA (text + button) |

### New Files — Section Components (Beranda)

| File | Keterangan |
|---|---|
| `resources/js/Components/Public/Sections/HeroSection.tsx` | Hero banner utama halaman Beranda |
| `resources/js/Components/Public/Sections/StatsBar.tsx` | Bar statistik 4 angka |
| `resources/js/Components/Public/Sections/DivisionHighlight.tsx` | 4 kartu divisi highlight |
| `resources/js/Components/Public/Sections/ArticleHighlight.tsx` | 3 artikel terbaru |
| `resources/js/Components/Public/Sections/EventHighlight.tsx` | Kegiatan mendatang |

### New Files — Section Components (Tentang Kami)

| File | Keterangan |
|---|---|
| `resources/js/Components/Public/Sections/ProfilSection.tsx` | Narasi sejarah + profil organisasi |
| `resources/js/Components/Public/Sections/VisiMisiSection.tsx` | Visi + Misi + Kode Etik |
| `resources/js/Components/Public/Sections/LogoSection.tsx` | Filosofi lambang EMC² |

### New Files — Pages

| File | Keterangan |
|---|---|
| `resources/js/Pages/Public/Home.tsx` | Halaman Beranda (/) |
| `resources/js/Pages/Public/About.tsx` | Halaman Tentang Kami (/tentang) |

### Modified Files

| File | Perubahan |
|---|---|
| `resources/js/app.tsx` | Tidak ada perubahan (struktur sudah benar) |
| `tailwind.config.js` | Tambah custom brand color palette (`brand` purple scale: 50-950) ke theme extend |

---

## Direktori Baru yang Terbentuk

```
app/
  Http/Controllers/Public/           ← Baru
  Services/                          ← Baru

resources/js/
  Components/Public/
    Layout/                          ← Baru
    Sections/                        ← Baru
    UI/                              ← Baru
  mocks/                             ← Baru (MockData First)
  Pages/Public/                      ← Baru
  types/                             ← Baru

tests/
  Unit/
    Models/                          ← Baru
    Services/                        ← Baru
    Traits/                          ← Baru
  Feature/Public/                    ← Baru
```

---

## File yang TIDAK Diubah di Sprint Ini

- Semua 15 migration files — sudah `Ran`, tidak disentuh
- `app/Models/` — semua sudah ada, tidak perlu modifikasi
- `app/Filament/` — belum ada, tidak dibuat di sprint ini (Filament Resources → Sprint selanjutnya)
- `database/seeders/` — sudah ada, hanya dijalankan
- `database/factories/` — sudah ada, digunakan oleh test
