<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\MessageController;
use App\Http\Controllers\EmailSender;
use App\Http\Controllers\TeamsController;
use App\Models\Team_Invite;
use App\Models\User;
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
Route::get("/accept/{token}", function(Request $request , $token){ 
   
    $invite_id = $request->query('invite_id'); 
    $invite = Team_Invite::where('token', $token)
        ->where('id', $invite_id)
        ->first();

    if (!$invite) {
        return response()->json(['error' => 'Invite not found.'], 404);
    }

    if ($invite->expire_date < now()) {
        return response()->json(['error' => 'Invite has expired.'], 410);
    } 
    $user = User::where('email', $invite->reciver_email)->first();

    if (!$user) {
        return response()->json(['error' => 'User with this email does not exist.'], 404);
    }

    // Attach user to the team
    $team = \App\Models\Team::find($invite->teamId);
    if (!$team) {
        return response()->json(['error' => 'Team not found.'], 404);
    }

    $team->users()->attach($user->id);

    return response()->json(['message' => 'User added to the team successfully.']);
    dd($request->all(), $token);
});
