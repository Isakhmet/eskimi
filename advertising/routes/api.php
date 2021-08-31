<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('advertising')
    ->group(
        function () {
            Route::get('/', [App\Http\Controllers\MainController::class, 'getAll']);
            Route::get('/{id}', [App\Http\Controllers\MainController::class, 'getOne']);
            Route::post('/', [App\Http\Controllers\MainController::class, 'create']);
            Route::post('/update', [App\Http\Controllers\MainController::class, 'update']);

        });

Route::prefix('images')
     ->group(
         function () {
             Route::post('/delete', [App\Http\Controllers\MainController::class, 'removeImages']);
             Route::post('/delete-all', [App\Http\Controllers\MainController::class, 'removeAllImages']);

         });
