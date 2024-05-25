<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Turret;
use App\Models\File;

class TurretSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        File::create([
            'path' => 'turret1.jpg',
            'type' => 'jpg',
        ]);

        Turret::create([
            'image_id' => 1,
            'description' => 'Turret yg lg di sawah 1',
            'server_url' => 'secret-url-1',
            'turret_url' => 'turret_url-1',
            'location' => 'Sawah 1',
        ]);

        File::create([
            'path' => 'turret2.jpg',
            'type' => 'jpg',
        ]);

        Turret::create([
            'image_id' => 2,
            'description' => 'Turret yg lg di sawah 2',
            'server_url' => 'secret-url-2',
            'turret_url' => 'turret_url-2',
            'location' => 'Sawah 2',
        ]);

        File::create([
            'path' => 'turret3.jpg',
            'type' => 'jpg',
        ]);

        Turret::create([
            'image_id' => 3,
            'description' => 'Turret yg lg di sawah 3',
            'server_url' => 'secret-url-3',
            'turret_url' => 'turret_url-3',
            'location' => 'Sawah 3',
        ]);
    }
}
