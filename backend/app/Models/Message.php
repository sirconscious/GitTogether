<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ["content" , "senderId" , "reciverId"] ; 
    public function sender()
    {
        return $this->belongsTo(User::class, 'senderId');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'reciverId');
    }
}
