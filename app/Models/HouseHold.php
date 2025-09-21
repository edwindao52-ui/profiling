<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HouseHold extends Model
{
    //
    protected $fillable = [
        'purok_id',
        'purok',
        'house_hold_number',
        'date_of_visit',
        'head_of_household',
        'type_of_water_source',
        'type_of_facility',
        'back_yard_garden',
        'household_income',
        'mrf',
    ];

    public function residents()
    {
        return $this->hasMany(Resident::class, 'house_hold_id');
    }

    public function purok()
    {
        return $this->belongsTo(Purok::class, 'purok_id');
    }
}
