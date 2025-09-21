<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    //

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'household_number',
        'house_hold_id',
        'relationship_to_head',
        'date_of_birth',
        'age',
        'sex',
        'civil_status',
        'occupation',
        'educational_attainment',
        'ethnicity',
        'religion',
        'f4ps',
        'f4ps_number',
        'philhealth_category',
        'philhealth_number',
        'medical_history',
        'family_planning_method_used',
        'f_p_status_date_started',
    ];

    public function houseHold()
    {
        return $this->belongsTo(HouseHold::class, 'house_hold_id');
    }
}
