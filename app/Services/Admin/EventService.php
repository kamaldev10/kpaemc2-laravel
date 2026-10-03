<?php

namespace App\Services\Admin;

use App\Models\Event;
use App\Models\Registration;
use App\Models\User;
use App\Services\CloudinaryService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EventService
{
    public function __construct(
        protected CloudinaryService $cloudinaryService
    ) {}

    /**
     * Get paginated events with filtering, relations, and registration counts.
     *
     * @param  array<string, mixed>  $filters
     */
    public function paginate(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = Event::with(['category', 'division'])
            ->withCount('registrations')
            ->orderByDesc('start_date');

        // Search term (title, location, type)
        if (! empty($filters['search'])) {
            $term = trim($filters['search']);
            $query->where(function ($q) use ($term) {
                $q->where('title', 'ILIKE', "%{$term}%")
                    ->orWhere('location', 'ILIKE', "%{$term}%")
                    ->orWhere('type', 'ILIKE', "%{$term}%");
            });
        }

        // Category filter
        if (! empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        // Division filter
        if (! empty($filters['division_id'])) {
            $query->where('division_id', $filters['division_id']);
        }

        // Type filter
        if (! empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        // Status filter (published, draft, upcoming, ongoing, past)
        if (! empty($filters['status'])) {
            $status = $filters['status'];
            $now = now();

            if ($status === 'published') {
                $query->where('is_published', true);
            } elseif ($status === 'draft') {
                $query->where('is_published', false);
            } elseif ($status === 'upcoming') {
                $query->where('start_date', '>', $now);
            } elseif ($status === 'ongoing') {
                $query->where('start_date', '<=', $now)
                    ->where(function ($q) use ($now) {
                        $q->whereNull('end_date')
                            ->orWhere('end_date', '>=', $now);
                    });
            } elseif ($status === 'past') {
                $query->where(function ($q) use ($now) {
                    $q->whereNotNull('end_date')
                        ->where('end_date', '<', $now);
                })->orWhere(function ($q) use ($now) {
                    $q->whereNull('end_date')
                        ->where('start_date', '<', $now);
                });
            }
        }

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * Get summary metrics for events dashboard.
     *
     * @return array{total: int, upcoming: int, ongoing: int, registrations: int}
     */
    public function getMetrics(): array
    {
        $now = now();

        return [
            'total' => Event::count(),
            'upcoming' => Event::where('start_date', '>', $now)->count(),
            'ongoing' => Event::where('start_date', '<=', $now)
                ->where(function ($q) use ($now) {
                    $q->whereNull('end_date')
                        ->orWhere('end_date', '>=', $now);
                })->count(),
            'registrations' => Registration::count(),
        ];
    }

    /**
     * Create a new event.
     *
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, ?UploadedFile $coverImage, User $actor): Event
    {
        return DB::transaction(function () use ($data, $coverImage, $actor) {
            // Slug generation
            $baseSlug = ! empty($data['slug']) ? Str::slug($data['slug']) : Str::slug($data['title']);
            $data['slug'] = $this->generateUniqueSlug($baseSlug);

            // Cover image upload
            if ($coverImage instanceof UploadedFile) {
                $upload = $this->cloudinaryService->upload($coverImage, CloudinaryService::FOLDER_EVENTS);
                $data['cover_url'] = $upload['secure_url'] ?? $upload['url'];
                $data['cover_public_id'] = $upload['public_id'];
            } elseif (! empty($data['cover_url'])) {
                $data['cover_url'] = $data['cover_url'];
            }

            $data['created_by'] = $actor->id;
            $data['updated_by'] = $actor->id;

            $event = Event::create($data);

            $this->invalidateCache();

            return $event;
        });
    }

    /**
     * Update an existing event.
     *
     * @param  array<string, mixed>  $data
     */
    public function update(Event $event, array $data, ?UploadedFile $coverImage, User $actor): Event
    {
        return DB::transaction(function () use ($event, $data, $coverImage, $actor) {
            // Slug update with uniqueness check
            if (! empty($data['slug']) && $data['slug'] !== $event->slug) {
                $data['slug'] = $this->generateUniqueSlug(Str::slug($data['slug']), $event->id);
            } elseif (empty($data['slug']) && ! empty($data['title']) && $data['title'] !== $event->title) {
                $data['slug'] = $this->generateUniqueSlug(Str::slug($data['title']), $event->id);
            }

            // Cover image update
            if ($coverImage instanceof UploadedFile) {
                if (! empty($event->cover_public_id)) {
                    $this->cloudinaryService->delete($event->cover_public_id);
                }

                $upload = $this->cloudinaryService->upload($coverImage, CloudinaryService::FOLDER_EVENTS);
                $data['cover_url'] = $upload['secure_url'] ?? $upload['url'];
                $data['cover_public_id'] = $upload['public_id'];
            }

            $data['updated_by'] = $actor->id;

            $event->update($data);

            $this->invalidateCache();

            return $event->fresh(['category', 'division']);
        });
    }

    /**
     * Delete an event.
     */
    public function delete(Event $event): bool
    {
        $deleted = $event->delete();

        if ($deleted) {
            $this->invalidateCache();
        }

        return (bool) $deleted;
    }

    /**
     * Force delete an event and clean up Cloudinary assets.
     */
    public function forceDelete(Event $event): bool
    {
        if (! empty($event->cover_public_id)) {
            $this->cloudinaryService->delete($event->cover_public_id);
        }

        $deleted = $event->forceDelete();

        if ($deleted) {
            $this->invalidateCache();
        }

        return (bool) $deleted;
    }

    /**
     * Get paginated registrations for a specific event.
     *
     * @param  array<string, mixed>  $filters
     */
    public function getRegistrations(Event $event, array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = $event->registrations()->orderByDesc('created_at');

        if (! empty($filters['search'])) {
            $term = trim($filters['search']);
            $query->where(function ($q) use ($term) {
                $q->where('full_name', 'ILIKE', "%{$term}%")
                    ->orWhere('email', 'ILIKE', "%{$term}%")
                    ->orWhere('registration_code', 'ILIKE', "%{$term}%")
                    ->orWhere('phone', 'ILIKE', "%{$term}%")
                    ->orWhere('institution', 'ILIKE', "%{$term}%");
            });
        }

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * Update registration status.
     */
    public function updateRegistrationStatus(Registration $registration, string $status, ?string $notes = null): Registration
    {
        $registration->update([
            'status' => $status,
            'reviewer_notes' => $notes,
            'updated_by' => auth()->id(),
        ]);

        return $registration->fresh();
    }

    /**
     * Invalidate event and public caches.
     */
    public function invalidateCache(): void
    {
        try {
            if (Cache::supportsTags()) {
                Cache::tags(['events', 'public_events'])->flush();
            }
        } catch (\Throwable) {
            // Ignored if cache driver does not support tags
        }

        Cache::forget('public_events_upcoming');
        Cache::forget('events_list');
    }

    /**
     * Generate a unique slug for events.
     */
    protected function generateUniqueSlug(string $baseSlug, ?string $excludeId = null): string
    {
        $slug = $baseSlug ?: 'event';
        $originalSlug = $slug;
        $counter = 1;

        while (true) {
            $query = Event::where('slug', $slug);
            if ($excludeId) {
                $query->where('id', '!=', $excludeId);
            }

            if (! $query->exists()) {
                return $slug;
            }

            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }
    }
}
