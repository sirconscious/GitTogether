<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use SendGrid\Mail\Mail;

class EmailSender extends Controller
{
    public function index(Request $request)
    {
        $reciverMail = $request->email;
        $htmlContent = view('Email.template', [
            'inviterName' => 'GitTogether',
            'teamName' => 'Dev Team',
            'link' => 'http://localhost:5173/',
            'companyName' => 'GitTogether'
        ])->render();

        $email = new Mail();
        $email->setFrom(
            config('services.sendgrid.from_email'),
            config('services.sendgrid.from_name')
        );
        $email->setSubject("Team invite");
        $email->addTo($reciverMail, "User");
        $email->addContent("text/html", $htmlContent); // Correct usage

        $sendgrid = new \SendGrid(env('SENDGRID_API_KEY'));

        try {
            $response = $sendgrid->send($email);
            print $response->statusCode() . "\n";
            print_r($response->headers());
            print $response->body() . "\n";
        } catch (\Exception $e) {
            echo 'Caught exception: ' . $e->getMessage() . "\n";
        }
    }
}
