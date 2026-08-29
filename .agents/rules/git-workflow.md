# Git Workflow — KPA EMC² Web Portal

## Branch Strategy

```
main              ← Production-ready code only. Protected.
develop           ← Integration branch. Default working branch.
feature/{slug}    ← New features (branched from develop)
fix/{slug}        ← Bug fixes (branched from develop or main)
chore/{slug}      ← Maintenance, dependency updates, docs
```

**Branch naming examples:**

```
feature/cloudinary-service
feature/filament-post-resource
feature/public-home-page
fix/audit-columns-boot-order
chore/update-planning-docs
docs/sprint-26-02-planning
```

---

## Commit Message Format (Conventional Commits)

```
{type}({scope}): {short description}

[optional body]

[optional footer]
```

### Types

| Type       | When to Use                                          |
| ---------- | ---------------------------------------------------- |
| `feat`     | New feature or user-visible functionality            |
| `fix`      | Bug fix                                              |
| `docs`     | Documentation only (code comments, markdown)         |
| `style`    | Formatting, no logic change (whitespace, semicolons) |
| `refactor` | Code restructuring, no feature/fix                   |
| `test`     | Add or update tests                                  |
| `chore`    | Build process, dependency update, maintenance        |
| `perf`     | Performance improvement                              |

### Scopes

```
db          → database migrations, schema changes
model       → Eloquent models, traits
filament    → Filament Resources, Widgets, Panels
ui          → React components, pages, hooks
auth        → Authentication, authorization
seeder      → Database seeders
migration   → Migration files
cloudinary  → Cloudinary service and upload logic
test        → Test files
api         → API routes/controllers (if any)
config      → Config files
docs        → Documentation files
```

### Examples

```bash
feat(filament): add PostResource with RichEditor and Cloudinary upload
fix(model): fix HasAuditColumns boot order failing on unauthenticated create
feat(ui): implement HeroSection with Cloudinary background image
feat(db): add slug column to members table
test(model): add unit tests for Post scopes and JSONB tag casting
docs(planning): add sprint 26.02 planning documents
chore: update composer dependencies
refactor(cloudinary): extract URL builder to separate method
feat(filament): add Excel export action to RegistrationResource
```

---

## Verification Before Commit

Run all four before every commit:

```bash
php artisan test             # 1. All PHP tests must pass (zero failures)
npx tsc --noEmit             # 2. TypeScript type check (zero errors)
npm run lint                 # 3. ESLint (zero errors)
npm run format:check         # 4. Prettier format check (zero diffs)
```

If any fail → fix before committing. Do not commit with `--no-verify`.

---

## Commit Hygiene

- **Atomic commits:** One logical change per commit.
- **No commented-out code** in commits — delete it or use a TODO comment with issue reference.
- **No debug statements** — `dd()`, `var_dump()`, `console.log()` must not appear in commits.
- **No secrets** — never commit `.env` values, API keys, or credentials.
- `.env` is in `.gitignore`. Only `.env.example` (with placeholder values) is committed.

---

## Pull Request / Merge Rules

- Feature branches merge into `develop` via PR.
- `develop` merges into `main` only after sprint review and QA sign-off.
- PR title follows Conventional Commits format.
- PR must include:
  - What changed and why
  - How to test (manual steps if needed)
  - Link to sprint task

---

## Tagging

Sprint releases are tagged when merged to `main`:

```
v26.01   ← end of Sprint 26.01
v26.02   ← end of Sprint 26.02
```
