<!-- AGENTS-GENERATED-START -->
# AGENTS.md — KPA EMC² Web Portal

> **Project:** Portal Resmi KPA EMC² (Eksplorasi Mahasiswa Cinta Alam²)
> **Generated:** 2026-08-29 · **Mode:** Full
> Full rule files are in `.agents/rules/`.

---

## Package Managers

- **PHP deps:** `composer` — lockfile: `composer.lock`
- **JS deps:** `npm` — lockfile: `package-lock.json`

---

## Setup

```bash
# First-time setup
composer install
cp .env.example .env          # then fill in DB credentials
php artisan key:generate
php artisan migrate
php artisan db:seed
npm install
npm run build
```

> ⚠️ `APP_NAME` must be quoted in `.env`: `APP_NAME="KPA EMC² Website"`
> ⚠️ PostgreSQL runs on port **5433** (non-default). Set `DB_PORT=5433`.

---

## Development Servers

```bash
# Run both together:
php artisan serve              # Laravel backend → http://localhost:8000
npm run dev                    # Vite frontend → hot-reload

# Or use the built-in concurrent runner:
composer dev                   # runs php artisan dev (uses pail + vite concurrently)
```

---

## Verification Cycle

Run this sequence before every commit:

```bash
php artisan test                    # 1. All tests must pass
npx tsc --noEmit                    # 2. TypeScript type check
npm run lint                        # 3. ESLint (resources/js)
npm run format:check                # 4. Prettier format check
```

All four must pass with **zero errors** before a commit is made.

---

## Testing

```bash
php artisan test                          # All tests
php artisan test tests/Unit/              # Unit tests only
php artisan test tests/Feature/           # Feature/integration tests only
php artisan test --filter=PostTest        # Filter by class name
php artisan test --coverage               # Coverage report (requires Xdebug/PCOV)
composer test                             # Alias: clears config cache then runs tests
```

**Rules:**
- Unit tests are **mandatory** for every new class, method, or non-trivial logic.
- Feature/integration tests are **mandatory** for cross-layer flows (Route → Controller → Model → DB).
- Use **PHPUnit** (v12) — project currently uses PHPUnit, migrate to Pest if introduced.
- Test naming: `it_sets_created_by_when_model_is_created()` or Pest `it('...')` style.

See `.agents/rules/testing.md` for full details.

---

## Available Scripts

### Composer (PHP)

| Command | What it does |
|---|---|
| `composer install` | Install PHP dependencies |
| `composer dev` | Start dev server (Laravel + Vite concurrently) |
| `composer test` | Clear config cache + run all tests |
| `composer setup` | Full first-time project setup |

### npm (JS/Frontend)

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server with hot-reload |
| `npm run build` | TypeScript compile + Vite build (web + SSR) |
| `npm run lint` | ESLint on `resources/js` |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run format` | Prettier format all JS/TS/CSS/JSON in `resources/` |
| `npm run format:check` | Prettier check (no write) |

### Artisan (Laravel CLI)

| Command | What it does |
|---|---|
| `php artisan migrate` | Run pending migrations |
| `php artisan migrate:fresh --seed` | Drop all tables, re-migrate, re-seed |
| `php artisan migrate:status` | Show migration run status |
| `php artisan db:seed` | Run all seeders |
| `php artisan db:show` | Show DB info & table list |
| `php artisan route:list` | List all registered routes |
| `php artisan optimize:clear` | Clear all caches |
| `php artisan make:model Nama -mfsc` | Model + migration + factory + seeder + controller |
| `php artisan make:filament-resource Nama --generate` | Filament Resource with auto-generated form/table |

---

## Architecture

See `.agents/rules/architecture.md` for the full directory map.

**Key layers:**

```
Laravel Backend  →  Eloquent Models  →  PostgreSQL 18+ (port 5433)
     ↓
Filament v3 Admin Panel (/admin)    →  Role-based (superadmin/editor/committee)
     ↓
Inertia.js Adapter
     ↓
React 19 + TypeScript 5 SPA (SSR via resources/js/ssr.tsx)
     ↓
Tailwind CSS v3 + Headless UI v2 + Lucide React
```

---

## Hard Constraints — Never Break

1. **Zero-BLOB:** No binary/file stored in the database. Only Cloudinary URLs (`*_url VARCHAR(500)`) and public IDs (`*_public_id VARCHAR(300)`).
2. **No edited migrations:** Never modify a migration file that is already `Ran`. Create a new migration.
3. **Audit columns on every table:** `is_active`, `created_by`, `updated_by`, `created_at`, `updated_at`.
4. **`HasAuditColumns` trait:** Every model must use `app/Models/Traits/HasAuditColumns.php`.
5. **No inline CSS:** Tailwind utility classes only.
6. **No `any` in TypeScript** without an inline comment explaining why.
7. **No `DB::raw()`** without a documented justification in a comment.
8. **PostgreSQL JSONB constraints:** `posts.tags` and `events.tags` have DB-level `CHECK (jsonb_typeof(tags) = 'array')` — always pass arrays.
9. **`APP_NAME` must be quoted** in `.env`: `APP_NAME="KPA EMC² Website"`.

---

## Key Conventions

- **Database first:** Schema changes always start with a migration.
- **MockData first (Frontend):** Always create and test typed MockData (`resources/js/mocks/{feature}Mock.ts`) before connecting components to the backend controller/database.
- **Migration naming:** `YYYYMMDD_XXXX_action_table_name.php`
- **PHP naming:** `PascalCase` models/controllers, `PascalCaseService`, `ActionModelRequest`
- **React naming:** `PascalCase.tsx` pages/components, `camelCase.ts` hooks/types
- **Props:** Use `interface`, not `type` for React component props
- **Inertia data flow:** Controller → Inertia props → React page (no raw AJAX fetch)
- **SEO:** `<Head>` with title, description, and OG tags on every React page
- **Cloudinary images:** Always include `f_auto,q_auto` transformation

See `.agents/rules/git-workflow.md` for commit format.

---

## Domain Context

- **Organization:** KPA EMC² — Indonesian outdoor/nature student organization
- **Divisions:** Kaderisasi · SKLH · Litbang · Karata (4 operational divisions)
- **Leadership:** Ketua · Sekretaris (+ Staff Ahli Arsip Data & RT) · Bendahara
- ⚠️ No "Umum" suffix on leadership titles. "Ketua" not "Ketua Umum".

---

## Rule Files

| File | Content |
|---|---|
| `.agents/rules/architecture.md` | Full directory map, models, migrations |
| `.agents/rules/database.md` | DB rules, JSONB, audit columns, migration conventions |
| `.agents/rules/frontend-patterns.md` | React/Inertia/TypeScript patterns |
| `.agents/rules/styling.md` | Tailwind, Headless UI, design system |
| `.agents/rules/testing.md` | PHPUnit/Pest conventions, coverage targets |
| `.agents/rules/git-workflow.md` | Branch strategy, Conventional Commits |
| `.agents/rules/backend.md` | Laravel, Filament, Eloquent, Services |
| `.agents/rules/dependencies.md` | PHP & Node package inventory, audit protocols, `dependency-inspector` subagent |

---

## Documentation

| Doc | Path |
|---|---|
| PRD | `docs/PRD_Company_Profile_KPA_EMC2.md` |
| Planning Rules | `docs/planning/planning_rules.md` |
| DB Schema | `docs/database/db_tables.md` |
| DB Detail | `docs/database/db_table_details.md` |
| DB Relations | `docs/database/db_relations.md` |
| DB Rules | `docs/database/db_rules.md` |
| Migration Manifest | `docs/migrations/migration_manifest.md` |
| Migration Runbook | `docs/migrations/migration_rules.md` |
| Sprint Docs | `docs/planning/{YY}.{NO}/` |
| Gemini Context | `.gemini/PROMPT.md` |
| Cursor Context | `.cursor/PROMPT.md` |
<!-- AGENTS-GENERATED-END -->
