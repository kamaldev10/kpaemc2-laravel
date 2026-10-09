# Tasks — Sprint 26.05 (User Management, Enums Standardization, Members Dashboard Polish, Account Settings & Phase 4 Completion)

> Layer: BE = Laravel Backend · FE = React/Inertia Frontend · TEST = Pest/PHPUnit · DB = Database/Migrations

---

## 1. Member Status & Major Enums (`MemberStatusEnum` & `DepartmentMajorEnum`)

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 1.1 | Buat Enum PHP `app/Enums/MemberStatusEnum.php` (`regular`, `honorary`, `inactive`)     | BE    | ✅     |
| 1.2 | Buat Enum PHP `app/Enums/DepartmentMajorEnum.php` (7 Jurusan FMIPA UNRI)              | BE    | ✅     |
| 1.3 | Update `app/Models/Member.php` casts `status` & `major`                               | BE    | ✅     |
| 1.4 | Update `StoreMemberRequest.php` & `UpdateMemberRequest.php` validasi enum             | BE    | ✅     |
| 1.5 | Update TypeScript types `resources/js/types/member.ts` (`MemberStatus`, `DepartmentMajor`)| FE | ✅     |
| 1.6 | Update Form `Create.tsx` & `Edit.tsx` (dropdown pilihan Jurusan & Status)             | FE    | ✅     |
| 1.7 | Unit/Feature test validasi status & major member (`MemberCrudTest.php` & `MemberServiceTest.php`)| TEST | ✅ |
| 1.8 | Migrasi data normalisasi legacy strings ke Enums (`20261009_0018_...`)                | DB    | ✅     |

---

## 2. Admin Members Index — Metrics Cards, Search, Filter & Pagination Polish

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 2.1 | Sesuaikan metrics di `MemberService::getMetrics()` (Total, Pengurus Aktif, Anggota Luar Biasa, Anggota Biasa)| BE | ✅ |
| 2.2 | Update 4 Card Ringkasan di `Admin/Members/Index.tsx` sesuai metrics baru              | FE    | ✅     |
| 2.3 | Audit & perbaiki fitur Search (name, NIA, jabatan, jurusan) & Filter (divisi, status, pengurus)| BE/FE | ✅ |
| 2.4 | Verifikasi filter `status` dropdown di Index agar selaras dengan `MemberStatusEnum`   | FE    | ✅     |
| 2.5 | Verifikasi AdminPagination (10, 20, 50, 100) & query string retention di `/admin/members`| FULL | ✅ |

---

## 3. Super Admin User Management (`/admin/users`)

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 3.1 | `UserPolicy` (hanya `super_admin` yang dapat `viewAny`, `create`, `update`, `delete`) | BE    | ✅     |
| 3.2 | `StoreUserRequest` & `UpdateUserRequest` (validasi name, email unique, password, role)| BE    | ✅     |
| 3.3 | `UserService` (daftar user, filter role/search, pagination, prevent self-lockout)     | BE    | ✅     |
| 3.4 | `UserController` (Admin resource endpoints `/admin/users`)                            | BE    | ✅     |
| 3.5 | Routing `/admin/users` (resource controller di dalam admin middleware)                | BE    | ✅     |
| 3.6 | Tampilkan menu "Kelola Pengguna" di Sidebar Admin (khusus untuk `super_admin`)        | FE    | ✅     |
| 3.7 | Frontend User Management UI (`Admin/Users/Index.tsx`) + Create/Edit Modal             | FE    | ✅     |
| 3.8 | Feature Test `UserManagementTest.php` (akses role, create user, validation)           | TEST  | ✅     |

---

## 4. Pengaturan Akun & Profil Admin

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 4.1 | `AccountController` (`index`, `updateProfile`, `updatePassword`)                      | BE    | ✅     |
| 4.2 | Routing `/admin/account`, `/admin/account/profile`, `/admin/account/password`         | BE    | ✅     |
| 4.3 | Tambahkan menu "Pengaturan Akun" di Sidebar Admin (di bawah Pengaturan Situs)         | FE    | ✅     |
| 4.4 | Update `AdminUserDropdown` (arahkan link ke `/admin/account` & `/admin/account#password`)| FE  | ✅     |
| 4.5 | Halaman `Admin/Account/Index.tsx` (Informasi Profil & Ganti Password dalam AdminLayout)| FE   | ✅     |

---

## 5. Autentikasi, Lupa Password & Reset Password

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 5.1 | Restyle halaman Lupa Password (`Auth/ForgotPassword.tsx`) dengan tema gelap ungu EMC² | FE    | ✅     |
| 5.2 | Restyle halaman Reset Password (`Auth/ResetPassword.tsx`) dengan tema gelap ungu EMC² | FE    | ✅     |

---

## 6. Fitur Pendaftaran & Cek Status (Phase 4 Event Module)

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 6.1 | Endpoint & method `checkStatus` dan `lookupStatus` pada `Public/EventController`      | BE    | ✅     |
| 6.2 | Halaman publik Cek Status Registrasi (`Public/Events/CheckStatus.tsx`)                 | FE    | ✅     |
| 6.3 | Tambah Gender Select pada form pendaftaran `Public/Events/Show.tsx`                   | FE    | ✅     |
| 6.4 | Hubungkan Real DB Statistics pada Admin Dashboard (`DashboardController.php` & `Dashboard.tsx`)| BE/FE | ✅ |
| 6.5 | Custom Migration Creator sequence format (`YYYYMMDD_XXXX`)                            | BE    | ✅     |
| 6.6 | Unit & Feature Tests (`EventTest.php` 4 test baru untuk flow registrasi & cek status) | TEST  | ✅     |

---

**Legend Status:**

- `✅` = Selesai
- `🔄` = Sedang Dikerjakan
- `⏳` = Direncanakan
