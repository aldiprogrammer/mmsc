<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Jammbooking;
use App\Models\Lapangan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JammainController extends Controller
{
    function index($id)
    {
        $tanggal = date('Y-m-d');
        $hari = date('l', strtotime($tanggal));


        if ($hari == 'Saturday' || $hari == 'Sunday') {
            $datahari = 'sabtu-minggu';
        } else {
            $datahari = 'senin-jumat';
        }
        $lapangan = Lapangan::where('id', $id)->first();
        $lainya = Lapangan::where('id', '!=', $id)->get();
        $jambooking = Jammbooking::where('lapangan', $id)->where('status', 1)->where('hari', $datahari)->get();
        return Inertia::render('App/Jammain', compact('lapangan', 'lainya', 'jambooking'));
    }

    function jambooking($idlap, $tanggal)
    {

        $hari = date('l', strtotime($tanggal));
        if ($hari == 'Saturday' || $hari == 'Sunday') {
            $datahari = 'sabtu-minggu';
        } else {
            $datahari = 'senin-jumat';
        }
        $jambooking = Jammbooking::where('lapangan', $idlap)->where('status', 1)->where('hari', $datahari)->get();
        return response()->json($jambooking);
    }
}
