<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Str;

it('can create update user (with no pasword)', function () {
    $admin = User::factory()->make(['type' => 3]);

    Sanctum::actingAs($admin);

    $userData = [
        '_method' => 'PUT',
        'name' => Str::random(10),
        'type' => 3,
    ];

    $id = User::orderBy('id_user', 'desc')->first();

    $response = $this->post(route('users.update', $id->id_user), $userData);

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

    $this->assertDatabaseHas('users', [
        'name' => $userData['name'],
        'type' => $userData['type'],
    ]);
});

it('can create update user password', function () {
    $admin = User::factory()->make(['type' => 3]);

    Sanctum::actingAs($admin);

    $userData = [
        '_method' => 'PUT',
        'password' => Str::random(10),
    ];

    $id = User::orderBy('id_user', 'desc')->first();

    $response = $this->postJson('api/users/password/' . $id->id_user, $userData);

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

it('can send error message when validation failed (wihtout password)', function () {
    $admin = User::factory()->make(['type' => 3]);

    Sanctum::actingAs($admin);

    $userData = [
        '_method' => 'PUT',
        'name' => '',
        'type' => '',
    ];

    $id = User::orderBy('id_user', 'desc')->first();

    $response = $this->post(route('users.update', $id->id_user), $userData);

    $response->assertStatus(403)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});

it('can send error message when validation failed (with password)', function () {
    $admin = User::factory()->make(['type' => 3]);

    Sanctum::actingAs($admin);

    $userData = [
        '_method' => 'PUT',
        'password' => '',
    ];

    $id = User::orderBy('id_user', 'desc')->first();

    $response = $this->postJson('api/users/password/' . $id->id_user, $userData);

    $response->assertStatus(403)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});

it('can send error when trying access non existing user data id (without password)', function () {
    $admin = User::factory()->make(['type' => 3]);

    Sanctum::actingAs($admin);

    $userData = [
        '_method' => 'PUT',
        'name' => Str::random(10),
        'type' => 3,
    ];

    $response = $this->get(route('users.update', 99), $userData);

    $response->assertStatus(404)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});

it('can send error when trying access non existing user data id (with password)', function () {
    $admin = User::factory()->make(['type' => 3]);

    Sanctum::actingAs($admin);

    $userData = [
        '_method' => 'PUT',
        'name' => Str::random(10),
        'type' => 3,
    ];

    $response = $this->postJson('api/users/password/99', $userData);

    $response->assertStatus(404)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});

it('can send error message when accessed without authentication (with password)', function () {
    $userData = [
        '_method' => 'PUT',
        'name' => '11111111',
        'type' => 1,
        'password' => '12345678',
    ];

    $id = User::orderBy('id_user', 'desc')->first();

    $response = $this->withHeaders(['Accept' => 'application/json'])
                     ->post(route('users.update', $id->id_user), $userData);

    $response->assertStatus(401)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});

it('can send error message when accessed without authentication (without password)', function () {
    $userData = [
        '_method' => 'PUT',
        'password' => '12345678',
    ];

    $id = User::orderBy('id_user', 'desc')->first();

    $response = $this->withHeaders(['Accept' => 'application/json'])
                     ->postJson('api/users/password/' . $id->id_user, $userData);

    $response->assertStatus(401)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});
