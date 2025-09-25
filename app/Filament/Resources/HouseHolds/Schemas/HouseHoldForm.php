<?php

namespace App\Filament\Resources\HouseHolds\Schemas;

use App\Models\Purok;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class HouseHoldForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('purok_id')
                    ->relationship('purok', 'name')
                    ->label('Choose Purok')
                    ->searchable()
                    ->preload()
                    ->nullable()
                    ->reactive()
                    ->afterStateUpdated(function ($state, callable $set) {
                        // $state is the selected purok_id
                        if ($state) {
                            $purok = Purok::find($state);
                            $set('purok', $purok?->name); // autofill purok name
                        } else {
                            $set('purok', null);
                        }
                    }),

                TextInput::make('purok')
                    ->label('Purok')
                    ->disabled() // prevent manual editing
                    ->dehydrated(true) // still save to DB
                    ->nullable(),

                TextInput::make('house_hold_number')
                    ->numeric()
                    ->label('Household Number')
                    ->required()
                    ->unique(ignoreRecord: true, column: 'house_hold_number')
                    ->validationMessages([
                        'unique' => 'This household number already exists.',
                    ]),

                DatePicker::make('date_of_visit')
                    ->label('Date of Visit'),

                TextInput::make('head_of_household')
                    ->label('Head of Household'),

                Select::make('type_of_water_source')
                    ->label('Type of Water Source')
                    ->options([
                        'level1' => 'Level 1',
                        'level2' => 'Level 2',
                        'level3' => 'Level 3',
                        'level4' => 'Level 4',
                        'level5' => 'Level 5',
                        'level11' => 'Level 11',
                    ])
                    ->required(),

                Select::make('type_of_facility')
                    ->label('Type of toilet Facility')
                    ->options([
                        'water_sealed' => 'Water Sealed',
                        'open_pit' => 'Open Pit',
                        'none' => 'None',
                    ])
                    ->required(),

                Select::make('back_yard_garden')
                    ->label('Backyard Garden')
                    ->options([
                        'yes' => 'Yes',
                        'no' => 'No',
                    ])
                    ->nullable(),

                TextInput::make('household_income')
                    ->label('Household Income'),

                Select::make('mrf')
                    ->label('MRF')
                    ->options([
                        'y' => 'Yes',
                        'n' => 'No',
                    ])
                    ->nullable(),
            ]);
    }
}
