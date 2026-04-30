<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Lapangan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    function index()
    {
        $lapangan = Lapangan::all();
        return Inertia::render('App/Booking', compact('lapangan'));
    }

    function detail()
    {
        return Inertia::render('App/Detail');
    }
}
