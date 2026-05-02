<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PembayaranController extends Controller
{
    function index()
    {
        return Inertia::render('App/Pembayaran');
    }
}
