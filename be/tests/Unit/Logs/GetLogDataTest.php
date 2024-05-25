<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;

it('can get all logs data', function () {
    $operator = User::factory()->make(['type' => 1]);

    Sanctum::actingAs($operator);

    $response = $this->getJson('/api/logs');

    $response->assertStatus(200)
    ->assertJsonStructure([
        'success',
        'message',
        'data' => [
            '*' => [
                'id_log',
                'turret_id',
                'image',
                'location',
                'object_type',
                'shot_date',
            ],
        ],
    ]);
});

it('can send error message when accessed without authentication', function () {
    $response = $this->withHeaders(['Accept' => 'application/json'])
                     ->getJson('/api/logs');

    $response->assertStatus(401)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});
