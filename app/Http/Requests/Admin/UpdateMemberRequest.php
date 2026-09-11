<?php

namespace App\Http\Requests\Admin;

use App\Models\Member;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $member = $this->route('member');

        if (is_string($member)) {
            $member = Member::find($member);
        }

        return $member !== null && $this->user() !== null && $this->user()->can('update', $member);
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $isPengurus = $this->has('is_pengurus')
            ? filter_var($this->input('is_pengurus'), FILTER_VALIDATE_BOOLEAN)
            : false;

        $isActive = $this->has('is_active')
            ? filter_var($this->input('is_active'), FILTER_VALIDATE_BOOLEAN)
            : true;

        $sortOrder = $this->has('sort_order') && $this->input('sort_order') !== null && $this->input('sort_order') !== ''
            ? (int) $this->input('sort_order')
            : 0;

        $this->merge([
            'is_pengurus' => $isPengurus,
            'is_active' => $isActive,
            'sort_order' => $sortOrder,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $member = $this->route('member');
        $memberId = is_object($member) ? $member->id : $member;

        return [
            'name' => ['required', 'string', 'max:255'],
            'member_number' => ['required', 'string', 'max:50', Rule::unique('members', 'member_number')->ignore($memberId)],
            'division_id' => ['nullable', 'uuid', 'exists:divisions,id'],
            'position' => ['nullable', 'string', 'max:150'],
            'batch_year' => ['nullable', 'integer', 'min:1980', 'max:' . (date('Y') + 1)],
            'major' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:255'],
            'status' => ['required', 'string', Rule::in(['regular', 'active', 'alumni', 'honorary'])],
            'bio' => ['nullable', 'string'],
            'avatar' => ['nullable', 'file', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'avatar_url' => ['nullable', 'string', 'max:500'],
            'is_pengurus' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }

    /**
     * Custom validation attributes.
     */
    public function attributes(): array
    {
        return [
            'name' => 'Nama anggota',
            'member_number' => 'Nomor induk anggota (NIA)',
            'division_id' => 'Divisi',
            'position' => 'Jabatan',
            'batch_year' => 'Tahun angkatan',
            'major' => 'Jurusan/Prodi',
            'phone' => 'Nomor telepon/WhatsApp',
            'email' => 'Alamat email',
            'status' => 'Status keanggotaan',
            'bio' => 'Biografi/profil',
            'avatar' => 'Foto profil/avatar',
            'is_pengurus' => 'Status kepengurusan',
            'sort_order' => 'Urutan tampil',
        ];
    }
}
