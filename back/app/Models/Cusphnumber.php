<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
/**
 * class Phone 
 * @package App\Models
 * @property int id
 * @property int refid
 * @property string phonenumber
 * @property int type
 */
class Cusphnumber extends Model
{
    public function Cusphbook(){
        return $this->belongsTo('App\Models\Cusphbook');
    }
}