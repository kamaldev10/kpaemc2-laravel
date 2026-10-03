<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreGalleryRequest;
use App\Http\Requests\Admin\UpdateGalleryRequest;
use App\Http\Resources\Admin\GalleryResource;
use App\Models\Category;
use App\Models\Division;
use App\Models\Gallery;
use App\Services\Admin\GalleryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function __construct(
        protected GalleryService $galleryService
    ) {}

    public function index(Request $request): Response
    {
        $perPage = (int) $request->input('per_page', 10);
        if (! in_array($perPage, [10, 20, 50, 100])) {
            $perPage = 10;
        }

        $filters = $request->only(['search', 'category_id', 'division_id']);
        $filters['per_page'] = (string) $perPage;

        $galleries = $this->galleryService->paginate($filters, $perPage);

        $categories = Category::where('type', 'gallery')
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Galleries/Index', [
            'galleries' => GalleryResource::collection($galleries),
            'categories' => $categories,
            'divisions' => $divisions,
            'filters' => $filters,
        ]);
    }

    public function create(Request $request): Response
    {
        $categories = Category::where('type', 'gallery')
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Galleries/Create', [
            'categories' => $categories,
            'divisions' => $divisions,
        ]);
    }

    public function store(StoreGalleryRequest $request): RedirectResponse
    {
        $gallery = $this->galleryService->create(
            $request->validated(),
            $request->file('cover_image'),
            $request->file('photos') ?? [],
            $request->user()
        );

        return redirect()
            ->route('admin.galleries.index')
            ->with('success', "Album galeri \"{$gallery->title}\" berhasil dibuat.");
    }

    public function edit(Request $request, Gallery $gallery): Response
    {
        if ($request->user()->cannot('update', $gallery)) {
            abort(403, 'Akses ditolak.');
        }

        $gallery->load(['category', 'division', 'items']);

        $categories = Category::where('type', 'gallery')
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Galleries/Edit', [
            'gallery' => new GalleryResource($gallery),
            'categories' => $categories,
            'divisions' => $divisions,
        ]);
    }

    public function update(UpdateGalleryRequest $request, Gallery $gallery): RedirectResponse
    {
        $updated = $this->galleryService->update(
            $gallery,
            $request->validated(),
            $request->file('cover_image'),
            $request->file('photos') ?? [],
            $request->input('deleted_item_ids') ?? [],
            $request->user()
        );

        return redirect()
            ->route('admin.galleries.index')
            ->with('success', "Album galeri \"{$updated->title}\" berhasil diperbarui.");
    }

    public function destroy(Request $request, Gallery $gallery): RedirectResponse
    {
        if ($request->user()->cannot('delete', $gallery)) {
            abort(403, 'Akses ditolak.');
        }

        $this->galleryService->delete($gallery);

        return redirect()
            ->route('admin.galleries.index')
            ->with('success', 'Album galeri berhasil dihapus.');
    }
}
