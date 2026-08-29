<?php

namespace App\Models;

use App\Models\Traits\HasAuditColumns;
use Database\Factories\GalleryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Gallery extends Model
{
    /** @use HasFactory<GalleryFactory> */
    use HasFactory, HasAuditColumns, SoftDeletes;

    protected $fillable = [
        'division_id',
        'category_id',
        'title',
        'description',
        'cover_url',
        'cover_public_id',
        'event_date',
        'location',
        'is_published',
        'sort_order',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(GalleryItem::class);
    }
}
