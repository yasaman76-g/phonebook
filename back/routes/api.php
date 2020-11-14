<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ContactController;
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
Route::post('getusername',[AuthController::class, 'getusername']);
Route::post('deleteuser',[AuthController::class, 'deleteuser']);
Route::get('accesslevel',[AuthController::class, 'accesslevel']);
Route::post('insertadmin',[AuthController::class, 'insertadmin']);
Route::post('getuserdetails',[AuthController::class, 'getuserdetails']);
Route::post('searchuser',[AuthController::class, 'searchuser']);
Route::post('advancesearch',[AuthController::class, 'advancesearch']);
Route::post('showuser',[AuthController::class, 'showuser']);
Route::post('updateuser',[AuthController::class, 'updateuser']);
Route::get('getproduct',[ProductController::class, 'getproduct']);
Route::post('ordercount',[ProductController::class, 'ordercount']);
Route::post('insertorder',[ProductController::class, 'insertorder']);
Route::post('basket',[ProductController::class, 'basket']);
Route::post('getcontact',[ContactController::class, 'getcontact']);
Route::post('getorder',[ContactController::class, 'getorder']);
Route::post('addcontact',[ContactController::class, 'addcontact']);
Route::post('addproduct',[ProductController::class, 'addproduct']);


