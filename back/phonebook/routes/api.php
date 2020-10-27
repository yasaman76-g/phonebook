<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('login', [AuthController::class, 'login']);
Route::post('register',[AuthController::class, 'register']);
Route::post('getuser',[AuthController::class, 'getuser']);
Route::post('getuserbyid',[AuthController::class, 'getuserbyid']);
Route::post('deleteuser',[AuthController::class, 'deleteuser']);
Route::get('accesslevel',[AuthController::class, 'accesslevel']);
Route::post('insertadmin',[AuthController::class, 'insertadmin']);
Route::post('getuserdetails',[AuthController::class, 'getuserdetails']);
Route::post('searchuser',[AuthController::class, 'searchuser']);
Route::post('showuser',[AuthController::class, 'showuser']);
Route::post('updateuser',[AuthController::class, 'updateuser']);


