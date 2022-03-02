<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\UsuariosController;

Route::get('/usuarios', 'App\Http\Controllers\UsuariosController@index');
Route::get('/delete/{id}', 'App\Http\Controllers\UsuariosController@delete');
Route::get('/visualizar/{id}', 'App\Http\Controllers\UsuariosController@show');
Route::post('/update/{id}', 'App\Http\Controllers\UsuariosController@update');
Route::post('/insert', 'App\Http\Controllers\UsuariosController@store');

