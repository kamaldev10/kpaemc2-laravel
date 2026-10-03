<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\AboutInfo;
use App\Models\Category;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $categorySlug = $request->query('category');

        $query = Gallery::with(['items' => function ($q) {
            $q->orderBy('sort_order');
        }, 'category', 'division'])
            ->where('is_active', true)
            ->orderByDesc('event_date')
            ->orderByDesc('created_at');

        if (! empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'ilike', "%{$search}%")
                    ->orWhere('description', 'ilike', "%{$search}%")
                    ->orWhere('location', 'ilike', "%{$search}%");
            });
        }

        if (! empty($categorySlug)) {
            $query->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        $galleries = $query->paginate(12)->withQueryString();

        $categories = Category::where('is_active', true)
            ->where('type', 'gallery')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $aboutInfo = AboutInfo::where('is_active', true)->first();

        return Inertia::render('Public/Gallery/Index', [
            'galleries' => $galleries,
            'categories' => $categories,
            'filters' => [
                'search' => $search ?? '',
                'category' => $categorySlug ?? '',
            ],
            'aboutInfo' => $aboutInfo,
        ]);
    }
}
