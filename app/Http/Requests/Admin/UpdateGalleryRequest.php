<?php

namespace App\Http\Requests\Admin;

use App\Models\Gallery;
use Illuminate\Foundation\Http\FormRequest;

class UpdateGalleryRequest extends FormRequest
{
    public function authorize(): bool
    {
        $gallery = $this->route('gallery');
        if (is_string($gallery)) {
            $gallery = Gallery::find($gallery);
        }

        return $gallery !== null && $this->user() !== null && $this->user()->can('update', $gallery);
    }

    protected function prepareForValidation(): void
    {
        $isPublished = filter_var($this->input('is_published'), FILTER_VALIDATE_BOOLEAN);
        $isActive = $this->has('is_active')
            ? filter_var($this->input('is_active'), FILTER_VALIDATE_BOOLEAN)
            : true;

        $sortOrder = $this->has('sort_order') && $this->input('sort_order') !== null && $this->input('sort_order') !== ''
            ? (int) $this->input('sort_order')
            : 0;

        $this->merge([
            'is_published' => $isPublished,
            'is_active' => $isActive,
            'sort_order' => $sortOrder,
        ]);
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category_id' => ['nullable', 'uuid', 'exists:categories,id'],
            'division_id' => ['nullable', 'uuid', 'exists:divisions,id'],
            'event_date' => ['nullable', 'date'],
            'location' => ['nullable', 'string', 'max:255'],
            'cover_image' => ['nullable', 'file', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'cover_url' => ['nullable', 'string', 'max:500'],
            'photos' => ['nullable', 'array'],
            'photos.*' => ['file', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'deleted_item_ids' => ['nullable', 'array'],
            'deleted_item_ids.*' => ['string'],
            'is_published' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }
}
