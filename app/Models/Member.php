<?php

namespace App\Models;

use App\Models\Traits\HasAuditColumns;
use Database\Factories\MemberFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
    /** @use HasFactory<MemberFactory> */
    use HasFactory, HasAuditColumns, SoftDeletes;

    protected $fillable = [
        'member_number',
        'name',
        'division_id',
        'position',
        'batch_year',
        'major',
        'phone',
        'email',
        'status',
        'bio',
        'avatar_url',
        'avatar_public_id',
        'is_visible',
        'sort_order',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'batch_year' => 'integer',
            'is_visible' => 'boolean',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class);
    }
}
