<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('can update turret data (with image)', function () {
    $operator = User::factory()->make(['type' => 1]);

    Sanctum::actingAs($operator);

    $filePath = storage_path('app\public\dummies\test_image.jpg');
    $file = new UploadedFile($filePath, 'test_image.jpg', 'image/jpeg', null, true);

    $turretData = [
        '_method' => 'PATCH',
        'path' => $file,
        'description' => Str::random(10),
        'secret_key' => Str::random(10),
        'location' => Str::random(10),
    ];

    $response = $this->post(route('turrets.update', 4), $turretData);

    $response->assertStatus(200)
    ->assertJsonStructure([
        'success',
        'message',
        'data' => [
            'id_turret',
            'image_id',
            'description',
            'secret_key',
            'location',
            'file' =>[
                'id_file',
                'path',
                'type',
            ],
        ],
    ]);

    $this->assertDatabaseHas('turrets', [
        'description' => $turretData['description'],
        'secret_key' => $turretData['secret_key'],
        'location' => $turretData['location'],
    ]);
});

it('can update turret data (without image)', function () {
    $operator = User::factory()->make(['type' => 1]);

    Sanctum::actingAs($operator);

    $turretData = [
        '_method' => 'PATCH',
        'description' => Str::random(10),
        'secret_key' => Str::random(10),
        'location' => Str::random(10),
    ];

    $response = $this->post(route('turrets.update', 4), $turretData);

    $response->assertStatus(200)
    ->assertJsonStructure([
        'success',
        'message',
        'data' => [
            'id_turret',
            'image_id',
            'description',
            'secret_key',
            'location',
            'file' =>[
                'id_file',
                'path',
                'type',
            ],
        ],
    ]);

    $this->assertDatabaseHas('turrets', [
        'description' => $turretData['description'],
        'secret_key' => $turretData['secret_key'],
        'location' => $turretData['location'],
    ]);
});

it('can send error message when validation failed', function () {
    $operator = User::factory()->make(['type' => 1]);

    Sanctum::actingAs($operator);

    $turretData = [
        '_method' => 'PATCH',
        'path' => '',
        'description' => '',
        'secret_key' => '',
        'location' => '',
    ];

    $response = $this->post(route('turrets.update', 4), $turretData);

    $response->assertStatus(403)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});

it('can send error when trying access non existing turret data id', function () {
    $operator = User::factory()->make(['type' => 1]);

    Sanctum::actingAs($operator);

    $turretData = [
        '_method' => 'PATCH',
        'description' => Str::random(10),
        'secret_key' => Str::random(10),
        'location' => Str::random(10),
    ];

    $response = $this->post(route('turrets.update', 99), $turretData);

    $response->assertStatus(404)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});

it('can send error message when accessed without authentication (without password)', function () {
    $turretData = [
        '_method' => 'PATCH',
        'description' => Str::random(10),
        'secret_key' => Str::random(10),
        'location' => Str::random(10),
    ];

    $response = $this->withHeaders(['Accept' => 'application/json'])
                     ->post(route('turrets.update', 4), $turretData);

    $response->assertStatus(401)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});
