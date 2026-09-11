# Gotchas & Quirks — KPA EMC² Web Portal

> Daftar jebakan, quirks, batasan teknis, dan bug historis yang sudah diatasi.
> Baca file ini agar tidak mengulangi kesalahan yang sama.

---

## 1. PostgreSQL Database Port 5433
- **Gotcha:** PostgreSQL di server/lingkungan pengembangan proyek ini berjalan di port non-standar: **`5433`** (bukan 5432).
- **Penanganan:** Pastikan konfigurasi `.env` dan `phpunit.xml` menggunakan `DB_PORT=5433`. Jangan pernah mengganti port ini menjadi 5432.

---

## 2. Kolom `posts.excerpt` Memiliki Not-Null Constraint
- **Gotcha:** Skema awal tabel `posts` mendefinisikan `$table->text('excerpt');` tanpa `nullable()`. Menjalankan `Post::create()` tanpa menyertakan `excerpt` akan memicu error fatal `SQLSTATE[23502]: Not null violation`.
- **Penanganan:** `PostService::create` dan `StorePostRequest` wajib memiliki fallback otomatis:
  ```php
  if (empty($data['excerpt'])) {
      $stripped = strip_tags((string) ($data['content'] ?? ''));
      $data['excerpt'] = Str::limit($stripped, 160) ?: Str::limit($data['title'] ?? '', 100);
  }
  ```

---

## 3. Unggah File Gambar pada Form Inertia dengan Method PUT/PATCH
- **Gotcha:** Protokol HTTP browser dan PHP tidak dapat mem-parsing payload `multipart/form-data` dengan benar pada HTTP verb `PUT` atau `PATCH`. Mengirim file gambar via `form.put()` akan menyebabkan `$request->file('cover_image')` bernilai `null`.
- **Penanganan:** Gunakan method spoofing bawaan Laravel di sisi React Inertia:
  ```tsx
  if (form.data.cover_image) {
      router.post(`/admin/posts/${post.id}`, {
          _method: 'PUT',
          ...form.data,
      });
  } else {
      form.put(`/admin/posts/${post.id}`);
  }
  ```

---

## 4. `Post::scopeSearch` Menggunakan PostgreSQL-Specific Syntax
- **Gotcha:** Method pencarian `scopeSearch` di `Post.php` memanfaatkan `ILIKE` dan casting jsonb PostgreSQL:
  ```php
  $q->where('title', 'ILIKE', "%{$term}%")
    ->orWhereRaw("tags::text ILIKE ?", ["%{$term}%"]);
  ```
- **Catatan Testing:** Test environment menggunakan PostgreSQL asli (`kpa_emc2_testing_db`), bukan SQLite in-memory, sehingga operator `ILIKE` dan operator JSONB `::text` selalu valid.

---

## 5. Mock Data Mode pada Public Pages
- **Gotcha:** Environment variable `USE_MOCK_DATA` di `.env` menentukan apakah halaman publik menampilkan data dari mock TypeScript (`resources/js/mocks/`) atau dari database.
- **Penanganan:** Komponen publik harus siap menerima props kosong atau null dengan fallback ke mock data yang telah disediakan.

---

## 6. Inertia TypeScript Generics pada `useForm`
- **Gotcha:** Memanggil `useForm({ ... })` tanpa generic type dapat menyebabkan TypeScript meng-infer type properti menjadi `never` jika nilai inisialisasinya nullable atau gabungan ternary.
- **Penanganan:** Selalu definisikan interface formData spesifik, misal:
  ```tsx
  interface PostFormData { ... }
  const form = useForm<PostFormData>({ ... });
  ```
