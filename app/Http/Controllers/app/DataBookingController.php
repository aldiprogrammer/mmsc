<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataBookingController extends Controller
{
    function index()
    {
        $booking = Booking::limit(5)->orderBy('id', 'desc')->get();
        return Inertia::render('App/Databooking', compact('booking'));
    }

    function caritanggal($tgl)
    {
        $booking = Booking::limit(5)->orderBy('id', 'desc')->where('tgl', $tgl)->get();
        return response($booking);
    }
}
