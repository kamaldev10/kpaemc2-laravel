# Dependency Management & Inspector Rules — KPA EMC² Web Portal

Dokumen ini mendefinisikan inventaris dependensi aktual, status audit keamanan, dan panduan manajemen versi untuk proyek KPA EMC² Web Portal.

> **Status Audit Terakhir:** 2026-08-29  
> **Security Vulnerabilities:** 0 CVE (Composer & npm Clean)  
> **Test Suite Status:** 25/25 Tests Passing (100%)  
> **Build Status:** TypeScript & Vite SSR Build Passing  

---

## 1. Scope Dependensi Proyek

Proyek ini memiliki dua ekosistem dependensi utama:
1. **PHP / Composer** (`composer.json`, `composer.lock`) — Runtime Backend Laravel 13, Filament v3, Database, Auth, Testing.
2. **Node.js / npm** (`package.json`, `package-lock.json`) — Runtime Frontend React 19, Inertia.js v2, Tailwind CSS v3, TypeScript 5, Vite 8.

---

## 2. Inventaris Dependensi Aktual (Terkini)

### A. Backend (PHP / Composer)

| Package | Tipe | Versi Terpasang (Lock) | Constraint | Latest Upstream | Keterangan & Catatan Versi |
|---|---|---|---|---|---|
| `php` | Runtime | `8.5.4` (CLI) | `^8.3` | `8.5.x` | Runtime backend utama |
| `laravel/framework` | Production | `13.29.0` | `^13.17` | `13.29.0` | **Latest Stable** core Laravel 13 |
| `filament/filament` | Production | `3.3.55` | `^3.2` | `3.3.55` | **Latest Stable v3** CMS & CRUD generator |
| `inertiajs/inertia-laravel` | Production | `2.0.25` | `^2.0` | `2.0.25` | Server adapter Inertia untuk React SPA |
| `laravel/sanctum` | Production | `4.3.3` | `^4.0` | `4.3.3` | Token-based API & SPA authentication |
| `laravel/tinker` | Production | `3.0.2` | `^3.0` | `3.0.2` | REPL interactive shell Laravel |
| `tightenco/ziggy` | Production | `2.6.4` | `^2.0` | `2.6.4` | Named route generator untuk JS/TS |
| `phpunit/phpunit` | Dev | `12.5.34` | `^12.5` | `12.5.34` | **Latest v12** test suite runner backend |
| `laravel/breeze` | Dev | `2.4.2` | `^2.4` | `2.4.2` | Auth scaffolding base |
| `laravel/pint` | Dev | `1.30.5` | `^1.27` | `1.30.5` | Code style linter/fixer PSR-12 |
| `laravel/pail` | Dev | `1.2.7` | `^1.2` | `1.2.7` | Real-time log viewer CLI |
| `laravel/pao` | Dev | `1.1.4` | `^1.0` | `1.1.4` | Agent-optimized test output |
| `fakerphp/faker` | Dev | `1.24.1` | `^1.23` | `1.24.1` | Data generator untuk Model Factories |
| `mockery/mockery` | Dev | `1.6.15` | `^1.6` | `1.6.15` | Mocking framework testing |
| `nunomaduro/collision` | Dev | `8.9.5` | `^8.6` | `8.9.5` | Error reporting CLI |

### B. Frontend (Node.js / npm)

| Package | Tipe | Versi Terpasang | Constraint | Latest Upstream | Keterangan & Catatan Versi |
|---|---|---|---|---|---|
| `react` | Production | `19.2.8` | `^19.2.8` | `19.2.8` | Core UI library (React 19) |
| `react-dom` | Production | `19.2.8` | `^19.2.8` | `19.2.8` | DOM renderer untuk React 19 |
| `@inertiajs/react` | Production | `2.3.27` | `^2.0.0` | `2.3.27` | Client adapter Inertia untuk React |
| `@headlessui/react` | Production | `2.2.10` | `^2.0.0` | `2.2.10` | Accessible unstyled UI components |
| `lucide-react` | Production | `1.33.0` | `^1.33.0` | `1.37.0` | Iconography library |
| `clsx` | Production | `2.1.1` | `^2.1.1` | `2.1.1` | Utility class builder |
| `tailwind-merge` | Production | `3.6.0` | `^3.6.0` | `3.6.0` | Tailwind class merger |
| `typescript` | Dev | `5.9.3` | `^5.0.2` | `5.9.3` | TypeScript compiler |
| `vite` | Dev | `8.2.2` | `^8.0.0` | `8.2.2` | Build tool & HMR dev server |
| `laravel-vite-plugin` | Dev | `3.2.0` | `^3.1` | `3.2.0` | Vite integration plugin Laravel |
| `@vitejs/plugin-react` | Dev | `6.1.0` | `^6.1.0` | `6.1.1` | React JSX & Fast Refresh plugin Vite |
| `tailwindcss` | Dev | `3.4.19` | `^3.4.19` | `3.4.19` | Utility-first CSS framework (v3 Stable) |
| `@tailwindcss/forms` | Dev | `0.5.11` | `^0.5.3` | `0.5.11` | Form styling resets |
| `postcss` & `autoprefixer` | Dev | `8.5.26` / `10.5.4` | `^8.4` / `^10.4` | `8.5.x` / `10.5.x` | CSS transform & vendor prefixing |
| `eslint` & `@eslint/js` | Dev | `9.39.5` | `^9.39.5` | `9.39.5` | ESLint (Flat Config v9) |
| `prettier` | Dev | `3.9.6` | `^3.9.6` | `3.9.6` | Code formatter |
| `prettier-plugin-tailwindcss` | Dev | `0.8.1` | `^0.8.1` | `0.8.1` | Auto-sorting Tailwind classes |
| `concurrently` | Dev | `10.0.5` | `^10.0.3` | `10.0.5` | Concurrent dev runner |

---

## 3. Kebijakan & Keputusan Arsitektur Versi (Pinning Decisions)

1. **Tailwind CSS (`3.4.19`)**: Dipertahankan pada branch v3 stabil karena Filament v3 dan `@tailwindcss/forms` dioptimalkan untuk Tailwind v3.
2. **Filament (`3.3.55`)**: Menggunakan versi stabil v3.x LTS yang kompatibel penuh dengan Laravel 13 dan Livewire v3.
3. **React 19 (`19.2.8`)**: Menggunakan rilis stabil React 19 dengan SSR support via `@inertiajs/react`.
4. **PostgreSQL Driver**: Menggunakan `pdo_pgsql` dengan session timezone terkonfigurasi `UTC` pada `config/database.php`.

---

## 4. Protokol & Checklist Audit Dependensi

Agen `dependency-inspector` wajib melakukan verifikasi berikut saat mengaudit:

### 1. Lockfile Integrity
- [x] `composer.lock` sinkron dengan `composer.json`
- [x] `package-lock.json` sinkron dengan `package.json`
- [x] Tidak ada package terpasang di `node_modules` atau `vendor` tanpa manifest

### 2. SemVer & Version Constraints
- [x] Menggunakan caret `^` yang terkontrol
- [x] Ekstensi PHP terdaftar: `ext-pdo`, `ext-pgsql`

### 3. Keamanan & Kerentanan (Security Advisory)
- [x] `composer audit` — **0 advisories**
- [x] `npm audit` — **0 vulnerabilities**

### 4. Build & Test Verification
- [x] `php artisan test` — **25/25 passed (100%)**
- [x] `npx tsc --noEmit` — **0 errors**
- [x] `npm run build` (Client + SSR) — **Passed**

---

## 5. Perintah Cepat Inspeksi Dependensi

```bash
# === PHP / Composer ===
composer show                          # List semua dependensi terpasang
composer show --direct                 # List hanya dependensi langsung di composer.json
composer outdated                      # Cek paket yang memiliki versi baru
composer audit                         # Audit keamanan / vulnerabilitas CVE
composer validate                      # Validasi sintaks dan konsistensi composer.json

# === Node / npm ===
npm list --depth=0                     # List dependensi level root
npm outdated                           # Cek paket frontend yang outdated
npm audit                              # Audit keamanan paket npm
npm audit fix                          # Perbaiki patch keamanan non-breaking
```
