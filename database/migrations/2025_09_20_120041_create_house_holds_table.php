<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('house_holds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purok_id')->nullable()->constrained('puroks')->onDelete('set null');
            $table->string('purok')->nullable();
            $table->string('house_hold_number')->unique()->comment('Unique code for the household');
            $table->date('date_of_visit')->nullable();
            $table->string('head_of_household')->nullable();
            $table->string('type_of_water_source')->nullable()->comment('ex level1 level11');
            $table->string('type_of_facility')->nullable()->comment('eg water sealed, open pit, etc');
            $table->string('back_yard_garden')->nullable()->comment('yes or no');
            $table->string('household_income')->nullable();
            $table->string('mrf')->nullable()->comment('y or n  ');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('house_holds');
    }
};
