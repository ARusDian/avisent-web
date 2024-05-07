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

Route::middleware(['auth:sanctum'])->group( function () {
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:sanctum', 'user-access:1'])->group( function () {
    Route::get('/logs', [LogController::class, 'index']);
});

Route::middleware(['auth:sanctum', 'user-access:2'])->group( function () {

});

Route::middleware(['auth:sanctum', 'user-access:3'])->group( function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('turrets', TurretController::class);
    Route::get('/mlogs', [ManualLogController::class, 'index']);
});
