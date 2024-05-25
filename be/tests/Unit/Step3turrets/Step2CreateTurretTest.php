<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('can create a turret', function () {
    $operator = User::factory()->make(['type' => 1]);

    Sanctum::actingAs($operator);

    $filePath = storage_path('app\public\dummies\test_image.jpg');
    $file = new UploadedFile($filePath, 'test_image.jpg', 'image/jpeg', null, true);

    $turretData = [
        'path' => $file,
        'description' => Str::random(10),
        'server_url' => Str::random(10),
        'turret_url' => Str::random(10),
        'location' => Str::random(10),
    ];

    Storage::fake('public/dummies');

    $response = $this->post(route('turrets.store'), $turretData);

    $response->assertStatus(201)
    ->assertJsonStructure([
        'success',
        'message',
        'data' => [
            'id_turret',
            'image_id',
            'description',
            'server_url',
            'turret_url',
            'location',
        ],
    ]);

    $this->assertDatabaseHas('turrets', [
        'description' => $turretData['description'],
        'server_url' => $turretData['server_url'],
        'turret_url' => $turretData['turret_url'],
        'location' => $turretData['location'],
    ]);
});

it('can send error message when validation failed', function () {
    $operator = User::factory()->make(['type' => 1]);

    Sanctum::actingAs($operator);

    $turretData = [
        'path' => '',
        'description' => '',
        'server_url' => '',
        'turret_url' => '',
        'location' => '',
    ];

    $response = $this->post(route('turrets.store'), $turretData);

    $response->assertStatus(403)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});

it('can send error message when accessed without authentication', function () {
    $turretData = [
        'path' => Str::random(10),
        'description' => Str::random(10),
        'server_url' => Str::random(10),
        'turret_url' => Str::random(10),
        'location' => Str::random(10),
    ];

    $response = $this->withHeaders(['Accept' => 'application/json'])
                     ->post(route('turrets.store'), $turretData);

    $response->assertStatus(401)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});
