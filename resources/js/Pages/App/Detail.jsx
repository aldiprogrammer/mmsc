import React, { useEffect, useRef, useState } from 'react'

export default function Detail() {
    const [scrolled, setScrolled] = useState(false);
    const scrollRef = useRef(null);

    const banners = [
        "/img/lap.jpg",

        "/img/lap2.jpg",


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
                                Blue Dragon
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
                    <div className='px-4'>
                        <img src="img/bannerhome.png" className='rounded-xl mt-4' alt="" />


                        <div className='text-sm font-semibold mt-3 text-slate-400'>
                            Lapangan
                        </div>

                        <div className='grid grid-cols-2 mt-3 gap-3'>
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
                        </div>
                    </div>


                </div>


            </div>
        </>
    )
}
