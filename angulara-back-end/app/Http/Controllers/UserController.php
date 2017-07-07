<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;


class UserController extends Controller
{
    public function signup(Request $request)
    {

        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);

        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password'))
        ]);

        $create_user = $user->save();

        if($create_user){
            $credientals = $request->only('email', 'password');
            try{
                if(!$token = JWTAuth::attempt($credientals)){
                    return response()->json([
                        'error' => 'Invalid Credential'
                    ], 401);
                }
            }catch (JWTException $e){
                return response()->json([
                    'error' => 'Could not create token'
                ], 500);
            }
            return response()->json([
                'token' => $token,
                'message' => 'Success'
            ], 201);
        }else{

            return response()->json([
                'message' => 'Error'
            ], 401);
        }
    }

    public function signin(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $credientals = $request->only('email', 'password');
        try{
            if(!$token = JWTAuth::attempt($credientals)){
                return response()->json([
                    'error' => 'Invalid Credential'
                ], 401);
            }
        }catch (JWTException $e){
            return response()->json([
                'error' => 'Could not create token'
            ], 500);
        }

        $user = JWTAuth::toUser($token);

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function get_auth_user(){

        if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
        }

        return response()->json(compact('user'));
    }
}
