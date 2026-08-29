<?php

namespace App\Models\Traits;

use App\Models\Builders\UuidEloquentBuilder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Str;

trait HasUuidKey
{
    use HasUuids;

    /**
     * Create a new Eloquent query builder for the model with UUID safe guards.
     */
    public function newEloquentBuilder($query)
    {
        return new UuidEloquentBuilder($query);
    }

    /**
     * Retrieve the model for a bound value with UUID validation.
     */
    public function resolveRouteBindingQuery($query, $value, $field = null)
    {
        $field = $field ?? $this->getRouteKeyName();
        if ($field === $this->getKeyName() && (! is_scalar($value) || ! Str::isUuid((string) $value))) {
            return $query->whereRaw('1 = 0');
        }

        return parent::resolveRouteBindingQuery($query, $value, $field);
    }
}
