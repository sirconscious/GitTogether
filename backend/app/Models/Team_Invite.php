<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Team_Invite extends Model
{
    use SoftDeletes ;
    protected $fillable = [
        "sender_id" ,  
        "reciver_email", 
        "token" , 
        "teamId" , 
        "expire_date"
    ] ; 
    public function sender(){
        return $this->belongsTo(User::class ,"sender_id");
    } 
    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
