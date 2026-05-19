<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Teamrankteam;
use App\Models\Pemainrankteam;
use App\Models\Pointrankteam;
use App\Models\Mainrankteam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TeamrankteamController extends Controller
{
    function index()
    {
        $user = session('id_auth');
        $idAuth = null;

        if ($user) {
            $tblUser = DB::table('tbl_user')->where('email', session('email'))->first();
            $idAuth = $tblUser?->id_auth;
        }

        $team = null;
        $pemain = collect();
        $point = null;
        $jmlMain = 0;

        if ($idAuth) {
            $team = Teamrankteam::where('id_user', $idAuth)->first();
            if ($team) {
                $pemain = Pemainrankteam::where('kode_team', $team->kode)->get();
                $point = Pointrankteam::where('kode_team', $team->kode)->first();
                $jmlMain = Mainrankteam::where('kode_team', $team->kode)->count();
            }
        }

        return Inertia::render('App/Daftarteam', compact('team', 'pemain', 'point', 'jmlMain', 'idAuth'));
    }

    function save(Request $request)
    {
        $idAuth = session('id_auth');
        if (!$idAuth) {
            return back()->withErrors(['nama_team' => 'User tidak ditemukan']);
        }

        $existing = Teamrankteam::where('id_user', $idAuth)->first();
        $logoPath = $existing?->logo_team;

        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('logos', 'public');
        }

        if ($existing) {
            $existing->update([
                'nama_team' => $request->nama_team,
                'logo_team' => $logoPath,
            ]);
        } else {
            Teamrankteam::create([
                'kode' => 'Team-' . rand(0, 100000),
                'id_user' => $idAuth,
                'nama_team' => $request->nama_team,
                'logo_team' => $logoPath,
                'status' => 1,
                'pool' => '',
                'tambah_pemain' => 0,
            ]);
        }

        return back()->with('success', 'Team berhasil disimpan');
    }

    function savePemain(Request $request)
    {
        $idAuth = session('id_auth');

        if (!$idAuth) {
            return back()->withErrors(['message' => 'User tidak ditemukan']);
        }

        $team = Teamrankteam::where('id_user', $idAuth)->first();
        if (!$team) {
            return back()->withErrors(['message' => 'Buat team terlebih dahulu']);
        }

        if (!$request->filled('nama')) {
            return back()->withErrors(['message' => 'Nama pemain harus diisi']);
        }

        $fotoPath = null;
        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('pemain', 'public');
        }

        Pemainrankteam::create([
            'kode_team' => $team->kode,
            'team' => $team->nama_team,
            'nama' => $request->nama,
            'posisi' => $request->posisi ?? '',
            'nik' => '343434343',
            'ktp' => '3434343',
            // 'idraw' => '0',
            'baru' => 0,
            'no_punggung' => $request->no_punggung ?? '',
            'nickname' => $request->nickname ?? '',
            'foto' => $fotoPath,
        ]);

        return back()->with('success', 'Pemain berhasil ditambahkan');
    }

    function deletePemain($id)
    {
        $pemain = Pemainrankteam::find($id);
        if ($pemain) {
            $pemain->delete();
        }
        return back()->with('success', 'Pemain berhasil dihapus');
    }
}
