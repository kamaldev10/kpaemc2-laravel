<?php

namespace App\Models;

use App\Models\Traits\HasAuditColumns;
use App\Models\Traits\HasUuidKey;
use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
	/** @use HasFactory<EventFactory> */
	use HasFactory, HasAuditColumns, HasUuidKey;

	protected $fillable = [
		'slug',
		'category_id',
		'division_id',
		'title',
		'type',
		'description',
		'cover_url',
		'cover_public_id',
		'location',
		'start_date',
		'end_date',
		'registration_open_at',
		'registration_close_at',
		'max_participants',
		'requires_payment',
		'payment_amount',
		'form_fields',
		'tags',
		'is_published',
		'is_active',
		'created_by',
		'updated_by',
	];

	protected function casts(): array
	{
		return [
			'start_date' => 'datetime',
			'end_date' => 'datetime',
			'registration_open_at' => 'datetime',
			'registration_close_at' => 'datetime',
			'max_participants' => 'integer',
			'requires_payment' => 'boolean',
			'payment_amount' => 'decimal:2',
			'form_fields' => 'array',
			'tags' => 'array',
			'is_published' => 'boolean',
			'is_active' => 'boolean',
		];
	}

	public function category(): BelongsTo
	{
		return $this->belongsTo(Category::class);
	}

	public function division(): BelongsTo
	{
		return $this->belongsTo(Division::class);
	}

	public function registrations(): HasMany
	{
		return $this->hasMany(Registration::class);
	}

	public function isRegistrationOpen(): bool
	{
		$now = now();
		$open = $this->registration_open_at ? $now->gte($this->registration_open_at) : true;
		$closed = $this->registration_close_at ? $now->gt($this->registration_close_at) : false;

		return $open && !$closed && $this->is_published && $this->is_active;
	}
}
