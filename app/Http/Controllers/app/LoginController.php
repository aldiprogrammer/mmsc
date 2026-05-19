<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Userlogin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController extends Controller
{
    function index()
    {
        return Inertia::render('Auth/Loginuser');
    }

    function store(Request $request)
    {
        $email = $request->email;
        $pass = $request->password;
        $cek = Userlogin::where('email', $email)->where('pass', $pass)->first();


        if ($cek == true) {
            session([
                'kode_user' => $cek->kode_user,
                'nama' => $cek->nama,
                'email' => $cek->email,
                'id_auth' => $cek->id_auth,
            ]);

            return redirect()->route('home')->with('success', 'Anda berhasil login');
        } else {

            return redirect()->route('loginuser')->with('error', 'Email atau password anda salah');
        }
    }
}
