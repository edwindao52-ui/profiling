<?php

use App\Http\Controllers\HouseHoldController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\UserController;
use App\Models\HouseHold;
use App\Models\Resident;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'users' => User::all(),
        'households' => HouseHold::all(),
        'residents' => Resident::all(),
    ]);
})->middleware(['auth', 'verified', 'admin.frontend'])->name('dashboard');

Route::middleware(['auth', 'admin.frontend'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('Users/Add', [UserController::class, 'store'])->name('users.store');
    Route::resource('residents', ResidentController::class);
    Route::resource('households', HouseHoldController::class);

    Route::get('/households/print', [HouseHoldController::class, 'print'])->name('households.print');
    Route::get('/residents/print', [ResidentController::class, 'print'])->name('residents.print');
});

require __DIR__.'/auth.php';
