<?php
namespace App;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

class Functions {

    static public function UploadImage($path, $image){
        if($image) {
            return $image->move($path, $image->getClientOriginalName());
        }
    }
}
?>