<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;

it('can get all manual logs data', function () {
    $admin = User::factory()->make(['type' => 3]);

    Sanctum::actingAs($admin);

    $response = $this->getJson('/api/mlogs');

    $response->assertStatus(200)
    ->assertJsonStructure([
        'success',
        'message',
        'data' => [
            '*' => [
                'id_manual_log',
                'id_user',
                'user_name',
                'id_turret',
                'turret_image',
                'turret_description',
                'turret_secret_key',
                'turret_location',
                'start_date',
                'end_date',
            ],
        ],
    ]);
});

it('can send error message when accessed without authentication', function () {
    $response = $this->withHeaders(['Accept' => 'application/json'])
                     ->getJson('/api/mlogs');

    $response->assertStatus(401)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});
