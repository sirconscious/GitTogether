<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function () {
    return view('welcome');
});

// Wrap your OAuth routes in web middleware
Route::middleware(['web'])->group(function () {
    Route::get("/auth/google/redirect", function (Request $request) {
        return Socialite::driver("google")->redirect();
    });
    
    Route::get("/auth/github/redirect", function (Request $request) {
        return Socialite::driver("github")->redirect();
    });

    Route::get("/auth/google/callback", function (Request $request) {
        try {
            $googleUser = Socialite::driver("google")->user();
            $user = User::updateOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'google_id' => $googleUser->getId(),
                    'password' => bcrypt(uniqid()), // Generate a random password
                ]
            );

            // Log the user in
            Auth::login($user);
            $token = $user->createToken('google')->plainTextToken;

            // Return the redirect with proper syntax
            return redirect(env('FRONTEND_URL', 'http://localhost:5173') . '/dashboard?token=' . $token);
            
        } catch (\Laravel\Socialite\Two\InvalidStateException $e) {
            // Redirect back to login or handle the error
            return redirect('/auth/google/redirect');
        } catch (\Exception $e) {
            // Handle other potential errors
            return redirect('/')->with('error', 'Authentication failed');
        }
    });

    Route::get("/auth/github/callback", function (Request $request) {
        try {
            $githubUser = Socialite::driver("github")->user();
            $user = User::updateOrCreate(
                ['email' => $githubUser->getEmail()],
                [
                    'name' => $githubUser->getName(),
                    'github_id' => $githubUser->getId(),
                    'password' => bcrypt(uniqid()), // Generate a random password
                ]
            );

            // Log the user in
            Auth::login($user);
            $token = $user->createToken('github')->plainTextToken;
            // Return the redirect with proper syntax
            return redirect(env('FRONTEND_URL', 'http://localhost:5173') . '/dashboard?token=' . $token);
            
        } catch (\Laravel\Socialite\Two\InvalidStateException $e) {
            // Redirect back to login or handle the error
            return redirect('/auth/github/redirect');
        } catch (\Exception $e) {
            // Handle other potential errors
            return redirect('/')->with('error', 'Authentication failed');
        }
    });
});