# Architecture Rules — KPA EMC² Web Portal

## Technology Versions (Pinned)

| Layer         | Technology           | Version       |
| ------------- | -------------------- | ------------- |
| Backend       | Laravel              | 13.x          |
| Language      | PHP                  | 8.5           |
| Database      | PostgreSQL           | 18.6 (Ubuntu) |
| Admin Panel   | Filament PHP         | 3.3.x         |
| Frontend      | React                | 19.x          |
| SSR Adapter   | Inertia.js (Laravel) | 2.0.x         |
| Routing (JS)  | Ziggy                | 2.x           |
| Build Tool    | Vite                 | 8.x           |
| Language      | TypeScript           | 5.x           |
| Styling       | Tailwind CSS         | 3.x           |
| Accessible UI | Headless UI          | 2.x           |
| Icons         | Lucide React         | 1.x           |
| Testing       | PHPUnit              | 12.x          |
| Media CDN     | Cloudinary           | REST API      |

---

## Full Directory Map

```
kpa-emc2-web/
│
├── AGENTS.md                      ← AI agent context (this file's root)
├── GEMINI.md                      ← Gemini-specific AI context
├── .gemini/PROMPT.md              ← Gemini CLI system prompt
├── .cursor/PROMPT.md              ← Cursor IDE system prompt
├── .agents/rules/                 ← Detailed rule files (this directory)
│
├── artisan                        ← Laravel CLI entry point
├── composer.json                  ← PHP dependency manifest
├── package.json                   ← JS dependency manifest
├── vite.config.js                 ← Vite config (input: app.tsx, ssr: ssr.tsx)
├── tailwind.config.js             ← Tailwind v3 config
├── tsconfig.json                  ← TypeScript compiler config
├── phpunit.xml                    ← PHPUnit test suite config
├── eslint.config.js               ← ESLint flat config
│
├── app/
│   ├── Filament/
│   │   ├── Resources/             ← Filament CRUD Resources (TO BE CREATED in Sprint 1)
│   │   └── Widgets/               ← Dashboard widgets (TO BE CREATED)
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/              ← Auth controllers (Breeze-generated)
│   │   │   ├── Public/            ← Public route controllers (TO BE CREATED in Sprint 2+)
│   │   │   └── ProfileController.php
│   │   └── Requests/              ← Form Request Validation (TO BE CREATED)
│   ├── Models/
│   │   ├── Traits/
│   │   │   └── HasAuditColumns.php  ← Audit trait (MUST USE on all models)
│   │   ├── User.php               ← roles: superadmin/editor/committee
│   │   ├── Division.php
│   │   ├── Category.php
│   │   ├── AboutInfo.php          ← Singleton (id=1)
│   │   ├── Member.php             ← SoftDeletes
│   │   ├── Post.php               ← tags JSONB
│   │   ├── Gallery.php            ← SoftDeletes
│   │   ├── GalleryItem.php        ← CASCADE on gallery delete
│   │   ├── Event.php              ← form_fields JSONB, tags JSONB
│   │   ├── Registration.php       ← CASCADE on event delete
│   │   ├── Contact.php            ← ip_address INET
│   │   └── SiteSetting.php        ← static helper SiteSetting::get('key')
│   └── Services/                  ← Business logic (TO BE CREATED: CloudinaryService)
│
├── database/
│   ├── migrations/                ← 15 migrations (all Ran, batch 1)
│   │   └── 20260823_0001_*.php ... 20260823_0015_*.php
│   ├── seeders/                   ← 11 seeders + DatabaseSeeder orchestrator
│   └── factories/                 ← 12 factories (all models except User has states)
│
├── resources/
│   ├── js/
│   │   ├── app.tsx                ← Inertia SPA entry point
│   │   ├── ssr.tsx                ← SSR entry point
│   │   ├── bootstrap.ts           ← Axios + Ziggy setup
│   │   ├── Pages/
│   │   │   ├── Auth/              ← Login, Register, ForgotPassword (Breeze)
│   │   │   ├── Dashboard.tsx      ← Default auth dashboard
│   │   │   ├── Profile/           ← Profile pages (Breeze)
│   │   │   └── Public/            ← TO BE CREATED (Sprint 2+)
│   │   │       ├── Home.tsx
│   │   │       ├── About.tsx
│   │   │       ├── Divisions/
│   │   │       ├── Posts/
│   │   │       ├── Galleries/
│   │   │       ├── Events/
│   │   │       └── Contact.tsx
│   │   ├── Components/
│   │   │   ├── Public/            ← TO BE CREATED (Sprint 1-2)
│   │   │   │   ├── Layout/        ← Navbar, Footer, PublicLayout
│   │   │   │   ├── Cards/         ← PostCard, EventCard, MemberCard, GalleryCard
│   │   │   │   ├── Sections/      ← HeroSection, StatsBar, HighlightsSection
│   │   │   │   └── UI/            ← Button, Badge, Modal, Lightbox, Skeleton
│   │   │   └── (existing Breeze components)
│   │   ├── hooks/                 ← Custom React hooks (TO BE CREATED)
│   │   └── types/                 ← TypeScript interfaces (TO BE CREATED)
│   └── views/
│       └── app.blade.php          ← Inertia root template
│
├── routes/
│   ├── web.php                    ← Web routes (auth + public)
│   ├── auth.php                   ← Breeze auth routes
│   └── console.php                ← Artisan schedule/commands
│
└── tests/
    ├── Unit/                      ← Unit tests (mirrors app/ structure)
    │   └── ExampleTest.php        ← Placeholder only
    └── Feature/                   ← Integration/feature tests
        ├── Auth/
        ├── ExampleTest.php
        └── ProfileTest.php
```

---

## Data Flow

```
HTTP Request
    │
    ▼
routes/web.php
    │
    ▼
Controller (app/Http/Controllers/Public/)
    │  uses Form Request validation
    ▼
Eloquent Model + HasAuditColumns Trait
    │  queries PostgreSQL 18+ (port 5433)
    ▼
Inertia::render('Public/PageName', $props)
    │
    ▼
React Page (resources/js/Pages/Public/*.tsx)
    │  receives typed props via Inertia
    ▼
React Components + Tailwind CSS
    │
    ▼
Browser (SSR hydration via ssr.tsx)
```

## Admin Flow

```
/admin (Filament Panel)
    │
    ▼
AdminPanelProvider (TO BE CREATED in Sprint 1)
    │  role-based access: superadmin > editor > committee
    ▼
Filament Resources (app/Filament/Resources/)
    │  uses CloudinaryService for file uploads
    ▼
Eloquent Models → PostgreSQL
```

---

## 15 Database Tables (dependency order)

```
users
  └─ cache, cache_locks
  └─ jobs, job_batches, failed_jobs
  └─ divisions  (SMALLINT PK, 4 rows)
  └─ categories (type: post/event/gallery/general)
  └─ about_infos (singleton id=1)
  └─ members    (SoftDeletes, FK → divisions, users)
  └─ posts      (tags JSONB+CHECK+GIN, FK → categories, users)
  └─ galleries  (SoftDeletes, FK → categories, users)
      └─ gallery_items (Cloudinary, CASCADE on gallery delete)
  └─ events     (form_fields JSONB, tags JSONB+CHECK+GIN, FK → categories, users)
      └─ registrations (CASCADE on event delete)
  └─ contacts   (ip_address INET)
  └─ site_settings (key-value config)
  └─ [pg_trgm extension + GIN + partial indexes]
```

---

## Model Relationships Summary

| Model          | Key Relationships                                              |
| -------------- | -------------------------------------------------------------- |
| `User`         | hasMany Posts, Events, Galleries, Members (as creator/updater) |
| `Division`     | hasMany Members                                                |
| `Category`     | hasMany Posts, Events, Galleries                               |
| `Member`       | belongsTo Division, User (created_by)                          |
| `Post`         | belongsTo Category, User (created_by/updated_by)               |
| `Gallery`      | hasMany GalleryItems; belongsTo Category                       |
| `GalleryItem`  | belongsTo Gallery                                              |
| `Event`        | hasMany Registrations; belongsTo Category                      |
| `Registration` | belongsTo Event                                                |
| `AboutInfo`    | singleton (id=1), no FK                                        |
| `Contact`      | no FK                                                          |
| `SiteSetting`  | no FK; static helper `::get('key')`                            |
