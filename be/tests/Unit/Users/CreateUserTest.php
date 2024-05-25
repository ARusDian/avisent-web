<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Str;

it('can create an user', function () {
    $admin = User::factory()->make(['type' => 3]);

    Sanctum::actingAs($admin);

    $userData = [
        'name' => Str::random(10),
        'type' => 1,
        'password' => '12345678',
    ];

    $response = $this->post(route('users.store'), $userData);

    $response->assertStatus(201)
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

    $this->assertDatabaseHas('users', [
        'name' => $userData['name'],
        'type' => $userData['type'],
    ]);
});

it('can send error message when validation failed', function () {
    $admin = User::factory()->make(['type' => 3]);

    Sanctum::actingAs($admin);

    $userData = [
        'name' => '',
        'type' => '',
        'password' => '',
    ];

    $response = $this->post(route('users.store'), $userData);

    $response->assertStatus(403)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});

it('can send error message when accessed without authentication', function () {
    $userData = [
        'name' => '11111111',
        'type' => 1,
        'password' => '12345678',
    ];

    $response = $this->withHeaders(['Accept' => 'application/json'])
                     ->post(route('users.store'), $userData);

    $response->assertStatus(401)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});
