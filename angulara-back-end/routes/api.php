<?php
/*
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
*/
Route::post('/quote', [
    'uses' => 'QuoteController@postQuote',
    'middleware' => 'auth.jwt'
]);

Route::get('/quotes', [
    'uses' => 'QuoteController@getQuotes'
]);

Route::put('/quote/{id}', [
    'uses' => 'QuoteController@putQuote',
    'middleware' => 'auth.jwt'
]);

Route::delete('/quote/{id}', [
    'uses' => 'QuoteController@deleteQuote',
    'middleware' => 'auth.jwt'
]);

Route::post('/users', [
    'uses' => 'UserController@signup'
]);

Route::post('/user/signin', [
    'uses' => 'UserController@signin'
]);

Route::get('/get_auth_user', [
    'uses' => 'UserController@get_auth_user'
]);

Route::get('/get_all_user', [
    'uses' => 'BlogController@get_all_users',
    'middleware' => 'auth.jwt'
]);

Route::get('/get_quotes_by_auth_user', [
    'uses' => 'UserController@get_quotes_by_auth_user',
    'middleware' => 'auth.jwt'
]);

Route::get('/get_all_quotes_user/{id}', [
    'uses' => 'UserController@get_all_quotes_user',
    'middleware' => 'auth.jwt'
]);

Route::post('/like',[
    'uses' => 'QuoteController@likes'
]);

Route::post('/upload',[
    'uses' => 'QuoteController@imageUpload'
]);
