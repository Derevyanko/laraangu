<?php
namespace App;
use Faker\Provider\Image;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

class Functions {

    static public function UploadImage($path, $image){
        if($image) {
            $name = Hash::make($image->getClientOriginalName()) . '.' . $image->getClientOriginalExtension();
            return $image->move($path, $name);
        }
    }
}
?>