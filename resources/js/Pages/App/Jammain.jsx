import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Jammain({ lapangan, lainya, jambooking, tgl }) {

    const allLapangan = [lapangan, ...lainya];
    const banners = [lapangan.gambar2, lapangan.gambar2];
    const [current, setCurrent] = useState(0);
    const [jam, setJam] = useState([]);
    const [tanggal, setTanggal] = useState(tgl);
    const [datastorage, setDatastorage] = useState([]);
    const [idlap, setIdlap] = useState([]);
    const [totalharga, setTotalharga] = useState(0)

    const gantiLapangan = (id) => {
        if (id == lapangan.id) return
        router.visit('/jammain/' + id)
    }


    const toggle = (value, harga) => {


        setIdlap(prev => {
            let update;
            const ceklap = prev.find(item => item == value);
            if (ceklap) {
                update = prev.filter(item => item !== value);
            } else {

                update = [...prev, value];
            }

            localStorage.setItem('idlap', JSON.stringify(update))

            return update;
        })


        setDatastorage(prev => {
            let update;
            const cekid = prev.find(item => item.id == value);
            if (cekid) {
                update = prev.filter(item => item.id !== value);
            } else {
                update = [...prev, {
                    id: value,
                    foto: "",
                    wasit: "",
                    bola: "",
                    rompi: '',
                    hargalap: harga,
                    hargafoto: '',
                    hargawasit: '',
                    hargabola: '',
                    hargarompi: '',
                    tanggal: tanggal,
                }];


            }

            localStorage.setItem('selectJam', JSON.stringify(update));


            const data = JSON.parse(localStorage.getItem("selectJam")) || [];
            const total = data.reduce((sum, item) => {
                return sum + Number(item.hargalap || 0);
            }, 0);
            setTotalharga(total);
            return update;
        })
    };


    const handleTanggal = async (e) => {
        setTanggal(e)
        try {
            const response = await axios.get('/jambooking/' + lapangan.id + '/' + e);
            setJam(response.data)
        } catch (error) {

        }
    }


    useEffect(() => {

        const data = JSON.parse(localStorage.getItem("selectJam")) || [];
        setDatastorage(data);

        const total = data.reduce((sum, item) => {
            return sum + Number(item.hargalap || 0);
        }, 0);

        setTotalharga(total);

        setJam(jambooking)
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 3000);
        return () => clearInterval(interval);

    }, []);




    return (
        <div className="bg-gray-200 md:flex md:items-center md:justify-center md:min-h-screen">

            <div className="w-full h-screen bg-white overflow-y-auto relative md:max-w-[375px] md:mx-auto md:shadow-2xl md:border md:rounded-sm">

                {/* HEADER */}
                <div className="relative w-full h-[280px] overflow-hidden rounded-b-[40px]">

                    <div
                        className="flex h-full transition-transform duration-700"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {banners.map((banner, index) => (
                            <div key={index} className="min-w-full h-full relative">
                                <img src={banner} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/35"></div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute top-0 left-0 w-full flex justify-between px-5 pt-6 z-20">
                        <h1 className="text-white font-bold text-xl">
                            {lapangan.lapangan}
                        </h1>
                    </div>
                </div>

                <div className="px-4 pb-28 mt-4">

                    {/* WARNING */}
                    <div className="mb-4 bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-xl text-xs flex items-center gap-2 shadow-sm">
                        <i className='fas fa-exclamation-circle'></i>
                        Booking tidak bisa dibatalkan setelah diproses
                    </div>

                    {/* PILIH LAPANGAN */}
                    <div className='mb-4'>
                        <label className="text-gray-500 font-semibold text-xs block mb-2">
                            Pilih Lapangan
                        </label>
                        <div className='flex gap-2 overflow-x-auto pb-1 scrollbar-hide'>
                            {allLapangan.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => gantiLapangan(item.id)}
                                    className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition border
                                    ${item.id == lapangan.id
                                            ? 'bg-blue-950 text-white border-blue-950 shadow-sm'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                                        }`}
                                >
                                    <i className={`fas fa-futbol mr-1.5 ${item.id == lapangan.id ? 'text-white' : 'text-gray-400'}`}></i>
                                    {item.lapangan}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TANGGAL */}
                    <div className='mb-5 bg-gray-50 rounded-xl p-4 border border-gray-200'>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-full bg-blue-950 flex items-center justify-center shrink-0'>
                                <i className='fas fa-calendar-alt text-white text-sm'></i>
                            </div>
                            <div className='flex-1'>
                                <label className='text-xs font-semibold text-gray-600 mb-1 block'>Pilih Tanggal Booking</label>
                                <input type="date" value={tanggal} onChange={(e) => handleTanggal(e.target.value)} className='w-full text-sm font-medium text-gray-800 bg-transparent border-none outline-none focus:outline-none p-0 [color-scheme:light]' style={{ padding: 0, margin: 0 }} />
                            </div>
                        </div>
                    </div>

                    {/* JAM SLOT */}
                    <div className='text-xs font-semibold text-gray-500 mb-2'>Pilih Jam Main</div>
                    <div className="grid grid-cols-3 gap-1.5">
                        {jam.map((jam, i) => {
                            const active = datastorage.some(item => item.id === jam.id && item.tanggal == tanggal)

                            return (
                                <button
                                    key={i}
                                    disabled={jam.booked}
                                    onClick={() => {
                                        if (jam.booked) {
                                            Swal.fire({
                                                icon: 'warning',
                                                title: 'Jam Tidak Tersedia',
                                                text: 'Jam ini sudah di booking, silahkan pilih jam lain',
                                                confirmButtonColor: '#1e3a5f',
                                            })
                                            return
                                        }
                                        toggle(jam.id, jam.harga)
                                    }}
                                    className={`p-4 text-xs rounded-2xl border transition
                                    ${jam.booked
                                            ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed line-through'
                                            : active
                                                ? "bg-blue-900 text-white border-blue-900"
                                                : "bg-white text-blue-950 border-gray-200 hover:border-blue-300"
                                        }`}
                                >
                                    {jam.jam_mulai} - {jam.jam_berakhir}
                                    <div className={`mt-2 font-bold ${jam.booked ? 'text-gray-300' : active ? 'text-white' : 'text-gray-500'}`}>
                                        {jam.booked ? 'Booked' : `Rp ${Number(jam.harga).toLocaleString('id-ID')}`}
                                    </div>

                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* FOOTER */}
                <div className="fixed bottom-0 left-0 w-full md:flex md:justify-center">
                    <div className="w-full md:max-w-[375px] bg-white border-t p-4 shadow-lg">
                        {datastorage.length > 0 && (
                            <div className='mb-3 text-xs text-gray-500'>
                                <div className='font-semibold mb-1'>Jam dipilih:</div>
                                <div className='flex flex-wrap gap-1'>
                                    {jam.filter(j => datastorage.some(d => d.id === j.id && d.tanggal == tanggal)).map((j, i) => (
                                        <span key={i} className='bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full font-medium'>
                                            {j.jam_mulai}-{j.jam_berakhir}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className='flex justify-between mb-3'>
                            <div className="text-sm text-gray-500 mb-2">
                                Total Harga
                            </div>

                            <div className='font-bold text-lg text-blue-900'>Rp {totalharga.toLocaleString('id-ID')}</div>
                        </div>
                        <Link href={'/pembayaran/' + lapangan.id + '/' + tanggal}>
                            <button
                                disabled={datastorage.length === 0}
                                className={`w-full py-4 rounded-2xl font-bold
                            ${datastorage.length > 0
                                        ? "bg-blue-900 text-white"
                                        : "bg-gray-300 text-gray-500"
                                    }`}
                            >
                                <i className='fas f-money'></i> Pembayaran
                            </button>
                        </Link>

                    </div>
                </div>

                <div className="h-24"></div>
            </div>
        </div>
    );
}