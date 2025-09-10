<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index()
    { 
        $users = User::where("id", "!=", auth()->id())->get();
        return response()->json(['users' => $users], 200);
    }
}
