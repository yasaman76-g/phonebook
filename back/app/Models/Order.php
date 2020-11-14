<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
/**
 * class Admin 
 * @package App\Models
 * @property int id
 * @property int refid
 * @property int pro_id
 * @property int pro_number
 */
class Order extends Model
{
    public function User(){
        return $this->belongsTo('App\Models\User');
    }
    public function Product(){
        return $this->belongsTo('App\Models\Product');
    }

}