import React, { useRef, useState } from 'react'

export default function Databooking() {
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
                            : "bg-blue-950 backdrop-blur text-white"
                            }`}
                    >
                        <div className="flex justify-between">
                            <h3 className="font-bold">Data Booking</h3>
                            <div onClick={() => window.history.back()}>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </div>
                    </div>

                    <div className='p-4'>
                        erere
                    </div>


                </div>


            </div>
        </>
    )
}
