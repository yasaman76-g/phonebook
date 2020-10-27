<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use App\Models\User;
use App\Models\Phone; 
use App\Models\Admin; 
use App\Models\Accesslevel;  
use Validator;
class AuthController extends Controller
{
     /** 
   * Login API 
   * 
   * @return \Illuminate\Http\Response 
   */ 
  public function login(Request $request){ 
    if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
      $user = Auth::user(); 
      $success['token'] =  $user->createToken('LaraPassport')->accessToken;
      $success['id'] =  $user->id; 
      $success['name'] =  $user->name;
      $success['scope'] =  $user->scope;
      return response()->json([
        'status' => 'success',
        'data' => $success
      ]); 
    } else { 
      return response()->json('ایمیل یا رمز عبور اشتباه است',400);
    } 
  }

  /** 
   * Register API 
   * 
   * @return \Illuminate\Http\Response 
   */ 
  public function register(Request $request) 
  { 
    $postArray = $request->all(); 
    $validator = Validator::make($request->all(), [ 
      'name' => 'required|unique:users',
      'phone' => 'required',
      'password' => 'required|max:6|min:6',  
      'email' => 'required|email|unique:users',
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
    $postArray['password'] = bcrypt($postArray['password']); 
    $user = User::create($postArray); 
    $success['token'] =  $user->createToken('LaraPassport')->accessToken; 
    $id=$user->id;
    foreach($postArray['phone'] as $data  ){
     Phone::insert(['refid' => $id,'phonenumber' => $data['phonenumber'],'type' => $data['type']]);  
    }
    return response()->json([
      'status' => 'success',
      'data' => $success,
    ]); 
  }

  public function getuser(Request $request){
    $postArray = $request->all();
    if ($postArray['name']==='') { 
      return response()->json(400);
    }
    $arr=User::where('name','!=',$postArray['name'])->get();
    return json_encode($arr);
  }
  public function getuserdetails(Request $request){
    $postArray = $request->all();
    if ($postArray['name']==='') { 
      return response()->json(400);
    }
    $arr=User::join('phones','users.id','=','phones.refid')->select('*')->where('name','=',$postArray['name'])->get();
       return $arr;
  }
public function getuserbyid(Request $request){
  $postArray=$request->all();
  $accesslevel=Admin::join('accesslevels', 'accessnumber', '=', 'accesslevels.id')->select('accesslevels.id')->where('refid','=',$postArray['id'])->get();
 return json_encode($accesslevel);
}

public function deleteuser(Request $request){
$postArray=$request->all();
User::where('id',$postArray['id'])->delete();
}
public function searchuser(Request $request){
  $postArray=$request->all();
  $res=User::where('name', 'LIKE', '%'.$postArray['name'].'%')->where('name', '!=', $postArray['user'])->get();;
  return json_encode($res);
}
public function showuser(Request $request){
  $postArray=$request->all();
  $res=User::join('phones','users.id','=','phones.refid')->where('users.id', '=', $postArray['id'])->get();;
  return $res;
}
 public function updateuser(Request $request){
  $postArray = $request->all(); 
  $validator = Validator::make($request->all(), [ 
    'name' => 'required',
    'phone' => 'required',  
    'email' => 'required|email',
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
   User::where('id','=',$postArray['id'])->update(['name'=>$postArray['name'],'email'=>$postArray['email']]);
  foreach($postArray['phone'] as $data  ){
    if($data['phoneid']==="null")
    {
      Phone::insert(['phonenumber' => $data['phonenumber'],'type' => $data['type'],'refid' => $postArray['id']]);
    }
    else{
      Phone::where('refid','=',$postArray['id'])->where('phoneid','=',$data['phoneid'])->update(['phonenumber' => $data['phonenumber'],'type' => $data['type']]);  
    }
  
  }
  return response()->json([
    'status' => 'success'
  ]); 
 }
 public function accesslevel(){
$accesslevel=Accesslevel::get();
return json_encode($accesslevel);
 }
 public function insertadmin(Request $request ){
  $postArray=$request->all();
  foreach($postArray['accesslevel'] as $data){
    Admin::insert(['refid'=>$postArray['refid'],'accessnumber'=>$data['id']]);
  }
  User::where('id','=',$postArray['refid'])->update(['scope' => 1]);
 }
}
