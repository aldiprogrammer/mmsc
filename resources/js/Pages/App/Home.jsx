import { Head, Link } from '@inertiajs/react'
import React from 'react'

export default function Home({ user }) {
    return (
        <>
            <Head title="Home" />

            <div className="bg-gray-200 md:flex md:items-center md:justify-center md:min-h-screen">

                {/* CONTAINER APP */}
                <div className="w-full h-screen bg-white overflow-y-auto relative md:max-w-[375px] md:mx-auto md:shadow-2xl md:border md:rounded-sm">

                    {/* HEADER */}
                    <div className="h-[200px] bg-gradient-to-r from-blue-900 to-indigo-700 text-white p-5 rounded-b-[30px] relative">

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm opacity-80">Hi {user.nama},</p>
                                <h1 className="text-lg font-semibold">
                                    Welcome back
                                </h1>
                            </div>
                            <img
                                src="https://i.pravatar.cc/100"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                        </div>

                        {/* Balance Card */}
                        <div className="mt-4 bg-white/20 backdrop-blur-md p-3 rounded-xl flex justify-between items-center">
                            <div>
                                <p className="text-xs">Total Booking</p>
                                <p className="font-bold">Rp.0</p>
                            </div>

                            <button className="bg-white text-purple-600 text-xs px-3 py-1 rounded-full font-semibold">
                                + Booking Now
                            </button>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="px-5 -mt-10 relative z-10">

                        {/* MENU */}
                        <div className="bg-white text-black rounded-xl p-4 shadow-lg">
                            <p className="text-xs text-blue-800 font-bold">Menu</p>

                            <div className="grid grid-cols-4 text-center mt-4">
                                <div>
                                    <Link href='/booking'>
                                        <i className="text-blue-300 text-xl fas fa-calendar-days"></i>
                                        <div className="text-xs text-gray-400">Booking</div>
                                    </Link>
                                </div>

                                <div>
                                    <i className="text-blue-300 text-xl fas fa-ticket"></i>
                                    <div className="text-xs text-gray-400">Voucher</div>
                                </div>

                                <div>
                                    <Link href='/daftarteam'>
                                        <i className="text-blue-300 text-xl fas fa-futbol"></i>
                                        <div className="text-xs text-gray-400">Rank Team</div>
                                    </Link>
                                </div>

                                <div>
                                    <i className="text-blue-300 text-xl fas fa-shield-halved"></i>
                                    <div className="text-xs text-gray-400">Liga EOF</div>
                                </div>
                            </div>
                        </div>

                        {/* BANNER */}
                        <img
                            className="rounded-lg mt-3"
                            src="img/bannerhome.png"
                            alt=""
                        />

                        {/* LAPANGAN */}
                        <div className="text-xs mt-3 font-bold text-blue-800">
                            Lapangan
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-3">

                            {/* CARD LAPANGAN */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">

                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a"
                                        className="w-full h-40 object-cover"
                                    />

                                    <div className="absolute top-3 left-3 bg-gray-600 text-white text-xs px-3 py-1 rounded-full">
                                        <i className='fa fa-user'></i> 7 x 7
                                    </div>
                                </div>

                                <div className="p-4">

                                    <div className="flex items-center justify-between">
                                        <h2 className="font-bold text-lg">Lapangan BD</h2>

                                    </div>

                                    <p className="text-gray-500 text-sm mt-1">
                                        Rumput sintetis • Lampu malam • Parkir luas
                                    </p>

                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">

                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a"
                                        className="w-full h-40 object-cover"
                                    />

                                    <div className="absolute top-3 left-3 bg-gray-600 text-white text-xs px-3 py-1 rounded-full">
                                        <i className='fa fa-user'></i> 7 x 7
                                    </div>
                                </div>

                                <div className="p-4">

                                    <div className="flex items-center justify-between">
                                        <h2 className="font-bold text-lg">Lapangan RT</h2>

                                    </div>

                                    <p className="text-gray-500 text-sm mt-1">
                                        Rumput sintetis • Lampu malam • Parkir luas
                                    </p>

                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">

                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a"
                                        className="w-full h-40 object-cover"
                                    />

                                    <div className="absolute top-3 left-3 bg-gray-600 text-white text-xs px-3 py-1 rounded-full">
                                        <i className='fa fa-user'></i> 9 x 9
                                    </div>
                                </div>

                                <div className="p-4">

                                    <div className="flex items-center justify-between">
                                        <h2 className="font-bold text-lg">Lapangan WR</h2>

                                    </div>

                                    <p className="text-gray-500 text-sm mt-1">
                                        Rumput sintetis • Lampu malam • Parkir luas
                                    </p>

                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                                Tidak Tersedia
                            </div>


                        </div>

                        {/* EXTRA SPACE BIAR SCROLL KELIHATAN */}
                        <div className="h-20"></div>

                    </div>

                </div>
            </div>
        </>
    )
}