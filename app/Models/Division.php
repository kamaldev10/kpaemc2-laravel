<?php

namespace App\Models;

use App\Models\Traits\HasAuditColumns;
use Database\Factories\DivisionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Division extends Model
{
    /** @use HasFactory<DivisionFactory> */
    use HasFactory, HasAuditColumns;

    protected $fillable = [
        'slug',
        'name',
        'icon_name',
        'cover_url',
        'cover_public_id',
        'short_description',
        'full_description',
        'study_materials',
        'equipment',
        'sort_order',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'study_materials' => 'array',
            'equipment' => 'array',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function members(): HasMany
    {
        return $this->hasMany(Member::class);
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function galleries(): HasMany
    {
        return $this->hasMany(Gallery::class);
    }
}
