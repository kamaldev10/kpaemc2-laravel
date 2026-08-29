<?php

namespace App\Models;

use App\Models\Traits\HasAuditColumns;
use App\Models\Traits\HasUuidKey;
use Database\Factories\CategoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
	/** @use HasFactory<CategoryFactory> */
	use HasFactory, HasAuditColumns, HasUuidKey;

	protected $fillable = [
		'slug',
		'name',
		'type',
		'color',
		'sort_order',
		'is_active',
		'created_by',
		'updated_by',
	];

	protected function casts(): array
	{
		return [
			'sort_order' => 'integer',
			'is_active' => 'boolean',
		];
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
