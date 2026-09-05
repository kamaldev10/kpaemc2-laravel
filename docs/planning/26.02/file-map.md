# File‑Map – Sprint 26.02 (Admin Dashboard)

| File                                               | Purpose                                              | Layer         | Status |
| -------------------------------------------------- | ---------------------------------------------------- | ------------- | ------ |
| `overview.md`                                      | Sprint overview, goals, deliverables                 | Documentation | ✅     |
| `tasks.md`                                         | Detailed task breakdown                              | Documentation | ✅     |
| `file-map.md`                                      | Mapping of all created/modified files                | Documentation | ✅     |
| `dod.md`                                           | Definition of Done & acceptance criteria             | Documentation | ✅     |
| `routes/api.php` (add admin group)                 | Register admin API routes (admin prefix, middleware) | BE            | ✅     |
| `app/Http/Middleware/EnsureAdmin.php`              | Middleware to restrict admin routes to admin role    | BE            | ✅     |
| `app/Http/Controllers/Admin/ArticleController.php` | CRUD for articles (admin)                            | BE            | ✅     |
| `app/Http/Controllers/Admin/PostController.php`    | CRUD for posts (admin)                               | BE            | ✅     |
| `app/Http/Controllers/Admin/MemberController.php`  | CRUD for members (admin)                             | BE            | ✅     |
| `app/Http/Controllers/Admin/EventController.php`   | CRUD for events (admin)                              | BE            | ✅     |
| `app/Http/Requests/Admin/StoreArticleRequest.php`  | Validation for article create                        | BE            | ✅     |
| `app/Http/Requests/Admin/UpdateArticleRequest.php` | Validation for article update                        | BE            | ✅     |
| `app/Http/Requests/Admin/StorePostRequest.php`     | Validation for post create                           | BE            | ✅     |
| `app/Http/Requests/Admin/UpdatePostRequest.php`    | Validation for post update                           | BE            | ✅     |
| `app/Services/Admin/ArticleService.php`            | Business logic, caching, transactions                | BE            | ✅     |
| `app/Services/Admin/PostService.php`               | Business logic, caching, transactions                | BE            | ✅     |
| `app/Services/Admin/MemberService.php`             | Business logic, caching, transactions                | BE            | ✅     |
| `app/Services/Admin/EventService.php`              | Business logic, caching, transactions                | BE            | ✅     |
| `app/Http/Resources/Admin/ArticleResource.php`     | API JSON representation for article                  | BE            | ✅     |
| `app/Http/Resources/Admin/PostResource.php`        | API JSON representation for post                     | BE            | ✅     |
| `app/Policies/Admin/DashboardPolicy.php`           | Authorization rules for admin actions                | BE            | ✅     |
| `app/Jobs/Admin/ProcessMediaUpload.php` (optional) | Queue heavy media processing                         | BE            | ✅     |
| `tests/Feature/Admin/ArticleCrudTest.php`          | Feature tests for article CRUD endpoints             | Testing       | ✅     |
| `tests/Feature/Admin/PostCrudTest.php`             | Feature tests for post CRUD endpoints                | Testing       | ✅     |
| `tests/Feature/Admin/MemberCrudTest.php`           | Feature tests for member CRUD endpoints              | Testing       | ✅     |
| `tests/Feature/Admin/EventCrudTest.php`            | Feature tests for event CRUD endpoints               | Testing       | ✅     |
| `tests/Unit/Services/Admin/ArticleServiceTest.php` | Unit tests for ArticleService logic                  | Testing       | ✅     |
| `tests/Unit/Services/Admin/PostServiceTest.php`    | Unit tests for PostService logic                     | Testing       | ✅     |
| `tests/Unit/Services/Admin/MemberServiceTest.php`  | Unit tests for MemberService logic                   | Testing       | ✅     |
| `tests/Unit/Services/Admin/EventServiceTest.php`   | Unit tests for EventService logic                    | Testing       | ✅     |

All files follow the naming conventions and folder structure defined in **`planning_rules.md`**. The admin dashboard code lives under the `Admin` namespace to keep the public API clean.
