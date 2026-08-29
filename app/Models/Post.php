<?php

namespace App\Models;

use App\Models\Traits\HasAuditColumns;
use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    /** @use HasFactory<PostFactory> */
    use HasFactory, HasAuditColumns, SoftDeletes;

    protected $fillable = [
        'user_id',
        'category_id',
        'division_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'content_source',
        'cover_image_url',
        'cover_image_public_id',
        'cover_image_source',
        'author_name',
        'tags',
        'is_featured',
        'is_published',
        'published_at',
        'post_date',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'published_at' => 'datetime',
            'post_date' => 'datetime',
            'is_active' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true)->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true)->published();
    }
}
