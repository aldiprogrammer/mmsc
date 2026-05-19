<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    function index()
    {
        $user = [
            'nama' => session('nama'),
            'kode_user' => session('kode_user'),
            'id_auth' => session('id_auth'),
            'email' => session('email'),
        ];
        return Inertia::render('App/Home', compact('user'));
    }
}
