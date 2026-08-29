# Sprint 26.02 — Public Pages: Divisi, Struktur & Artikel

| Field | Value |
|---|---|
| **Sprint** | 26.02 |
| **Nama** | Public Pages: Divisi, Struktur Organisasi & Artikel |
| **Tanggal Mulai** | 2026-09-15 (Senin) |
| **Tanggal Selesai** | 2026-09-28 (Minggu) |
| **Status** | `planning` |
| **PIC** | Full-stack |
| **PRD Ref** | User Story #3, #4, #6 (P1) |

---

## Tujuan Sprint

Melanjutkan pembangunan **public-facing website** dengan 4 halaman berikutnya:
- Halaman Divisi Operasional (index + detail per divisi)
- Halaman Struktur Organisasi & Anggota
- Halaman Artikel & Jurnal (list + detail + search)

Setelah sprint ini selesai, website sudah memiliki **6 halaman publik** yang fungsional dan bisa diakses pengunjung.

---

## Goals & Deliverables

| # | Deliverable | Layer | Prioritas |
|:---:|---|---|:---:|
| 1 | Halaman Divisi Index (`/divisi`) — 4 kartu divisi | Frontend | P1 |
| 2 | Halaman Divisi Detail (`/divisi/{slug}`) — deskripsi, program kerja | Frontend | P1 |
| 3 | Halaman Struktur Organisasi (`/struktur`) — hierarki kepengurusan + filter divisi | Frontend | P1 |
| 4 | Halaman Artikel Index (`/artikel`) — list + search + filter kategori + pagination | Frontend | P1 |
| 5 | Halaman Artikel Detail (`/artikel/{slug}`) — rich text, OG meta, share, artikel terkait | Frontend | P1 |
| 6 | `DivisionController` — index + show | Backend | P1 |
| 7 | `MemberController` — index (struktur) | Backend | P1 |
| 8 | `PostController` — index + show | Backend | P1 |
| 9 | Form Request: tidak ada POST (semua GET) — validasi query params | Backend | P2 |
| 10 | Komponen baru: `MemberCard`, `DivisionCard`, `PostCard`, `SearchBar`, `Pagination` | Frontend | P1 |
| 11 | Custom hook: `useSearch` untuk debounced search | Frontend | P2 |
| 12 | Unit test: `DivisionController`, `PostController`, scope `scopePublished` | Test | P1 |
| 13 | Feature test: semua 5 route baru (status 200, Inertia component, data shape) | Test | P1 |

---

## Dependency (Prasyarat)

- [x] Sprint 26.01 selesai (`completed`)
- [x] `PublicLayout` (Navbar + Footer) sudah tersedia
- [x] TypeScript types sudah didefinisikan
- [x] `CloudinaryService` sudah tersedia
- [x] Database terisi via seeder (members, posts, divisions, categories)
- [ ] Data seeder artikel sudah cukup (min 5 artikel published) — verify dengan `PostSeeder`

---

## Scope Halaman

### 3. Halaman Divisi Index (`/divisi`)

Sections:
1. **PageHero** — banner "Divisi Operasional"
2. **DivisionGrid** — 4 kartu (Kaderisasi, SKLH, Litbang, Karata) + kartu Inti Pimpinan
3. Setiap kartu memiliki: ikon/foto, nama, deskripsi singkat, link ke detail

### 4. Halaman Divisi Detail (`/divisi/{slug}`)

Sections:
1. **PageHero** — foto cover divisi, nama, tagline
2. **DescriptionSection** — deskripsi bidang kegiatan
3. **ProgramSection** — daftar program kerja / kegiatan rutin divisi
4. **MemberSection** — anggota aktif divisi ini (dari tabel `members`)
5. **RelatedArticles** — 3 artikel terbaru dari divisi ini

### 5. Halaman Struktur Organisasi (`/struktur`)

Sections:
1. **PageHero** — banner "Struktur Kepengurusan"
2. **FilterBar** — filter by divisi (Inti Pimpinan | Kaderisasi | SKLH | Litbang | Karata)
3. **LeadershipSection** — Inti Pimpinan (Ketua, Sekretaris + Staff, Bendahara) — kartu besar
4. **DivisionSection** — per divisi: Kepala Divisi + anggota divisi
5. Kartu anggota: foto profil, nama, NRP/NIA, jabatan

### 6. Halaman Artikel Index (`/artikel`)

Sections:
1. **PageHero** — banner "Artikel & Jurnal"
2. **SearchBar** — input pencarian real-time (debounced, via `pg_trgm`)
3. **CategoryFilter** — filter pill/tab per kategori
4. **ArticleGrid** — grid kartu artikel (thumbnail, kategori, judul, excerpt, tanggal, penulis)
5. **Pagination** — Laravel pagination via Inertia

### 7. Halaman Artikel Detail (`/artikel/{slug}`)

Sections:
1. **ArticleHeader** — judul, kategori, tanggal, penulis, foto cover
2. **ArticleBody** — rich text render (HTML dari DB, sanitized)
3. **TagList** — pill tag dari JSONB `tags`
4. **ShareButtons** — WhatsApp, copy link
5. **RelatedArticles** — 3 artikel terkait (same category)
6. `<Head>` OG meta: title, description, og:image (cover_url)

---

## Tech Notes

- Pencarian artikel menggunakan PostgreSQL `pg_trgm` — query via `WHERE similarity(title, ?) > 0.3` atau `title ILIKE ?`.
- `PostController@index` menerima query params: `?search=`, `?category=`, `?page=`.
- Filter divisi di `/struktur` dilakukan client-side (data semua member sudah diload) — tidak perlu request baru ke server.
- `useSearch` hook: debounce 300ms + Inertia `router.get` dengan `preserveState: true`.
- Konten artikel dari DB adalah HTML — render dengan `dangerouslySetInnerHTML` tapi **wajib** sanitized di backend (strip malicious tags) sebelum disimpan.
- Route model binding `/divisi/{slug}` dan `/artikel/{slug}` menggunakan kolom `slug`, bukan `id`.
