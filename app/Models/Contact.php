<?php

namespace App\Models;

use App\Models\Traits\HasAuditColumns;
use Database\Factories\ContactFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    /** @use HasFactory<ContactFactory> */
    use HasFactory, HasAuditColumns;

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'is_read',
        'ip_address',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'is_read' => 'boolean',
            'is_active' => 'boolean',
        ];
    }
}
