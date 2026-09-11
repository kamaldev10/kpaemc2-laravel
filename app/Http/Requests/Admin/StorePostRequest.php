<?php

namespace App\Http\Requests\Admin;

use App\Models\Post;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null && $this->user()->can('create', Post::class);
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Normalize tags: can be sent as JSON string, comma-separated string, or array
        $tags = $this->input('tags');
        if (is_string($tags)) {
            $decoded = json_decode($tags, true);
            if (is_array($decoded)) {
                $tags = $decoded;
            } else {
                $tags = array_map('trim', explode(',', $tags));
            }
        }
        if (! is_array($tags)) {
            $tags = [];
        }
        $tags = array_values(array_filter($tags, fn ($t) => ! empty($t)));

        // Boolean casts
        $isFeatured = filter_var($this->input('is_featured'), FILTER_VALIDATE_BOOLEAN);
        $isPublished = filter_var($this->input('is_published'), FILTER_VALIDATE_BOOLEAN);
        $isActive = $this->has('is_active')
            ? filter_var($this->input('is_active'), FILTER_VALIDATE_BOOLEAN)
            : true;

        // Auto excerpt if missing
        $excerpt = $this->input('excerpt');
        if (empty($excerpt) && ! empty($this->input('content'))) {
            $stripped = strip_tags((string) $this->input('content'));
            $excerpt = Str::limit($stripped, 160);
        }

        // Auto author name
        $authorName = $this->input('author_name') ?: $this->user()?->name;

        // Auto published_at
        $publishedAt = $this->input('published_at');
        if ($isPublished && empty($publishedAt)) {
            $publishedAt = now()->toDateTimeString();
        }

        $this->merge([
            'tags' => $tags,
            'is_featured' => $isFeatured,
            'is_published' => $isPublished,
            'is_active' => $isActive,
            'excerpt' => $excerpt,
            'author_name' => $authorName,
            'published_at' => $publishedAt,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:500'],
            'slug' => ['nullable', 'string', 'max:600', 'unique:posts,slug'],
            'category_id' => ['nullable', 'uuid', 'exists:categories,id'],
            'division_id' => ['nullable', 'uuid', 'exists:divisions,id'],
            'excerpt' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'content_source' => ['nullable', 'string', 'max:500'],
            'cover_image' => ['nullable', 'file', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'cover_image_url' => ['nullable', 'string', 'max:500'],
            'cover_image_source' => ['nullable', 'string', 'max:500'],
            'author_name' => ['nullable', 'string', 'max:255'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
            'is_featured' => ['boolean'],
            'is_published' => ['boolean'],
            'published_at' => ['nullable', 'date'],
            'post_date' => ['nullable', 'date'],
            'is_active' => ['boolean'],
        ];
    }

    /**
     * Custom validation attribute names.
     */
    public function attributes(): array
    {
        return [
            'title' => 'Judul artikel',
            'slug' => 'Slug URL',
            'category_id' => 'Kategori',
            'division_id' => 'Divisi',
            'excerpt' => 'Kutipan / ringkasan',
            'content' => 'Isi konten',
            'cover_image' => 'File gambar sampul',
            'cover_image_url' => 'URL gambar sampul',
            'author_name' => 'Nama penulis',
            'tags' => 'Tag artikel',
        ];
    }
}
