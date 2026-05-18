import { Link } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

export default function Sukses() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const bookingId = 'MMSC-' + Date.now().toString().slice(-6)

    return (
        <div className="bg-gray-200 md:flex md:items-center md:justify-center md:min-h-screen">
            <div className="w-full min-h-screen bg-white relative md:max-w-[375px] md:mx-auto md:shadow-2xl md:border md:rounded-sm">

                {/* HEADER */}
                <div
                    className={`sticky top-0 z-50 p-4 transition-all duration-300 ${scrolled
                        ? "bg-white shadow-md border-b"
                        : "bg-blue-950 text-white"
                        }`}
                >
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">Konfirmasi</h3>
                        <Link href="/booking">
                            <i className="fas fa-times cursor-pointer"></i>
                        </Link>
                    </div>
                </div>

                {/* SUCCESS CONTENT */}
                <div className="px-6 pt-16 pb-8 flex flex-col items-center text-center">

                    {/* Animated checkmark */}
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-bounce">
                        <i className="fas fa-check text-green-500 text-4xl"></i>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Booking Berhasil!
                    </h2>
                    <p className="text-sm text-gray-400 mb-8 max-w-xs leading-relaxed">
                        Terima kasih, pesanan anda sudah kami terima.
                        Silakan tunggu konfirmasi dari admin untuk proses selanjutnya.
                    </p>

                    {/* Booking ID card */}
                    <div className="w-full bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl p-5 mb-6 text-white text-left">
                        <div className="text-xs text-blue-200 mb-1">Kode Booking</div>
                        <div className="text-lg font-bold tracking-wider mb-4">{bookingId}</div>
                        <div className="border-t border-blue-400/30 pt-3 grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <div className="text-xs text-blue-200">Status</div>
                                <div className="font-semibold flex items-center gap-1">
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block"></span>
                                    Menunggu
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-blue-200">Estimasi</div>
                                <div className="font-semibold">1x24 Jam</div>
                            </div>
                        </div>
                    </div>

                    {/* Info note */}
                    <div className="w-full bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 text-left">
                        <div className="flex gap-3">
                            <i className="fas fa-info-circle text-yellow-600 mt-0.5"></i>
                            <div className="text-xs text-yellow-700 leading-relaxed">
                                Simpan kode booking anda untuk melakukan pengecekan status.
                                Admin akan menghubungi anda melalui WhatsApp yang didaftarkan.
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="w-full space-y-3">
                        <Link href="/databooking">
                            <button className="w-full py-3.5 bg-blue-950 text-white rounded-2xl font-bold text-sm hover:bg-blue-900 transition">
                                <i className="fas fa-search mr-2"></i>
                                Cek Status Pembayaran
                            </button>
                        </Link>
                        <Link href="/booking">
                            <button className="w-full py-3.5 bg-gray-100 text-gray-700 rounded-2xl font-bold text-sm hover:bg-gray-200 transition">
                                <i className="fas fa-arrow-left mr-2"></i>
                                Kembali ke Beranda
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
