import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

export default function Databooking({ booking }) {
    const [scrolled, setScrolled] = useState(false);
    const scrollRef = useRef(null);
    const [data, setData] = useState([])

    const handletanggal = async (tanggal) => {
        try {
            const resposen = await axios.get('/databooking/' + tanggal);
            console.log(resposen.data);
            setData(resposen.data)

        } catch (error) {

        }
    }

    useEffect(() => {
        setData(booking);
    }, []);

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
                        <div className='py-5 bg-blue-950 rounded-lg shadow-lg'>
                            <div className='flex items-center px-2'>

                                <div className='flex-1 text-center'>
                                    <div className='text-xs text-white'>
                                        Jumlah Booking
                                        <div className='mt-1 text-sm font-bold'>
                                            10
                                        </div>
                                    </div>
                                </div>

                                {/* garis putus-putus */}
                                <div className='mx-2 h-6 border-l-2 border-dashed border-gray-400'></div>

                                <div className='flex-1 text-center'>
                                    <div className='text-xs text-white'>
                                        Total Pembayaran
                                        <div className='mt-1 text-sm font-bold'>
                                            Rp. 50.000.000
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='mt-3'>
                            <div className='text-gray-500'>Cari berdasarkan tanggal</div>
                            <input type="date" onChange={(e) => handletanggal(e.target.value)} className='input input-sm w-full mt-2 bordered input-primary' />
                        </div>

                        <div className='mt-3 text-xs text-gray-500'>
                            Data Booking
                        </div>

                        {data.length == 0 ?
                            <>
                                <div className='h-screen flex justify-center items-center'>
                                    <div className='text-xs text-gray-400'>Data booking tidak tersedia</div>
                                </div>
                            </>
                            :
                            <>
                            </>}
                        <div>

                        </div>

                        {data.map((item, index) => (
                            <div className="w-full max-w-sm rounded-xl bg-white border border-gray-100 shadow-lg hover:shadow-md transition p-3 mt-3 ">
                                {/* Top */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-[10px] text-gray-500">Jam Main</p>
                                        <p className="text-xs font-bold text-gray-900">
                                            {item.jam_booking} | {item.tgl}
                                        </p>
                                    </div>
                                    {item.status_pembayaran == 200 ? <><span className="text-[10px] px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                                        <i className='fas fa-circle-check'></i>  Disetujui
                                    </span></> : <>   <span className="text-[10px] px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                                        <i className='fas fa-circle-dot'></i>  Menunggu
                                    </span></>}

                                </div>

                                {/* Middle */}
                                < div className="mt-3 space-y-1" >

                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500">Layanan</span>
                                        <span className="font-semibold text-gray-800">
                                            Foto
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 text-xs">Harga</span>
                                        <span className="text-sm font-extrabold text-gray-900">
                                            Rp 500.000
                                        </span>
                                    </div>

                                </div>

                                <div className='text-xs text-gray-700 font-bold'>
                                    {item.lapangan}
                                </div>

                                {/* Bottom */}
                                <div className="mt-3 flex justify-between items-center border-t border-gray-100 pt-2">
                                    <span className="text-[10px] text-gray-400">
                                        #{item.kode_booking}
                                    </span>

                                    <button className="text-[10px] px-3 py-1 rounded-md bg-black text-white hover:bg-gray-800">
                                        <i className='fas fa-receipt'></i> Bukti Pembayaran
                                    </button>
                                </div>

                            </div>
                        ))}

                        {data.length == 0 ? <></> : <> <div className='my-5 text-center'>Lihat lebih banyak</div></>}

                    </div>


                </div >


            </div >
        </>
    )
}
