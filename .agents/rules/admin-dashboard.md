# Admin Dashboard Rules — KPA EMC² Web Portal

## Scope
Rules for developing and maintaining the Custom Inertia Admin Dashboard under `/admin`.

---

## 1. Routing & Authorization
- Admin routes must be registered in `routes/web.php` inside the admin prefix group:
  ```php
  Route::middleware(['auth', 'verified', App\Http\Middleware\EnsureAdmin::class])
      ->prefix('admin')
      ->name('admin.')
      ->group(function () { ... });
  ```
- Access to `/admin` requires at least role `ADMIN` via `RoleTypeEnum`.
- Object-level permissions must be defined in Policies (`app/Policies/`).

---

## 2. Layering Standard for Admin CRUD
Each admin module must implement:
1. **FormRequest**: Dedicated create and update requests in `app/Http/Requests/Admin/`.
2. **Service**: Business logic, Cloudinary upload, cache clearing, and database transactions in `app/Services/Admin/`.
3. **Resource**: JSON formatter using `JsonResource` in `app/Http/Resources/Admin/`.
4. **Controller**: Thin controller in `app/Http/Controllers/Admin/`.
5. **Frontend Pages**: `Index.tsx`, `Create.tsx`, and `Edit.tsx` in `resources/js/Pages/Admin/{Module}/`.
   - Must use `<AdminLayout>` with dynamic breadcrumbs.
   - Must use `RichTextEditor` for longform content and `ImageUploader` for Cloudinary media.
6. **Tests**: Unit tests in `tests/Unit/Services/Admin/` and Feature tests in `tests/Feature/Admin/`.

---

## 3. Flash Notification Pattern
- Use session flash messages in controller redirects:
  ```php
  return redirect()->route('admin.{module}.index')->with('success', 'Pesan sukses...');
  ```
- Handled automatically by `AdminLayout.tsx` alert banners.
