<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Team extends Model
{
    use SoftDeletes;
    protected $fillable = ["description"] ; 

    public function users(){
        return $this->belongsToMany(User::class) ;
    } 
    public function invites(){
        return $this->hasMany(Team_Invite::class) ;
    }
}
