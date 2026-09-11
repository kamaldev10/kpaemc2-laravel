# Tasks — Sprint 26.02 (Admin Dashboard)

> Layer: BE = Laravel Backend · FE = React/Inertia Frontend · TEST = Pest/PHPUnit · DEV = DevOps/CI

---

## 1. Core Foundations & Auth

| #   | Task                                                                  | Layer | Status |
| --- | --------------------------------------------------------------------- | ----- | ------ |
| 1.1 | Add `EnsureAdmin` middleware (role hierarchy check)                   | BE    | ✅     |
| 1.2 | Standardize roles to `RoleTypeEnum` & database migration              | BE    | ✅     |
| 1.3 | Disable public registration & configure login redirection to `/admin` | BE    | ✅     |
| 1.4 | Setup unit & feature tests for role hierarchy and admin access        | TEST  | ✅     |
| 1.5 | Register admin route group in `routes/web.php` & `routes/api.php`     | BE    | ✅     |

---

## 2. Admin Layout & UI Foundation (Sidebar, Navbar, Breadcrumbs)

| #   | Task                                                                                | Layer | Status |
| --- | ----------------------------------------------------------------------------------- | ----- | ------ |
| 2.1 | TypeScript interface definitions for admin navigation & breadcrumbs (`admin.d.ts`)  | FE    | ✅     |
| 2.2 | Create `AdminSidebar` component (collapsible desktop/mobile drawer, role filtering) | FE    | ✅     |
| 2.3 | Create `AdminBreadcrumbs` component (dynamic route hierarchy indicator)             | FE    | ✅     |
| 2.4 | Create `AdminUserDropdown` component (profile info, role badge, logout via POST)    | FE    | ✅     |
| 2.5 | Create `AdminNavbar` component (hamburger toggle, breadcrumbs, user dropdown)       | FE    | ✅     |
| 2.6 | Create `AdminLayout` master wrapper component (`resources/js/Layouts/AdminLayout`)  | FE    | ✅     |
| 2.7 | Integrate `AdminLayout` with `Admin/Dashboard.tsx` and verify responsive UI         | FE    | ✅     |

---

## 3. Admin CRUD – Articles & Posts

| #   | Task                                                                           | Layer | Status |
| --- | ------------------------------------------------------------------------------ | ----- | ------ |
| 3.1 | `PostController` & `ArticleController` (Admin resource endpoints)              | BE    | ✅     |
| 3.2 | `StorePostRequest` & `UpdatePostRequest` (Form validation & slug generation)   | BE    | ✅     |
| 3.3 | `PostService` (Business logic, transactions, cache tags invalidation)          | BE    | ✅     |
| 3.4 | `PostResource` (API & Inertia clean JSON formatting)                           | BE    | ✅     |
| 3.5 | Post Policy authorization (`SUPER_ADMIN`, `ADMIN`, `EDITOR` own-content rules) | BE    | ✅     |
| 3.6 | Frontend Post List, Create, and Edit forms with Rich Text Editor               | FE    | ✅     |
| 3.7 | Feature & Unit tests for Post CRUD endpoints and service caching               | TEST  | ✅     |

---

## 4. Admin CRUD – Members (Kepengurusan & Anggota)

| #   | Task                                                                    | Layer | Status |
| --- | ----------------------------------------------------------------------- | ----- | ------ |
| 4.1 | `MemberController` (Admin resource endpoints)                           | BE    | ✅     |
| 4.2 | `StoreMemberRequest` & `UpdateMemberRequest`                            | BE    | ✅     |
| 4.3 | `MemberService` (caching, Cloudinary avatar upload)                     | BE    | ✅     |
| 4.4 | `MemberResource`                                                        | BE    | ✅     |
| 4.5 | Policy rules in `MemberPolicy`                                          | BE    | ✅     |
| 4.6 | Frontend Member Table & Form modal/page                                 | FE    | ✅     |
| 4.7 | Feature tests `MemberCrudTest.php` & unit tests `MemberServiceTest.php` | TEST  | ✅     |

---

## 5. Admin CRUD – Events (Kegiatan & Agenda)

| #   | Task                                                                  | Layer | Status |
| --- | --------------------------------------------------------------------- | ----- | ------ |
| 5.1 | `EventController` (Admin resource endpoints)                          | BE    | ⏳     |
| 5.2 | `StoreEventRequest` & `UpdateEventRequest`                            | BE    | ⏳     |
| 5.3 | `EventService` (caching, date validation, participant list)           | BE    | ⏳     |
| 5.4 | `EventResource`                                                       | BE    | ⏳     |
| 5.5 | Policy rules in `DashboardPolicy`                                     | BE    | ⏳     |
| 5.6 | Frontend Event Management & Registration export                       | FE    | ⏳     |
| 5.7 | Feature tests `EventCrudTest.php` & unit tests `EventServiceTest.php` | TEST  | ⏳     |

---

## 6. Supporting Infrastructure & Performance

| #   | Task                                                                   | Layer | Status |
| --- | ---------------------------------------------------------------------- | ----- | ------ |
| 6.1 | Queue job `ProcessMediaUpload` for background image optimization       | BE    | ⏳     |
| 6.2 | Redis Cache tags implementation for fast list queries & cache flushing | BE    | ⏳     |
| 6.3 | CI/CD pipeline (GitHub Actions) – lint, test, build verification       | DEV   | ⏳     |

---

**Legend Status:**

- `✅` = Selesai (Completed & Verified)
- `🔄` = Sedang Dikerjakan (In Progress)
- `⏳` = Direncanakan (Planned)
