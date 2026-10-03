<?php

namespace App\Support;

use Illuminate\Database\Migrations\MigrationCreator;

class CustomMigrationCreator extends MigrationCreator
{
    /**
     * Get the date and sequence prefix for the migration (format: YYYYMMDD_XXXX).
     */
    protected function getDatePrefix(): string
    {
        $date = date('Ymd');

        // Look up all existing migration files to determine the next sequential 4-digit number
        $migrationFiles = glob(database_path('migrations/*.php')) ?: [];
        $maxSequence = 0;

        foreach ($migrationFiles as $file) {
            $filename = basename($file);
            if (preg_match('/^\d{8}_(\d{4})_/', $filename, $matches)) {
                $maxSequence = max($maxSequence, (int) $matches[1]);
            }
        }

        $nextSequence = str_pad((string) ($maxSequence + 1), 4, '0', STR_PAD_LEFT);

        return "{$date}_{$nextSequence}";
    }
}
