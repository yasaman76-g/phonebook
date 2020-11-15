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
class Phone extends Model
{
    public function User(){
        return $this->belongsTo('App\Models\User');
    }
}