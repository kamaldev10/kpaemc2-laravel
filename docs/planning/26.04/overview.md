# Sprint 26.04 — Mock Decommissioning & Database Optimization

| Field      | Value                                                                            |
| ---------- | -------------------------------------------------------------------------------- |
| **Sprint** | 26.04                                                                            |
| **Nama**   | Mock Decommissioning, Zero-Mock Production Binding & Database Query Optimization |
| **Status** | `ready`                                                                          |
| **PIC**    | Full-stack & Database Optimizer                                                  |
| **Target** | 100% Real DB Binding, 0 Mock Data, N+1 Query Elimination, Sub-50ms Query Latency |

---

## 1. Latar Belakang & Tujuan

Setelah Sprint 26.01, 26.02, dan 26.03 selesai (Core Portal, Admin CMS, CRUD Modul, Galeri, Settings, SEO, dan Inbox), aplikasi masih memiliki artefak mock data frontend (`resources/js/mocks/`) yang sebelumnya dipakai saat fase prototyping awal.

Tujuan utama Sprint 26.04 adalah:

1. **Total Mock Decommissioning**: Menghapus seluruh folder `resources/js/mocks/` dan utilitas `resolveData`/`useIsMockDataEnabled`, lalu memastikan semua halaman publik dan komponen UI 100% bersumber langsung dari database PostgreSQL.
2. **Database Query Profiling & Optimization**: Mengaudit seluruh query controller (Public & Admin), mengeliminasi N+1 problem dengan selective eager loading, serta mengoptimalkan kolom `SELECT`.
3. **Advanced Indexing Strategy (PostgreSQL)**: Menambahkan indeks komposit dan indeks trigram (`pg_trgm` GIN/GiST) pada kolom pencarian teks (`title`, `slug`, `full_name`, `description`).
4. **Multi-tier Caching Architecture**: Memastikan cache layer (`SiteSettings`, `AboutInfo`, `Categories`, `Divisions`) bekerja efisien dengan automatic invalidation saat update/delete.
5. **Query Count Performance Testing**: Menambahkan automated test assertion untuk query count ceiling pada halaman kritis guna mencegah regresi N+1 di masa depan.
