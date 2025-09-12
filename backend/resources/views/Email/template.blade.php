<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Team Invitation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .email-container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #2c3e50;
            margin: 0;
        }
        .invite-button {
            display: inline-block;
            background-color: #3498db;
            color: #ffffff;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
        }
        .invite-button:hover {
            background-color: #2980b9;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #666;
        }
        .highlight {
            background-color: #f39c12;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class='email-container'>
        <div class='header'>
            <h1>🎉 You're Invited!</h1>
        </div>
        
        <p>Hello!</p>
        
        <p>Great news! <strong>{{ $inviterName }}</strong> has invited you to join the <span class='highlight'>{{ $teamName }}</span> team.</p>
        
        <p>You've been selected to collaborate with an amazing group of people. Join us to:</p>
        <ul>
            <li>Collaborate on exciting projects</li>
            <li>Share knowledge and expertise</li>
            <li>Be part of a dynamic team environment</li>
        </ul>
        
        <p style='text-align: center;'>
            <a href="{{ $link }}" class='invite-button'>Accept Invitation</a>
        </p>
        
        <p><strong>What happens next?</strong></p>
        <p>Once you click the button above, you'll be able to set up your account and start collaborating with your new team immediately.</p>
        
        <p>If you have any questions, feel free to reach out to {{ $link }} or our support team.</p>
        
        <p>Welcome aboard!</p>
        
        <div class='footer'>
            <p>This invitation was sent by {{ $companyName }}. If you believe you received this email in error, please contact our support team.</p>
            <p>This invitation link will expire in 7 days for security purposes.</p>
        </div>
    </div>
</body>
</html>
