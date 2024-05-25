<?php

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('can create a log', function () {
    $filePath = storage_path('app\public\dummies\test_image.jpg');
    $file = new UploadedFile($filePath, 'test_image.jpg', 'image/jpeg', null, true);

    $logData = [
        'path' => $file,
        'turret_id' => 1,
        'location' => Str::random(10),
        'object_type' => 'Bird',
        'shot_date' => '2024-05-07 00:00:00',
    ];

    Storage::fake('public/dummies');

    $response = $this->postJson('api/logs', $logData);

    $response->assertStatus(201)
    ->assertJsonStructure([
        'success',
        'message',
        'data' => [
            'turret_id',
            'image_id',
            'location',
            'object_type',
            'shot_date',
            'id_log',
        ],
    ]);

    $this->assertDatabaseHas('logs', [
        'turret_id' => $logData['turret_id'],
        'location' => $logData['location'],
        'object_type' => $logData['object_type'],
        'shot_date' => $logData['shot_date'],
    ]);
});

it('can send error message when validation failed', function () {
    $logData = [
        'path' => '',
        'turret_id' => '',
        'location' => '',
        'object_type' => '',
        'shot_date' => '',
    ];

    $response = $this->postJson('api/logs', $logData);

    $response->assertStatus(403)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});
