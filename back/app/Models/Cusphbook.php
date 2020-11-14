<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
/**
 * class Admin 
 * @package App\Models
 * @property int id
 * @property int user_id
 * @property string name
 */
class Cusphbook extends Model
{
    public function Order(){
        return $this->belongsTo('App\Models\Order');
    }
    public function Product(){
        return $this->belongsTo('App\Models\Product');
    }
    public function Cusphnumber(){
        return $this->hasMany('App\Models\Cusphnumber');
    }

}