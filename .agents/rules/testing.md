# Testing Rules — KPA EMC² Web Portal

## Framework

- **PHPUnit 12.x** (installed via `phpunit/phpunit` in `require-dev`)
- Pest PHP may be introduced — if `pest.php` exists in project root, use Pest syntax.
- Test runner: `php artisan test` (wraps PHPUnit with Laravel test utilities)
- Config: `phpunit.xml`

---

## Test Suites

```xml
<!-- phpunit.xml -->
<testsuite name="Unit">    → tests/Unit/   </testsuite>
<testsuite name="Feature"> → tests/Feature/ </testsuite>
```

---

## Mandatory Rules

1. **Unit tests are mandatory** for every new class, method, or non-trivial logic.
2. **Feature tests are mandatory** for cross-layer flows:
   - Route → Middleware → Controller → Model → Database
   - Filament Resource CRUD operations
   - Multi-step flows (e.g., register for event → generate code)
3. All tests must pass before a task is `DONE`: `php artisan test` — zero failures.
4. Use `RefreshDatabase` trait on all Feature tests to reset state between tests.

---

## Directory Structure

```
tests/
  TestCase.php              ← base test case (extends Laravel's TestCase)
  Unit/
    Models/                 ← model logic, scopes, casts, mutators
      PostTest.php
      MemberTest.php
      EventTest.php
      HasAuditColumnsTest.php
    Services/               ← CloudinaryService, etc.
    Traits/                 ← HasAuditColumns behavior
    Requests/               ← Form Request validation rules
  Feature/
    Auth/                   ← login, logout, role access
    Public/                 ← public routes, controllers, responses
    Filament/               ← Filament Resource CRUD
    Api/                    ← API endpoints (if any)
```

---

## Naming Conventions

### PHPUnit style

```php
/** @test */
public function it_sets_created_by_automatically_when_model_is_created(): void {}

/** @test */
public function it_returns_only_active_posts_via_scope(): void {}

/** @test */
public function it_casts_tags_as_array_from_jsonb_column(): void {}

/** @test */
public function superadmin_can_create_a_post(): void {}

/** @test */
public function committee_receives_403_when_accessing_division_management(): void {}
```

### Pest PHP style (if introduced)

```php
it('sets created_by automatically when model is created', function () { ... });
it('returns only active posts via scope', function () { ... });
it('allows superadmin to create a post', function () { ... });
```

---

## Unit Test Targets

| Target Class            | What to Test                                                                                    |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| All Eloquent Models     | Scopes (`scopeActive`, `scopePublished`), casts (`tags` as array), relationships exist          |
| `HasAuditColumns` trait | `created_by` filled on create, `updated_by` filled on update, `creator()`/`updater()` relations |
| `CloudinaryService`     | Upload returns `['url', 'public_id']`, delete returns bool, URL transformation                  |
| All Form Requests       | Passing rules (happy path), failing rules (missing required, wrong type, unique violation)      |
| `SiteSetting::get()`    | Returns correct value, returns default when key missing                                         |
| User role helpers       | `isSuperAdmin()`, `isEditor()`, `isCommittee()` return correct bool                             |

---

## Feature Test Targets

| Scenario                          | Test Required                                                          |
| --------------------------------- | ---------------------------------------------------------------------- |
| Every new public route (GET)      | Status 200, correct Inertia component, data shape                      |
| Form POST (registration, contact) | Validation failure (422), success (redirect/200), data persisted in DB |
| Filament Resource: create         | Authenticated superadmin/editor can create record                      |
| Filament Resource: edit           | Authenticated superadmin/editor can edit record                        |
| Filament Resource: delete         | Superadmin can delete, committee receives 403                          |
| Auth: login                       | Valid credentials → redirect to dashboard, invalid → error             |
| Auth: role gates                  | Committee cannot access admin-only resources                           |
| Event registration flow           | Valid form → registration stored, unique code generated                |

---

## Example Unit Test

```php
// tests/Unit/Models/PostTest.php

namespace Tests\Unit\Models;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_casts_tags_as_php_array(): void
    {
        $post = Post::factory()->create(['tags' => ['alam', 'ekspedisi']]);

        $this->assertIsArray($post->fresh()->tags);
        $this->assertEquals(['alam', 'ekspedisi'], $post->fresh()->tags);
    }

    /** @test */
    public function scope_active_filters_only_active_posts(): void
    {
        Post::factory()->create(['is_active' => true]);
        Post::factory()->create(['is_active' => false]);

        $this->assertCount(1, Post::active()->get());
    }

    /** @test */
    public function scope_published_filters_only_published_posts(): void
    {
        Post::factory()->create(['status' => 'published']);
        Post::factory()->create(['status' => 'draft']);

        $this->assertCount(1, Post::published()->get());
    }
}
```

---

## Example Feature Test

```php
// tests/Feature/Public/PostTest.php

namespace Tests\Feature\Public;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function posts_index_page_returns_200_with_inertia_component(): void
    {
        Post::factory()->count(3)->published()->active()->create();

        $response = $this->get(route('posts.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Public/Posts/Index')
                ->has('posts.data', 3)
        );
    }

    /** @test */
    public function single_post_page_returns_404_for_unknown_slug(): void
    {
        $this->get(route('posts.show', 'slug-tidak-ada'))
             ->assertNotFound();
    }
}
```

---

## Coverage Targets (Minimum)

| Layer                                | Minimum Coverage         |
| ------------------------------------ | ------------------------ |
| Models (scopes, casts, helpers)      | ≥ 80%                    |
| Services (`CloudinaryService`, etc.) | ≥ 90%                    |
| Form Requests (validation rules)     | ≥ 85%                    |
| Public Controllers (routes)          | ≥ 70%                    |
| Filament Resources                   | ≥ 60% (complex UI layer) |

---

## Commands

```bash
php artisan test                          # All tests
php artisan test tests/Unit/              # Unit only
php artisan test tests/Feature/           # Feature only
php artisan test --filter=PostTest        # Filter by class
php artisan test --filter="it_casts_tags" # Filter by method name
php artisan test --coverage               # HTML coverage (requires Xdebug or PCOV)
composer test                             # config:clear + php artisan test

# Run specific file
php artisan test tests/Unit/Models/PostTest.php
```

---

## Database State in Tests

```php
// Feature tests — always use RefreshDatabase
class MyFeatureTest extends TestCase
{
    use RefreshDatabase; // wraps each test in a transaction, rolls back after
}

// Unit tests that don't touch DB — no trait needed
class MyUnitTest extends TestCase
{
    // pure logic test, mock DB calls
}
```
