<?php

namespace App\Http\Controllers;

use App\Models\HouseHold;
use Illuminate\Http\Request;

class HouseHoldController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $households = HouseHold::with(['purok', 'residents'])->get();

        return Inertia('HouseHold', [
            'households' => $households,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(HouseHold $houseHold)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HouseHold $houseHold)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HouseHold $houseHold)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HouseHold $houseHold)
    {
        //
    }
}
