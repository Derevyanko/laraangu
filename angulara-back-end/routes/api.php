<?php

use Illuminate\Http\Request;

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