# Sprint 26.05 — User Management (Super Admin), Account Settings & Phase 4 Completion

| Field      | Value                                                                             |
| ---------- | --------------------------------------------------------------------------------- |
| **Sprint** | 26.05                                                                             |
| **Nama**   | Super Admin User Management, Account & Security Center, Event Registration Portal |
| **Status** | `in_progress`                                                                     |
| **PIC**    | Full-Stack AI Engineer & Security / DB Optimizer                                  |
| **Target** | Super Admin User CRUD, Account/Password Center, Registration Status Lookup        |

---

## 1. Latar Belakang & Kebutuhan

Sesuai aturan keamanan dan arsitektur otentikasi KPA EMC²:

1. **Pendaftaran Akun Publik Dinonaktifkan (`Route::post('register')` ditutup)**: Akun pengurus tidak boleh didaftarkan secara mandiri oleh publik.
2. **Manajemen Akun Terpusat**: Hanya **Super Admin** (role level tertinggi) yang berhak membuat, melihat daftar, mengedit status/role, dan menonaktifkan akun pengurus lain (`admin`, `editor`).
3. **Role Hierarchy Enforced**:
    - `super_admin` (Level 3): Akses penuh, mengelola seluruh pengguna dan role di bawahnya.
    - `admin` (Level 2): Mengelola seluruh konten CMS, tanpa akses User Management.
    - `editor` (Level 1): Mengelola konten publikasi dan galeri.

---

## 2. Ruang Lingkup (Scope of Work)

### A. Super Admin User Management (`/admin/users`)

- **Daftar Pengguna (`Index`)**:
    - Tabel daftar user lengkap dengan pagination (10, 20, 50, 100), pencarian nama/email, dan filter role (`super_admin`, `admin`, `editor`) serta filter `is_active`.
    - Hanya dapat diakses oleh user ber-role `super_admin` (`EnsureSuperAdmin` middleware / `UserPolicy`).
- **Tambah Pengguna Baru (`Create/Store`)**:
    - Modal atau halaman form pembuatan user baru.
    - Form: Nama Lengkap, Email, Password, Konfirmasi Password, Role (`admin` atau `editor`), dan Status Aktif.
    - Aturan Keamanan: Super Admin dapat memilih role untuk user baru (hanya role yang sama atau di bawahnya).
- **Edit & Status Toggle (`Edit/Update`)**:
    - Update nama, email, role, dan status aktif.
    - Reset password opsional untuk user yang bersangkutan.
    - Self-lockout prevention: Super admin tidak dapat menonaktifkan atau menurunkan role akunnya sendiri jika dia adalah satu-satunya super admin aktif.
- **Hapus / Nonaktifkan Pengguna (`Delete`)**:
    - Soft delete atau `is_active = false` toggle.

### B. Pengaturan Akun & Profil (`/admin/account`) — _Selesai_

- Menu "Pengaturan Akun" di sidebar admin (di bawah Pengaturan Situs).
- Update Profil Mandiri (nama & email).
- Ubah Password Mandiri (verifikasi `current_password`, minimal 8 karakter).

### C. Autentikasi & Reset Password Restyle — _Selesai_

- Restyle `ForgotPassword.tsx` & `ResetPassword.tsx` dengan tema gelap ungu EMC².

### D. Member Status & Major Enums Standardization

- Standarisasi status keanggotaan menggunakan PHP Enum `MemberStatusEnum` & TypeScript type `MemberStatus`:
    - `regular` (Anggota Biasa)
    - `honorary` (Anggota Luar Biasa)
    - `inactive` (Non Aktif)
- Standarisasi jurusan mahasiswa menggunakan PHP Enum `DepartmentMajorEnum` & TypeScript type `DepartmentMajor`:
    - `sistem_informasi` ("Sistem Informasi")
    - `manajemen_informatika` ("Manajemen Informatika")
    - `biologi` ("Biologi")
    - `fisika` ("Fisika")
    - `kimia` ("Kimia")
    - `matematika` ("Matematika")
    - `statistika` ("Statistika")
- Perbaikan form `Create.tsx` dan `Edit.tsx` agar field Jurusan dan Status menggunakan dropdown select terstandarisasi.
- Update validasi request & Eloquent model cast.

### E. Admin Members Index — Metrics Cards, Search, Filter & Pagination Polish

- **4 Metrics Cards**:
    - Total Anggota (`total`)
    - Pengurus Aktif (`pengurus`)
    - Anggota Luar Biasa (`honorary`)
    - Anggota Biasa (`regular`)
- **Search & Multi-Filter**:
    - Pencarian fleksibel (`name`, `member_number`, `position`, `major`).
    - Filter Divisi, Filter Status (`regular`, `honorary`, `inactive`), Filter Peran Pengurus (`1` / `0`).
    - Tombol Terapkan & Reset Filter yang reaktif.
- **Pagination & Page Limit**:
    - Limit selector (10, 20, 50, 100) terintegrasi dengan filter query strings.

### F. Event Registration & Status Lookup — _Selesai_

- Halaman publik Cek Status Registrasi (`/events/check-status`).
- Form registrasi gender select & dashboard real DB stats.

---

## 3. Komponen & Berkas Terkait

| Layer          | Berkas / Komponen                                                            | Peran                                                   |
| -------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------- |
| **Enum**       | `app/Enums/MemberStatusEnum.php`                                             | Enum status keanggotaan (Biasa, Luar Biasa, Non Aktif)  |
| **Enum**       | `app/Enums/DepartmentMajorEnum.php`                                          | Enum 7 jurusan FMIPA UNRI                               |
| **Policy**     | `app/Policies/UserPolicy.php`                                                | Gate authorization super admin only                     |
| **Request**    | `app/Http/Requests/Admin/StoreUserRequest.php` & `UpdateUserRequest.php`     | Validasi input pembuatan & update akun                  |
| **Request**    | `app/Http/Requests/Admin/StoreMemberRequest.php` & `UpdateMemberRequest.php` | Validasi enum status keanggotaan & jurusan              |
| **Service**    | `app/Services/Admin/MemberService.php`                                       | Query filter, search, metrics 4 card, pagination        |
| **Service**    | `app/Services/Admin/UserService.php`                                         | Business logic & pagination user                        |
| **Controller** | `app/Http/Controllers/Admin/UserController.php`                              | Resource controller `/admin/users`                      |
| **Routing**    | `routes/web.php`                                                             | Endpoint `/admin/users` dengan policy check             |
| **Sidebar**    | `resources/js/Components/Admin/Layout/AdminSidebar.tsx`                      | Menu "Kelola Pengguna" (tampil hanya untuk Super Admin) |
| **Frontend**   | `resources/js/Pages/Admin/Users/Index.tsx`                                   | UI tabel manajemen user + modal create/edit             |
| **Frontend**   | `resources/js/Pages/Admin/Members/Index.tsx`                                 | 4 metric cards, search, filter dropdown, pagination     |
| **Frontend**   | `resources/js/Pages/Admin/Members/Create.tsx` & `Edit.tsx`                   | Form member dengan status & jurusan dropdown            |
| **Test**       | `tests/Feature/Admin/UserManagementTest.php`                                 | Integration test hak akses & CRUD user                  |
| **Test**       | `tests/Feature/Admin/MemberCrudTest.php`                                     | Integration test CRUD member, search, filter & metrics  |
