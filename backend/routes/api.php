<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Sanctum CSRF route (harus sebelum middleware auth)
Route::get('/sanctum/csrf-cookie', function (Request $request) {
    return response()->json(['message' => 'CSRF cookie set']);
});

// Protected routes dengan Sanctum
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // CRUD Items
    Route::apiResource('items', ItemController::class);
});

// Fallback untuk API route yang tidak ditemukan
Route::fallback(function () {
    return response()->json([
        'message' => 'API endpoint not found'
    ], 404);
});