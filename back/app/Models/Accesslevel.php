<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
/**
 * class Accesslevel 
 * @package App\Models
 * @property int id
 * @property string access
 */
class Accesslevel extends Model
{
    public function Admin(){
        return $this->hasMany('App\Models\Admin');
    }
}