<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\MessageController;
use App\Http\Controllers\EmailSender;
use App\Http\Controllers\TeamsController;
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
    Route::post("/team",[TeamsController::class , 'store'])->name("team.store");
    Route::get("/team",[TeamsController::class , "index"])->name("user.team") ;
    Route::post("/sendMail" ,[EmailSender::class , "sendTeamInvite"])->name("mail.send") ;  
});

Route::post('/login', [AuthController::class, 'login'])->name('user.login');   
Route::get("/accept/{token}", function(Request $request, $token) {
    
    // Validate the token
    $accessToken = \Laravel\Sanctum\PersonalAccessToken::findToken($token);
    
    if (!$accessToken) {
        return response()->json(['error' => 'Invalid invitation token'], 401);
    }
    
    // Check if token is expired
    if ($accessToken->expires_at && $accessToken->expires_at->isPast()) {
        $accessToken->delete(); // Clean up expired token
        return response()->json(['error' => 'Invitation token has expired'], 401);
    }
    
    // Check if token has the right ability
    if (!$accessToken->can('team:join')) {
        return response()->json(['error' => 'Invalid token type'], 403);
    }
    
    // Get team ID from query params
    $teamId = $request->query('team_id');
    if (!$teamId) {
        return response()->json(['error' => 'Team ID is required'], 400);
    }
    
    $team = \App\Models\Team::find($teamId);
    if (!$team) {
        return response()->json(['error' => 'Team not found'], 404);
    }
    
    // Get the user who created the token (inviter)
    $inviter = $accessToken->tokenable;
    
    // Return invitation details for frontend to handle
    return response()->json([
        'message' => 'Valid invitation',
        'team' => $team,
        'inviter' => $inviter->name,
        'token' => $token,
        'expires_at' => $accessToken->expires_at
    ]);
});
