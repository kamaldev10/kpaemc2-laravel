<?php

namespace App\Http\Requests\Admin;

use App\Enums\RoleTypeEnum;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null && $this->user()->can('create', User::class);
    }

    protected function prepareForValidation(): void
    {
        $isActive = $this->has('is_active')
            ? filter_var($this->input('is_active'), FILTER_VALIDATE_BOOLEAN)
            : true;

        $this->merge([
            'email' => $this->input('email') ? strtolower(trim((string) $this->input('email'))) : null,
            'is_active' => $isActive,
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class, 'email')],
            'password' => ['required', 'string', Password::defaults(), 'confirmed'],
            'role' => ['required', new Enum(RoleTypeEnum::class)],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama pengguna wajib diisi.',
            'email.required' => 'Alamat email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Alamat email sudah digunakan oleh pengguna lain.',
            'password.required' => 'Password wajib diisi.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',
            'role.required' => 'Peran (role) pengguna wajib dipilih.',
        ];
    }
}
