<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\EventController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\MemberController;
use App\Http\Controllers\Public\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Core Pages (English URLs)
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');

// Public Posts / Articles (English URLs)
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{slug}', [PostController::class, 'show'])->name('posts.show');

// Public Structure & Members (English URLs)
Route::get('/structure', [MemberController::class, 'index'])->name('structure.index');

// Public Events / Kegiatan (English URLs)
Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{slug}', [EventController::class, 'show'])->name('events.show');
Route::post('/events/{slug}/register', [EventController::class, 'register'])->name('events.register');

// Public Contact (English URLs)
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Indonesian / Legacy URL Aliases (Redirects to English URLs)
Route::get('/tentang', fn () => redirect()->route('about'));
Route::get('/artikel', fn () => redirect()->route('posts.index'));
Route::get('/artikel/{slug}', fn ($slug) => redirect()->route('posts.show', $slug));
Route::get('/struktur', fn () => redirect()->route('structure.index'));
Route::get('/members', fn () => redirect()->route('structure.index'));
Route::get('/kegiatan', fn () => redirect()->route('events.index'));
Route::get('/kegiatan/{slug}', fn ($slug) => redirect()->route('events.show', $slug));
Route::get('/kontak', fn () => redirect()->route('contact.index'));

// Authenticated Routes
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
