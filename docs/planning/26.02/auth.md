# Auth — Sprint 26.02 (Admin Dashboard)

> Dokumen ini mendeskripsikan arsitektur autentikasi & otorisasi yang tersedia di project dan rencana integrasi untuk admin dashboard.

---

## 1. Kondisi Saat Ini (Existing)

### 1.1 Packages Terinstall

| Package             | Versi | Fungsi                                                                                        |
| ------------------- | ----- | --------------------------------------------------------------------------------------------- |
| **Laravel Breeze**  | ^2.4  | Scaffolding auth (login, register, password reset, email verification) dengan Inertia + React |
| **Laravel Sanctum** | ^4.0  | Session‑based auth (SPA cookie) + API token (opsional)                                        |
| **Filament**        | ^3.2  | Admin panel (punya auth guard sendiri di `/admin`)                                            |

### 1.2 Auth Controllers (dari Breeze)

| Controller                                | Route                                                 | Fungsi                                    |
| ----------------------------------------- | ----------------------------------------------------- | ----------------------------------------- |
| `AuthenticatedSessionController`          | `GET /login`, `POST /login`, `POST /logout`           | Login & logout session‑based              |
| `RegisteredUserController`                | `GET /register`, `POST /register`                     | Registrasi user baru                      |
| `PasswordResetLinkController`             | `GET /forgot-password`, `POST /forgot-password`       | Kirim link reset password via email       |
| `NewPasswordController`                   | `GET /reset-password/{token}`, `POST /reset-password` | Form & proses reset password              |
| `PasswordController`                      | `PUT /password`                                       | Update password (authenticated)           |
| `ConfirmablePasswordController`           | `GET /confirm-password`, `POST /confirm-password`     | Konfirmasi password sebelum aksi sensitif |
| `EmailVerificationPromptController`       | `GET /verify-email`                                   | Halaman prompt verifikasi email           |
| `EmailVerificationNotificationController` | `POST /email/verification-notification`               | Kirim ulang email verifikasi              |
| `VerifyEmailController`                   | `GET /verify-email/{id}/{hash}`                       | Verifikasi email via signed URL           |

### 1.3 Frontend Pages (React/Inertia)

| File                                          | Fungsi                      |
| --------------------------------------------- | --------------------------- |
| `resources/js/Pages/Auth/Login.tsx`           | Halaman login               |
| `resources/js/Pages/Auth/Register.tsx`        | Halaman registrasi          |
| `resources/js/Pages/Auth/ForgotPassword.tsx`  | Halaman lupa password       |
| `resources/js/Pages/Auth/ResetPassword.tsx`   | Halaman reset password      |
| `resources/js/Pages/Auth/ConfirmPassword.tsx` | Halaman konfirmasi password |
| `resources/js/Pages/Auth/VerifyEmail.tsx`     | Halaman verifikasi email    |

### 1.4 User Model & Role

**Model:** `App\Models\User` (extends `Authenticatable`)

**Kolom `role`** di tabel `users`:

- Tipe: `string(50)`, default `'editor'`
- Value saat ini di DB: `superadmin`, `editor`, `committee`

**Helper methods yang ada:**

- `isSuperAdmin()` → cek `$this->role === 'superadmin'`
- `isEditor()` → cek `in_array($this->role, ['superadmin', 'editor'])`
- `isCommittee()` → cek `in_array($this->role, ['superadmin', 'committee'])`

### 1.5 Enum (Baru Dibuat)

`App\Enums\RoleTypeEnum` — backed enum `string`:

- `SUPER_ADMIN = 'super_admin'`
- `ADMIN = 'admin'`
- `EDITOR = 'editor'`

### 1.6 Middleware

| Middleware              | Lokasi                                          | Fungsi                                                                            |
| ----------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------- |
| `auth`                  | Laravel built‑in                                | Pastikan user terautentikasi                                                      |
| `guest`                 | Laravel built‑in                                | Hanya untuk user belum login                                                      |
| `verified`              | Laravel built‑in                                | Pastikan email terverifikasi                                                      |
| `signed`                | Laravel built‑in                                | Validasi signed URL                                                               |
| `throttle`              | Laravel built‑in                                | Rate limiting                                                                     |
| `EnsureAdmin`           | `app/Http/Middleware/EnsureAdmin.php`           | Custom — cek role admin (⚠️ masih pakai `hasRole()` yang belum ada di User model) |
| `HandleInertiaRequests` | `app/Http/Middleware/HandleInertiaRequests.php` | Share data ke Inertia                                                             |

---

## 2. Masalah / Inkonsistensi yang Harus Diperbaiki

| #   | Masalah                                  | Detail                                                                                                                                                          |
| --- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Inkonsistensi nilai role**             | DB migration default `'editor'`, helper `isSuperAdmin()` cek `'superadmin'`, tapi `RoleTypeEnum` pakai `'super_admin'`. Harus diselaraskan.                     |
| 2   | **`hasRole()` belum ada**                | `EnsureAdmin` middleware memanggil `$user->hasRole('admin')`, tapi method ini tidak ada di User model.                                                          |
| 3   | **User model belum cast `role` ke enum** | Kolom `role` masih string biasa, belum di‑cast ke `RoleTypeEnum`.                                                                                               |
| 4   | **Register terbuka untuk publik**        | `RegisteredUserController` mengizinkan siapa saja mendaftar. Untuk admin dashboard, registrasi harus dibatasi (hanya super_admin yang boleh membuat akun baru). |

---

## 3. Rencana Implementasi Auth untuk Sprint 26.02

### 3.1 Standarisasi Role Values

Sesuaikan semua role value ke `RoleTypeEnum`:

```
super_admin  →  Full access, manage users, manage all content
admin        →  Manage content (CRUD articles, posts, members, events)
editor       →  Create & edit own content, no delete, no user management
```

**Aksi:**

- [ ] Update migration atau buat migration baru: ubah default dari `'editor'` tetap, tapi pastikan existing data `'superadmin'` → `'super_admin'`
- [ ] Update User model: cast `role` ke `RoleTypeEnum`
- [ ] Hapus helper lama (`isSuperAdmin`, `isEditor`, `isCommittee`) → ganti dengan method berbasis enum

### 3.2 Update User Model

```php
// Tambah cast
protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_active' => 'boolean',
        'role' => RoleTypeEnum::class,  // ← tambah ini
    ];
}

// Ganti helper methods
public function hasRole(RoleTypeEnum ...$roles): bool
{
    return in_array($this->role, $roles);
}

public function isAtLeast(RoleTypeEnum $minimumRole): bool
{
    $hierarchy = [
        RoleTypeEnum::EDITOR->value => 1,
        RoleTypeEnum::ADMIN->value => 2,
        RoleTypeEnum::SUPER_ADMIN->value => 3,
    ];
    return ($hierarchy[$this->role->value] ?? 0) >= ($hierarchy[$minimumRole->value] ?? 0);
}
```

### 3.3 Update EnsureAdmin Middleware

```php
use App\Enums\RoleTypeEnum;

public function handle(Request $request, Closure $next): Response
{
    $user = $request->user();
    if (! $user || ! $user->isAtLeast(RoleTypeEnum::ADMIN)) {
        abort(403, 'Admin access required.');
    }
    return $next($request);
}
```

### 3.4 Disable Public Registration

Untuk admin dashboard, registrasi user baru hanya boleh dilakukan oleh `SUPER_ADMIN`:

- [ ] Hapus/disable route `GET /register` dan `POST /register` dari guest group
- [ ] Buat endpoint admin-only: `POST /api/admin/users` di admin route group

### 3.5 Auth Guard Strategy

| Area                | Guard                                      | Mekanisme                               |
| ------------------- | ------------------------------------------ | --------------------------------------- |
| **Public website**  | `web` (session)                            | Breeze default, cookie‑based            |
| **Admin dashboard** | `web` (session) + `EnsureAdmin` middleware | Session + role check                    |
| **Filament panel**  | `filament` (session)                       | Filament built‑in auth                  |
| **API (future)**    | `sanctum` (token)                          | Bearer token, untuk mobile/SPA terpisah |

### 3.6 Route Group untuk Admin

```php
// routes/web.php
Route::middleware(['auth', 'verified', 'ensure.admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    // ... CRUD routes
});
```

### 3.7 Permission Matrix

| Action                   | SUPER_ADMIN | ADMIN |    EDITOR     |
| ------------------------ | :---------: | :---: | :-----------: |
| Login ke admin dashboard |     ✅      |  ✅   |      ❌       |
| Lihat semua konten       |     ✅      |  ✅   | ✅ (own only) |
| Create artikel/post      |     ✅      |  ✅   |      ✅       |
| Edit artikel/post        |     ✅      |  ✅   | ✅ (own only) |
| Delete artikel/post      |     ✅      |  ✅   |      ❌       |
| Manage members           |     ✅      |  ✅   |      ❌       |
| Manage events            |     ✅      |  ✅   |      ❌       |
| Manage users             |     ✅      |  ❌   |      ❌       |
| Ubah role user           |     ✅      |  ❌   |      ❌       |

---

## 4. File yang Perlu Dibuat/Diubah

| File                                                      | Action       | Keterangan                                                             |
| --------------------------------------------------------- | ------------ | ---------------------------------------------------------------------- |
| `app/Enums/RoleTypeEnum.php`                              | ✅ sudah ada | Enum role                                                              |
| `app/Models/User.php`                                     | ✏️ edit      | Cast role → enum, tambah `hasRole()`, `isAtLeast()`, hapus helper lama |
| `app/Http/Middleware/EnsureAdmin.php`                     | ✏️ edit      | Gunakan `RoleTypeEnum` + `isAtLeast()`                                 |
| `database/migrations/XXXXXXXX_standardize_user_roles.php` | ✏️ create    | Migrasi data role lama → format baru                                   |
| `routes/auth.php`                                         | ✏️ edit      | Disable public registration                                            |
| `tests/Unit/Models/UserRoleTest.php`                      | ✅ created   | Test `hasRole()`, `isAtLeast()`, cast enum                             |
| `tests/Feature/Auth/AdminAccessTest.php`                  | ✅ created   | Test middleware EnsureAdmin dengan tiap role                           |

---

## 5. Urutan Implementasi

1. **Migration** — Standarisasi nilai role di DB (`superadmin` → `super_admin`)
2. **User Model** — Cast enum, tambah `hasRole()` & `isAtLeast()`
3. **EnsureAdmin Middleware** — Update ke enum‑based check
4. **Disable public register** — Hapus route register dari guest
5. **Tests** — Unit test role, feature test middleware
6. **Admin routes** — Buat route group admin di `routes/web.php`
