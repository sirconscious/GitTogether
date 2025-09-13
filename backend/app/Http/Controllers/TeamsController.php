<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamsController extends Controller
{
    public function index()
    {
        // Get all teams that the authenticated user belongs to
        $teams = auth()->user()->teams;
        
        return response()->json($teams);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "description" => "required"
        ]);

        $team = Team::create($validated);
        
        // Attach the user to the team (many-to-many)
        auth()->user()->teams()->attach($team->id);
        
        return response()->json($team, 201);
    }
    
    public function join(Request $request, Team $team)
    {
        $user = auth()->user();
        
        // Check if user is already a member
        if ($user->teams()->where('team_id', $team->id)->exists()) {
            return response()->json(['message' => 'Already a member of this team'], 400);
        }
        
        // Add user to team
        $user->teams()->attach($team->id);
        
        return response()->json(['message' => 'Successfully joined team'], 200);
    }
    
    public function leave(Request $request, Team $team)
    {
        $user = auth()->user();
        
        // Check if user is a member
        if (!$user->teams()->where('team_id', $team->id)->exists()) {
            return response()->json(['message' => 'Not a member of this team'], 400);
        }
        
        // Remove user from team
        $user->teams()->detach($team->id);
        
        return response()->json(['message' => 'Successfully left team'], 200);
    }
    
    public function show(Team $team)
    {
        // Load team with its members
        $team->load('users');
        
        return response()->json($team);
    }
    
    public function allTeams()
    {
        // Get all teams (for browsing/joining)
        $teams = Team::withCount('users')->get();
        
        return response()->json($teams);
    }
}