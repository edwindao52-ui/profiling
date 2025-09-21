<?php

namespace App\Filament\Resources\Residents\Schemas;

use App\Models\HouseHold;
use Carbon\Carbon;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;

class ResidentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('first_name')
                    ->label('First Name')
                    ->required(),

                TextInput::make('middle_name')
                    ->label('Middle Name'),

                TextInput::make('last_name')
                    ->label('Last Name')
                    ->required(),

                Select::make('suffix')
                    ->options([
                        '' => 'None',
                        'Jr.' => 'Jr.',
                        'II' => 'II',
                        'III' => 'III',
                        'IV' => 'IV',
                        'V' => 'V',
                        'VI' => 'VI',
                    ]),

                // 🔑 Household selector (search by head of household or household number)
                Select::make('house_hold_id')
                    ->label('Select Household')
                    ->relationship('houseHold', 'head_of_household') // assumes Resident belongsTo HouseHold
                    ->searchable(['head_of_household', 'house_hold_number']) // can search by either field
                    ->preload()
                    ->reactive()
                    ->afterStateUpdated(function ($state, callable $set) {
                        if ($state) {
                            $household = HouseHold::find($state);
                            $set('household_number', $household?->house_hold_number);
                        } else {
                            $set('household_number', null);
                        }
                    }),

                // Auto-filled household number
                TextInput::make('household_number')
                    ->label('Household Number')
                    ->disabled()
                    ->dehydrated(true)
                    ->required(),

                Select::make('relationship_to_head')
                    ->label('Relationship to Head of Household')
                    ->options([
                        'head' => 'Head',
                        'spouse' => 'Spouse',
                        'child' => 'Child',
                        'parent' => 'Parent',
                        'sibling' => 'Sibling',
                        'other' => 'Other',
                    ])
                    ->required(),
                DatePicker::make('date_of_birth')
                    ->required()
                    ->live()
                    ->afterStateUpdated(function (Set $set, $state) {
                        if ($state) {
                            $birthDate = Carbon::parse($state);
                            $age = $birthDate->diffInYears(Carbon::now()); // ✅ integer
                            $set('age', (int) $age);
                        }
                    }),
                TextInput::make('age')
                    ->numeric()
                    ->label('Age')
                    ->disabled()
                    ->dehydrated(true),

                Select::make('sex')
                    ->options([
                        'male' => 'Male',
                        'female' => 'Female',
                    ])
                    ->label('Sex')
                    ->required(),

                Select::make('civil_status')
                    ->options([
                        'single' => 'Single',
                        'married' => 'Married',
                        'widowed' => 'Widowed',
                        'separated' => 'Separated',
                    ])
                    ->label('Civil Status'),

                TextInput::make('occupation')
                    ->label('Occupation'),

                Select::make('educational_attainment')
                    ->label('Educational Attainment')
                    ->options([
                        'no_formal_education' => 'No Formal Education',
                        'elementary' => 'Elementary',
                        'high_school' => 'High School',
                        'vocational' => 'Vocational',
                        'college' => 'College',
                        'post_graduate' => 'Post Graduate',
                    ]),

                TextInput::make('ethnicity')
                    ->label('Ethnicity'),

                TextInput::make('religion')
                    ->label('Religion'),

                Select::make('f4ps')
                    ->label('4Ps Beneficiary')
                    ->options([
                        'yes' => 'Yes',
                        'no' => 'No',
                    ])
                    ->required()
                    ->reactive(), // needed so dependent fields update

                TextInput::make('f4ps_number')
                    ->label('4Ps Number')
                    ->disabled(fn (callable $get) => $get('f4ps') !== 'yes')
                    ->dehydrated(fn (callable $get) => $get('f4ps') === 'yes'),

                TextInput::make('philhealth_category')
                    ->label('PhilHealth Category'),

                TextInput::make('philhealth_number')
                    ->label('PhilHealth Number'),

                TextInput::make('medical_history')
                    ->label('Medical History'),

                TextInput::make('family_planning_method_used')
                    ->label('Family Planning Method Used'),

                DatePicker::make('f_p_status_date_started')
                    ->label('FP Status Date Started'),
            ]);
    }
}
