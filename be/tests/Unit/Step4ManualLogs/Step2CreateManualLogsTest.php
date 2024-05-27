<?php

use App\Models\User;
use App\Models\ManualLog;
use App\Models\File;
use Laravel\Sanctum\Sanctum;

it('can create a manual logs', function () {
    $operator = User::factory()->make(['type' => 1]);

    Sanctum::actingAs($operator);

    $mlogsData = [
        'user_id' => 1,
        'turret_id' => 1,
        'start_date' => '2024-05-07 00:00:00',
        'end_date' => '2024-05-07 00:00:00',
    ];

    $response = $this->postJson('api/mlogs', $mlogsData);

    $response->assertStatus(201)
    ->assertJsonStructure([
        'success',
        'message',
        'data' => [
            'id_manual_log',
            'user_id',
            'turret_id',
            'start_date',
            'end_date',
        ],
    ]);

    $this->assertDatabaseHas('manual_logs', [
        'user_id' => $mlogsData['user_id'],
        'turret_id' => $mlogsData['turret_id'],
        'start_date' => $mlogsData['start_date'],
        'end_date' => $mlogsData['end_date'],
    ]);

    $id = ManualLog::orderby('id_manual_log', 'desc')->first();
    $latest = ManualLog::find($id->id_manual_log);

    $latest->delete();
});

it('can send error message when validation failed', function () {
    $operator = User::factory()->make(['type' => 1]);

    Sanctum::actingAs($operator);

    $mlogsData = [
        'user_id' => '',
        'turret_id' => '',
        'start_date' => '',
        'end_date' => '',
    ];

    $response = $this->postJson('api/mlogs', $mlogsData);

    $response->assertStatus(403)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});

it('can send error message when accessed without authentication', function () {
    $mlogsData = [
        'user_id' => rand(1,3),
        'turret_id' => rand(1,3),
        'start_date' => '2024-05-07 00:00:00',
        'end_date' => '2024-05-07 00:00:00',
    ];

    $response = $this->withHeaders(['Accept' => 'application/json'])
                     ->postJson('api/mlogs', $mlogsData);

    $response->assertStatus(401)
    ->assertJsonStructure([
        'error',
        'message',
    ]);
});
