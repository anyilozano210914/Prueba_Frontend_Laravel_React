<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers
use App\Http\Controllers\UsersController;

Route::group(['prefix' => 'user'], function(){
    Route::get('/getUsers', [UsersController::class, 'getUsers']);
    Route::post('/editUser', [UsersController::class, 'editUser']);
    Route::post('/createUser', [UsersController::class, 'createUser']);
    Route::delete('/deleteUser/{id}', [UsersController::class, 'deleteUser']);
});
