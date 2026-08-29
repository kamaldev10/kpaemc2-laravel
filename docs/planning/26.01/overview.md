# Sprint 26.01 — Consolidated Public Portal (Core Pages, Members, Posts, Events & Contact)

| Field | Value |
|---|---|
| **Sprint** | 26.01 (Consolidated) |
| **Nama** | Public Portal: Beranda, Tentang Kami, Struktur, Artikel, Kegiatan & Kontak |
| **Status** | `in_progress` |
| **PIC** | Full-stack |
| **PRD Ref** | User Stories #1, #2, #3, #4, #5, #6, #7 |

---

## Tujuan Sprint

Membangun portal publik terpadu **KPA EMC²** secara menyeluruh yang mencakup:
1. **Beranda (`/`)** — Hero Banner, Stats Counter, 4 Divisi Highlight, Artikel & Postingan Highlight, Agenda Terbuka Highlight, CTA.
2. **Tentang Kami (`/about`)** — Profil Organisasi, Visi Misi & Kode Etik, 4 Divisi Operasional (terintegrasi), Struktur Organisasi & Periode Kepengurusan, Filosofi Lambang EMC².
3. **Struktur Kepengurusan (`/structure`)** — Filter interaktif, Inti Pimpinan (BPH), dan daftar pengurus per divisi.
4. **Artikel & Postingan (`/posts`, `/posts/{slug}`)** — Pencarian `pg_trgm`, filter kategori, paginasi, pembaca artikel rich text, OpenGraph, share WhatsApp & salin tautan.
5. **Katalog & Detail Kegiatan (`/events`, `/events/{slug}`)** — Filter kategori & tipe kegiatan, status pendaftaran (buka/tutup), formulir pendaftaran interaktif (`POST /events/{slug}/register`).
6. **Hubungi Kami (`/contact`)** — Informasi kontak sekretariat, embed lokasi kampus, formulir pesan masuk interaktif (`POST /contact`).
*(Catatan: Modul Galeri disembunyikan sementara dari navigasi publik).*

---

## Deliverables

| # | Deliverable | Layer | Prioritas | Status |
|---|---|---|---|---|
| 1 | `HomeController`, `AboutController`, `MemberController`, `PostController` | Backend | P0 | ✅ |
| 2 | `EventController` (`index`, `show`, `register`) | Backend | P0 | 🔄 |
| 3 | `ContactController` (`index`, `store`) | Backend | P0 | 🔄 |
| 4 | Route Registrasi Publik (`routes/web.php`) | Backend | P0 | 🔄 |
| 5 | TypeScript Types (`types/event.ts`, `types/contact.ts`, dll.) | Frontend | P0 | 🔄 |
| 6 | Mock Datasets (`eventMock.ts`, `contactMock.ts`, dll.) | Frontend | P0 | 🔄 |
| 7 | Halaman Publik Beranda, Tentang Kami, Struktur, Artikel | Frontend | P0 | ✅ |
| 8 | Halaman Publik Kegiatan (`/events`, `/events/{slug}`) & Formulir Pendaftaran | Frontend | P0 | 🔄 |
| 9 | Halaman Publik Kontak (`/contact`) & Formulir Pesan Masuk | Frontend | P0 | 🔄 |
| 10 | Feature & Unit Tests lengkap untuk seluruh endpoint publik | Testing | P0 | 🔄 |
