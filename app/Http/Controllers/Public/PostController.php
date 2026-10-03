<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of published posts with search, category filters, and pagination.
     */
    public function index(Request $request): Response
    {
        $perPage = (int) $request->input('per_page', 10);
        if (! in_array($perPage, [10, 20, 50, 100])) {
            $perPage = 10;
        }

        $search = $request->query('search');
        $categorySlug = $request->query('category');

        $categories = Category::where('is_active', true)
            ->whereIn('type', ['post', 'general'])
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'color']);

        $posts = Post::with(['category:id,name,slug,color', 'division:id,name,slug'])
            ->published()
            ->when($search, fn ($query, $term) => $query->search($term))
            ->when($categorySlug, function ($query, $slug) {
                $query->whereHas('category', fn ($q) => $q->where('slug', $slug));
            })
            ->orderByDesc('is_featured')
            ->latest('published_at')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Public/Posts/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'filters' => [
                'search' => $search ?? '',
                'category' => $categorySlug ?? '',
                'per_page' => (string) $perPage,
            ],
        ]);
    }

    /**
     * Display the specified post and its related articles.
     */
    public function show(string $slug): Response
    {
        $post = Post::with(['category', 'division', 'user'])
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();

        $relatedPosts = Post::with(['category', 'division'])
            ->published()
            ->where('id', '!=', $post->id)
            ->when($post->category_id, fn ($query, $catId) => $query->where('category_id', $catId))
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('Public/Posts/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}
