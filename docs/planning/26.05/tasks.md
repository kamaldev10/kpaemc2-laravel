# Tasks — Sprint 26.05 (User Management, Account Settings & Phase 4 Completion)

> Layer: BE = Laravel Backend · FE = React/Inertia Frontend · TEST = Pest/PHPUnit · DB = Database/Migrations

---

## 1. Super Admin User Management (`/admin/users`)

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 1.1 | `UserPolicy` (hanya `super_admin` yang dapat `viewAny`, `create`, `update`, `delete`) | BE    | ⏳     |
| 1.2 | `StoreUserRequest` & `UpdateUserRequest` (validasi name, email unique, password, role)| BE    | ⏳     |
| 1.3 | `UserService` (daftar user, filter role/search, pagination, prevent self-lockout)     | BE    | ⏳     |
| 1.4 | `UserController` (Admin resource endpoints `/admin/users`)                            | BE    | ⏳     |
| 1.5 | Routing `/admin/users` (resource controller di dalam admin middleware)                | BE    | ⏳     |
| 1.6 | Tampilkan menu "Kelola Pengguna" di Sidebar Admin (khusus untuk `super_admin`)        | FE    | ⏳     |
| 1.7 | Frontend User Management UI (`Admin/Users/Index.tsx`) + Create/Edit Modal             | FE    | ⏳     |
| 1.8 | Feature Test `UserManagementTest.php` (akses role, create user, validation)           | TEST  | ⏳     |

---

## 2. Pengaturan Akun & Profil Admin

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 2.1 | `AccountController` (`index`, `updateProfile`, `updatePassword`)                      | BE    | ✅     |
| 2.2 | Routing `/admin/account`, `/admin/account/profile`, `/admin/account/password`         | BE    | ✅     |
| 2.3 | Tambahkan menu "Pengaturan Akun" di Sidebar Admin (di bawah Pengaturan Situs)         | FE    | ✅     |
| 2.4 | Update `AdminUserDropdown` (arahkan link ke `/admin/account` & `/admin/account#password`)| FE  | ✅     |
| 2.5 | Halaman `Admin/Account/Index.tsx` (Informasi Profil & Ganti Password dalam AdminLayout)| FE   | ✅     |

---

## 3. Autentikasi, Lupa Password & Reset Password

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 3.1 | Restyle halaman Lupa Password (`Auth/ForgotPassword.tsx`) dengan tema gelap ungu EMC² | FE    | ✅     |
| 3.2 | Restyle halaman Reset Password (`Auth/ResetPassword.tsx`) dengan tema gelap ungu EMC² | FE    | ✅     |

---

## 4. Fitur Pendaftaran & Cek Status (Phase 4 Event Module)

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 4.1 | Endpoint & method `checkStatus` dan `lookupStatus` pada `Public/EventController`      | BE    | ✅     |
| 4.2 | Halaman publik Cek Status Registrasi (`Public/Events/CheckStatus.tsx`)                 | FE    | ✅     |
| 4.3 | Tambah Gender Select pada form pendaftaran `Public/Events/Show.tsx`                   | FE    | ✅     |
| 4.4 | Hubungkan Real DB Statistics pada Admin Dashboard (`DashboardController.php` & `Dashboard.tsx`)| BE/FE | ✅ |
| 4.5 | Custom Migration Creator sequence format (`YYYYMMDD_XXXX`)                            | BE    | ✅     |
| 4.6 | Unit & Feature Tests (`EventTest.php` 4 test baru untuk flow registrasi & cek status) | TEST  | ✅     |

---

**Legend Status:**

- `✅` = Selesai
- `🔄` = Sedang Dikerjakan
- `⏳` = Direncanakan
