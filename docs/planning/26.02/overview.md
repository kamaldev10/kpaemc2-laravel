# Sprint 26.02 — Public Portal Enhancements & Scaling

| Field       | Value                           |
| ----------- | ------------------------------- |
| **Sprint**  | 26.02 (Enhancements)            |
| **Nama**    | Public Portal – Admin Dashboard |
| **Status**  | `planned`                       |
| **PIC**     | Full‑stack                      |
| **PRD Ref** | User Stories #8, #9, #10        |

---

## Tujuan Sprint

- **Admin Dashboard** untuk manajemen konten (artikel, postingan, anggota, kegiatan).

---

## Deliverables

| #   | Deliverable                                                                    |
| --- | ------------------------------------------------------------------------------ |
| 1   | Admin Dashboard untuk manajemen konten (artikel, postingan, anggota, kegiatan) |

---

### Detail Admin Dashboard

- **Content Management**: CRUD UI for Articles, Posts, Members, Events.
- **Role‑Based Access**: Admin vs Editor permissions, JWT auth.
- **Rich Text Editor**: Integrasi tiptap / CKEditor dengan image upload to Cloudinary.
- **Media Library**: Upload, replace, delete cover images; fallback placeholders.
- **Search & Filter**: Server‑side pagination, full‑text search on titles/content.
- **Audit Log**: Track create/update/delete actions with timestamps and user.
- **API Endpoints**: `/api/admin/articles`, `/api/admin/posts`, `/api/admin/members`, `/api/admin/events`.
- **Testing**: Feature tests for each CRUD endpoint, UI component tests.
