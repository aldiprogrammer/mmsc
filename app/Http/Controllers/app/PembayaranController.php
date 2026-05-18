<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Jammbooking;
use App\Models\Lapangan;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PembayaranController extends Controller
{
    function index($idlap, $tgl)
    {

        return Inertia::render('App/Pembayaran', compact('idlap', 'tgl'));
    }

    function store(Request $request)
    {
        $idlap = $request->lapangan;
        $lap = Lapangan::where('id', $idlap)->first();

        $selectJam = $request->jammain;
        if (is_string($selectJam)) {
            $selectJam = json_decode($selectJam, true) ?? [];
        }

        $ids = array_column($selectJam, 'id');
        $jambookingList = Jammbooking::whereIn('id', $ids)->get();

        $kodebook2 = 'Kodemain-' . rand(0, 10000000);
        foreach ($jambookingList as $jambooking) {

            $service = collect($selectJam)->firstWhere('id', $jambooking->id);

            $kodebooking = 'Kodemain-' . rand(0, 10000000);
            $bb = new Booking();
            $bb->kode_booking = $kodebooking;
            $bb->iduser = 1;
            $bb->user = 'aldi';
            $bb->jam_booking = $jambooking->jam_mulai . "-" . $jambooking->jam_berakhir;
            $bb->jam_mulai = $jambooking->jam_mulai;
            $bb->jam_selesai = $jambooking->jam_berakhir;
            $bb->tgl = $request->tanggal;
            $bb->sistem_pembayaran =  $request->sistem_pembayaran;
            $bb->id_lapangan = $idlap;
            $bb->lapangan = $lap->lapangan;
            $bb->team = $request->nama_team;
            $bb->status = 'Menunggu';
            $bb->tgl_booking = date('Y-m-d');
            $bb->status_pembayaran = 201;
            $bb->status_hapus = 0;
            $bb->status_pelunasan = 0;
            $bb->booking = 0;
            $bb->status_jam = 0;
            $bb->jmljam = 1;
            $bb->kode_book2 = $kodebook2;
            $bb->save();


            $request->validate([
                'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            ]);

            $imagePath = null;

            if ($request->hasFile('bukti')) {
                $imagePath = $request->file('bukti')->store('bukti', 'public');
            }

            $pp = new Pembayaran();
            $pp->kode_booking = $kodebooking;
            $pp->norek = $request->bank;
            $pp->atasnama = $request->nama_rekening;
            $pp->harga = $jambooking->harga;
            $pp->status_pembayaran = $request->sistem_pembayaran;
            $pp->total_harga =  $request->total_harga;
            $pp->bukti = $imagePath;
            $pp->status = '201';
            $pp->wa =  $request->whatsapp;
            $pp->pembayaran = $jambooking->harga;

            if ($service) {
                $pp->wasit = $service['wasit'] ?? null;
                $pp->bola = $service['bola'] ?? null;
                $pp->rompi = $service['rompi'] ?? null;
                $pp->poto = $service['foto'] ?? null;
            }

            $pp->save();
        }

        return redirect()->route('sukses')->with([
            'success' => 'Data booking berhasil',
            'kode_book2' => $kodebook2,
        ]);
    }
}
