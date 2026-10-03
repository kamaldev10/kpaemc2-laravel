<?php

namespace App\Http\Requests\Admin;

use App\Models\AboutInfo;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAboutInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null && $this->user()->can('update', AboutInfo::class);
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'org_name' => ['required', 'string', 'max:255'],
            'founded_date' => ['required', 'string', 'max:100'],
            'motto' => ['nullable', 'string', 'max:500'],
            'description' => ['required', 'string'],
            'vision' => ['required', 'string'],
            'mission' => ['required', 'array', 'min:1'],
            'mission.*' => ['required', 'string', 'max:1000'],
            'active_term' => ['required', 'string', 'max:100'],
            'org_structure' => ['nullable', 'array'],
            'logo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:3072'],
            'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
        ];
    }
}
