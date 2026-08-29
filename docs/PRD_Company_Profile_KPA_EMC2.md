# [PRD] Website Company Profile & Portal Organisasi KPA EMC²

**Status: Ready for Development**

| App / Platform     | _KPA EMC² Web Portal (Public Site & Dashboard CMS)_                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Feature / Scope    | _Full-Stack Organization Company Profile, Expedition Log, Media Gallery, Article Journal, Events & Activity Registrations_ |
| Target Release     | _Q3 2026_                                                                                                                  |
| Stack Architecture | _Laravel 13 + PHP 8.5 + PostgreSQL 18+ + Inertia.js (React 19) + Tailwind CSS v4 + Filament PHP v3 + Cloudinary_           |

---

## Overview

1. **Tentang KPA EMC²**: Kelompok Pecinta Alam EMC² (KPA EMC²) adalah organisasi kepecintaalaman yang berfokus pada eksplorasi alam bebas, riset ilmiah, pengabdian masyarakat, konservasi lingkungan hidup, dan pembinaan karakter pemuda melalui 4 Divisi operasional (Kaderisasi, SKLH — Sosial Kemasyarakatan & Lingkungan Hidup, Litbang — Penelitian & Pengembangan, dan Karata — Kepala Rumah Tangga) serta jajaran Inti Pimpinan (Ketua, Sekretaris dengan Staff Ahli Arsip Data & Rumah Tangga, dan Bendahara).

2. **Kebutuhan Digitalisasi**: Seiring berkembangnya organisasi, KPA EMC² memerlukan representasi digital resmi berupa website _company profile_ modern untuk mempublikasikan citra positif organisasi, memamerkan rekam jejak ekspedisi, mendokumentasikan riset lingkungan, mengelola agenda kegiatan publik (Sekolah Lingkungan, Seminar Lingkungan, Aksi Konservasi, Pengabdian Masyarakat, EMC Expo, Open Recruitment), serta menyediakan sistem pendaftaran online terpusat.

3. **Pendekatan Arsitektur Dua Sisi (_Two-Tier Architecture_)**:
   - **Public Facing Website**: Dibangun dengan **Inertia.js + React 19 + Tailwind CSS v4** yang mengutamakan _tampilan responsif, fluid micro-interactions, mobile-first design, SEO-friendly_, dan kecepatan akses bagi pengunjung umum, mitra, alumni, serta calon peserta kegiatan.
   - **Dashboard Admin CMS**: Dibangun menggunakan **Filament PHP v3** di atas **PostgreSQL 18+** yang mengutamakan _kinerja tinggi, JSONB querying, optimasi partial indexing, kemudahan pengelolaan data (CRUD), efisiensi resource server_, serta sistem autentikasi dan manajemen hak akses terstruktur bagi pengurus harian organisasi.

4. **Media Management Cloudinary**: Dokumentasi kegiatan alam bebas memiliki volume foto/video resolusi tinggi yang sangat besar. Penyimpanan dan _delivery_ aset media diintegrasikan secara _native_ dengan **Cloudinary** (auto format WebP/AVIF, auto quality `f_auto,q_auto`, responsive resizing CDN) agar server lokal tidak terbebani penyimpanan disk dan bandwidth pengunjung hemat.

---

## Problem Statement

1. **Informasi Organisasi Terfragmentasi**: Informasi sejarah, visi-misi, lambang, kepengurusan, dan divisi KPA EMC² saat ini tersebar di media sosial tanpa adanya _single source of truth_ yang kredibel dan terstruktur.
2. **Dokumentasi Ekspedisi & Jurnal Tidak Terarsip Rapi**: Catatan perjalanan (_trip report_), data gua, jalur pendakian, dan aksi konservasi belum memiliki wadah publikasi terpusat yang mudah dicari (_searchable_) oleh pegiat alam luar.
3. **Pendaftaran Kegiatan Masih Manual**: Proses pendaftaran peserta kegiatan (Sekolah Lingkungan, Seminar, Aksi Konservasi, Pengabdian Masyarakat, EMC Expo, Open Recruitment) masih mengandalkan formulir pihak ketiga yang terpisah dan memerlukan rekap manual yang rentan tercecer.
4. **Beban Media Resolusi Tinggi**: Foto-foto dokumentasi alam berukuran besar sering memperlambat website jika disimpan di _local storage_ biasa tanpa kompresi otomatis dan CDN global.

---

## Objective

1. **Digitalisasi Profil Resmi**: Membangun portal resmi KPA EMC² yang representatif, interaktif, dan responsif di semua perangkat (_mobile, tablet, desktop_).
2. **Efisiensi Manajemen Konten (CMS)**: Mempermudah pengurus (Humas, Sekretaris, Kadiv) dalam memperbarui artikel, agenda, galeri kegiatan, dan data pengurus tanpa perlu menyentuh kode program.
3. **Sistem Pendaftaran & Manajemen Kegiatan Terpadu**: Menyediakan modul kegiatan (`events`) dan formulir pendaftaran peserta (`registrations`) dinamis berbasis PostgreSQL `JSONB` lengkap dengan upload berkas/bukti bayar, validasi data, status verifikasi, kode registrasi unik, dan fitur _Export Excel/CSV_ untuk panitia.
4. **Optimasi Kinerja & SEO**: Mencapai skor _Performance_ & _SEO_ tinggi pada Google Lighthouse (>90) dengan kompresi gambar otomatis via Cloudinary CDN, pencarian cepat via PostgreSQL `pg_trgm` / `tsvector`, dan SSR/Metadata OpenGraph untuk kemudahan berbagi ke WhatsApp dan media sosial.

---

## Key Metrics

| **Success Metrics**                               | **Baseline (Sebelumnya)** | **Target (1 Bulan)** | **Target (3 Bulan)** | **Target (6 Bulan)** | **Target (12 Bulan)** |
| ------------------------------------------------- | ------------------------- | -------------------- | -------------------- | -------------------- | --------------------- |
| **Lighthouse Performance Score (Mobile)**         | N/A (<50)                 | > 85                 | > 90                 | > 92                 | > 95                  |
| **Total Pendaftar Kegiatan Online (Semua Event)** | 0 (Manual)                | 50 peserta           | 150 peserta          | 350 peserta          | 750+ peserta          |
| **Artikel & Jurnal Alam Terpublikasi**            | 0                         | 10 artikel           | 25 artikel           | 50 artikel           | 100+ artikel          |
| **Album Dokumentasi Ekspedisi Terarsip**          | 0                         | 5 album              | 15 album             | 30 album             | 60+ album             |
| **Waktu Input Konten oleh Pengurus (CMS)**        | 30+ menit/post            | < 5 menit            | < 3 menit            | < 2 menit            | < 2 menit             |

---

## Business Flow & Architecture

### 1. Public Visitor Flow

```
[Pengunjung Masuk (Homepage)]
       │
       ├──► [Eksplorasi Profil & Nilai KPA EMC²]
       ├──► [Lihat Divisi Minat (Gunung, Caving, Climbing, Rafting, Konservasi)]
       ├──► [Baca Catatan Ekspedisi & Jurnal Edukasi Alam (Search & Filter)]
       ├──► [Buka Galeri Foto/Video Interaktif (Cloudinary CDN)]
       ├──► [Lihat Agenda Kegiatan & Daftar Event (Sekolah Lingkungan, Expo, Seminar, dll)]
       ├──► [Cek Status Pendaftaran Event via Registration Code]
       └──► [Formulir Kontak Sekretariat & Peta Lokasi]
```

### 2. Admin & Pengurus Dashboard Flow (Filament v3)

```
[Login Admin /admin]
       │
       ├──► [Dashboard Analytics (Statistik Artikel, Pendaftar Event, Galeri, Log Pesan)]
       ├──► [Kelola Konten Profil & Struktur Kepengurusan (About & Members)]
       ├──► [Kelola Divisi Minat & Materi Kepecintaalaman]
       ├──► [Kelola Artikel / Blog (Rich Text Editor + Tagging + SEO Metadata)]
       ├──► [Kelola Galeri Media (Auto Upload & Delete Cloudinary)]
       ├──► [Kelola Event & Form Dinamis (Events CRUD + Custom JSONB Fields)]
       ├──► [Verifikasi Data Pendaftar Kegiatan + Export Excel/CSV]
       └──► [Manajemen User Pengurus & Role Permissions (Superadmin / Editor / Committee)]
```

---

## User Interface & Design System

- **Design Tone & Vibe**: _Adventure, Nature-Friendly, Modern, Purple Aesthetic_ (Deep Royal Purple, Warm Amber/Gold, Charcoal Dark, Pure White).
- **Typography**: Sans-Serif Modern (Inter / Plus Jakarta Sans) untuk legibilitas maksimal.
- **Responsiveness**: Fluid Breakpoints (Tailwind CSS v4 `@media`), Touch-friendly targets (minimum 44x44px), Bottom Navigation / Drawer Navigation untuk layar mobile.
- **Micro-Interactions**: Hover effects pada kartu kegiatan, smooth modal preview pada galeri, dynamic state validation pada form pendaftaran event.

---

## User Stories & Functional Requirements

| **No** | **Priority** | **User Story**                                                                                                                                                                                                              | **Acceptance Criteria**                                                                                                                                                                                                                                                                                                                                                                                                                                  | **Modul / Halaman**                                                 |
| :----: | :----------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **1**  |    **P1**    | Sebagai pengunjung, saya ingin melihat Hero Section yang menarik di Beranda, sehingga saya langsung memahami identitas dan semangat KPA EMC².                                                                               | 1. Hero banner menampilkan foto/video alam berkualitas tinggi dengan overlay gradien ramah baca.<br>2. Menampilkan tagline resmi, ringkasan nilai organisasi, dan tombol CTA utama (_"Eksplorasi Kami"_ & _"Daftar Kegiatan"_).<br>3. Menampilkan bar statistik angka pencapaian (Tahun Berdiri, Anggota Aktif, Ekspedisi Sukses, Puncak/Gua Terjelajahi).                                                                                               | `Beranda (Homepage)`                                                |
| **2**  |    **P1**    | Sebagai pengunjung, saya ingin membaca profil lengkap, visi-misi, sejarah, dan filosofi logo KPA EMC², agar saya mengenal latar belakang organisasi secara kredibel.                                                        | 1. Menampilkan narasi sejarah pendirian KPA EMC².<br>2. Menampilkan poin Visi, Misi, serta Kode Etik Pecinta Alam Indonesia.<br>3. Menampilkan rincian makna/filosofi lambang EMC² secara interaktif.                                                                                                                                                                                                                                                    | `Tentang Kami (/tentang)`                                           |
| **3**  |    **P1**    | Sebagai pengunjung/anggota, saya ingin melihat struktur kepengurusan aktif dan daftar anggota, sehingga saya mengetahui susunan dewan dan penanggung jawab divisi.                                                          | 1. Menampilkan filter periode kepengurusan (misal: 2025/2026) dan divisi.<br>2. Menampilkan kartu pengurus lengkap dengan foto profil, nama lengkap, nomor anggota (NRP/NIA), dan jabatan.<br>3. Struktur disusun hierarkis (Dewan Pembina/Penasehat, Ketua, Sekretaris, Bendahara, Kepala Divisi).                                                                                                                                                      | `Struktur Organisasi & Anggota (/struktur)`                         |
| **4**  |    **P1**    | Sebagai pengunjung, saya ingin melihat detail tiap Divisi Operasional (Kaderisasi, SKLH, Litbang, Karata) serta struktur Inti Pimpinan, agar memahami fokus kegiatan dan tata kelola organisasi.                            | 1. Menampilkan kartu divisi operasional dengan ikon/foto representatif.<br>2. Halaman detail divisi menampilkan deskripsi bidang, kurikulum materi, inventaris alat/fasilitas, dan program kerja terkait.                                                                                                                                                                                                                                                | `Divisi Operasional (/divisi)`                                      |
| **5**  |    **P1**    | Sebagai pengunjung, saya ingin melihat galeri foto dan video dokumentasi kegiatan yang tersusun rapi, agar saya dapat melihat portofolio visual kegiatan KPA EMC².                                                          | 1. Menampilkan album foto dengan filter kategori divisi dan tahun kegiatan.<br>2. Grid galeri responsive (masonry layout) dengan fitur _lightbox preview_ saat diklik.<br>3. Gambar di-_serve_ langsung via Cloudinary CDN dengan format WebP adaptif (`f_auto,q_auto`).                                                                                                                                                                                 | `Galeri Dokumentasi (/galeri)`                                      |
| **6**  |    **P1**    | Sebagai pengunjung, saya ingin membaca artikel, jurnal catatan perjalanan ekspedisi, dan tips survival alam bebas, agar saya mendapatkan wawasan edukatif.                                                                  | 1. Daftar artikel dilengkapi pencarian cepat (_search bar_ berbasis `pg_trgm`), filter kategori, dan pagination.<br>2. Halaman detail artikel mendukung format rich text (heading, quotes, gambar, tabel).<br>3. Dilengkapi tombol _Share to WhatsApp/Social Media_ dan metadata OpenGraph untuk link preview yang rapi.<br>4. Menampilkan rekomendasi artikel terkait di bagian bawah.                                                                  | `Artikel & Jurnal (/artikel)`                                       |
| **7**  |    **P1**    | Sebagai calon peserta / anggota, saya ingin melihat daftar kegiatan terbuka (Sekolah Lingkungan, Seminar, Aksi Konservasi, Expo, Rekrutmen) dan mendaftar secara online, agar proses pendaftaran menjadi mudah dan praktis. | 1. Menampilkan katalog kegiatan aktif beserta detail tanggal, lokasi, kuota, dan status pendaftaran.<br>2. Formulir pendaftaran dinamis (data identitas umum + custom fields per event via `JSONB`).<br>3. Upload dokumen / bukti bayar langsung terkirim ke Cloudinary.<br>4. Notifikasi sukses instan dan kode registrasi unik (`registration_code`) untuk pengecekan status mandiri.                                                                  | `Katalog & Pendaftaran Kegiatan (/events, /events/{slug}/register)` |
| **8**  |    **P2**    | Sebagai pengunjung/mitra, saya ingin mengirim pesan dan mengetahui lokasi sekretariat KPA EMC², agar dapat menjalin kolaborasi atau berkunjung langsung.                                                                    | 1. Menampilkan peta interaktif (Google Maps Embed) lokasi sekretariat/basecamp.<br>2. Formulir kontak (Nama, Email, Subjek, Pesan) dengan proteksi anti-spam/CSRF dan pencatatan IP (`INET`).<br>3. Menampilkan kontak resmi (WhatsApp Humas, Email resmi, Instagram, YouTube).                                                                                                                                                                          | `Kontak & Sekretariat (/kontak)`                                    |
| **9**  |    **P1**    | Sebagai Admin/Pengurus di Filament CMS, saya ingin mengelola seluruh data website dengan cepat, terstruktur, dan aman.                                                                                                      | 1. Dashboard analitik menyajikan statistik ringkas (total artikel, foto galeri, pendaftar per event, pesan masuk).<br>2. Fitur CRUD lengkap untuk: Artikel, Kategori, Tags, Galeri, Divisi, Anggota, Event, Pendaftar Event, Pesan Masuk.<br>3. Upload gambar di admin panel langsung terhubung ke Cloudinary.<br>4. Fitur _Export Data Pendaftar Event_ ke format Excel/CSV.<br>5. Role Management (Superadmin, Editor/Humas, Committee/Panitia Event). | `Filament Dashboard (/admin)`                                       |

---

## Non-Functional Requirements

| **No** | **Kategori**                       | **Requirement & Acceptance Criteria**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :----: | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1**  | **Performance & Speed**            | - Waktu muat awal (_First Contentful Paint_) < 1.5 detik pada jaringan 4G.<br>- Google Lighthouse Score > 90 untuk kategori Performance, Accessibility, Best Practices, dan SEO.<br>- Asset gambar dioptimalkan secara otomatis ke format WebP/AVIF via Cloudinary CDN.<br>- Query feed dan filter teroptimasi dengan PostgreSQL Partial Indexes & GIN Indexes.                                                                                                                                                                                               |
| **2**  | **Responsive Design**              | - Tampilan adaptif penuh untuk resolusi Mobile (320px - 480px), Tablet (768px - 1024px), dan Desktop (>1200px).<br>- Navigasi mobile menggunakan drawer/hamburger yang halus dan mudah dijangkau satu tangan (_thumb-friendly_).                                                                                                                                                                                                                                                                                                                              |
| **3**  | **Security & Data Privacy**        | - Seluruh transmisi data menggunakan protokol HTTPS.<br>- Proteksi CSRF pada semua request POST/PUT/DELETE formulir.<br>- Data pribadi peserta kegiatan hanya dapat diakses oleh user berotorisasi di admin panel.<br>- Sanitasi input XSS pada Rich Text Editor artikel dan form kontak.                                                                                                                                                                                                                                                                     |
| **4**  | **SEO & Social Metadata**          | - Implementasi Dynamic OpenGraph Tags (`og:title`, `og:image`, `og:description`) per halaman, artikel, dan event.<br>- Auto-generated `sitemap.xml` dan `robots.txt`.                                                                                                                                                                                                                                                                                                                                                                                         |
| **5**  | **Maintainability & Code Quality** | - Mematuhi standar PSR-12 untuk backend Laravel.<br>- ESLint 9 & Prettier aktif pada frontend React/TypeScript.<br>- Skema database termigrasi rapi via Laravel Migrations & Seeders di PostgreSQL 18+.<br>- **Arsitektur Database:** Total 12 tabel dengan taksonomi terpadu (`categories`) dan relasi divisi opsional (`division_id`).<br>- **Aturan Baku Audit Log:** Seluruh 12 tabel wajib memiliki 5 kolom audit & lifecycle (`is_active`, `created_by`, `updated_by`, `created_at`, `updated_at`) yang diotomasi via Eloquent Trait `HasAuditColumns`. |

---

## Non-Scope (Fase Saat Ini)

Fitur-fitur berikut **tidak termasuk** dalam rilis fase pertama:

1. Sistem Toko Online / E-Commerce merchandise dengan automated payment gateway gateway (Midtrans/Xendit) — pembayaran saat ini via upload bukti transfer manual (`payment_proof_url`).
2. Live GPS Tracking posisi anggota saat ekspedisi di alam bebas.
3. Forum diskusi komunitas real-time berbasis WebSocket.

---

## Timeline & Sprint Plan

| **Sprint**                                            | **Target Output**                             | **Modul & Deliverables**                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sprint 1: Core Setup & Foundation**                 | Database PostgreSQL & Base Architecture Ready | - Setup Migrasi Database & Seeder PostgreSQL 18+ (12 tabel lengkap dengan 5 kolom audit log).<br>- Implementasi `HasAuditColumns` trait/observer untuk otomasi `created_by`/`updated_by`.<br>- Implementasi `CloudinaryService` & konfigurasi disk.<br>- Setup Layout Utama Public (Navbar, Footer, Responsive Drawer) di React/Inertia.<br>- Setup Panel Admin Filament v3 & Role Permissions. |
| **Sprint 2: Public Profile, Divisions & Content**     | Public Informational Pages Done               | - Implementasi Halaman Beranda (Hero, Stats, Highlights).<br>- Implementasi Halaman Tentang Kami & Sejarah Organisasi.<br>- Implementasi Halaman Struktur Kepengurusan & Anggota.<br>- Implementasi Halaman & Komponen Detail Divisi Minat.                                                                                                                                                     |
| **Sprint 3: Media Gallery, Articles & SEO**           | Media & Publishing Module Ready               | - Implementasi Modul Artikel & Jurnal Ekspedisi (List, Detail, Trigram Search, Share, SEO Metadata).<br>- Implementasi Galeri Foto/Video Interaktif dengan Lightbox & Cloudinary CDN.<br>- Resource Management di Filament CMS untuk Artikel dan Galeri Media.                                                                                                                                  |
| **Sprint 4: Events, Registrations, Contact & Polish** | Full End-to-End Ready to Launch               | - Modul Katalog Kegiatan (`/events`) & Form Registrasi Dinamis (`/events/{slug}/register`).<br>- Halaman Cek Status Registrasi (`/events/check-status`).<br>- Halaman Kontak, Peta Sekretariat & Form Pesan Masuk.<br>- Fitur Export Excel/CSV Data Pendaftar di Filament Admin.<br>- QA Testing, Mobile Responsiveness Audit, dan Optimasi Lighthouse.                                         |

---

## Acceptance Criteria (QA Test Matrix)

| **Fitur / Halaman**              | **Kriteria Pengujian (QA Acceptance Criteria)**                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Header & Navigasi**            | 1. Menu navigasi dapat diakses mulus di desktop dan mobile drawer.<br>2. Active link highlight sesuai dengan halaman yang sedang dibuka.<br>3. Tombol CTA _"Daftar Kegiatan"_ selalu terlihat jelas dan mengarah ke katalog kegiatan `/events`.                                                                                                                                                                             |
| **Halaman Beranda**              | 1. Foto hero banner termuat cepat tanpa pergeseran layout (_CLS < 0.1_).<br>2. Counter angka statistik berjalan dengan animasi halus saat di-scroll.<br>3. Seluruh tautan highlight divisi, event mendatang, dan artikel terbaru berfungsi normal.                                                                                                                                                                          |
| **Halaman Divisi**               | 1. Menampilkan Divisi resmi KPA EMC².<br>2. Informasi materi kepecintaalaman dan peralatan tiap divisi tampil terstruktur dan responsif di layar smartphone.                                                                                                                                                                                                                                                                |
| **Halaman Galeri**               | 1. Filter kategori divisi/event memfilter foto tanpa me-reload halaman (_instant filter_).<br>2. Klik gambar membuka modal lightbox beresolusi optimal.<br>3. Thumbnail gambar menggunakan URL Cloudinary teroptimasi WebP.                                                                                                                                                                                                 |
| **Halaman Artikel**              | 1. Pencarian artikel berdasarkan kata kunci berfungsi akurat dan cepat via PostgreSQL `pg_trgm`.<br>2. Konten rich text artikel ter-render rapi dan aman dari tag berbahaya (XSS).<br>3. Tombol share WhatsApp menghasilkan format teks dan tautan yang valid.                                                                                                                                                              |
| **Modul Kegiatan & Pendaftaran** | 1. Form menolak submit jika ada field wajib yang belum terisi (_client & server validation_).<br>2. Upload berkas / bukti bayar dibatasi format (JPG, PNG, PDF) maks 2MB ke Cloudinary.<br>3. Setelah submit berhasil, data masuk ke PostgreSQL (`events` & `registrations`) dan langsung tampil di Admin Panel Filament.<br>4. Kode registrasi unik ter-generate dan dapat dicek statusnya.                                |
| **Dashboard Filament CMS**       | 1. Admin dapat login menggunakan akun pengurus yang terdaftar sesuai role (`superadmin`, `editor`, `committee`).<br>2. Pengurus dapat membuat, mengedit, dan menghapus artikel, event, foto galeri, dan data anggota.<br>3. Upload foto di Filament otomatis tersimpan ke Cloudinary dan URL tersimpan di database PostgreSQL.<br>4. Tombol _Export Excel/CSV_ pendaftar kegiatan menghasilkan file yang valid dan lengkap. |
