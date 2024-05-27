<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;

it('can delete a user', function () {
    $admin = User::factory()->make(['type' => 3]);

    Sanctum::actingAs($admin);

    $id = User::orderBy('id_user', 'desc')->first();

    $response = $this->delete(route('users.destroy', $id->id_user));

    $response->assertStatus(200)
    ->assertJsonStructure([
        'success',
        'message',
        'data' => [
            'id_user',
            'name',
            'password',
            'type',
        ],
    ]);
});

it('can send error when trying delete non existing user data id', function () {
    $admin = User::factory()->make(['type' => 3]);

    Sanctum::actingAs($admin);

    $response = $this->get(route('users.destroy', 99));

    $response->assertStatus(404)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});

it('can send error message when accessed without authentication', function () {
    $id = User::orderBy('id_user', 'desc')->first();

    $response = $this->withHeaders(['Accept' => 'application/json'])
                     ->delete(route('turrets.destroy', $id->id_user));

    $response->assertStatus(401)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});
