# Definition of Done & Acceptance Criteria — Sprint 26.01

---

## Global DoD Checklist

Setiap task dinyatakan **DONE** hanya jika semua poin berikut terpenuhi:

- [x] Kode berfungsi sesuai spesifikasi di `tasks.md`
- [x] Tidak ada syntax error (`php -l` untuk PHP, `tsc --noEmit` untuk TS)
- [x] **MockData per fitur dibuat di `resources/js/mocks/`** dan UI/komponen telah diverifikasi visual sebelum diintegrasikan ke Controller
- [x] Unit test ditulis dan lulus (`php artisan test tests/Unit/`)
- [x] Feature test ditulis dan lulus (`php artisan test tests/Feature/`)
- [x] Tidak ada console error di browser (dev mode)
- [x] Tampilan responsif di mobile (≤ 640px) dan desktop (≥ 1280px)
- [x] Tidak ada data hardcode — semua dari DB atau config (atau fallback mock)
- [x] `npm run lint` tanpa error (0 errors, 0 warnings)
- [x] `npm run format:check` tanpa diff

---

## Acceptance Criteria per Fitur

### ✅ MockData Implementation (Frontend-First)

| Kriteria            | Detail                                                                                                    |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| `homeMock.ts`       | Menyediakan mock typed untuk `AboutInfo`, `Division[]`, `Post[]`, `Event[]`, `SiteSetting`                |
| `aboutMock.ts`      | Menyediakan mock typed untuk `AboutInfo` (visi, misi, sejarah, logo)                                      |
| Visual verification | Komponen Beranda dan Tentang Kami diverifikasi tampil rapi dengan MockData sebelum controller dihubungkan |

### ✅ CloudinaryService

| Kriteria             | Detail                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------- |
| Upload berhasil      | `upload($file)` mengembalikan array `['url' => '...', 'public_id' => '...']`                 |
| Delete berhasil      | `delete($publicId)` mengembalikan `true` jika berhasil                                       |
| URL builder          | `url($publicId, 'f_auto,q_auto,w_800')` menghasilkan URL valid                               |
| Env vars terdefinisi | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` ada di `.env.example` |
| Unit test coverage   | ≥ 90% method coverage                                                                        |

### ✅ PublicLayout (Navbar + Footer)

| Kriteria           | Detail                                                                    |
| ------------------ | ------------------------------------------------------------------------- |
| Desktop nav        | Semua link menu tampil horizontal, active state highlight                 |
| Mobile drawer      | Hamburger button buka drawer, semua link tersedia, tutup saat link diklik |
| Touch target       | Semua tombol/link min 44×44px                                             |
| Footer             | Logo, link navigasi, sosial media, copyright tampil benar                 |
| No hydration error | Tidak ada SSR/hydration warning di console                                |

### ✅ Halaman Beranda (`/`)

| Kriteria              | Acceptance Test                                                                               |
| --------------------- | --------------------------------------------------------------------------------------------- |
| **HeroSection**       | Foto alam tampil, tagline terbaca, 2 CTA button berfungsi (link ke `/divisi` dan `/kegiatan`) |
| **StatsBar**          | 4 angka statistik tampil (Tahun Berdiri, Anggota, Ekspedisi, Puncak/Gua)                      |
| **DivisionHighlight** | 4 kartu divisi tampil, link mengarah ke `/divisi/{slug}` yang benar                           |
| **ArticleHighlight**  | 3 artikel terbaru dari DB (bukan hardcode), thumbnail Cloudinary, link ke `/artikel/{slug}`   |
| **EventHighlight**    | Tampil jika ada event mendatang; tersembunyi jika tidak ada event                             |
| **SEO**               | `<title>` berisi nama organisasi, `og:title` dan `og:description` ada di `<head>`             |
| **Performance**       | Tidak ada layout shift saat gambar dimuat (gunakan `aspect-ratio` atau dimensi eksplisit)     |

### ✅ Halaman Tentang Kami (`/tentang`)

| Kriteria            | Acceptance Test                                                          |
| ------------------- | ------------------------------------------------------------------------ |
| **ProfilSection**   | Narasi sejarah dari `about_infos.description` tampil (bukan placeholder) |
| **VisiMisiSection** | Visi 1 kalimat + list misi + kode etik pecinta alam tampil terstruktur   |
| **LogoSection**     | Logo KPA EMC² tampil (Cloudinary URL), filosofi lambang terbaca          |
| **SEO**             | `<title>` = "Tentang Kami — KPA EMC²", OG tags ada                       |
| **Data dari DB**    | Semua konten dari `about_infos` row id=1, tidak ada hardcode             |

### ✅ Testing

| Kriteria                      | Detail                                                                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `GET /`                       | Status 200, Inertia component `Public/Home`, props memiliki: `aboutInfo`, `divisions`, `latestPosts`, `upcomingEvents` |
| `GET /tentang`                | Status 200, Inertia component `Public/About`, props memiliki: `aboutInfo`                                              |
| `CloudinaryService` unit test | Upload mock, delete mock, URL generation — semua pass                                                                  |
| `SiteSetting::get()`          | Return value yang benar; return default jika key tidak ada                                                             |
| `HasAuditColumns`             | `created_by` terisi saat model di-create dengan auth user, `updated_by` saat update                                    |

---

## Sprint Review Checklist

Di akhir sprint (2026-09-14), lakukan review berikut:

- [x] Demo live: buka `http://localhost:8000` — Beranda dan Tentang Kami berfungsi penuh
- [x] Semua task di `tasks.md` berstatus ✅
- [x] `php artisan test` — 0 failure, 0 error (40/40 tests passing)
- [x] `npx tsc --noEmit` — 0 error
- [x] `npm run lint` — 0 error (0 warnings)
- [x] Mobile test: buka di 375px width — layout tidak rusak, navigasi bisa digunakan
- [x] MockData terstruktur di `resources/js/mocks/` dan siap digunakan untuk fixture test/preview
- [x] Tidak ada data hardcode yang tersisa di kode produksi
- [x] Dokumen sprint diupdate (status tasks, catatan kendala)
