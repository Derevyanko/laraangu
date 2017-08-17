<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $table = 'qoutes';

    
    public function user(){
        return $this->belongsTo('App\User', 'id_user');
    }

    public function likes(){
        return $this->hasMany('App\Likes', 'id_quote');
    }

}
