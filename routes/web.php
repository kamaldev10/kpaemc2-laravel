<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\EventController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\MemberController;
use App\Http\Controllers\Public\PostController;
use Illuminate\Support\Facades\Route;

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

// Authenticated Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Dashboard Routes (auth + verified + role >= ADMIN)
Route::middleware(['auth', 'verified', App\Http\Middleware\EnsureAdmin::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [App\Http\Controllers\Admin\DashboardController::class, 'index'])
            ->name('dashboard');

        Route::resource('posts', App\Http\Controllers\Admin\PostController::class);
        Route::get('articles', fn () => redirect()->route('admin.posts.index'))->name('articles.index');

        Route::resource('members', App\Http\Controllers\Admin\MemberController::class);
    });

require __DIR__ . '/auth.php';
