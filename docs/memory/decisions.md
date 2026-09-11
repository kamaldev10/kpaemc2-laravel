# Architecture Decisions — KPA EMC² Web Portal

> Catatan keputusan teknis penting (*Architecture Decision Records*).
> Berisi konteks "mengapa" suatu pendekatan dipilih agar keputusan tidak dipertanyakan ulang atau dibatalkan tanpa alasan kuat.

---

## ADR-001: Zero-BLOB Database Policy (Cloudinary)
- **Keputusan:** Dilarang menyimpan biner gambar atau dokumen langsung di kolom PostgreSQL (bytea/BLOB).
- **Rasional:** Menjaga ukuran cadangan (*database backup*) tetap kecil dan cepat dipulihkan, memanfaatkan CDN global Cloudinary, serta memanfaatkan transformasi gambar otomatis (*on-the-fly resizing*, format `webp`, `f_auto,q_auto`).
- **Implementasi:** `App\Services\CloudinaryService` menangani upload dan penghapusan media, dengan mock URL fallback jika env lokal belum dikonfigurasi.

---

## ADR-002: Dual Co-existing Admin System (Custom Inertia + Filament)
- **Keputusan:** Mengembangkan Custom Inertia React Admin untuk portal harian pengurus di `/admin`, sembari mempertahankan instalasi Filament PHP.
- **Rasional:** Pengurus organisasi memerlukan antarmuka yang serasi (*cohesive*) dengan identitas website publik KPA EMC², dukungan visual RichTextEditor yang terintegrasi, dan responsivitas mobile kustom. Filament tetap tersedia sebagai toolkit admin alternatif untuk keperluan internal lanjutan.
- **Prioritas Routing:** Route `GET /admin` diarahkan ke custom `Admin\DashboardController`. Route auth Filament seperti `admin/login` tetap berdampingan.

---

## ADR-003: Hierarchical RoleTypeEnum Backed Enum
- **Keputusan:** Menggunakan PHP 8.1+ backed enum `App\Enums\RoleTypeEnum` dengan hirarki level bobot numerik:
  - `EDITOR = 'editor'` (Bobot: 1)
  - `ADMIN = 'admin'` (Bobot: 2)
  - `SUPER_ADMIN = 'super_admin'` (Bobot: 3)
- **Rasional:** Memungkinkan pengecekan izin yang elegan melalui `$user->isAtLeast(RoleTypeEnum::ADMIN)` daripada pengecekan array string manual di banyak tempat.
- **Kebijakan Akses:**
  - Hanya role `ADMIN` dan `SUPER_ADMIN` yang dapat mengakses portal admin `/admin` (`EnsureAdmin` middleware).
  - Role `EDITOR` memiliki otorisasi terbatas tingkat objek melalui Policy (hanya boleh edit/hapus konten miliknya sendiri).

---

## ADR-004: Bypass Stale `redirect()->intended()` pada Login Admin
- **Keputusan:** Di `AuthenticatedSessionController`, pengguna ber-role `ADMIN` dan `SUPER_ADMIN` diarahkan secara eksplisit ke route `admin.dashboard`, kecuali `url.intended` secara spesifik mengarah ke subpath `/admin/*`.
- **Rasional:** Ketika admin menjelajahi halaman depan publik sebelum login, Laravel secara otomatis menyimpan URL publik (`/`) ke session `url.intended`. Jika menggunakan `redirect()->intended()`, admin akan diarahkan kembali ke home publik, bukan ke admin dashboard.

---

## ADR-005: JsonResource::withoutWrapping() Global
- **Keputusan:** Memanggil `JsonResource::withoutWrapping()` di `AppServiceProvider::boot()`.
- **Rasional:** Inertia.js mengharapkan props controller dapat langsung diakses (`post.id`, `post.title`) tanpa lapisan wrapper bawaan Laravel API (`post.data.id`). Mematikan wrapping membuat transfer data ke React bersih dan intuitif.

---

## ADR-006: Post Entity sebagai Model Tunggal Artikel & Berita
- **Keputusan:** Model `Post` dan tabel `posts` menangani baik artikel pengetahuan alam, laporan ekspedisi, maupun kabar rilis berita organisasi, dengan pembeda berupa relasi `category_id` (`Category` ber-tipe `post`).
- **Rasional:** Mencegah duplikasi skema tabel dan kode antara "berita" dan "artikel". Route `/admin/articles` dibuat sebagai alias resmi yang me-redirect atau memetakan ke `/admin/posts`.
