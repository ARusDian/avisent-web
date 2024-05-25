<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TurretController;
use App\Http\Controllers\Api\LogController;
use App\Http\Controllers\Api\ManualLogController;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// Authenticated user
Route::middleware(['auth:sanctum'])->group( function () {
    Route::post('logout', [AuthController::class, 'logout']);
});

// Operator
Route::middleware(['auth:sanctum', 'user-access:1'])->group( function () {
    Route::apiResource('turrets', TurretController::class);
    Route::post('mlogs', [ManualLogController::class, 'store']);
    Route::get('logs', [LogController::class, 'index']);
});

// Turret
Route::post('logs', [LogController::class, 'store']);

// Admin
Route::middleware(['auth:sanctum', 'user-access:3'])->group( function () {
    Route::apiResource('users', UserController::class);
    Route::get('mlogs', [ManualLogController::class, 'index']);
    Route::put('users/password/{user}', [UserController::class, 'pass_edit']);
});
