<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;

it('can logout as operator', function () {
    $operator = User::where('id_user', 3)->firstOrFail();
    $token = $operator->createToken('TestToken')->plainTextToken;

    $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token,])
                     ->postJson('api/logout');

    $response->assertStatus(200)
    ->assertJsonStructure([
        'message',
    ]);
});

it('can logout as admin', function () {
    $admin = User::where('id_user', 3)->firstOrFail();
    $token = $admin->createToken('TestToken')->plainTextToken;

    $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token,])
                     ->postJson('api/logout');

    $response->assertStatus(200)
    ->assertJsonStructure([
        'message',
    ]);
});

it('can send error message when accessed without authentication', function () {
    $response = $this->withHeaders(['Accept' => 'application/json'])
                     ->postJson('api/logout');

    $response->assertStatus(401)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});
