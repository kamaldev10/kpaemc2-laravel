<?php

namespace App\Models\Builders;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class UuidEloquentBuilder extends Builder
{
    /**
     * Add a where clause on the primary key to the query, safely guarding non-UUID values.
     */
    public function whereKey($id)
    {
        if (is_array($id) || $id instanceof Arrayable) {
            $validUuids = array_filter((array) $id, fn ($val) => is_scalar($val) && Str::isUuid((string) $val));
            if (empty($validUuids)) {
                $this->query->whereRaw('1 = 0');
                return $this;
            }
            return parent::whereKey($validUuids);
        }

        if (! is_scalar($id) || ! Str::isUuid((string) $id)) {
            $this->query->whereRaw('1 = 0');
            return $this;
        }

        return parent::whereKey((string) $id);
    }

    /**
     * Add a basic where clause to the query, intercepting primary key lookups with invalid UUIDs.
     */
    public function where($column, $operator = null, $value = null, $boolean = 'and')
    {
        if (is_string($column)) {
            $keyName = $this->model ? $this->model->getKeyName() : 'id';
            $qualifiedKeyName = $this->model ? $this->model->getQualifiedKeyName() : "{$this->model->getTable()}.id";
            $tableKeyName = $this->model ? "{$this->model->getTable()}.{$keyName}" : "users.id";

            $isKeyLookup = in_array($column, [$keyName, $qualifiedKeyName, $tableKeyName], true);

            if ($isKeyLookup) {
                // If called with 2 arguments (e.g. where('id', '1'))
                $targetVal = func_num_args() === 2 ? $operator : $value;
                $targetOp = func_num_args() === 2 ? '=' : $operator;

                if (in_array($targetOp, ['=', '=='], true) && (! is_scalar($targetVal) || ! Str::isUuid((string) $targetVal))) {
                    $this->query->whereRaw('1 = 0');
                    return $this;
                }
            }
        }

        return parent::where($column, $operator, $value, $boolean);
    }
}
