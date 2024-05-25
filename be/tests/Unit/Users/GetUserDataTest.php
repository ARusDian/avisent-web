<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Str;

it('can get all users data', function () {
    $admin = User::factory()->make(['type' => 3]);

    Sanctum::actingAs($admin);

    $response = $this->get(route('users.index'));

    $response->assertStatus(200)
    ->assertJsonStructure([
        'success',
        'message',
        'data' => [
            '*' => [
                'id_user',
                'name',
                'type',
                'password',
            ],
        ],
    ]);
});

it('can get user data by id', function () {
    $admin = User::factory()->make(['type' => 3]);

    Sanctum::actingAs($admin);

    $response = $this->get(route('users.show', 1));

    $response->assertStatus(200)
    ->assertJsonStructure([
        'success',
        'message',
        'data' => [
            'id_user',
            'name',
            'type',
            'password',
        ],
    ]);
});

it('can send error when trying access non existing user data id', function () {
    $admin = User::factory()->make(['type' => 3]);

    Sanctum::actingAs($admin);

    $response = $this->get(route('users.show', 99));

    $response->assertStatus(404)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});

it('can send error message when accessed without authentication', function () {
    $response = $this->withHeaders(['Accept' => 'application/json'])
                     ->get(route('users.show', 1));

    $response->assertStatus(401)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});
