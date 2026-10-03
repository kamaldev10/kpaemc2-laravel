# Tasks — Sprint 26.04 (Mock Decommissioning & Database Optimization)

> Layer: BE = Laravel Backend · FE = React/Inertia Frontend · DB = Database/Migrations · TEST = Performance & Feature Tests

---

## 1. Mock Data Decommissioning & Real-Data Binding

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 1.1 | Hapus seluruh file `resources/js/mocks/*` dan `resources/js/utils/mockData.ts`        | FE    | ✅     |
| 1.2 | Hapus `use_mock_data` dari `HandleInertiaRequests.php` & `index.d.ts`                 | BE/FE | ✅     |
| 1.3 | Refaktor `Home.tsx` & komponen section (`Hero`, `Stats`, `Division`, `Post`, `Event`) | FE    | ✅     |
| 1.4 | Refaktor `About.tsx` & komponen section (`Profil`, `VisiMisi`, `Logo`, `Structure`)   | FE    | ✅     |
| 1.5 | Refaktor `Posts/Index.tsx` & `Posts/Show.tsx`                                         | FE    | ✅     |
| 1.6 | Refaktor `Events/Index.tsx` & `Events/Show.tsx`                                       | FE    | ✅     |
| 1.7 | Refaktor `Structure/Index.tsx` & `Contact/Index.tsx`                                  | FE    | ✅     |
| 1.8 | Pastikan semua null/empty state UI tetap rapi saat data tabel kosong                  | FE    | ✅     |

---

## 2. PostgreSQL Indexes & Query Optimization

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 2.1 | Buat migrasi komposit & trigram indexes (`pg_trgm`) untuk posts, events, members, dll | DB    | ✅     |
| 2.2 | Audit & optimasi query `HomeController` (selective columns & eager loading)           | BE    | ✅     |
| 2.3 | Audit & optimasi query `PostController` (public & admin pagination, search query)     | BE    | ✅     |
| 2.4 | Audit & optimasi query `EventController` (public & admin, eager relations)            | BE    | ✅     |
| 2.5 | Audit & optimasi query `MemberController` (structure hierarchy & division groups)     | BE    | ✅     |
| 2.6 | Audit & optimasi query `GalleryController` (eager load items with order)              | BE    | ✅     |

---

## 3. Caching Layer & Invalidation

| #   | Task                                                                                | Layer | Status |
| --- | ----------------------------------------------------------------------------------- | ----- | ------ |
| 3.1 | Implementasi query cache untuk `Divisions` dan `Categories` list                    | BE    | ✅     |
| 3.2 | Verifikasi cache invalidation hooks pada `Division`, `Category`, `Setting`, `About` | BE    | ✅     |
| 3.3 | Update default sorting anggota (`batch_year` desc) & default filter `is_pengurus`   | BE/FE | ✅     |
| 3.4 | Implementasi pagination & limit selector (10, 20, 50, 100) di semua tabel admin/pub | FULL  | ✅     |

---

## 4. Automated Performance & Query Count Verification

| #   | Task                                                                             | Layer | Status |
| --- | -------------------------------------------------------------------------------- | ----- | ------ |
| 4.1 | Buat `tests/Feature/Performance/QueryCountTest.php` untuk membatasi jumlah query | TEST  | ✅     |
| 4.2 | Jalankan seluruh unit & feature tests (`php artisan test`)                       | TEST  | ✅     |
| 4.3 | Jalankan build frontend (`npm run build`)                                        | FE    | ✅     |
| 4.4 | Update `docs/memory/progress.md` dan commit/push ke branch `master`              | DEV   | ✅     |

---

**Legend Status:**

- `✅` = Selesai
- `🔄` = Sedang Dikerjakan
- `⏳` = Direncanakan
