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
        $jammain = $request->jammain;

        $jamIds = $jammain;
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

        $kodebook2 = 'Kodemain-' . rand(0, 10000000);
        foreach ($jammain as $jambooking) {

            // $request->validate([
            //     'wasit' => 'nullable',
            //     'bola' => 'nullable',
            //     'rompi' => 'nullable',
            //     'poto' => 'nullable',
            //     'status_poto_duajam' => 'nullable',
            //     'video' => 'nullable',
            // ]);

            $kodebooking = 'Kodemain-' . rand(0, 10000000);
            $bb = new Booking();
            $bb->kode_booking = $kodebooking;
            $bb->iduser = 1;
            $bb->user = 'aldi';
            $bb->jam_booking = $jambooking->jam_mulai . "-" . $jambooking->jam_berakhir;
            $bb->jam_mulai = $jambooking->jam_mulai;
            $bb->jam_selesai = $jambooking->jam_berakhir;
            $bb->tgl = date('Y-m-d');
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
            $pp->save();
        }

        return redirect()->back()->with('success', 'Data booking berhasil');
    }
}
