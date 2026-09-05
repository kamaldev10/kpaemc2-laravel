# Tasks — Sprint 26.01 (Consolidated Public Portal)

> Layer: BE = Laravel Backend · FE = React/TypeScript · MOCK = Frontend MockData · TEST = Pest/PHPUnit

---

## 1. Core & Architecture Foundation

| #   | Task                                                                                       |  Layer   | Status |
| --- | ------------------------------------------------------------------------------------------ | :------: | :----: |
| 1.1 | Database Migrations & Seeders dengan UUID                                                  | Database |   ✅   |
| 1.2 | `CloudinaryService` dynamic asset delivery                                                 |    BE    |   ✅   |
| 1.3 | Public Layout (Navbar & Footer responsif)                                                  |    FE    |   ✅   |
| 1.4 | TypeScript types baseline (`about.ts`, `site.ts`, `member.ts`, `post.ts`, `pagination.ts`) |    FE    |   ✅   |

---

## 2. Public Pages: Home, About, Structure, Posts

| #   | Task                                                                       |  Layer  | Status |
| --- | -------------------------------------------------------------------------- | :-----: | :----: |
| 2.1 | `HomeController` & Halaman Beranda (`/`)                                   | BE / FE |   ✅   |
| 2.2 | `AboutController` & Halaman Tentang Kami (`/about`)                        | BE / FE |   ✅   |
| 2.3 | `MemberController` & Halaman Struktur Organisasi (`/structure`)            | BE / FE |   ✅   |
| 2.4 | `PostController` & Halaman Artikel & Postingan (`/posts`, `/posts/{slug}`) | BE / FE |   ✅   |
| 2.5 | Sembunyikan Galeri dari navigasi publik                                    |   FE    |   ✅   |

---

## 3. Public Pages: Kegiatan / Events (`/events`, `/events/{slug}`)

| #   | Task                                                                                    |   Layer   | Status |
| --- | --------------------------------------------------------------------------------------- | :-------: | :----: |
| 3.1 | Buat `types/event.ts` & `eventMock.ts`                                                  | FE / MOCK |   ✅   |
| 3.2 | Buat `EventCard` component                                                              |    FE     |   ✅   |
| 3.3 | Buat `EventController` (`index`, `show`, `register`)                                    |    BE     |   ✅   |
| 3.4 | Buat `Pages/Public/Events/Index.tsx` (filter kategori, search, paginasi)                |    FE     |   ✅   |
| 3.5 | Buat `Pages/Public/Events/Show.tsx` (detail, timeline, formulir pendaftaran interaktif) |    FE     |   ✅   |

---

## 4. Public Pages: Kontak / Contact (`/contact`)

| #   | Task                                                                            |   Layer   | Status |
| --- | ------------------------------------------------------------------------------- | :-------: | :----: |
| 4.1 | Buat `types/contact.ts` & `contactMock.ts`                                      | FE / MOCK |   ✅   |
| 4.2 | Buat `ContactController` (`index`, `store`)                                     |    BE     |   ✅   |
| 4.3 | Buat `Pages/Public/Contact/Index.tsx` (info sekretariat, peta, formulir kontak) |    FE     |   ✅   |

---

## 5. Verification & Testing

| #   | Task                                                                                             | Layer | Status |
| --- | ------------------------------------------------------------------------------------------------ | :---: | :----: |
| 5.1 | Feature tests untuk Events (`GET /events`, `GET /events/{slug}`, `POST /events/{slug}/register`) | TEST  |   ✅   |
| 5.2 | Feature tests untuk Contact (`GET /contact`, `POST /contact`)                                    | TEST  |   ✅   |
| 5.3 | Verifikasi `npx tsc --noEmit`, `npm run lint`, `npm run format`, `npm run build`                 |  QA   |   ✅   |
