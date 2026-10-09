<?php

namespace App\Enums;

/**
 * Enum status keanggotaan KPA EMC².
 */
enum MemberStatusEnum: string
{
    case REGULAR = 'regular';
    case HONORARY = 'honorary';
    case INACTIVE = 'inactive';

    /**
     * Label manusiawi untuk status keanggotaan.
     */
    public function label(): string
    {
        return match ($this) {
            self::REGULAR => 'Anggota Biasa',
            self::HONORARY => 'Anggota Luar Biasa',
            self::INACTIVE => 'Non Aktif',
        };
    }

    /**
     * Ambil array seluruh nilai value enum.
     *
     * @return array<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
