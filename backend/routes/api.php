<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'Register'])->name('user.register'); 
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('user.logout'); 
    Route::get('/me', [AuthController::class, 'me'])->name('user.me'); 
    Route::get('/users', [App\Http\Controllers\UsersController::class, 'index'])->name('users.index');

    Route::get("/chat/{id}", [MessageController::class, "chat"])->name("user.chat");
    Route::post('/chat', [MessageController::class, 'store'])->name('user.chat.store');
});

Route::post('/login', [AuthController::class, 'login'])->name('user.login');  