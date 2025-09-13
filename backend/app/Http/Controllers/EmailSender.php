<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use SendGrid\Mail\Mail;

class EmailSender extends Controller
{
    public function sendTeamInvite(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'team_id' => 'required|exists:teams,id'
        ]);
        
        $receiverMail = $request->email;
        $team = Team::findOrFail($request->team_id);
        
        $user = auth()->user();
        $token = $user->createToken('team-invite', ['team:join'], now()->addHours(3));
        
        // Include token in the link
        $inviteLink = "http://localhost:8000/api/accept/{$token->plainTextToken}?team_id={$team->id}";
        
        $htmlContent = view('Email.template', [
            'inviterName' => $user->name,
            'teamName' => $team->description, // or $team->name if you have that field
            'link' => $inviteLink,
            'companyName' => 'GitTogether',
            'expiresAt' => now()->addHours(3)->format('M j, Y g:i A')
        ])->render();

        $email = new Mail();
        $email->setFrom(
            config('services.sendgrid.from_email'),
            config('services.sendgrid.from_name')
        );
        $email->setSubject("You're invited to join {$team->description} on GitTogether");
        $email->addTo($receiverMail, "User");
        $email->addContent("text/html", $htmlContent);

        $sendgrid = new \SendGrid(env('SENDGRID_API_KEY'));

        try {
            $response = $sendgrid->send($email);
            
            return response()->json([
                'message' => 'Invitation sent successfully',
                'status_code' => $response->statusCode()
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to send invitation',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}