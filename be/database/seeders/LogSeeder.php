<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Log;
use App\Models\File;

class LogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        File::create([
            'path' => 'bird1.jpg',
            'type' => 'jpg',
        ]);

        Log::create([
            'turret_id' => 1,
            'image_id' => 4,
            'location' => 'Sawah 1',
            'object_type' => 'Bird',
            'shot_date' => '2024-05-07 00:00:00',
        ]);

        File::create([
            'path' => 'bird2.jpg',
            'type' => 'jpg',
        ]);

        Log::create([
            'turret_id' => 2,
            'image_id' => 5,
            'location' => 'Sawah 2',
            'object_type' => 'Bird',
            'shot_date' => '2024-05-07 00:00:00',
        ]);

        File::create([
            'path' => 'bird3.jpg',
            'type' => 'jpg',
        ]);

        Log::create([
            'turret_id' => 3,
            'image_id' => 6,
            'location' => 'Sawah 3',
            'object_type' => 'Bird',
            'shot_date' => '2024-05-07 00:00:00',
        ]);
    }
}
