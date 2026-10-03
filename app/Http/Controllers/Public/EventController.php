<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Registration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    /**
     * Display a listing of upcoming and past public events.
     */
    public function index(Request $request): Response
    {
        $perPage = (int) $request->input('per_page', 10);
        if (! in_array($perPage, [10, 20, 50, 100])) {
            $perPage = 10;
        }

        $query = Event::with(['category:id,name,slug,color', 'division:id,name,slug,icon_name'])
            ->where('is_published', true)
            ->where('is_active', true);

        // Filter by Search Query (Title, Description, Location)
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'ILIKE', "%{$search}%")
                    ->orWhere('description', 'ILIKE', "%{$search}%")
                    ->orWhere('location', 'ILIKE', "%{$search}%");
            });
        }

        $events = $query->orderBy('start_date', 'asc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Public/Events/Index', [
            'events' => $events,
            'filters' => [
                'search' => $request->input('search', ''),
                'per_page' => (string) $perPage,
            ],
        ]);
    }

    /**
     * Display the specified event details and registration portal.
     */
    public function show(string $slug): Response
    {
        $event = Event::with(['category', 'division'])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->where('is_active', true)
            ->firstOrFail();

        $relatedEvents = Event::with(['category', 'division'])
            ->where('is_published', true)
            ->where('is_active', true)
            ->where('id', '!=', $event->id)
            ->orderBy('start_date', 'asc')
            ->limit(3)
            ->get();

        return Inertia::render('Public/Events/Show', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
        ]);
    }

    /**
     * Handle participant registration submission for an event.
     */
    public function register(Request $request, string $slug): RedirectResponse
    {
        $event = Event::where('slug', $slug)
            ->where('is_published', true)
            ->where('is_active', true)
            ->firstOrFail();

        if (!$event->isRegistrationOpen()) {
            return back()->withErrors(['message' => 'Mohon maaf, pendaftaran untuk kegiatan ini telah ditutup.']);
        }

        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:25'],
            'gender' => ['nullable', 'in:male,female'],
            'institution' => ['nullable', 'string', 'max:255'],
            'major' => ['nullable', 'string', 'max:255'],
            'motivation' => ['nullable', 'string', 'max:2000'],
            'extra_data' => ['nullable', 'array'],
        ]);

        $registrationCode = 'REG-' . strtoupper(Str::random(8));

        Registration::create([
            'event_id' => $event->id,
            'registration_code' => $registrationCode,
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'gender' => $validated['gender'] ?? null,
            'institution' => $validated['institution'] ?? null,
            'major' => $validated['major'] ?? null,
            'motivation' => $validated['motivation'] ?? null,
            'extra_data' => $validated['extra_data'] ?? null,
            'status' => 'pending',
            'is_active' => true,
        ]);

        return back()->with('success', "Pendaftaran berhasil dikirim! Kode Registrasi Anda: {$registrationCode}. Harap simpan kode ini.");
    }

    /**
     * Show the registration status check form.
     */
    public function checkStatus(): Response
    {
        return Inertia::render('Public/Events/CheckStatus', [
            'registration' => null,
            'searched' => false,
        ]);
    }

    /**
     * Look up a registration by code and email.
     */
    public function lookupStatus(Request $request): Response
    {
        $validated = $request->validate([
            'registration_code' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:255'],
        ]);

        $registration = Registration::with('event:id,title,slug,start_date,end_date,location,cover_url')
            ->where('registration_code', strtoupper($validated['registration_code']))
            ->where('email', $validated['email'])
            ->where('is_active', true)
            ->first();

        return Inertia::render('Public/Events/CheckStatus', [
            'registration' => $registration ? [
                'id' => $registration->id,
                'registration_code' => $registration->registration_code,
                'full_name' => $registration->full_name,
                'email' => $registration->email,
                'phone' => $registration->phone,
                'gender' => $registration->gender,
                'institution' => $registration->institution,
                'major' => $registration->major,
                'motivation' => $registration->motivation,
                'status' => $registration->status,
                'reviewer_notes' => $registration->reviewer_notes,
                'created_at' => $registration->created_at?->toIso8601String(),
                'event' => $registration->event ? [
                    'id' => $registration->event->id,
                    'title' => $registration->event->title,
                    'slug' => $registration->event->slug,
                    'start_date' => $registration->event->start_date?->toIso8601String(),
                    'end_date' => $registration->event->end_date?->toIso8601String(),
                    'location' => $registration->event->location,
                    'cover_url' => $registration->event->cover_url,
                ] : null,
            ] : null,
            'searched' => true,
        ]);
    }
}
