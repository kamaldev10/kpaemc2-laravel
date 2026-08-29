# Definition of Done & Acceptance Criteria — Sprint 26.02

---

## Global DoD Checklist

Setiap task dinyatakan **DONE** hanya jika semua poin berikut terpenuhi:

- [ ] Kode berfungsi sesuai spesifikasi di `tasks.md`
- [ ] Tidak ada syntax error (`php -l` untuk PHP, `tsc --noEmit` untuk TS)
- [ ] **MockData per fitur dibuat di `resources/js/mocks/`** dan UI/komponen telah diverifikasi visual sebelum diintegrasikan ke Controller
- [ ] Unit test ditulis dan lulus (`php artisan test tests/Unit/`)
- [ ] Feature test ditulis dan lulus (`php artisan test tests/Feature/`)
- [ ] Tidak ada console error di browser (dev mode)
- [ ] Tampilan responsif di mobile (≤ 640px) dan desktop (≥ 1280px)
- [ ] Tidak ada data hardcode — semua dari DB atau config (atau fallback mock)
- [ ] `npm run lint` tanpa error
- [ ] `npm run format:check` tanpa diff

---

## Acceptance Criteria per Fitur

### ✅ MockData Implementation (Frontend-First)

| Kriteria | Detail |
|---|---|
| `divisionMock.ts` | Menyediakan mock typed 4 divisi lengkap dengan materi, proker, dan foto cover |
| `memberMock.ts` | Menyediakan mock typed pengurus hierarkis (Inti Pimpinan + 4 Kadiv + anggota) |
| `postMock.ts` | Menyediakan mock typed 6 artikel (rich text, kategori, tags JSONB array) |
| Visual verification | Semua halaman (Divisi, Struktur, Artikel) diverifikasi visual dengan MockData sebelum di-bind ke Controller |

### ✅ Halaman Divisi Index (`/divisi`)

| Kriteria | Acceptance Test |
|---|---|
| **Grid Divisi** | 4 kartu tampil (Kaderisasi, SKLH, Litbang, Karata) dengan ikon/foto, nama, deskripsi singkat |
| **Link Detail** | Klik kartu → navigasi ke `/divisi/{slug}` yang benar |
| **SEO** | `<title>` = "Divisi Operasional — KPA EMC²", OG tags ada |
| **Data dari DB** | Data divisi dari tabel `divisions`, bukan hardcode |

### ✅ Halaman Divisi Detail (`/divisi/{slug}`)

| Kriteria | Acceptance Test |
|---|---|
| **Data Divisi** | Nama, deskripsi, foto cover tampil dari DB |
| **Anggota Divisi** | List MemberCard untuk anggota divisi ini (filter by `division_id`) |
| **Artikel Terkait** | Maks 3 artikel terbaru dengan `division_id` yang sama (jika ada) |
| **404 Handling** | Slug tidak valid → response 404, bukan error 500 |
| **SEO** | `<title>` = "{NamaDivisi} — KPA EMC²", `og:image` = foto divisi |

### ✅ Halaman Struktur Organisasi (`/struktur`)

| Kriteria | Acceptance Test |
|---|---|
| **Inti Pimpinan** | Ketua, Sekretaris (+ Staff Ahli Arsip Data & RT), Bendahara tampil di atas dengan layout hierarkis |
| **Divisi Groups** | 4 grup divisi, masing-masing tampil Kepala Divisi + anggota |
| **MemberCard** | Foto profil (Cloudinary atau fallback avatar), nama, NRP/NIA, jabatan — tampil benar |
| **Filter** | Klik filter pill → hanya tampilkan member divisi terpilih (client-side, tanpa reload) |
| **SEO** | `<title>` = "Struktur Kepengurusan — KPA EMC²" |
| **Data dari DB** | Semua data dari tabel `members` + `divisions`, tidak ada hardcode |

### ✅ Halaman Artikel Index (`/artikel`)

| Kriteria | Acceptance Test |
|---|---|
| **Article Grid** | Min 3 artikel published tampil (dari seeder), dengan thumbnail, judul, excerpt, tanggal |
| **Search** | Ketik keyword → hasil filter via `pg_trgm` dalam 300ms (debounce), tanpa reload penuh |
| **Filter Kategori** | Klik pill kategori → hanya tampilkan artikel kategori tersebut |
| **Pagination** | Navigasi halaman bekerja, URL berubah (`?page=2`), state preserved |
| **Empty State** | Jika tidak ada hasil search → tampilkan pesan "Artikel tidak ditemukan" |
| **SEO** | `<title>` = "Artikel & Jurnal — KPA EMC²" |

### ✅ Halaman Artikel Detail (`/artikel/{slug}`)

| Kriteria | Acceptance Test |
|---|---|
| **Konten Artikel** | Judul, foto cover (Cloudinary), penulis, tanggal, body HTML render benar |
| **Tags** | List tag dari JSONB `tags` column tampil sebagai pill badge |
| **Share WhatsApp** | Tombol share menghasilkan URL WA yang valid dengan judul dan link artikel |
| **Copy Link** | Tombol copy menyalin URL halaman ke clipboard, ada feedback (tooltip/toast) |
| **Artikel Terkait** | 3 artikel dengan category yang sama tampil di bawah |
| **404 Handling** | Slug tidak valid → 404, bukan error 500 |
| **OpenGraph** | `og:title`, `og:description`, `og:image` (cover_url) ada di `<head>` |
| **XSS Safety** | Konten HTML di-sanitize saat disimpan (strip script tags) — verifikasi di PostSeeder data |

### ✅ Testing

| Kriteria | Detail |
|---|---|
| `GET /divisi` | 200, `Public/Divisions/Index`, prop `divisions` berisi 4 item |
| `GET /divisi/{valid-slug}` | 200, `Public/Divisions/Show`, prop `division` benar |
| `GET /divisi/slug-tidak-ada` | 404 |
| `GET /struktur` | 200, `Public/Structure/Index`, prop `members` ada |
| `GET /artikel` | 200, `Public/Posts/Index`, prop `posts` paginated |
| `GET /artikel?search=ekspedisi` | 200, results filtered |
| `GET /artikel/{valid-slug}` | 200, `Public/Posts/Show`, prop `post` benar |
| `GET /artikel/slug-tidak-ada` | 404 |
| `Post::scopeSearch()` unit | Test similarity search menghasilkan post yang relevan |
| `Post::scopePublished()` unit | Test hanya post status=published yang masuk |

---

## Sprint Review Checklist

Di akhir sprint (2026-09-28), lakukan review berikut:

- [ ] Demo live: semua 5 halaman baru bisa dibuka di browser tanpa error
- [ ] Semua task di `tasks.md` berstatus ✅
- [ ] `php artisan test` — 0 failure, 0 error
- [ ] `npx tsc --noEmit` — 0 error
- [ ] `npm run lint` — 0 error
- [ ] Mobile test (375px): semua halaman responsif, text tidak terpotong
- [ ] MockData terstruktur di `resources/js/mocks/` siap digunakan untuk fixture/preview
- [ ] Search artikel berfungsi dengan debounce (tidak spam request)
- [ ] Filter client-side di `/struktur` berfungsi tanpa reload
- [ ] OG meta tersedia untuk artikel (cek via https://opengraph.xyz/)
- [ ] Semua 404 route terdefinisi (tidak ada 500 error pada slug invalid)
- [ ] Commit terakhir push ke `develop` branch
