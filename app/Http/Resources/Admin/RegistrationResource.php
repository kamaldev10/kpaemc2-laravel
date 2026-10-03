<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegistrationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'event_id' => $this->event_id,
            'registration_code' => $this->registration_code,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'gender' => $this->gender,
            'birth_date' => $this->birth_date ? (is_string($this->birth_date) ? $this->birth_date : $this->birth_date->format('Y-m-d')) : null,
            'place_of_birth' => $this->place_of_birth,
            'address' => $this->address,
            'institution' => $this->institution,
            'major' => $this->major,
            'occupation' => $this->occupation,
            'motivation' => $this->motivation,
            'photo_url' => $this->photo_url,
            'photo_public_id' => $this->photo_public_id,
            'document_url' => $this->document_url,
            'document_public_id' => $this->document_public_id,
            'extra_data' => $this->extra_data ?? [],
            'payment_proof_url' => $this->payment_proof_url,
            'payment_proof_public_id' => $this->payment_proof_public_id,
            'status' => $this->status,
            'reviewer_notes' => $this->reviewer_notes,
            'is_active' => (bool) $this->is_active,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
