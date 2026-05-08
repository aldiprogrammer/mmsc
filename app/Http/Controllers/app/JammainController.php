<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Bola;
use App\Models\Foto;
use App\Models\Jammbooking;
use App\Models\Lapangan;
use App\Models\Rompi;
use App\Models\Wasit;
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


    function getjammain(Request $request)
    {
        $jamIds = $request->ids;
        if (is_string($jamIds)) {
            $decoded = json_decode($jamIds, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                $jamIds = $decoded;
            } else {
                $jamIds = explode(',', trim($jamIds, '[]'));
            }
        }

        $jamIds = array_map('intval', array_filter($jamIds));
        $jammain = Jammbooking::whereIn('id', $jamIds)->get();
        return response()->json($jammain);
    }

    function bola()
    {
        $bola = Bola::where('status', 0)->get();
        return response()->json($bola);
    }

    function rompi()
    {
        $rompi = Rompi::where('status', 0)->get();
        return response()->json($rompi);
    }

    function wasit()
    {
        $wasit = Wasit::where('status', 0)->get();
        return response()->json($wasit);
    }

    function fotograper()
    {
        $fotograper = Foto::where('status', 0)->get();
        return response()->json($fotograper);
    }
}
