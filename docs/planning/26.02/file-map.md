# File Map — Sprint 26.02

Daftar lengkap file yang **dibuat (NEW)**, **diubah (MOD)**, atau **dihapus (DEL)** pada sprint ini.

> Semua file di Sprint 26.01 sudah ada — sprint ini hanya menambah yang baru.

---

## Backend (Laravel)

### New Files

| File | Keterangan |
|---|---|
| `app/Http/Controllers/Public/DivisionController.php` | index() + show($slug) |
| `app/Http/Controllers/Public/MemberController.php` | index() — data member grouped by division |
| `app/Http/Controllers/Public/PostController.php` | index() + show($slug) + search query param |
| `tests/Unit/Models/PostTest.php` | Unit test scopes (scopeSearch, scopePublished) + casts |
| `tests/Unit/Models/DivisionTest.php` | Unit test relation Division → members |
| `tests/Feature/Public/DivisionTest.php` | Feature test GET /divisi + /divisi/{slug} |
| `tests/Feature/Public/StructureTest.php` | Feature test GET /struktur |
| `tests/Feature/Public/PostTest.php` | Feature test GET /artikel, /artikel?search=, /artikel/{slug} |

### Modified Files

| File | Perubahan |
|---|---|
| `routes/web.php` | Tambah: `/divisi`, `/divisi/{slug}`, `/struktur`, `/artikel`, `/artikel/{slug}` |
| `app/Models/Post.php` | Tambah `scopeSearch(Builder $q, string $term)` via `pg_trgm` |
| `app/Models/Division.php` | Verifikasi relasi `members()` sudah ada |

---

## Frontend (React / TypeScript)

### New Files — Types (Tambahan)

> Types dasar sudah dibuat di 26.01. Sprint ini tambah jika ada yang kurang.

| File | Keterangan |
|---|---|
| `resources/js/types/member.ts` | Member, Division interface (dengan photo_url) |
| `resources/js/types/pagination.ts` | Laravel PaginationMeta, PaginationLinks interface |

### New Files — MockData (WAJIB sebelum Integrasi Server)

| File | Keterangan |
|---|---|
| `resources/js/mocks/divisionMock.ts` | Mock dataset detail 4 divisi (Kaderisasi, SKLH, Litbang, Karata) + materi & proker |
| `resources/js/mocks/memberMock.ts` | Mock dataset roster pengurus (Ketua, Sekretaris+Staff, Bendahara, 4 Kadiv + anggota) |
| `resources/js/mocks/postMock.ts` | Mock dataset 6 artikel (konten rich text, tags JSONB, kategori, penulis) |

### New Files — Shared Components

| File | Keterangan |
|---|---|
| `resources/js/Components/Public/UI/Pagination.tsx` | Komponen pagination (dari Laravel paginator links) |
| `resources/js/Components/Public/UI/SearchBar.tsx` | Input search dengan submit handler |
| `resources/js/Components/Public/UI/CategoryFilter.tsx` | Filter pill/tab kategori |
| `resources/js/Components/Public/UI/TagList.tsx` | List tag badge dari array |
| `resources/js/Components/Public/UI/ShareButtons.tsx` | WhatsApp share + copy link button |

### New Files — Cards

| File | Keterangan |
|---|---|
| `resources/js/Components/Public/Cards/DivisionCard.tsx` | Kartu divisi (ikon, nama, deskripsi singkat, link) |
| `resources/js/Components/Public/Cards/MemberCard.tsx` | Kartu anggota (foto, nama, NRP, jabatan) |
| `resources/js/Components/Public/Cards/PostCard.tsx` | Kartu artikel (thumbnail, kategori, judul, excerpt, tanggal) |

### New Files — Sections

| File | Keterangan |
|---|---|
| `resources/js/Components/Public/Sections/RelatedArticles.tsx` | 3 artikel terkait (same category) |
| `resources/js/Components/Public/Sections/OrgChart.tsx` | Hierarki Inti Pimpinan |
| `resources/js/Components/Public/Sections/DivisionMemberGroup.tsx` | Kadiv + anggota per divisi |

### New Files — Hooks

| File | Keterangan |
|---|---|
| `resources/js/hooks/useSearch.ts` | Debounced search (300ms) + Inertia router.get dengan preserveState |

### New Files — Pages

| File | Keterangan |
|---|---|
| `resources/js/Pages/Public/Divisions/Index.tsx` | Halaman /divisi (grid 4 kartu) |
| `resources/js/Pages/Public/Divisions/Show.tsx` | Halaman /divisi/{slug} (detail) |
| `resources/js/Pages/Public/Structure/Index.tsx` | Halaman /struktur (org chart + member list) |
| `resources/js/Pages/Public/Posts/Index.tsx` | Halaman /artikel (search + filter + grid + pagination) |
| `resources/js/Pages/Public/Posts/Show.tsx` | Halaman /artikel/{slug} (detail + OG meta) |

---

## Direktori Baru yang Terbentuk

```
resources/js/
  Components/Public/
    Cards/                           ← Baru (sprint ini)
  hooks/                             ← Baru (sprint ini)
  Pages/Public/
    Divisions/                       ← Baru
    Structure/                       ← Baru
    Posts/                           ← Baru

tests/
  Unit/Models/
    PostTest.php                     ← Baru
    DivisionTest.php                 ← Baru
  Feature/Public/
    DivisionTest.php                 ← Baru
    StructureTest.php                ← Baru
    PostTest.php                     ← Baru
```

---

## File yang TIDAK Diubah di Sprint Ini

- `app/Services/CloudinaryService.php` — sudah ada dari 26.01, tidak perlu modifikasi
- `resources/js/Components/Public/Layout/` — sudah ada dari 26.01
- `app/Filament/` — masih belum ada (Filament Resources → sprint terpisah)
- Semua migration files — tidak disentuh
