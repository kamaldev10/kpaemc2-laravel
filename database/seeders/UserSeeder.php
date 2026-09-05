<?php

namespace Database\Seeders;

use App\Enums\RoleTypeEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Superadmin Default
        User::updateOrCreate(
            ['email' => 'admin@kpa-emc2.org'],
            [
                'name' => 'Super Administrator',
                'password' => Hash::make('password'),
                'role' => RoleTypeEnum::SUPER_ADMIN,
                'avatar_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
                'avatar_public_id' => 'samples/people/smiling-man',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // 2. Editor Default
        User::updateOrCreate(
            ['email' => 'editor@kpa-emc2.org'],
            [
                'name' => 'Tim Redaksi EMC²',
                'password' => Hash::make('password'),
                'role' => RoleTypeEnum::EDITOR,
                'avatar_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/boy-snow-hoodie.jpg',
                'avatar_public_id' => 'samples/people/boy-snow-hoodie',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // 3. Admin Default (formerly committee)
        User::updateOrCreate(
            ['email' => 'panitia@kpa-emc2.org'],
            [
                'name' => 'Admin Kegiatan EMC²',
                'password' => Hash::make('password'),
                'role' => RoleTypeEnum::ADMIN,
                'avatar_url' => 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/kitchen-bar.jpg',
                'avatar_public_id' => 'samples/people/kitchen-bar',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
    }
}
