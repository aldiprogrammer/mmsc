<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Jammbooking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LayananController extends Controller
{
    function index($tgl)
    {


        return Inertia::render('App/Layanan', compact('tgl'));
    }

    function jambooking($ids)
    {
        $id = json_decode($ids, true);
        $jam = Jammbooking::whereIn('id', $id)->get();
        return response()->json($jam);
    }
}
