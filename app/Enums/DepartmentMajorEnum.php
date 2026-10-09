<?php

namespace App\Enums;

/**
 * Enum jurusan mahasiswa FMIPA Universitas Riau.
 */
enum DepartmentMajorEnum: string
{
    case SISTEM_INFORMASI = 'sistem_informasi';
    case MANAJEMEN_INFORMATIKA = 'manajemen_informatika';
    case BIOLOGI = 'biologi';
    case FISIKA = 'fisika';
    case KIMIA = 'kimia';
    case MATEMATIKA = 'matematika';
    case STATISTIKA = 'statistika';

    /**
     * Label manusiawi nama program studi / jurusan.
     */
    public function label(): string
    {
        return match ($this) {
            self::SISTEM_INFORMASI => 'Sistem Informasi',
            self::MANAJEMEN_INFORMATIKA => 'Manajemen Informatika',
            self::BIOLOGI => 'Biologi',
            self::FISIKA => 'Fisika',
            self::KIMIA => 'Kimia',
            self::MATEMATIKA => 'Matematika',
            self::STATISTIKA => 'Statistika',
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
