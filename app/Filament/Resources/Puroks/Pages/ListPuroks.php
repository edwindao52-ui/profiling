<?php

namespace App\Filament\Resources\Puroks\Pages;

use App\Filament\Resources\Puroks\PurokResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPuroks extends ListRecords
{
    protected static string $resource = PurokResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
