<?php

namespace App\Http\Requests\Admin;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null && $this->user()->can('create', Category::class);
    }

    protected function prepareForValidation(): void
    {
        $isActive = $this->has('is_active')
            ? filter_var($this->input('is_active'), FILTER_VALIDATE_BOOLEAN)
            : true;

        $sortOrder = $this->has('sort_order') && $this->input('sort_order') !== null && $this->input('sort_order') !== ''
            ? (int) $this->input('sort_order')
            : 0;

        $this->merge([
            'is_active' => $isActive,
            'sort_order' => $sortOrder,
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'slug' => ['nullable', 'string', 'max:200', 'unique:categories,slug'],
            'type' => ['required', 'string', Rule::in(['post', 'event', 'gallery'])],
            'color' => ['nullable', 'string', 'max:50'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }
}
