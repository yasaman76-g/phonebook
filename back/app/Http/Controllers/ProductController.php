<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use App\Models\User;
use App\Models\Product; 
use App\Models\Admin; 
use App\Models\Order; 
use App\Models\Accesslevel; 
use Illuminate\Support\Facades\DB; 
use Validator;
class ProductController extends Controller

{
    //دریافت محصولات برای نمایش به کاربر
    public function getproduct(){
        $product=Product::get();
        return json_encode($product);
    }
    //نمایش محصولات در سبد خرید
    public function basket(Request $request){
        $postArray=$request->all();
    $res=array();
    $response=array();
    foreach($postArray as $data){
        array_push($res,Product::where('id','=',$data)->get());
    }
    foreach($res as $data){
        foreach($data as $value){
           array_push($response,$value);
        }
    }
    return json_encode($response);  
    }
    public function insertorder(Request $request){
        $postArray=$request->all();
        $res=Order::insert(['refid'=>$postArray['refid'],'pro_id'=>$postArray['pro_id'],'pro_number'=>$postArray['pro_number']]);
        return json_encode($res);
    }
    public function addproduct(Request $request) 
  { 
    $postArray = $request->all(); 
    $validator = Validator::make($request->all(), [ 
      'title' => 'required',
      'number' => 'required',
      'price' => 'required|numeric'
    ]);
    if ($validator->fails()) { 
      $errors = $validator->errors();
    return response()->json($errors,400);
    }
     Product::insert(['title'=>$postArray['title'],'number'=>$postArray['number'],'price'=>$postArray['price']]);
    
    return response()->json([
      'status' => 'success'
    ]); 
  }

}