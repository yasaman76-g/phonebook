<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
/**
 * class Admin 
 * @package App\Models
 * @property int id
 * @property string title
 * @property int number
 * @property string price
 */
class Product extends Model
{
    public function Order(){
        return $this->hasMany('App\Models\Order');
    }
}