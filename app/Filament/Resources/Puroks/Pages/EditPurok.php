<?php

namespace App\Filament\Resources\Puroks\Pages;

use App\Filament\Resources\Puroks\PurokResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPurok extends EditRecord
{
    protected static string $resource = PurokResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
