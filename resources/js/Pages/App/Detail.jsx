import { Link } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react'

export default function Detail({ lapangan, lainya }) {
    const [scrolled, setScrolled] = useState(false);
    const scrollRef = useRef(null);

    const banners = [
        lapangan.gambar,
        lapangan.gambar2,
    ];

    const [current, setCurrent] = useState(0);

    // AUTO SLIDE
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="bg-gray-200 md:flex md:items-center md:justify-center md:min-h-screen">
                {/* CONTAINER APP */}
                <div className="w-full h-screen bg-white overflow-y-auto relative md:max-w-[375px] md:mx-auto md:shadow-2xl md:border md:rounded-sm">
                    <div className="relative w-full h-[280px] overflow-hidden rounded-b-[40px]">

                        {/* SLIDER */}
                        <div
                            className="flex h-full transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(-${current * 100}%)`,
                            }}
                        >
                            {banners.map((banner, index) => (
                                <div key={index} className="min-w-full h-full relative">
                                    <img
                                        src={banner}
                                        alt={`Banner ${index}`}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* OVERLAY */}
                                    <div className="absolute inset-0 bg-black/35"></div>
                                </div>
                            ))}
                        </div>

                        {/* TOP BAR */}
                        <div className="absolute top-0 left-0 w-full flex items-center justify-between px-5 pt-6 z-20">

                            {/* TITLE */}
                            <h1 className="text-white text-xl font-bold tracking-wide drop-shadow-lg">
                                {lapangan.lapangan}
                            </h1>

                            {/* BACK BUTTON */}
                            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg hover:bg-white/30 transition">
                                <i className='fas fa-angle-right'></i>
                            </button>
                        </div>

                        {/* BOTTOM DOT */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                            {banners.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrent(index)}
                                    className={`transition-all duration-300 ${current === index
                                        ? "w-6 h-2 rounded-full bg-white"
                                        : "w-2 h-2 rounded-full bg-white/60"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>


                    <div className='m-4 p-3 bg-gray-100 rounded-lg shadow-lg'>
                        <div className='text-xs font-semibold mb-3 text-slate-400'>Fasilitas</div>
                        <div className='flex justify-between text-gray-500'>
                            <div className='text-center'>
                                <i className='fas fa-utensils text-blue-900'></i>
                                <div className='text-xs font-semibold'> Caffe</div>
                            </div>
                            <div className='text-center'>
                                <i className='fas fa-car text-blue-900'></i>
                                <div className='text-xs font-semibold'>Parkir</div>
                            </div>

                            <div className='text-center'>
                                <i className='fas fa-door-open text-blue-900'></i>
                                <div className='text-xs font-semibold'>Ruang Ganti</div>
                            </div>

                            <div className='text-center'>
                                <i className='fas fa-toilet-paper text-blue-900'></i>
                                <div className='text-xs font-semibold'>Toilet</div>
                            </div>

                        </div>

                    </div>

                    <div className='m-4 p-3 bg-gray-100 rounded-lg shadow-lg'>
                        <div className='text-xs font-semibold mb-3 text-slate-400'>Jam Oprasional</div>
                        <div className='flex justify-between'>
                            <div className='text-center text-gray-500'>
                                <i className='fas fa-calendar-days text-blue-900'></i>
                                {" "} Senin - Minggu
                            </div>
                            <div className='text-center text-gray-500'>
                                <i className='fas fa-clock text-blue-900'></i>
                                {" "} 06.00  - 24.00 WIB
                            </div>

                        </div>
                    </div>

                    <div className='m-4 p-3 bg-gray-100 rounded-lg shadow-lg'>
                        <div className='text-xs font-semibold mb-3 text-slate-400'>Spesifikasi Lapangna</div>
                        <div className='flex justify-between text-gray-500'>
                            <div className='text-center'>
                                <i className='fas fa-users text-blue-900'></i>
                                <div className='text-xs font-semibold'> 7 x 7</div>
                            </div>
                            <div className='text-center'>
                                <i class="fa-solid fa-down-left-and-up-right-to-center text-blue-900"></i>
                                <div className='text-xs font-semibold'>30 M X 50 M</div>
                            </div>

                            <div className='text-center'>
                                <i className='fas fa-expand text-blue-900'></i>
                                <div className='text-xs font-semibold'>1.500 M2</div>
                            </div>


                        </div>

                    </div>

                    <div className='m-4 p-3 bg-gray-100 rounded-lg shadow-lg'>
                        <div className='text-xs font-semibold mb-3 text-slate-400'>Lokasi</div>

                        <div className='text-xs text-gray-500'>
                            Jl. Ngumban Surbakti 36, Sempakata, Kec. Medan Selayang, Kota Medan, Sumatera Utara 20131
                        </div>
                    </div>



                    <div className='px-4'>
                        <img src="img/bannerhome.png" className='rounded-xl mt-4' alt="" />


                        <div className='text-sm font-semibold mt-3 text-slate-400'>
                            Lapangan lainya
                        </div>

                        <div className='grid grid-cols-2 mt-3 mb-5 gap-3'>
                            {lainya.map((item, index) => (
                                <Link key={index} href={'/booking/' + item.id}>
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
                                        <div className="relative">
                                            <img
                                                src={item.gambar2}
                                                className="w-full h-40 object-cover"
                                            />

                                            <div className="absolute top-3 left-3 bg-gray-600 text-white text-xs px-3 py-1 rounded-full">
                                                <i className='fa fa-user'></i> 7 x 7
                                            </div>
                                        </div>

                                        <div className="p-4">

                                            <div className="flex items-center justify-between">
                                                <h2 className="font-bold text-lg">{item.lapangan}</h2>

                                            </div>

                                            <p className="text-gray-500 text-sm mt-1">
                                                Rumput sintetis • Lampu malam • Parkir luas
                                            </p>

                                        </div>
                                    </div>
                                </Link>

                            ))}


                        </div>
                    </div>

                    {/* FOOTER FIXED BOOKING BUTTON */}
                    <div className="fixed bottom-0 left-0 w-full md:flex md:justify-center z-50">
                        <div className="w-full md:max-w-[375px] bg-white/95 backdrop-blur-xl border-t border-gray-200 px-4 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">

                            {/* WRAPPER */}
                            <div className="flex items-center justify-between gap-3">

                                {/* INFO */}
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">
                                        Lapangan
                                    </p>
                                    <h3 className="text-sm font-extrabold text-blue-900">
                                        {lapangan.lapangan}
                                    </h3>
                                </div>

                                {/* BUTTON */}
                                <Link
                                    href={`/jammain/${lapangan.id}`}
                                    className="flex-1"
                                >
                                    <button className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white py-4 rounded-2xl font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">

                                        Tentukan Jam Main  <i className="fas fa-arrow-right"></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* SPACE AGAR KONTEN TIDAK TERTUTUP FOOTER */}
                    <div className="h-24"></div>


                </div>
            </div>
        </>
    )
}
