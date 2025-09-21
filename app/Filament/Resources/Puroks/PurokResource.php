<?php

namespace App\Filament\Resources\Puroks;

use App\Filament\Resources\Puroks\Pages\CreatePurok;
use App\Filament\Resources\Puroks\Pages\EditPurok;
use App\Filament\Resources\Puroks\Pages\ListPuroks;
use App\Filament\Resources\Puroks\Schemas\PurokForm;
use App\Filament\Resources\Puroks\Tables\PuroksTable;
use App\Models\Purok;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PurokResource extends Resource
{
    protected static ?string $model = Purok::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name of purok';

    public static function form(Schema $schema): Schema
    {
        return PurokForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PuroksTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPuroks::route('/'),
            'create' => CreatePurok::route('/create'),
            'edit' => EditPurok::route('/{record}/edit'),
        ];
    }
}
