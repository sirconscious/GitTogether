<?php

namespace App\Http\Controllers\API;

use App\Events\MessageEvent;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
   public function chat(Request $request , $id)
    {
        $senderId = auth()->id();
        $reciver = User::find($id); 
        $messages = Message::where(function($query) use ($senderId, $id) {
            $query->where('senderId', $senderId)
                  ->where('reciverId', $id);
        })->orWhere(function($query) use ($senderId, $id) {
            $query->where('senderId', $id)
                  ->where('reciverId', $senderId);
        })->get();
        return response()->json($messages);
    } 
    public function store(Request $request){
        $request->validate([
            'reciverId' => 'required|exists:users,id',
            'content' => 'required|string|max:1000',
        ]);

        $message = new Message();
        $message->senderId = auth()->id();
        $message->reciverId = $request->reciverId;
        $message->content = $request->content;
        $message->save();
        event(new MessageEvent($message));
        return response()->json(['success' => true, 'message' => $message], 201);
    }
}
