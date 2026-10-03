<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Http\Requests\Admin\UpdateCategoryRequest;
use App\Http\Resources\Admin\CategoryResource;
use App\Models\Category;
use App\Services\Admin\CategoryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(
        protected CategoryService $categoryService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'type']);
        $categories = $this->categoryService->paginate($filters, 15);

        return Inertia::render('Admin/Categories/Index', [
            'categories' => CategoryResource::collection($categories),
            'filters' => $filters,
        ]);
    }

    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $category = $this->categoryService->create(
            $request->validated(),
            $request->user()
        );

        return redirect()
            ->route('admin.categories.index')
            ->with('success', "Kategori \"{$category->name}\" berhasil ditambahkan.");
    }

    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $updated = $this->categoryService->update(
            $category,
            $request->validated(),
            $request->user()
        );

        return redirect()
            ->route('admin.categories.index')
            ->with('success', "Kategori \"{$updated->name}\" berhasil diperbarui.");
    }

    public function destroy(Request $request, Category $category): RedirectResponse
    {
        if ($request->user()->cannot('delete', $category)) {
            abort(403, 'Akses ditolak.');
        }

        $this->categoryService->delete($category);

        return redirect()
            ->route('admin.categories.index')
            ->with('success', 'Kategori berhasil dihapus.');
    }
}
