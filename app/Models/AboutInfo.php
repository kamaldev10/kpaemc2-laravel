<?php

namespace App\Models;

use App\Models\Traits\HasAuditColumns;
use App\Models\Traits\HasUuidKey;
use App\Services\CloudinaryService;
use Database\Factories\AboutInfoFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutInfo extends Model
{
    /** @use HasFactory<AboutInfoFactory> */
    use HasFactory, HasAuditColumns, HasUuidKey;

    protected $fillable = [
        'org_name',
        'founded_date',
        'motto',
        'description',
        'vision',
        'mission',
        'active_term',
        'org_structure',
        'logo_url',
        'logo_public_id',
        'cover_url',
        'cover_public_id',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'mission' => 'array',
            'org_structure' => 'array',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get the logo URL dynamically via CloudinaryService if public ID is present or return stored URL.
     */
    public function getLogoUrlAttribute(?string $value): ?string
    {
        if (! empty($value)) {
            return $value;
        }

        if (! empty($this->logo_public_id)) {
            return app(CloudinaryService::class)->url($this->logo_public_id);
        }

        return null;
    }
}
