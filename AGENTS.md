# AGENTS.md — KPA EMC² Web Portal

> **Project:** Portal Resmi KPA EMC² (Eksplorasi Mahasiswa Cinta Alam²)
> **Architecture:** Laravel 13 + React 19 + Inertia.js v2 + PostgreSQL 18+ on port 5433

---

## ⚠️ MANDATORY FIRST ACTION: READ PROJECT MEMORY

Before executing any agent tasks, inspect the memory documents in `docs/memory/`:
- [`docs/memory/overview.md`](./docs/memory/overview.md) — System architecture, domain models, directory map
- [`docs/memory/progress.md`](./docs/memory/progress.md) — Active sprint tracker and completed features
- [`docs/memory/decisions.md`](./docs/memory/decisions.md) — Architectural decision records (ADRs)
- [`docs/memory/gotchas.md`](./docs/memory/gotchas.md) — Critical gotchas, quirks, and pitfalls
- [`docs/memory/rules.md`](./docs/memory/rules.md) — Hard constraints and guardrails
- [`docs/memory/conventions.md`](./docs/memory/conventions.md) — Naming conventions and code standards

Detailed rule files are located in `.agents/rules/`.

---

## Environment & Commands

- **PostgreSQL Port:** `5433` (non-default: `DB_PORT=5433`)
- **Verification Cycle:**
  ```bash
  php artisan test                    # 1. Test suite (must be 100% passing)
  npm run build                       # 2. TypeScript and Vite build check
  ```
- **Git Strategy:** Work on branch `master`. Create feature-separated atomic commits using Conventional Commits.
