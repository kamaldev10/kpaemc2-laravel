## Di Laravel, equivalent-nya ada di beberapa tempat:

---

### 1. composer.json → Setara package.json (dependency manager)

    composer install        # Install semua dependencies (seperti npm install)
    composer require [pkg]  # Tambah package (seperti npm install [pkg])
    composer update         # Update dependencies

File: composer.json — daftar semua PHP dependencies.
---

### 2. php artisan → CLI built-in Laravel (perintah framework)

Lihat semua command yang tersedia:

    php artisan list

Yang sering dipakai di project ini:

    # Database
    php artisan migrate                    # Jalankan migrasi
    php artisan migrate:fresh --seed       # Reset + migrate + seeder
    php artisan migrate:rollback           # Rollback batch terakhir
    php artisan migrate:status             # Cek status migrasi
    php artisan db:seed                    # Jalankan seeder saja
    php artisan db:show                    # Info database & tabel

    # Generate file baru
    php artisan make:model NamaModel -m    # Buat model + migration
    php artisan make:migration nama        # Buat migration baru
    php artisan make:seeder NamaSeeder     # Buat seeder baru
    php artisan make:factory NamaFactory   # Buat factory baru
    php artisan make:controller Nama       # Buat controller

    # Dev server
    php artisan serve                      # Jalankan dev server (localhost:8000)

    # Cache
    php artisan config:clear               # Clear config cache
    php artisan cache:clear                # Clear app cache
    php artisan route:list                 # List semua route

---

### 3. package.json → Untuk frontend (Node/Vite)

    npm install             # Install frontend deps
    npm run dev             # Dev server Vite (React/Inertia hot-reload)
    npm run build           # Build untuk production

---

### Ringkasan Analogi:

| Node.js / JS │ Laravel |
| ------------ | ------- |
| package.json (scripts) │ composer.json + php artisan list |
| npm install │ composer install|
| npm run dev │ php artisan serve + npm run dev|
| npx [tool] │ php artisan [command]|
| node script.js │ php artisan tinker (REPL)|

│ Tip: Di Laravel tidak ada satu file "script runner" seperti package.json. Command artisan bisa dicek kapan saja dengan php artisan list atau php

│ artisan help [command].
