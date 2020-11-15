<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
/**
 * class Admin 
 * @package App\Models
 * @property int id
 * @property int refid
 * @property int accessnumber
 */
class Admin extends Model
{
    public function User(){
        return $this->belongsTo('App\Models\User');
    }
    public function Accesslevel(){
        return $this->hasMany('App\Models\Accesslevel');
    }
}