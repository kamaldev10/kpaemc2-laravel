# AI Hard Rules & Guardrails — KPA EMC² Web Portal

> **ATURAN MUTLAK (HARD RULES)**
> Aturan berikut tidak boleh dilanggar oleh AI Assistant dalam kondisi apapun.

---

## 1. Zero-Scaffolding & Production-Ready Code
- ❌ **DILARANG** meninggalkan placeholder kosong, mock sementara di kode produksi, stub kosong, atau komentar `// TODO: implement later`.
- ✅ **WAJIB** menulis kode yang langsung berfungsi, memiliki penanganan error yang baik (*graceful error handling*), dan teruji.

## 2. Zero-BLOB Database Storage
- ❌ **DILARANG** menyimpan file gambar, dokumen, atau payload base64 langsung ke tabel database PostgreSQL.
- ✅ **WAJIB** menggunakan `App\Services\CloudinaryService` untuk mengunggah aset ke Cloudinary CDN dan hanya menyimpan URL & `public_id` ke database.

## 3. Database Migration Integrity
- ❌ **DILARANG** mengubah file migrasi yang statusnya sudah `Ran` (sudah dieksekusi di database).
- ✅ **WAJIB** membuat migration baru jika ingin menambah kolom, mengubah indeks, atau memodifikasi tabel.

## 4. Verification Cycle Sebelum Commit
Sebelum melakukan commit dan push ke git, AI **WAJIB** memverifikasi dua hal berikut berhasil tanpa error:
1. `php artisan test` → Seluruh test suite lulus (0 failures / errors).
2. `npm run build` → Kompilasi TypeScript dan Vite selesai tanpa error (`0 errors`).

## 5. Branch & Push Behavior
- ❌ **DILARANG** melakukan *force push* (`git push --force`) ke remote repository.
- ❌ **DILARANG** menggabungkan semua perubahan lintas fitur (misal: auth fix + layout + post CRUD) ke dalam satu commit raksasa.
- ✅ **WAJIB** commit dari branch `master` dengan commit message atomik berdasarkan fitur masing-masing.

## 6. Port Database PostgreSQL
- ❌ **DILARANG** mengubah konfigurasi port database ke port default 5432.
- ✅ **WAJIB** selalu menggunakan port **5433** untuk PostgreSQL pada project ini.

## 7. AI Pre-Action Memory Reading
- ✅ **WAJIB** membaca dokumen di `docs/memory/` (terutama `overview.md`, `progress.md`, dan `gotchas.md`) sebelum memulai pengerjaan task baru.
- ✅ **WAJIB** memperbarui `docs/memory/progress.md` jika telah menyelesaikan suatu modul atau sub-task.
