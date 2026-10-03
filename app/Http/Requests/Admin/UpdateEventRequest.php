<?php

namespace App\Http\Requests\Admin;

use App\Models\Event;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $event = $this->route('event');

        if (is_string($event)) {
            $event = Event::find($event);
        }

        return $event !== null && $this->user() !== null && $this->user()->can('update', $event);
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Normalize tags
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

        // Normalize form_fields
        $formFields = $this->input('form_fields');
        if (is_string($formFields)) {
            $decodedFields = json_decode($formFields, true);
            if (is_array($decodedFields)) {
                $formFields = $decodedFields;
            }
        }

        // Boolean casts
        $requiresPayment = filter_var($this->input('requires_payment'), FILTER_VALIDATE_BOOLEAN);
        $isPublished = filter_var($this->input('is_published'), FILTER_VALIDATE_BOOLEAN);
        $isActive = $this->has('is_active')
            ? filter_var($this->input('is_active'), FILTER_VALIDATE_BOOLEAN)
            : true;

        $paymentAmount = $this->input('payment_amount');
        if (! $requiresPayment || empty($paymentAmount)) {
            $paymentAmount = $requiresPayment ? 0 : null;
        }

        $this->merge([
            'tags' => $tags,
            'form_fields' => $formFields,
            'requires_payment' => $requiresPayment,
            'payment_amount' => $paymentAmount,
            'is_published' => $isPublished,
            'is_active' => $isActive,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $event = $this->route('event');
        $eventId = is_object($event) ? $event->id : $event;

        return [
            'title' => ['required', 'string', 'max:300'],
            'slug' => ['nullable', 'string', 'max:200', Rule::unique('events', 'slug')->ignore($eventId)],
            'category_id' => ['nullable', 'uuid', 'exists:categories,id'],
            'division_id' => ['nullable', 'uuid', 'exists:divisions,id'],
            'type' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:300'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'registration_open_at' => ['nullable', 'date'],
            'registration_close_at' => ['nullable', 'date', 'after_or_equal:registration_open_at'],
            'max_participants' => ['nullable', 'integer', 'min:1'],
            'requires_payment' => ['boolean'],
            'payment_amount' => ['nullable', 'numeric', 'min:0'],
            'form_fields' => ['nullable', 'array'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
            'cover_image' => ['nullable', 'file', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'cover_url' => ['nullable', 'string', 'max:500'],
            'is_published' => ['boolean'],
            'is_active' => ['boolean'],
        ];
    }

    /**
     * Custom validation attribute names.
     */
    public function attributes(): array
    {
        return [
            'title' => 'Judul kegiatan',
            'slug' => 'Slug URL',
            'category_id' => 'Kategori kegiatan',
            'division_id' => 'Divisi penyelenggara',
            'type' => 'Jenis/tipe kegiatan',
            'description' => 'Deskripsi kegiatan',
            'location' => 'Lokasi kegiatan',
            'start_date' => 'Tanggal mulai',
            'end_date' => 'Tanggal selesai',
            'registration_open_at' => 'Waktu pembukaan pendaftaran',
            'registration_close_at' => 'Waktu penutupan pendaftaran',
            'max_participants' => 'Kuota peserta',
            'requires_payment' => 'Biaya pendaftaran',
            'payment_amount' => 'Nominal biaya',
            'form_fields' => 'Formulir kustom pendaftaran',
            'tags' => 'Tag kegiatan',
            'cover_image' => 'File gambar poster/sampul',
        ];
    }
}
