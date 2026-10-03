<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ContactResource;
use App\Models\Contact;
use App\Services\Admin\ContactService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function __construct(
        protected ContactService $contactService
    ) {}

    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Contact::class);

        $perPage = (int) $request->input('per_page', 10);
        if (! in_array($perPage, [10, 20, 50, 100])) {
            $perPage = 10;
        }

        $search = $request->query('search');
        $status = $request->query('status');

        $contacts = $this->contactService->getPaginatedContacts($search, $status, $perPage);
        $unreadCount = $this->contactService->getUnreadCount();

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => ContactResource::collection($contacts),
            'unreadCount' => $unreadCount,
            'filters' => [
                'search' => $search ?? '',
                'status' => $status ?? '',
                'per_page' => (string) $perPage,
            ],
        ]);
    }

    public function markAsRead(Contact $contact, Request $request): RedirectResponse
    {
        Gate::authorize('update', $contact);

        $this->contactService->markAsRead($contact, $request->user());

        return back()->with('success', 'Pesan ditandai sebagai sudah dibaca.');
    }

    public function markAllAsRead(Request $request): RedirectResponse
    {
        Gate::authorize('viewAny', Contact::class);

        $this->contactService->markAllAsRead($request->user());

        return back()->with('success', 'Semua pesan ditandai sebagai sudah dibaca.');
    }

    public function destroy(Contact $contact, Request $request): RedirectResponse
    {
        Gate::authorize('delete', $contact);

        $this->contactService->deleteContact($contact, $request->user());

        return back()->with('success', 'Pesan kontak berhasil dihapus.');
    }
}
