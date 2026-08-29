# Database Standards & Audit Log Rules — KPA EMC² Web Portal

> **Engine:** PostgreSQL 18+ · **Laravel Migrations** · **Eloquent ORM**
>
> Standar baku arsitektur database untuk seluruh tabel dalam sistem KPA EMC² Web Portal.

---

## 1. Aturan Wajib 5 Kolom Audit Log & Lifecycle

Setiap tabel (tanpa pengecualian) **WAJIB** memiliki 5 kolom standar berikut untuk pelacakan riwayat modifikasi data (_audit trail_) dan kontrol status hidup record:

| Kolom        | PostgreSQL Type | Constraint                                  | Deskripsi & Behavior                                                                                   |
| ------------ | --------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `created_at` | `TIMESTAMPTZ`   | NULLABLE                                    | Timestamp waktu pembuatan record (auto-populated by Eloquent/DB)                                       |
| `updated_at` | `TIMESTAMPTZ`   | NULLABLE                                    | Timestamp waktu terakhir record diperbarui (auto-updated by Eloquent/DB)                               |
| `created_by` | `BIGINT`        | FK→`users.id`, NULLABLE, ON DELETE SET NULL | ID user admin yang membuat record. `NULL` jika dibuat dari form publik (e.g. pendaftar event / kontak) |
| `updated_by` | `BIGINT`        | FK→`users.id`, NULLABLE, ON DELETE SET NULL | ID user admin yang terakhir mengedit/memverifikasi record                                              |
| `is_active`  | `BOOLEAN`       | NOT NULL, DEFAULT `true`                    | Status aktif record. Digunakan untuk soft toggle aktif/nonaktif di seluruh query publik                |

---

## 2. Aturan Penyimpanan Media & Berkas (Zero-BLOB Policy)

> **ATURAN KERAS:** Database **DILARANG** menyimpan file mentah/biner (_BYTEA_, _BLOB_, atau _Base64_).

1. **Storage Provider:** Seluruh aset media (foto avatar, cover artikel, banner event, dokumen pendaftaran, bukti transfer, foto/video galeri) disimpan di **Cloudinary**.
2. **Data yang Disimpan di Database:**
   - `*_url` (`VARCHAR(500)`): URL HTTPS CDN Cloudinary yang siap di-render di frontend (`f_auto,q_auto`).
   - `*_public_id` (`VARCHAR(300)`): Identifier unik aset di Cloudinary.
3. **Fungsi `public_id`:**
   - Memungkinkan Laravel / Filament untuk menghapus (_destroy_) atau me-replace file lama di Cloudinary saat admin mengupdate atau menghapus data, sehingga mencegah penumpukan file sampah (_orphaned storage_).

---

## 3. Aturan Taksonomi & Relasi Divisi Terpadu

1. **Unifikasi Taksonomi (`categories`):**
   - Menggabungkan konsep `categories` dan `tags` ke dalam satu tabel terpusat `categories`.
   - `categories.type` menentukan cakupan (`post`, `event`, `gallery`, `general`).
2. **Relasi Opsional `divisions`:**
   - Seluruh konten publik (`posts`, `events`, `galleries`, `members`) memiliki foreign key opsional `division_id` (`SMALLINT`, `NULLABLE`, `ON DELETE SET NULL`).
   - Konten umum yang diselenggarakan oleh pengurus harian/organisasi diset `division_id = NULL`.

---

## 4. Mekanisme Otomasi Backend (Laravel Trait & Observer)

Untuk menjaga konsistensi tanpa harus mengisi manual di setiap Controller/Filament Resource, backend menggunakan Trait `HasAuditColumns`:

```php
namespace App\Models\Traits;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

trait HasAuditColumns
{
    public static function bootHasAuditColumns(): void
    {
        static::creating(function ($model) {
            if (Auth::check() && empty($model->created_by)) {
                $model->created_by = Auth::id();
            }
            if (Auth::check() && empty($model->updated_by)) {
                $model->updated_by = Auth::id();
            }
        });

        static::updating(function ($model) {
            if (Auth::check()) {
                $model->updated_by = Auth::id();
            }
        });
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
```

---

## 5. Standar Naming & Konvensi Kolom

1. **Primary Key:** `id` bertipe `BIGINT GENERATED ALWAYS AS IDENTITY` (atau `SMALLINT` untuk tabel singleton/divisi).
2. **Foreign Keys:** Menggunakan format `singular_table_id` (e.g. `division_id`, `category_id`, `event_id`).
3. **Boolean Flags:** Selalu berawalan `is_` atau `has_` (e.g. `is_active`, `is_published`, `is_featured`, `is_read`, `requires_payment`).
4. **Timezone:** Selalu menggunakan `TIMESTAMPTZ` (_timestamp with time zone_) untuk memastikan konsistensi UTC.
5. **Soft Deletes:** Tabel konten utama (`posts`, `members`, `galleries`, `gallery_items`) menambahkan `deleted_at TIMESTAMPTZ NULLABLE` via `SoftDeletes` trait.
