import { Link } from '@inertiajs/react';
import React, { useRef, useState } from 'react'

export default function Booking({ lapangan }) {
    const [scrolled, setScrolled] = useState(false);
    const scrollRef = useRef(null);
    return (
        <>

            <div className="bg-gray-200 md:flex md:items-center md:justify-center md:min-h-screen">
                {/* CONTAINER APP */}
                <div className="w-full h-screen bg-white overflow-y-auto relative md:max-w-[375px] md:mx-auto md:shadow-2xl md:border md:rounded-sm">
                    <div
                        className={`sticky top-0 z-50 p-4 transition-all duration-300 ${scrolled
                            ? "bg-white shadow-md border-b"
                            : "bg-blue-800 backdrop-blur text-white"
                            }`}
                    >
                        <div className="flex justify-between">
                            <h3 className="font-bold">Booking</h3>
                            <div onClick={() => window.history.back()}>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </div>
                    </div>

                    <div className='px-4'>
                        <img src="img/bannerhome.png" className='rounded-xl mt-4' alt="" />


                        <div className='text-sm font-semibold mt-3 text-slate-400'>
                            Lapangan
                        </div>

                        <div className='grid grid-cols-2 mt-3 gap-3'>

                            {lapangan.map((item, index) => (
                                <Link href={'/booking/' + item.id}>
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
                                        <div className="relative">
                                            <img
                                                src={item.gambar}
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


                </div>


            </div>
        </>
    )
}
