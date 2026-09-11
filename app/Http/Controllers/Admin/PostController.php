<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePostRequest;
use App\Http\Requests\Admin\UpdatePostRequest;
use App\Http\Resources\Admin\PostResource;
use App\Models\Category;
use App\Models\Division;
use App\Models\Post;
use App\Services\Admin\PostService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function __construct(
        protected PostService $postService
    ) {}

    /**
     * Display a listing of posts/articles.
     */
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'category_id', 'division_id', 'status']);

        $posts = $this->postService->paginate($filters, 10);

        $categories = Category::where('is_active', true)
            ->whereIn('type', ['post', 'general'])
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'color']);

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $metrics = $this->postService->getMetrics();

        return Inertia::render('Admin/Posts/Index', [
            'posts' => PostResource::collection($posts),
            'categories' => $categories,
            'divisions' => $divisions,
            'filters' => $filters,
            'metrics' => $metrics,
        ]);
    }

    /**
     * Show the form for creating a new post.
     */
    public function create(Request $request): Response
    {
        $this->authorizeResource('create', Post::class);

        $categories = Category::where('is_active', true)
            ->whereIn('type', ['post', 'general'])
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'color']);

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Posts/Create', [
            'categories' => $categories,
            'divisions' => $divisions,
        ]);
    }

    /**
     * Store a newly created post in storage.
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        $post = $this->postService->create(
            $request->validated(),
            $request->file('cover_image'),
            $request->user()
        );

        $actionText = $post->is_published ? 'diterbitkan' : 'disimpan sebagai draf';

        return redirect()
            ->route('admin.posts.index')
            ->with('success', "Artikel \"{$post->title}\" berhasil {$actionText}.");
    }

    /**
     * Show the form for editing the specified post.
     */
    public function edit(Request $request, Post $post): Response
    {
        if ($request->user()->cannot('update', $post)) {
            abort(403, 'Anda tidak memiliki izin untuk mengedit artikel ini.');
        }

        $post->load(['category', 'division', 'user']);

        $categories = Category::where('is_active', true)
            ->whereIn('type', ['post', 'general'])
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'color']);

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Posts/Edit', [
            'post' => new PostResource($post),
            'categories' => $categories,
            'divisions' => $divisions,
        ]);
    }

    /**
     * Update the specified post in storage.
     */
    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        $updated = $this->postService->update(
            $post,
            $request->validated(),
            $request->file('cover_image'),
            $request->user()
        );

        return redirect()
            ->route('admin.posts.index')
            ->with('success', "Artikel \"{$updated->title}\" berhasil diperbarui.");
    }

    /**
     * Remove the specified post from storage.
     */
    public function destroy(Request $request, Post $post): RedirectResponse
    {
        if ($request->user()->cannot('delete', $post)) {
            abort(403, 'Anda tidak memiliki izin untuk menghapus artikel ini.');
        }

        $this->postService->delete($post);

        return redirect()
            ->route('admin.posts.index')
            ->with('success', 'Artikel berhasil dihapus.');
    }

    /**
     * Helper to authorize user for a given ability.
     */
    protected function authorizeResource(string $ability, string|object $target): void
    {
        $user = request()->user();
        if (! $user || ! $user->can($ability, $target)) {
            abort(403, 'Akses ditolak.');
        }
    }
}
