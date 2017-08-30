<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Likes extends Model
{


   public function users(){
      return $this->belongsTo('App\User');
   }

    public function quotes(){
        return $this->belongsTo('App\Quote');
    }
}
