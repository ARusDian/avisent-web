<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;

it('can get all turrets data', function () {
    $operator = User::factory()->make(['type' => 1]);

    Sanctum::actingAs($operator);

    $response = $this->get(route('turrets.index'));

    $response->assertStatus(200)
    ->assertJsonStructure([
        'success',
        'message',
        'data' => [
            '*' => [
                'id_turret',
                'turret_image',
                'description',
                'secret_url',
                'turret_url',
                'location',
            ],
        ],
    ]);
});

it('can get turret data by id', function () {
    $operator = User::factory()->make(['type' => 1]);

    Sanctum::actingAs($operator);

    $response = $this->get(route('turrets.show', 1));

    $response->assertStatus(200)
    ->assertJsonStructure([
        'success',
        'message',
        'data' => [
            'id_turret',
            'turret_image',
            'description',
            'secret_url',
            'turret_url',
            'location',
        ],
    ]);
});

it('can send error when trying access non existing turret data id', function () {
    $operator = User::factory()->make(['type' => 1]);

    Sanctum::actingAs($operator);

    $response = $this->get(route('turrets.show', 99));

    $response->assertStatus(404)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});

it('can send error message when accessed without authentication', function () {
    $response = $this->withHeaders(['Accept' => 'application/json'])
                     ->get(route('turrets.show', 99));

    $response->assertStatus(401)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});
