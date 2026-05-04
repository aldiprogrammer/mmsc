<?php

use App\Http\Controllers\admin\HomeController;
use App\Http\Controllers\app\BookingController;
use App\Http\Controllers\app\JammainController;
use App\Http\Controllers\app\PembayaranController;
use App\Http\Controllers\ProfileController;
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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/booking', [BookingController::class, 'index'])->name('booking');
Route::get('/booking/{id}', [BookingController::class, 'detail'])->name('detail');
Route::get('/jammain/{id}', [JammainController::class, 'index'])->name('Jammain');
Route::get('/getjammain', [JammainController::class, 'getjammain'])->name('getjammain');
Route::get('/jambooking/{idlap}/{tanggal}', [JammainController::class, 'jambooking'])->name('jambooking');

Route::get('/pembayaran/{idlap}', [PembayaranController::class, 'index'])->name('pembayaran');
Route::post('/pembayaran', [PembayaranController::class, 'store'])->name('store.pembayaran');




require __DIR__ . '/auth.php';
