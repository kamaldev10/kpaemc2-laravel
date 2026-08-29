<?php

namespace App\Models;

use App\Models\Traits\HasAuditColumns;
use Database\Factories\RegistrationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Registration extends Model
{
    /** @use HasFactory<RegistrationFactory> */
    use HasFactory, HasAuditColumns;

    protected $fillable = [
        'event_id',
        'registration_code',
        'full_name',
        'email',
        'phone',
        'gender',
        'birth_date',
        'place_of_birth',
        'address',
        'institution',
        'major',
        'occupation',
        'motivation',
        'photo_url',
        'photo_public_id',
        'document_url',
        'document_public_id',
        'extra_data',
        'payment_proof_url',
        'payment_proof_public_id',
        'status',
        'reviewer_notes',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'extra_data' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}
