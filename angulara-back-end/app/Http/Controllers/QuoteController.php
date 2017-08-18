<?php

namespace App\Http\Controllers;

use App\Likes;
use App\Quote;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use JWTAuth;
use App\Functions;

class QuoteController extends Controller
{
    public function postQuote(Request $request){

        $user = JWTAuth::parseToken()->toUser();
//        $this->validate($request, [
//            'content' => 'required',
//            'title'   => 'required',
//            'image' => 'required'
//        ]);
        $image_upload = Input::file('photo');
        dd($image_upload);
//        $path = 'images/posts';
//        $image = $this->imageUpload($image_upload, $path);
        $quote = new Quote();
        $quote->title = $request->input('title');
        $quote->content = $request->input('content');
        $quote->image = 'sdfdsfs';
        $quote->id_user = $user->id;
        $quote->save();
        return response()->json(['quote' => $quote, 'user' => $user], 201);
    }

    public function getQuotes()
    {
        $quotes = Quote::with('user')->with('likes')->get();
        foreach ($quotes as $quote) {

            $count_like = count($quote->likes);
            $quote->count_like = $count_like;
        }
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
        $quote->updated_at = Carbon::now()->toDateString();
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
        $count_like = '';
        $update = false;

        $quote = Quote::where('id', $quote_id)->with('likes')->get();
        foreach ($quote as $quot){
            $count_like = count($quot->likes);
        }

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
                return response()->json(['like' => 'delete', 'count_like' => $count_like - 1], 200);
            }
        }else{
            $like = new Likes();
        }

        $like->id_user = $user->id;
        $like->id_quote = $quote_id;
        $like->likes = $is_like;
        if($update){
            $like->update();
            return response()->json(['like' => 'update', 'count_like' => $count_like], 200);
        }else{
            $like->save();
            return response()->json(['like' => 'save', 'count_like' => $count_like + 1], 200);
        }

    }


    public function imageUpload($file, $path){
        $image = Functions::UploadImage($path, $file);
        return $image;
    }
    

 
}
