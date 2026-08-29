<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            DivisionSeeder::class,
            CategorySeeder::class,
            AboutInfoSeeder::class,
            MemberSeeder::class,
            PostSeeder::class,
            GallerySeeder::class,
            EventSeeder::class,
            RegistrationSeeder::class,
            ContactSeeder::class,
            SiteSettingSeeder::class,
        ]);
    }
}
