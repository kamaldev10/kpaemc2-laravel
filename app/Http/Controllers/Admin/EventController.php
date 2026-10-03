<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreEventRequest;
use App\Http\Requests\Admin\UpdateEventRequest;
use App\Http\Resources\Admin\EventResource;
use App\Http\Resources\Admin\RegistrationResource;
use App\Models\Category;
use App\Models\Division;
use App\Models\Event;
use App\Models\Registration;
use App\Services\Admin\EventService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class EventController extends Controller
{
    public function __construct(
        protected EventService $eventService
    ) {}

    /**
     * Display a listing of events.
     */
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'category_id', 'division_id', 'type', 'status']);

        $events = $this->eventService->paginate($filters, 10);

        $categories = Category::where('type', 'event')
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $metrics = $this->eventService->getMetrics();

        return Inertia::render('Admin/Events/Index', [
            'events' => EventResource::collection($events),
            'categories' => $categories,
            'divisions' => $divisions,
            'filters' => $filters,
            'metrics' => $metrics,
        ]);
    }

    /**
     * Show the form for creating a new event.
     */
    public function create(Request $request): Response
    {
        $this->authorizeAction('create', Event::class);

        $categories = Category::where('type', 'event')
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Events/Create', [
            'categories' => $categories,
            'divisions' => $divisions,
        ]);
    }

    /**
     * Store a newly created event in storage.
     */
    public function store(StoreEventRequest $request): RedirectResponse
    {
        $event = $this->eventService->create(
            $request->validated(),
            $request->file('cover_image'),
            $request->user()
        );

        return redirect()
            ->route('admin.events.index')
            ->with('success', "Kegiatan \"{$event->title}\" berhasil ditambahkan.");
    }

    /**
     * Show the form for editing the specified event.
     */
    public function edit(Request $request, Event $event): Response
    {
        if ($request->user()->cannot('update', $event)) {
            abort(403, 'Anda tidak memiliki izin untuk mengubah kegiatan ini.');
        }

        $event->load(['category', 'division']);

        $categories = Category::where('type', 'event')
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Events/Edit', [
            'event' => new EventResource($event),
            'categories' => $categories,
            'divisions' => $divisions,
        ]);
    }

    /**
     * Update the specified event in storage.
     */
    public function update(UpdateEventRequest $request, Event $event): RedirectResponse
    {
        $updated = $this->eventService->update(
            $event,
            $request->validated(),
            $request->file('cover_image'),
            $request->user()
        );

        return redirect()
            ->route('admin.events.index')
            ->with('success', "Kegiatan \"{$updated->title}\" berhasil diperbarui.");
    }

    /**
     * Remove the specified event from storage.
     */
    public function destroy(Request $request, Event $event): RedirectResponse
    {
        if ($request->user()->cannot('delete', $event)) {
            abort(403, 'Anda tidak memiliki izin untuk menghapus kegiatan ini.');
        }

        $this->eventService->delete($event);

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Kegiatan berhasil dihapus.');
    }

    /**
     * Display participants and registrations for a specific event.
     */
    public function registrations(Request $request, Event $event): Response
    {
        if ($request->user()->cannot('manageRegistrations', $event)) {
            abort(403, 'Anda tidak memiliki izin untuk mengelola pendaftaran kegiatan ini.');
        }

        $filters = $request->only(['search', 'status']);
        $registrations = $this->eventService->getRegistrations($event, $filters, 15);

        $event->load(['category', 'division']);

        return Inertia::render('Admin/Events/Registrations', [
            'event' => new EventResource($event),
            'registrations' => RegistrationResource::collection($registrations),
            'filters' => $filters,
        ]);
    }

    /**
     * Update registration review status.
     */
    public function updateRegistrationStatus(Request $request, Event $event, Registration $registration): RedirectResponse
    {
        if ($request->user()->cannot('manageRegistrations', $event)) {
            abort(403, 'Anda tidak memiliki izin untuk mengubah status pendaftaran.');
        }

        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,verified,rejected'],
            'reviewer_notes' => ['nullable', 'string'],
        ]);

        $this->eventService->updateRegistrationStatus(
            $registration,
            $validated['status'],
            $validated['reviewer_notes'] ?? null
        );

        return back()->with('success', "Status pendaftaran peserta \"{$registration->full_name}\" berhasil diubah menjadi {$validated['status']}.");
    }

    /**
     * Export participants list as CSV.
     */
    public function exportRegistrations(Request $request, Event $event): StreamedResponse
    {
        if ($request->user()->cannot('manageRegistrations', $event)) {
            abort(403, 'Akses ditolak.');
        }

        $fileName = 'peserta_' . $event->slug . '_' . date('Y-m-d') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$fileName}\"",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        return response()->stream(function () use ($event) {
            $handle = fopen('php://output', 'w');

            // UTF-8 BOM for Excel compatibility
            fprintf($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));

            // Header row
            fputcsv($handle, [
                'Kode Pendaftaran',
                'Nama Lengkap',
                'Email',
                'No Telepon',
                'Jenis Kelamin',
                'Institusi / Kampus',
                'Program Studi',
                'Status Pendaftaran',
                'Catatan Reviewer',
                'Tanggal Daftar',
            ]);

            $event->registrations()->orderByDesc('created_at')->chunk(100, function ($registrations) use ($handle) {
                foreach ($registrations as $reg) {
                    fputcsv($handle, [
                        $reg->registration_code,
                        $reg->full_name,
                        $reg->email,
                        $reg->phone,
                        $reg->gender === 'male' ? 'Laki-laki' : ($reg->gender === 'female' ? 'Perempuan' : '-'),
                        $reg->institution,
                        $reg->major,
                        $reg->status,
                        $reg->reviewer_notes,
                        $reg->created_at?->format('Y-m-d H:i:s'),
                    ]);
                }
            });

            fclose($handle);
        }, 200, $headers);
    }

    /**
     * Helper to authorize user for a given ability.
     */
    protected function authorizeAction(string $ability, string|object $target): void
    {
        $user = request()->user();
        if (! $user || ! $user->can($ability, $target)) {
            abort(403, 'Akses ditolak.');
        }
    }
}
