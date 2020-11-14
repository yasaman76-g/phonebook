<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use App\Models\User;
use App\Models\Phone; 
use App\Models\Order; 
use App\Models\Cusphbook; 
use App\Models\Cusphnumber; 
use Illuminate\Support\Facades\DB; 
use Validator;
class ContactController extends Controller
{
  public function getcontact(Request $request){
    $postArray = $request->all();
    $arr1=Cusphbook::select('id','name')->where('user_id','=',$postArray['id'])->get();
    $i=0;
    $arr2=[];
   foreach($arr1 as $data){
      $arr2[$i]=[
       'id'=>$data['id'],
       'name'=>$data['name'],
       'phones'=>DB::select('select phonenumbers,type from cusphnumbers where refid = ?', [$data['id']])
     ];
     $i++;
   }
     return json_encode($arr2);
  }
  public function getorder(Request $request){
    $postArray = $request->all();
    if ($postArray['id']==='') { 
      return response()->json(400);
    }
    $arr=Order::select('pro_number')->where('refid','=',$postArray['id'])->get();
    return json_encode($arr);
  }
  public function addcontact(Request $request) 
  { 
    $postArray = $request->all(); 
    $validator = Validator::make($request->all(), [ 
      'name' => 'required',
      'phone' => 'required'
    ]);
    if ($validator->fails()) { 
      $errors = $validator->errors();
    return response()->json($errors,400);
    }
    foreach($postArray['phone'] as $data  ){
      $validator = Validator::make($data, [
        'phonenumber' => 'required|digits_between:8,11|numeric',
        ]);
        if ($validator->fails()) { 
          $errors = $validator->errors();
        return response()->json($errors,400);
        }}

    $id = Cusphbook::insertGetId(['user_id'=>$postArray['user_id'],'name'=>$postArray['name']]);
    foreach($postArray['phone'] as $data  ){
        Cusphnumber::insert(['refid' => $id,'phonenumbers' => $data['phonenumber'],'type' => $data['type']]);  
    }
    $data=Order::select('pro_number')->where('refid','=',$postArray['user_id'])->get();
     $num=$data[0]['pro_number'];
     if(($num-1)===0){
        Order::where('refid','=',$postArray['user_id'])->where('pro_number','=',$num)
        ->delete();
     }
    else{
        $order=Order::where('refid','=',$postArray['user_id'])->where('pro_number','=',$num)
        ->update(['pro_number'=>$num-1]);
  
    }
    return response()->json([
      'status' => 'success'
    ]); 
  }
}