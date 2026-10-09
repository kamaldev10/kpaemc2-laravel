<?php

namespace App\Http\Requests\Admin;

use App\Enums\RoleTypeEnum;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        $targetUser = $this->route('user');

        return $this->user() !== null && $this->user()->can('update', $targetUser ?? User::class);
    }

    protected function prepareForValidation(): void
    {
        $mergeData = [];

        if ($this->has('email')) {
            $mergeData['email'] = $this->input('email') ? strtolower(trim((string) $this->input('email'))) : null;
        }

        if ($this->has('is_active')) {
            $mergeData['is_active'] = filter_var($this->input('is_active'), FILTER_VALIDATE_BOOLEAN);
        }

        if (! empty($mergeData)) {
            $this->merge($mergeData);
        }
    }

    public function rules(): array
    {
        $targetUser = $this->route('user');
        $userId = $targetUser instanceof User ? $targetUser->id : $targetUser;

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class, 'email')->ignore($userId),
            ],
            'password' => ['nullable', 'string', Password::defaults(), 'confirmed'],
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
            'password.confirmed' => 'Konfirmasi password baru tidak cocok.',
            'role.required' => 'Peran (role) pengguna wajib dipilih.',
        ];
    }
}
