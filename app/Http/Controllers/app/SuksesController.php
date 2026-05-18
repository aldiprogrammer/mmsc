<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuksesController extends Controller
{
    function index()
    {
        $kode = session('kode_book2');
        $bookings = $kode ? Booking::where('kode_book2', $kode)->get() : collect();
        return Inertia::render('App/Sukses', compact('kode', 'bookings'));
    }
}
