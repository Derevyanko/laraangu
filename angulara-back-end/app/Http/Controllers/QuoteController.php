<?php

namespace App\Http\Controllers;

use App\Likes;
use App\Quote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use JWTAuth;

class QuoteController extends Controller
{
    public function postQuote(Request $request){

        $user = JWTAuth::parseToken()->toUser();
        $this->validate($request, [
            'content' => 'required'
        ]);
        $quote = new Quote();
        $quote->content = $request->input('content');
        $quote->id_user = $user->id;
        $quote->save();
        return response()->json(['quote' => $quote, 'user' => $user], 201);
    }

    public function getQuotes()
    {
        $quotes = Quote::with('user')->with('likes')->get();
        $response = [
            'quotes' => $quotes
        ];
        return response()->json($response, 200);
    }

    public function putQuote(Request $request, $id)
    {
        $quote = Quote::find($id);
        if(!$quote){
            return response()->json(['message' => 'Not found'], 404);
        }
        $quote->content = $request->input('content');
        $quote->save();
        return response()->json(['quote' => $quote], 200);
    }

    public function deleteQuote($id)
    {
        $quote = Quote::find($id);
        $quote->delete();
        return response()->json(['quote' => 'Quote delete'], 200);
    }
    
    public function likes(Request $request)
    {
        $quote_id = $request['quoteId'];
        $is_like = $request['islike'] === 'true';

        $update = false;

        $quote = Quote::find($quote_id);
        if(!$quote){
            return response()->json(['message' => 'Not found'], 404);
        }

        $user = JWTAuth::parseToken()->authenticate();

        $like = $user->likes()->where('id_quote', $quote_id)->first();
        if($like) {
            $already_like = $like->likes;
            $update = true;
            if($already_like == $is_like){
                $like->delete();
                return response()->json(['like' => 'delete'], 200);
            }
        }else{
            $like = new Likes();
        }
        $like->id_user = $user->id;
        $like->id_quote = $quote_id;
        $like->likes = $is_like;
        if($update){
            $like->update();
            return response()->json(['like' => 'update'], 200);
        }else{
            $like->save();
            return response()->json(['like' => 'save'], 200);
        }

    }

 
}
