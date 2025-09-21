<?php

namespace App\Filament\Resources\Residents\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ResidentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('first_name')
                    ->searchable(),
                TextColumn::make('middle_name')
                    ->searchable(),
                TextColumn::make('last_name')
                    ->searchable(),
                TextColumn::make('suffix')
                    ->searchable(),
                TextColumn::make('household_number')
                    ->searchable(),
                TextColumn::make('house_hold_id')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('relationship_to_head')
                    ->searchable(),
                TextColumn::make('date_of_birth')
                    ->date()
                    ->sortable(),
                TextColumn::make('age')
                    ->searchable(),
                TextColumn::make('sex')
                    ->searchable(),
                TextColumn::make('civil_status')
                    ->searchable(),
                TextColumn::make('occupation')
                    ->searchable(),
                TextColumn::make('educational_attainment')
                    ->searchable(),
                TextColumn::make('ethnicity')
                    ->searchable(),
                TextColumn::make('religion')
                    ->searchable(),
                TextColumn::make('f4ps')
                    ->searchable(),
                TextColumn::make('f4ps_number')
                    ->searchable(),
                TextColumn::make('philhealth_category')
                    ->searchable(),
                TextColumn::make('philhealth_number')
                    ->searchable(),
                TextColumn::make('medical_history')
                    ->searchable(),
                TextColumn::make('family_planning_method_used')
                    ->searchable(),
                TextColumn::make('f_p_status_date_started')
                    ->date()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
