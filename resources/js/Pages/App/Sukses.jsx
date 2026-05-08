import React, { useRef, useState } from 'react'

export default function Sukses() {
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
                            <h3 className="font-bold">Pembayaran</h3>
                            <div onClick={() => window.history.back()}>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </div>
                    </div>

                    <div className='px-4 flex  flex-col justify-center items-center h-screen'>
                        <img src="https://img.icons8.com/?size=100&id=mlGFFVpf8RJs&format=png&color=000000" alt="" />
                        <p className='text-center text-gray-400'>
                            Bookingan anda berhasil dilakukan
                            silahkan menunggu proses persetujuan
                        </p>
                        <div>
                            <button className='btn bg-blue-950 text-white rounded-full mt-2'>Cek status pembayaran anda</button>
                        </div>
                    </div>


                </div>


            </div>
        </>
    )
}
