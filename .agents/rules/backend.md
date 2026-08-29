# Backend Rules — Laravel + Filament + Eloquent

## Laravel Conventions

### Controllers

- Use **Resource Controllers** (`php artisan make:controller NamaController --resource`) when possible.
- Public-facing controllers go in `app/Http/Controllers/Public/`.
- Controllers are thin — business logic lives in Services or Models.
- Always return Inertia responses for public pages:

```php
use Inertia\Inertia;

public function index(): \Inertia\Response
{
    return Inertia::render('Public/Posts/Index', [
        'posts' => PostResource::collection(
            Post::with('category')->active()->published()->latest()->paginate(12)
        ),
    ]);
}
```

### Form Requests

- Every POST/PUT/PATCH endpoint uses a dedicated Form Request class in `app/Http/Requests/`.
- Naming: `{Action}{Model}Request.php` — e.g., `StorePostRequest.php`, `UpdateEventRequest.php`.
- Always define `authorize()` and `rules()`.

```php
class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isEditor() ?? false;
    }

    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'max:255'],
            'slug'        => ['required', 'string', 'unique:posts,slug', 'max:255'],
            'tags'        => ['required', 'array'],
            'tags.*'      => ['string', 'max:50'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
        ];
    }
}
```

### Services

- Business logic that spans multiple models or external APIs lives in `app/Services/`.
- Naming: `PascalCaseService.php`.
- Inject via constructor — do not instantiate directly in controllers.
- `CloudinaryService` must be used for all media uploads/deletions.

```php
// Correct injection pattern
class PostController extends Controller
{
    public function __construct(private readonly CloudinaryService $cloudinary) {}
}
```

---

## Eloquent Models

### HasAuditColumns Trait (mandatory)

Every model must use `app/Models/Traits/HasAuditColumns.php`:

```php
use App\Models\Traits\HasAuditColumns;

class Post extends Model
{
    use HasAuditColumns;
    // ...
}
```

The trait provides:

- Boot hooks: auto-fills `created_by`/`updated_by` from `Auth::id()`
- Relations: `creator()` and `updater()` → `belongsTo(User::class)`
- Scope: `scopeActive($query)` → filters `is_active = true`

### Scopes

Use named scopes for recurring query patterns:

```php
// In model
public function scopePublished(Builder $query): void
{
    $query->where('status', 'published');
}

public function scopeByDivision(Builder $query, int $divisionId): void
{
    $query->where('division_id', $divisionId);
}

// Usage
Post::active()->published()->latest()->paginate(12);
```

### Casts

```php
protected $casts = [
    'tags'        => 'array',          // JSONB → PHP array
    'form_fields' => 'array',          // JSONB → PHP array
    'org_structure' => 'array',        // JSONB → PHP array
    'is_active'   => 'boolean',
    'event_date'  => 'datetime',
    'role'        => UserRole::class,  // Enum cast if using PHP enums
];
```

### No `DB::raw()` Policy

Avoid `DB::raw()`. Use query builder methods or PostgreSQL-specific Eloquent patterns:

```php
// ✅ JSONB containment query
Post::whereJsonContains('tags', 'ekspedisi')->get();

// ✅ Full-text trigram search via scope
Post::whereFuzzySearch('title', $query)->get();

// ❌ Avoid without documented reason
Post::whereRaw("tags @> '[\"ekspedisi\"]'::jsonb")->get();
// ^^ Only if Eloquent method doesn't support the operator
```

---

## Filament Admin Panel

### Panel Location

- Admin panel route: `/admin`
- Panel provider: `app/Providers/Filament/AdminPanelProvider.php` (to be created in Sprint 1)

### Role-Based Access

3 roles defined on `users.role` column: `superadmin`, `editor`, `committee`.

```php
// Model helper methods
public function isSuperAdmin(): bool { return $this->role === 'superadmin'; }
public function isEditor(): bool { return in_array($this->role, ['superadmin', 'editor']); }
public function isCommittee(): bool { return in_array($this->role, ['superadmin', 'editor', 'committee']); }
```

Every Filament Resource must guard access:

```php
public static function canAccess(): bool
{
    return auth()->user()?->isEditor() ?? false;
}
```

### Resource Conventions

- File: `app/Filament/Resources/{Model}Resource.php`
- Auto-generate: `php artisan make:filament-resource Post --generate`
- All Resources: implement `form()`, `table()`, `getRelations()`, `getPages()`
- Pagination: 25 per page (Filament default — do not override unless needed)
- File upload: always use `CloudinaryService`, never `->disk('public')`

### File Upload Pattern (Filament + Cloudinary)

```php
// In Resource form()
FileUpload::make('cover_url')
    ->label('Cover Image')
    ->image()
    ->maxSize(2048)
    ->afterStateUpdated(function ($state, callable $set) use ($cloudinaryService) {
        if ($state) {
            $result = $cloudinaryService->upload($state);
            $set('cover_url', $result['url']);
            $set('cover_public_id', $result['public_id']);
        }
    })
```

---

## Routing

- Public routes defined in `routes/web.php`
- Auth routes in `routes/auth.php` (Breeze-generated)
- Admin routes handled automatically by Filament's `AdminPanelProvider`
- Use named routes: `route('posts.show', $post->slug)`
- Route model binding by `slug` (not `id`) for public-facing resources

```php
// web.php — public routes pattern
Route::prefix('posts')->name('posts.')->group(function () {
    Route::get('/', [PostController::class, 'index'])->name('index');
    Route::get('/{slug}', [PostController::class, 'show'])->name('show');
});
```

---

## CloudinaryService (to be implemented in Sprint 1)

Expected interface:

```php
class CloudinaryService
{
    public function upload(mixed $file, string $folder = 'kpa-emc2'): array
    // Returns: ['url' => string, 'public_id' => string]

    public function delete(string $publicId): bool

    public function url(string $publicId, array $transformations = []): string
    // Default transformations: ['f_auto', 'q_auto']
}
```

---

## Artisan Commands Reference

```bash
php artisan make:model Nama -mfsc          # Model + migration + factory + seeder + controller
php artisan make:controller NamaController --resource
php artisan make:request StoreNamaRequest
php artisan make:service CloudinaryService  # (or create manually in app/Services/)
php artisan make:filament-resource Nama --generate

php artisan migrate
php artisan migrate:fresh --seed
php artisan migrate:rollback --step=1
php artisan db:seed --class=PostSeeder
php artisan route:list --path=admin
php artisan optimize:clear
```
