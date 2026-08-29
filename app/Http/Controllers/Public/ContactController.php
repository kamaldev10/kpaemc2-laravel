<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\AboutInfo;
use App\Models\Contact;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Display the public contact information and message form.
     */
    public function index(): Response
    {
        $aboutInfo = AboutInfo::where('is_active', true)->first();
        $siteSettings = SiteSetting::where('is_active', true)
            ->pluck('value', 'key')
            ->toArray();

        return Inertia::render('Public/Contact/Index', [
            'aboutInfo' => $aboutInfo,
            'siteSettings' => $siteSettings,
        ]);
    }

    /**
     * Store a newly created contact message from a public visitor.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        Contact::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'ip_address' => $request->ip(),
            'is_read' => false,
            'is_active' => true,
        ]);

        return back()->with('success', 'Pesan Anda telah berhasil terkirim ke Sekretariat KPA EMC². Pengurus kami akan segera merespons melalui email.');
    }
}
