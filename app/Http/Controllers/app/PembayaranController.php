<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PembayaranController extends Controller
{
    function index()
    {
        return Inertia::render('App/Pembayaran');
    }

    function store(Request $request)
    {
        $kodebooking = 'Kodemain-' . rand(0, 10000000);
        $bb = new Booking();
        $bb->kode_booking = $kodebooking;
        $bb->iduser = 1;
        $bb->user = 'aldi';
        $bb->jam_booking = '';
        $bb->tgl = $request->tanggal;
        $bb->sistem_pembayaran =  '';
        $bb->id_lapangan = '';
        $bb->id_lapangan = '';
        $bb->team = $request->team;
        $bb->status = 'Menunggu';
        $bb->tgl_booking = date('Y-m-d');
        $bb->status_pembayaran = 201;
        $bb->save();
        return redirect()->back()->with('success', 'Data booking berhasil');
    }
}
