<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

it('can login as operator', function () {
    $data = [
        'name' => 'operator',
        'password' => '12121212',
    ];

    $response = $this->postJson('api/login', $data);

    $response->assertStatus(200)
    ->assertJsonStructure([
        'message',
        'type_id',
        'type_id',
        'token',
    ]);

    $this->assertAuthenticated();
});

it('can login as admin', function () {
    $data = [
        'name' => 'admin',
        'password' => '12121212',
    ];

    $response = $this->postJson('api/login', $data);

    $response->assertStatus(200)
    ->assertJsonStructure([
        'message',
        'type_id',
        'type_id',
        'token',
    ]);
});

it('can send error message when validation fails', function () {
    $data = [
        'name' => '',
        'password' => '',
    ];

    $response = $this->postJson('api/login', $data);

    $response->assertStatus(403)
    ->assertJsonStructure([
        'error',
        'message',
    ]);

});

it('can send error message when credentials is incorrect', function () {
    $data = [
        'name' => 'amogus',
        'password' => 'amogus',
    ];

    $response = $this->postJson('api/login', $data);

    $response->assertStatus(401)
    ->assertJsonStructure([
        'error',
        'message',
    ]);

});
