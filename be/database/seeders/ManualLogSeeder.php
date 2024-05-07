<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ManualLog;

class ManualLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ManualLog::create([
            'user_id' => 1,
            'turret_id' => 1,
            'start_date' => '2024-05-07 00:00:00',
            'end_date' => '2024-05-07 00:00:00',
        ]);

        ManualLog::create([
            'user_id' => 1,
            'turret_id' => 2,
            'start_date' => '2024-05-07 00:00:00',
            'end_date' => '2024-05-07 00:00:00',
        ]);
        ManualLog::create([
            'user_id' => 1,
            'turret_id' => 3,
            'start_date' => '2024-05-07 00:00:00',
            'end_date' => '2024-05-07 00:00:00',
        ]);
    }
}
