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
        Schema::create('residents', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('suffix')->nullable();
            $table->string('household_number')->nullable()->comment('Unique code for the household');
            $table->foreignId('house_hold_id')->nullable()->constrained('house_holds')->onDelete('set null');
            $table->string('relationship_to_head')->nullable()->comment('example husband wife or child');
            $table->date('date_of_birth')->nullable()->comment('Date of Birth');
            $table->string('age')->nullable();
            $table->string('sex')->nullable();
            $table->string('civil_status')->nullable();
            $table->string('occupation')->nullable();
            $table->string('educational_attainment')->nullable();
            $table->string('ethnicity')->nullable();
            $table->string('religion')->nullable();
            $table->string('f4ps')->nullable();
            $table->string('f4ps_number')->nullable();
            $table->string('philhealth_category')->nullable();
            $table->string('philhealth_number')->nullable();
            $table->string('medical_history')->nullable();
            $table->string('family_planning_method_used')->nullable();
            $table->date('f_p_status_date_started')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};
