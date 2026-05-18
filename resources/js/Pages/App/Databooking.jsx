import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

export default function Databooking({ booking }) {
    const [scrolled, setScrolled] = useState(false);
    const scrollRef = useRef(null);
    const [data, setData] = useState([])
    const today = new Date().toISOString().split('T')[0]
    const [selectedDate, setSelectedDate] = useState(today)

    const handletanggal = async (tanggal) => {
        setSelectedDate(tanggal)
        try {
            const resposen = await axios.get('/databooking/' + tanggal);
            setData(resposen.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        setData(booking);
        if (booking.length === 0) {
            handletanggal(today)
        }
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
                        <div className='py-5 bg-gradient-to-r from-blue-950 to-blue-800 rounded-lg shadow-lg'>
                            <div className='flex items-center px-2'>

                                <div className='flex-1 text-center'>
                                    <div className='text-xs text-white'>
                                        Jumlah Booking
                                        <div className='mt-1 text-sm font-bold'>
                                            {data.length}
                                        </div>
                                    </div>
                                </div>

                                {/* garis putus-putus */}
                                <div className='mx-2 h-6 border-l-2 border-dashed border-gray-400'></div>

                                <div className='flex-1 text-center'>
                                    <div className='text-xs text-white'>
                                        Total Pembayaran
                                        <div className='mt-1 text-sm font-bold'>
                                            Rp. {data.reduce((sum, item) => sum + Number(item.total_harga || 0), 0).toLocaleString('id-ID')}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 rounded-full bg-blue-950 flex items-center justify-center shrink-0'>
                                    <i className='fas fa-calendar-alt text-white text-sm'></i>
                                </div>
                                <div className='flex-1'>
                                    <label className='text-xs font-semibold text-gray-600 mb-1 block'>Pilih Tanggal</label>
                                    <input type="date" value={selectedDate} onChange={(e) => handletanggal(e.target.value)} className='w-full text-sm font-medium text-gray-800 bg-transparent border-none outline-none focus:outline-none p-0 [color-scheme:light]' style={{ padding: 0, margin: 0 }} />
                                </div>
                            </div>
                        </div>

                        <div className='mt-4 text-xs text-gray-500 font-semibold'>
                            Data Booking
                        </div>

                        {data.length == 0 ?
                            <div className='flex flex-col items-center justify-center py-20 px-6 text-center'>
                                <div className='w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5'>
                                    <i className='fas fa-calendar-times text-gray-300 text-3xl'></i>
                                </div>
                                <h4 className='text-sm font-bold text-gray-600 mb-2'>Belum Ada Data Booking</h4>
                                <p className='text-xs text-gray-400 max-w-xs leading-relaxed mb-5'>
                                    Silakan pilih tanggal di atas untuk menampilkan data booking yang tersedia pada hari tersebut.
                                </p>
                                <div className='flex items-center gap-2 text-xs text-gray-400'>
                                    <i className='fas fa-arrow-up text-blue-500'></i>
                                    <span>Gunakan filter tanggal</span>
                                </div>
                            </div>
                            :
                            <></>}

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
                                <div className="mt-3">
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {item.foto && <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium"><i className='fas fa-camera mr-1'></i>Foto</span>}
                                        {item.bola && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium"><i className='fas fa-futbol mr-1'></i>Bola</span>}
                                        {item.rompi && <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-medium"><i className='fas fa-shirt mr-1'></i>Rompi</span>}
                                        {item.wasit && <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 font-medium"><i className='fas fa-user mr-1'></i>Wasit</span>}
                                        {!item.foto && !item.bola && !item.rompi && !item.wasit && <span className="text-[10px] text-gray-400">Tidak ada layanan</span>}
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 text-xs">Total Harga</span>
                                        <span className="text-sm font-extrabold text-gray-900">
                                            Rp {Number(item.total_harga || 0).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>

                                <div className='mt-2 text-xs text-gray-700 font-semibold'>
                                    <i className='fas fa-map-pin mr-1 text-gray-400'></i>
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

                        {data.length > 0 && <div className='my-5 text-center text-xs text-gray-400'>Menampilkan {data.length} data booking</div>}

                    </div>


                </div >


            </div >
        </>
    )
}
