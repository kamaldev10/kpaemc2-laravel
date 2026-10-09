# Tasks — Sprint 26.05 (User Management, Member Status Enum, Account Settings & Phase 4 Completion)

> Layer: BE = Laravel Backend · FE = React/Inertia Frontend · TEST = Pest/PHPUnit · DB = Database/Migrations

---

## 1. Member Status Enum Refactoring & Standardization (`MemberStatusEnum`)

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 1.1 | Buat Enum PHP `app/Enums/MemberStatusEnum.php` (`regular`, `honorary`, `inactive`)     | BE    | ⏳     |
| 1.2 | Update `app/Models/Member.php` casts `status => MemberStatusEnum::class`              | BE    | ⏳     |
| 1.3 | Update `StoreMemberRequest.php` & `UpdateMemberRequest.php` validasi enum             | BE    | ⏳     |
| 1.4 | Update TypeScript type `resources/js/types/member.ts` (`MemberStatus`)                 | FE    | ⏳     |
| 1.5 | Update Form `Create.tsx` & `Edit.tsx` (sesuaikan label & value enum)                   | FE    | ⏳     |
| 1.6 | Update Filter & Badge di `Admin/Members/Index.tsx` & komponen publik                  | FE    | ⏳     |
| 1.7 | Unit/Feature test validasi status member (`MemberCrudTest.php`)                       | TEST  | ⏳     |

---

## 2. Super Admin User Management (`/admin/users`)

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 2.1 | `UserPolicy` (hanya `super_admin` yang dapat `viewAny`, `create`, `update`, `delete`) | BE    | ⏳     |
| 2.2 | `StoreUserRequest` & `UpdateUserRequest` (validasi name, email unique, password, role)| BE    | ⏳     |
| 2.3 | `UserService` (daftar user, filter role/search, pagination, prevent self-lockout)     | BE    | ⏳     |
| 2.4 | `UserController` (Admin resource endpoints `/admin/users`)                            | BE    | ⏳     |
| 2.5 | Routing `/admin/users` (resource controller di dalam admin middleware)                | BE    | ⏳     |
| 2.6 | Tampilkan menu "Kelola Pengguna" di Sidebar Admin (khusus untuk `super_admin`)        | FE    | ⏳     |
| 2.7 | Frontend User Management UI (`Admin/Users/Index.tsx`) + Create/Edit Modal             | FE    | ⏳     |
| 2.8 | Feature Test `UserManagementTest.php` (akses role, create user, validation)           | TEST  | ⏳     |

---

## 3. Pengaturan Akun & Profil Admin

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 3.1 | `AccountController` (`index`, `updateProfile`, `updatePassword`)                      | BE    | ✅     |
| 3.2 | Routing `/admin/account`, `/admin/account/profile`, `/admin/account/password`         | BE    | ✅     |
| 3.3 | Tambahkan menu "Pengaturan Akun" di Sidebar Admin (di bawah Pengaturan Situs)         | FE    | ✅     |
| 3.4 | Update `AdminUserDropdown` (arahkan link ke `/admin/account` & `/admin/account#password`)| FE  | ✅     |
| 3.5 | Halaman `Admin/Account/Index.tsx` (Informasi Profil & Ganti Password dalam AdminLayout)| FE   | ✅     |

---

## 4. Autentikasi, Lupa Password & Reset Password

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 4.1 | Restyle halaman Lupa Password (`Auth/ForgotPassword.tsx`) dengan tema gelap ungu EMC² | FE    | ✅     |
| 4.2 | Restyle halaman Reset Password (`Auth/ResetPassword.tsx`) dengan tema gelap ungu EMC² | FE    | ✅     |

---

## 5. Fitur Pendaftaran & Cek Status (Phase 4 Event Module)

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 5.1 | Endpoint & method `checkStatus` dan `lookupStatus` pada `Public/EventController`      | BE    | ✅     |
| 5.2 | Halaman publik Cek Status Registrasi (`Public/Events/CheckStatus.tsx`)                 | FE    | ✅     |
| 5.3 | Tambah Gender Select pada form pendaftaran `Public/Events/Show.tsx`                   | FE    | ✅     |
| 5.4 | Hubungkan Real DB Statistics pada Admin Dashboard (`DashboardController.php` & `Dashboard.tsx`)| BE/FE | ✅ |
| 5.5 | Custom Migration Creator sequence format (`YYYYMMDD_XXXX`)                            | BE    | ✅     |
| 5.6 | Unit & Feature Tests (`EventTest.php` 4 test baru untuk flow registrasi & cek status) | TEST  | ✅     |

---

**Legend Status:**

- `✅` = Selesai
- `🔄` = Sedang Dikerjakan
- `⏳` = Direncanakan
