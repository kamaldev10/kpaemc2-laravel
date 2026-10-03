<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'subject' => $this->subject,
            'message' => $this->message,
            'is_read' => (bool) $this->is_read,
            'ip_address' => $this->ip_address,
            'created_at' => $this->created_at?->format('d M Y, H:i') ?? '',
            'created_at_human' => $this->created_at?->diffForHumans() ?? '',
        ];
    }
}
