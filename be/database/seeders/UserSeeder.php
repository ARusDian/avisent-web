<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'operator',
            'password' => Hash::make('12121212'),
            'type' => '1',
        ]);

        User::create([
            'name' => 'alat',
            'password' => Hash::make('12121212'),
            'type' => '2',
        ]);

        User::create([
            'name' => 'admin',
            'password' => Hash::make('12121212'),
            'type' => '3',
        ]);
    }
}
