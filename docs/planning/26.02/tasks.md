# Tasks — Sprint 26.02

> Layer: BE = Laravel Backend · FE = React/TypeScript · MOCK = Frontend MockData · TEST = Pest/PHPUnit

---

## Week 1 (2026-09-15 ~ 09-21)

### Layer: Backend — Controllers & Routes

| # | Task | Layer | Estimasi | Status |
|:---:|---|:---:|:---:|:---:|
| 1.1 | Buat `DivisionController` — `index()` + `show($slug)` | BE | 1.5 jam | ⬜ |
| 1.2 | Buat `MemberController` — `index()` dengan grouping by divisi | BE | 1.5 jam | ⬜ |
| 1.3 | Buat `PostController` — `index()` + `show($slug)` + query param search/category/page | BE | 2 jam | ⬜ |
| 1.4 | Daftarkan routes baru di `routes/web.php` | BE | 0.5 jam | ⬜ |
| 1.5 | Implement trigram search di `Post::scopeSearch($query, $term)` | BE | 1.5 jam | ⬜ |
| 1.6 | Tambah Route Model Binding by `slug` untuk Division dan Post | BE | 0.5 jam | ⬜ |

### Layer: Frontend Types, MockData & Shared Components

| # | Task | Layer | Estimasi | Status |
|:---:|---|:---:|:---:|:---:|
| 1.7 | Buat TypeScript types: `resources/js/types/division.ts`, `member.ts`, `post.ts` | FE | 1 jam | ⬜ |
| 1.8 | **Buat MockData Divisi** (`resources/js/mocks/divisionMock.ts`) | MOCK | 0.5 jam | ⬜ |
| 1.9 | **Buat MockData Anggota & Struktur** (`resources/js/mocks/memberMock.ts`) | MOCK | 1 jam | ⬜ |
| 1.10 | **Buat MockData Artikel & Jurnal** (`resources/js/mocks/postMock.ts`) | MOCK | 1 jam | ⬜ |
| 1.11 | Buat `DivisionCard` component (menggunakan mock data) | FE | 1.5 jam | ⬜ |
| 1.12 | Buat `MemberCard` component (foto, nama, NRP, jabatan) | FE | 1.5 jam | ⬜ |
| 1.13 | Buat `PostCard` component (thumbnail, kategori, judul, excerpt, tanggal) | FE | 1.5 jam | ⬜ |
| 1.14 | Buat `SearchBar` component (controlled input + submit) | FE | 1 jam | ⬜ |
| 1.15 | Buat `Pagination` component (Inertia-aware, dari Laravel paginator links) | FE | 1.5 jam | ⬜ |
| 1.16 | Buat `CategoryFilter` component (pill tabs) & `TagList` component | FE | 1 jam | ⬜ |

---

## Week 2 (2026-09-22 ~ 09-28)

### Layer: Frontend — Halaman Divisi (Mock-Driven lalu Integrasi)

| # | Task | Layer | Estimasi | Status |
|:---:|---|:---:|:---:|:---:|
| 2.1 | Buat `Divisions/Index.tsx` — verifikasi visual via `divisionMock.ts`, lalu bind controller | FE | 2 jam | ⬜ |
| 2.2 | Buat `Divisions/Show.tsx` — verifikasi visual via `divisionMock.ts`, lalu bind controller | FE | 2.5 jam | ⬜ |

### Layer: Frontend — Halaman Struktur Organisasi (Mock-Driven lalu Integrasi)

| # | Task | Layer | Estimasi | Status |
|:---:|---|:---:|:---:|:---:|
| 2.3 | Buat `OrgChart` component — hierarki Inti Pimpinan via `memberMock.ts` | FE | 2.5 jam | ⬜ |
| 2.4 | Buat `DivisionMemberGroup` component — Kadiv + anggota per divisi via `memberMock.ts` | FE | 1.5 jam | ⬜ |
| 2.5 | Buat `Structure/Index.tsx` — FilterBar + OrgChart + DivisionGroups, lalu bind controller | FE | 2 jam | ⬜ |

### Layer: Frontend — Halaman Artikel (Mock-Driven lalu Integrasi)

| # | Task | Layer | Estimasi | Status |
|:---:|---|:---:|:---:|:---:|
| 2.6 | Buat `ShareButtons` & `RelatedArticles` component | FE | 1.5 jam | ⬜ |
| 2.7 | Buat `useSearch` custom hook (debounce 300ms + Inertia router.get) | FE | 1 jam | ⬜ |
| 2.8 | Buat `Posts/Index.tsx` — verifikasi Search & Filter via `postMock.ts`, lalu bind controller | FE | 2.5 jam | ⬜ |
| 2.9 | Buat `Posts/Show.tsx` — verifikasi rich text via `postMock.ts`, lalu bind controller + `<Head>` OG | FE | 2.5 jam | ⬜ |

### Layer: Testing

| # | Task | Layer | Estimasi | Status |
|:---:|---|:---:|:---:|:---:|
| 2.10 | Unit test: `Post::scopeSearch()` — hasil trigram search sesuai | TEST | 1 jam | ⬜ |
| 2.11 | Unit test: `Post::scopePublished()` — filter status correctly | TEST | 0.5 jam | ⬜ |
| 2.12 | Unit test: `Division::members()` relation | TEST | 0.5 jam | ⬜ |
| 2.13 | Feature test: `GET /divisi` — 200, `Public/Divisions/Index`, has divisions data | TEST | 0.5 jam | ⬜ |
| 2.14 | Feature test: `GET /divisi/{slug}` — 200, correct division loaded; 404 on invalid slug | TEST | 0.5 jam | ⬜ |
| 2.15 | Feature test: `GET /struktur` — 200, `Public/Structure/Index`, has members data | TEST | 0.5 jam | ⬜ |
| 2.16 | Feature test: `GET /artikel` — 200, `Public/Posts/Index`, paginated | TEST | 0.5 jam | ⬜ |
| 2.17 | Feature test: `GET /artikel?search=ekspedisi` — returns filtered posts | TEST | 1 jam | ⬜ |
| 2.18 | Feature test: `GET /artikel/{slug}` — 200, correct post; 404 on invalid slug | TEST | 0.5 jam | ⬜ |

---

## Summary Estimasi

| Layer | Total Estimasi |
|---|---|
| Backend | 7.5 jam |
| MockData | 2.5 jam |
| Frontend | 25.5 jam |
| Testing | 5 jam |
| **Total** | **~40.5 jam** |

> Untuk 2 minggu (14 hari) pengerjaan solo, ini realistis dengan pace ~3-4 jam/hari.
