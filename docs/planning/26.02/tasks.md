# Tasks — Sprint 26.02 (Admin Dashboard)

> Layer: BE = Laravel Backend · TEST = Pest/PHPUnit

---

## 1. Core Foundations

| #   | Task                                           | Layer | Status |
| --- | ---------------------------------------------- | ----- | ------ |
| 1.1 | Add `EnsureAdmin` middleware                   | BE    | ✅     |
| 1.2 | Register admin API group in `routes/api.php`   | BE    | ✅     |
| 1.3 | Create `DashboardPolicy` for role‑based checks | BE    | ✅     |
| 1.4 | Set up Redis cache driver                      | BE    | ✅     |

## 2. Admin CRUD – Articles

| #   | Task                                           | Layer | Status |
| --- | ---------------------------------------------- | ----- | ------ |
| 2.1 | `ArticleController` (CRUD)                     | BE    | ✅     |
| 2.2 | `StoreArticleRequest` & `UpdateArticleRequest` | BE    | ✅     |
| 2.3 | `ArticleService` (caching, transactions)       | BE    | ✅     |
| 2.4 | `ArticleResource` (API JSON)                   | BE    | ✅     |
| 2.5 | Policy rules in `DashboardPolicy`              | BE    | ✅     |
| 2.6 | Feature tests `ArticleCrudTest.php`            | TEST  | ✅     |
| 2.7 | Unit tests `ArticleServiceTest.php`            | TEST  | ✅     |

## 3. Admin CRUD – Posts

| #   | Task                                     | Layer | Status |
| --- | ---------------------------------------- | ----- | ------ |
| 3.1 | `PostController` (CRUD)                  | BE    | ✅     |
| 3.2 | `StorePostRequest` & `UpdatePostRequest` | BE    | ✅     |
| 3.3 | `PostService` (caching, transactions)    | BE    | ✅     |
| 3.4 | `PostResource` (API JSON)                | BE    | ✅     |
| 3.5 | Policy rules in `DashboardPolicy`        | BE    | ✅     |
| 3.6 | Feature tests `PostCrudTest.php`         | TEST  | ✅     |
| 3.7 | Unit tests `PostServiceTest.php`         | TEST  | ✅     |

## 4. Admin CRUD – Members

| #   | Task                                         | Layer | Status |
| --- | -------------------------------------------- | ----- | ------ |
| 4.1 | `MemberController` (CRUD)                    | BE    | ✅     |
| 4.2 | `StoreMemberRequest` & `UpdateMemberRequest` | BE    | ✅     |
| 4.3 | `MemberService` (caching, transactions)      | BE    | ✅     |
| 4.4 | `MemberResource` (API JSON)                  | BE    | ✅     |
| 4.5 | Policy rules in `DashboardPolicy`            | BE    | ✅     |
| 4.6 | Feature tests `MemberCrudTest.php`           | TEST  | ✅     |
| 4.7 | Unit tests `MemberServiceTest.php`           | TEST  | ✅     |

## 5. Admin CRUD – Events

| #   | Task                                       | Layer | Status |
| --- | ------------------------------------------ | ----- | ------ |
| 5.1 | `EventController` (CRUD)                   | BE    | ✅     |
| 5.2 | `StoreEventRequest` & `UpdateEventRequest` | BE    | ✅     |
| 5.3 | `EventService` (caching, transactions)     | BE    | ✅     |
| 5.4 | `EventResource` (API JSON)                 | BE    | ✅     |
| 5.5 | Policy rules in `DashboardPolicy`          | BE    | ✅     |
| 5.6 | Feature tests `EventCrudTest.php`          | TEST  | ✅     |
| 5.7 | Unit tests `EventServiceTest.php`          | TEST  | ✅     |

## 6. Supporting Infrastructure

| #   | Task                                                   | Layer | Status |
| --- | ------------------------------------------------------ | ----- | ------ |
| 6.1 | optional `ProcessMediaUpload` job for image processing | BE    | ✅     |
| 6.2 | Cache tags implementation for each entity              | BE    | ✅     |
| 6.3 | CI/CD pipeline (GitHub Actions) – lint, test, build    | DEV   | ✅     |

---

All tasks are **planned** for Sprint 26.02 and will be marked **✅** as they are completed.
