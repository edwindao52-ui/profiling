<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purok extends Model
{
    //
    protected $fillable = [
        'name',
    ];

    public function houseHolds()
    {
        return $this->hasMany(HouseHold::class, 'purok_id');
    }
}
