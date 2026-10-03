# Tasks — Sprint 26.03 (CMS Completion, SEO & Public Polish)

> Layer: BE = Laravel Backend · FE = React/Inertia Frontend · TEST = Pest/PHPUnit · DEV = DevOps/CI

---

## 1. Admin CRUD – Categories & Taxonomies

| #   | Task                                                                     | Layer | Status |
| --- | ------------------------------------------------------------------------ | ----- | ------ |
| 1.1 | `CategoryController` (Admin resource endpoints)                          | BE    | ✅     |
| 1.2 | `StoreCategoryRequest` & `UpdateCategoryRequest`                         | BE    | ✅     |
| 1.3 | `CategoryService` (caching, slug generator, type validation)             | BE    | ✅     |
| 1.4 | `CategoryResource`                                                       | BE    | ✅     |
| 1.5 | `CategoryPolicy`                                                         | BE    | ✅     |
| 1.6 | Frontend Category List & Create/Edit Modal                               | FE    | ✅     |
| 1.7 | Unit & Feature tests (`CategoryCrudTest.php`, `CategoryServiceTest.php`) | TEST  | ✅     |

---

## 2. Admin Media Galleries & Albums

| #   | Task                                                                   | Layer | Status |
| --- | ---------------------------------------------------------------------- | ----- | ------ |
| 2.1 | `GalleryController` (Admin resource endpoints)                         | BE    | ✅     |
| 2.2 | `StoreGalleryRequest` & `UpdateGalleryRequest`                         | BE    | ✅     |
| 2.3 | `GalleryService` (multi-file Cloudinary upload, albums management)     | BE    | ✅     |
| 2.4 | `GalleryResource`                                                      | BE    | ✅     |
| 2.5 | `GalleryPolicy`                                                        | BE    | ✅     |
| 2.6 | Frontend Gallery Management & Photo Uploader                           | FE    | ✅     |
| 2.7 | Unit & Feature tests (`GalleryCrudTest.php`, `GalleryServiceTest.php`) | TEST  | ✅     |

---

## 3. Admin Site Settings & About Info

| #   | Task                                                               | Layer | Status |
| --- | ------------------------------------------------------------------ | ----- | ------ |
| 3.1 | `SettingController` & `AboutInfoController` (Admin endpoints)      | BE    | ✅     |
| 3.2 | `UpdateSettingsRequest` & `UpdateAboutInfoRequest`                 | BE    | ✅     |
| 3.3 | `SettingService` & `AboutInfoService` (key-value storage, caching) | BE    | ✅     |
| 3.4 | Frontend Settings & Organization Profile Edit Page                 | FE    | ✅     |
| 3.5 | Unit & Feature tests (`SettingCrudTest.php`, `SettingServiceTest`) | TEST  | ✅     |

---

## 4. Admin Inbox – Contact Inquiries

| #   | Task                                                    | Layer | Status |
| --- | ------------------------------------------------------- | ----- | ------ |
| 4.1 | `ContactController` (Admin inbox & status updates)      | BE    | ✅     |
| 4.2 | `ContactService` (filtering, mark as read, soft delete) | BE    | ✅     |
| 4.3 | `ContactResource`                                       | BE    | ✅     |
| 4.4 | Frontend Contact Inbox Page                             | FE    | ✅     |
| 4.5 | Feature tests `ContactCrudTest.php`, `ContactServiceTest`| TEST  | ✅     |

---

## 5. SEO, Sitemap, RSS Feed & Analytics

| #   | Task                                                     | Layer | Status |
| --- | -------------------------------------------------------- | ----- | ------ |
| 5.1 | Dynamic XML Sitemap (`/sitemap.xml`) controller & routes | BE    | ✅     |
| 5.2 | RSS / Atom Feed (`/feed.xml`) for articles               | BE    | ✅     |
| 5.3 | Frontend SEO Meta Tags & Google Site Verification        | FE    | ✅     |
| 5.4 | Google Analytics 4 tracker injection in app.blade        | FE    | ✅     |
| 5.5 | Public Gallery Page (`/gallery`) with lightbox preview   | FE    | ✅     |
| 5.6 | Tests for Sitemap & RSS Feed endpoints (`SitemapAndFeedTest`) | TEST  | ✅     |

---

**Legend Status:**

- `✅` = Selesai
- `🔄` = Sedang Dikerjakan
- `⏳` = Direncanakan
