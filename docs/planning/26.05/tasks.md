# Tasks — Sprint 26.05 (Account Settings, Profile Security & Phase 4 Completion)

> Layer: BE = Laravel Backend · FE = React/Inertia Frontend · TEST = Pest/PHPUnit · DB = Database/Migrations

---

## 1. Pengaturan Akun & Profil Admin

| #   | Task                                                                                      | Layer | Status |
| --- | ----------------------------------------------------------------------------------------- | ----- | ------ |
| 1.1 | `AccountController` (`index`, `updateProfile`, `updatePassword`)                          | BE    | ✅     |
| 1.2 | Routing `/admin/account`, `/admin/account/profile`, `/admin/account/password`             | BE    | ✅     |
| 1.3 | Tambahkan menu "Pengaturan Akun" di Sidebar Admin (di bawah Pengaturan Situs)             | FE    | ✅     |
| 1.4 | Update `AdminUserDropdown` (arahkan link ke `/admin/account` & `/admin/account#password`) | FE    | ✅     |
| 1.5 | Halaman `Admin/Account/Index.tsx` (Informasi Profil & Ganti Password dalam AdminLayout)   | FE    | ✅     |

---

## 2. Autentikasi, Lupa Password & Reset Password

| #   | Task                                                                                  | Layer | Status |
| --- | ------------------------------------------------------------------------------------- | ----- | ------ |
| 2.1 | Restyle halaman Lupa Password (`Auth/ForgotPassword.tsx`) dengan tema gelap ungu EMC² | FE    | ✅     |
| 2.2 | Restyle halaman Reset Password (`Auth/ResetPassword.tsx`) dengan tema gelap ungu EMC² | FE    | ✅     |

---

## 3. Fitur Pendaftaran & Cek Status (Phase 4 Event Module)

| #   | Task                                                                                            | Layer | Status |
| --- | ----------------------------------------------------------------------------------------------- | ----- | ------ |
| 3.1 | Endpoint & method `checkStatus` dan `lookupStatus` pada `Public/EventController`                | BE    | ✅     |
| 3.2 | Halaman publik Cek Status Registrasi (`Public/Events/CheckStatus.tsx`)                          | FE    | ✅     |
| 3.3 | Tambah Gender Select pada form pendaftaran `Public/Events/Show.tsx`                             | FE    | ✅     |
| 3.4 | Hubungkan Real DB Statistics pada Admin Dashboard (`DashboardController.php` & `Dashboard.tsx`) | BE/FE | ✅     |
| 3.5 | Custom Migration Creator sequence format (`YYYYMMDD_XXXX`)                                      | BE    | ✅     |
| 3.6 | Unit & Feature Tests (`EventTest.php` 4 test baru untuk flow registrasi & cek status)           | TEST  | ✅     |

---

**Legend Status:**

- `✅` = Selesai
- `🔄` = Sedang Dikerjakan
- `⏳` = Direncanakan
