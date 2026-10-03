<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Event;
use App\Models\Member;
use App\Models\Post;
use App\Models\Registration;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard overview.
     */
    public function index(): Response
    {
        $stats = [
            'total_posts' => Post::where('is_active', true)->count(),
            'published_posts' => Post::where('is_published', true)->where('is_active', true)->count(),
            'total_events' => Event::where('is_active', true)->count(),
            'open_events' => Event::where('is_published', true)->where('is_active', true)
                ->where(function ($q) {
                    $q->whereNull('registration_close_at')
                        ->orWhere('registration_close_at', '>', now());
                })
                ->where(function ($q) {
                    $q->whereNull('registration_open_at')
                        ->orWhere('registration_open_at', '<=', now());
                })
                ->count(),
            'total_members' => Member::where('is_active', true)->count(),
            'pengurus_count' => Member::where('is_pengurus', true)->where('is_active', true)->count(),
            'total_registrations' => Registration::where('is_active', true)->count(),
            'pending_registrations' => Registration::where('status', 'pending')->where('is_active', true)->count(),
            'unread_contacts' => Contact::where('is_read', false)->where('is_active', true)->count(),
        ];

        return Inertia::render('Admin/Dashboard', compact('stats'));
    }
}
