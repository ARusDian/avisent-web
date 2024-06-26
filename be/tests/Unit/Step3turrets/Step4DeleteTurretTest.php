<?php

use App\Models\User;
use App\Models\Turret;
use Laravel\Sanctum\Sanctum;

it('can delete a turret', function () {
    $operator = User::factory()->make(['type' => 1]);

    Sanctum::actingAs($operator);

    $id = Turret::orderBy('id_turret', 'desc')->first();

    $response = $this->delete(route('turrets.destroy', $id->id_turret));

    $response->assertStatus(200)
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
            'file' => [
                'id_file',
                'path',
                'type',
            ],
        ],
    ]);
});

it('can send error when trying access non existing turret data id', function () {
    $operator = User::factory()->make(['type' => 1]);

    Sanctum::actingAs($operator);

    $response = $this->get(route('turrets.destroy', 99));

    $response->assertStatus(404)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});

it('can send error message when accessed without authentication', function () {
    $id = Turret::orderBy('id_turret', 'desc')->first();

    $response = $this->withHeaders(['Accept' => 'application/json'])
                     ->delete(route('turrets.destroy', $id->id_turret));

    $response->assertStatus(401)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});
