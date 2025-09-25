<?php

namespace App\Filament\Resources\HouseHolds\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class HouseHoldsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('purok')
                    ->searchable(),
                TextColumn::make('house_hold_number')
                    ->searchable(),
                TextColumn::make('date_of_visit')
                    ->date()
                    ->sortable(),
                TextColumn::make('head_of_household')
                    ->searchable(),
                TextColumn::make('type_of_water_source')
                    ->searchable(),
                TextColumn::make('type_of_facility')
                    ->searchable(),
                TextColumn::make('back_yard_garden')
                    ->searchable(),
                TextColumn::make('household_income')
                    ->searchable(),
                TextColumn::make('mrf')
                    ->searchable(),
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
