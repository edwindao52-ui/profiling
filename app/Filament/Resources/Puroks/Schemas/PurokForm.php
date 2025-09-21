<?php

namespace App\Filament\Resources\Puroks\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class PurokForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
            ]);
    }
}
