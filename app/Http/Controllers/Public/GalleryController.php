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
        $perPage = (int) $request->input('per_page', 10);
        if (! in_array($perPage, [10, 20, 50, 100])) {
            $perPage = 10;
        }

        $search = $request->query('search');
        $categorySlug = $request->query('category');

        $query = Gallery::with([
            'items' => function ($q) {
                $q->orderBy('sort_order')->select(['id', 'gallery_id', 'url', 'type', 'caption', 'sort_order']);
            },
            'category:id,name,slug',
            'division:id,name,slug,icon_name',
        ])
            ->where('is_active', true)
            ->where('is_published', true)
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

        $galleries = $query->paginate($perPage)->withQueryString();

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
                'per_page' => (string) $perPage,
            ],
            'aboutInfo' => $aboutInfo,
        ]);
    }
}
