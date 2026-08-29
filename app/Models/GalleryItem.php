<?php

namespace App\Models;

use App\Models\Traits\HasAuditColumns;
use App\Models\Traits\HasUuidKey;
use Database\Factories\GalleryItemFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class GalleryItem extends Model
{
	/** @use HasFactory<GalleryItemFactory> */
	use HasFactory, HasAuditColumns, SoftDeletes, HasUuidKey;

	protected $fillable = [
		'gallery_id',
		'cloudinary_public_id',
		'url',
		'type',
		'caption',
		'width',
		'height',
		'sort_order',
		'is_active',
		'created_by',
		'updated_by',
	];

	protected function casts(): array
	{
		return [
			'width' => 'integer',
			'height' => 'integer',
			'sort_order' => 'integer',
			'is_active' => 'boolean',
		];
	}

	public function gallery(): BelongsTo
	{
		return $this->belongsTo(Gallery::class);
	}
}
