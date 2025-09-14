<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\Team_Invite;
use Illuminate\Http\Request;
use SendGrid\Mail\Mail;
use Illuminate\Support\Str;
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
        $token = Str::random(16);
        $invite= Team_Invite::create([
            "sender_id" => auth()->user()->id,
            "reciver_email"=>$receiverMail ,
            "token" =>$token , 
            "teamId" => $team->id,
            "expire_date" => now()->addHours(6)
        ]) ;
        // Include token in the link
        $inviteLink = "http://localhost:8000/api/accept/{$token}?invite_id={$invite->id}";
        
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