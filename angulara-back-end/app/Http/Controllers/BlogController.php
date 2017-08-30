<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function get_all_users(){
        $users = User::select('id','name','email','image')->get();
        return response()->json($users, 200);
    }
    
}
