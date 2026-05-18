import { Link, router, useForm } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

export default function Pembayaran({ idlap, tgl }) {
    const [scrolled, setScrolled] = useState(false)
    const scrollRef = useRef(null)
    const [preview, setPreview] = useState(null)
    const [listjam, Setlistjam] = useState([]);
    const jam = JSON.parse(localStorage.getItem("selectJam"));
    const [selectJamData, setSelectJamData] = useState([]);

    const hasFoto = selectJamData.some(item => item.foto);
    const hasBola = selectJamData.some(item => item.bola);
    const hasRompi = selectJamData.some(item => item.rompi);
    const hasWasit = selectJamData.some(item => item.wasit);
    const hasAnyService = hasFoto || hasBola || hasRompi || hasWasit;

    const totalFromServices = selectJamData.reduce((sum, item) => {
        return sum + Number(item.hargalap || 0) +
            Number(item.hargafoto || 0) +
            Number(item.hargabola || 0) +
            Number(item.hargarompi || 0) +
            Number(item.hargawasit || 0);
    }, 0);

    const { data, setData, post, put, delete: destroy, reset, processing
    } = useForm({
        nama_team: '',
        whatsapp: '',
        nama_rekening: '',
        bank: '',
        sistem_pembayaran: '',
        lapangan: idlap,
        jammain: jam,
        bukti: null,
        total_harga: totalFromServices,
    })


    const handlejam = async () => {

        try {
            const response = await axios.get('/getjammain?ids=' + jam);
            console.log(response.data);
            Setlistjam(response.data);
        } catch (error) {

        }
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setData('bukti', file);
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/pembayaran', {
            onSuccess: () => {
                reset();
            }
        })
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('selectJam') || '[]');
        setSelectJamData(data);
        handlejam();
        const handleScroll = () => {
            if (scrollRef.current) {
                setScrolled(scrollRef.current.scrollTop > 20)
            }
        }

        const currentRef = scrollRef.current
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll)
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

    useEffect(() => {
        console.log(jam);

    }, [])

    return (
        <>
            <div className="bg-gray-200 md:flex md:items-center md:justify-center md:min-h-screen">
                <div
                    ref={scrollRef}
                    className="w-full h-screen bg-gray-50 overflow-y-auto relative md:max-w-[375px] md:mx-auto md:shadow-2xl md:border md:rounded-sm"
                >
                    {/* HEADER */}
                    <div
                        className={`sticky top-0 z-50 p-4 transition-all duration-300 ${scrolled
                            ? 'bg-white shadow-md border-b'
                            : 'bg-gradient-to-r bg-blue-950 text-white'
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => window.history.back()}
                                className="text-xl"
                            >
                                <i className="fas fa-arrow-left"></i>
                            </button>
                            <h3 className="font-bold text-lg">Pembayaran Booking</h3>
                            <div></div>
                        </div>
                    </div>

                    {/* BANNER */}
                    <div
                        className="relative h-44 bg-cover bg-center rounded-b-xl"
                        style={{
                            backgroundImage: "url('../img/bgpembayaran.png')",
                        }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-blue-900/50  rounded-b-xl"></div>

                        {/* Content */}

                    </div>



                    {/* FORM */}
                    <div className="p-4">

                        <div className="bg-white rounded-3xl shadow-lg p-5 -mt-20 relative z-10 border">
                            <div className='flex justify-between'>
                                <div>
                                    <div className='text-xs font-semibold text-gray-500'>Jam main</div>
                                    <div className='text-xs mt-1 font-bold text-blue-950'>
                                        {listjam.map((item, index) => (
                                            <div>
                                                {item.jam_mulai}-{item.jam_berakhir} {' '}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className='text-xs font-semibold text-gray-500'> Total Harga</div>
                                    <div className='font-bold text-blue-950'>Rp {totalFromServices.toLocaleString('id-ID')}</div>
                                </div>
                            </div>

                            <div class="border-t border-dashed border-gray-400 my-5"></div>
                            <div className='bg-gray-200 rounded-lg mb-4'>
                                <Link href={'/layanan/' + tgl}>
                                    <div className='p-4 text-sm flex justify-between'>
                                        <div className='font-semibold'>
                                            Tambah Layanan
                                        </div>

                                        <div>
                                            <i className='fas fa-list'></i>
                                        </div>

                                    </div>

                                    {hasAnyService ? (
                                        <div className='flex justify-between px-4 mb-5 text-xs'>
                                            <div className='mb-4 text-center'>
                                                <div>{hasFoto ? <><i className='fas fa-check-circle text-green-400'></i> </> : ''}<i className='fas fa-camera'></i></div>
                                                Fotograper
                                            </div>

                                            <div className='mb-4 text-center'>
                                                <div>{hasBola ? <><i className='fas fa-check-circle text-green-400'></i> </> : ''}<i className='fas fa-futbol'></i></div>
                                                Bola
                                            </div>

                                            <div className='mb-4 text-center'>
                                                <div>{hasRompi ? <><i className='fas fa-check-circle text-green-400'></i> </> : ''}<i className='fas fa-shirt'></i></div>
                                                Rompi
                                            </div>

                                            <div className='mb-4 text-center'>
                                                <div>{hasWasit ? <><i className='fas fa-check-circle text-green-400'></i> </> : ''}<i className='fas fa-user'></i></div>
                                                Wasit
                                            </div>
                                        </div>
                                    ) : (
                                        <div className=' mb-5 text-xs text-center text-gray-400'>
                                            <div className='mb-5'> Tambah layanan foto, rompi, bola dan wasit</div>
                                            <br />
                                        </div>

                                    )}
                                </Link>

                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Tanggal Main
                                    </label>
                                    <input
                                        type="text"
                                        name="nama_team"
                                        value={tgl}
                                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Nama Team */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Nama Team
                                    </label>
                                    <input
                                        type="text"
                                        name="nama_team"
                                        value={data.nama_team}
                                        onChange={handleChange}
                                        placeholder="Masukan nama team"
                                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* No Whatsapp */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        No WhatsApp
                                    </label>
                                    <input
                                        type="number"
                                        name="whatsapp"
                                        value={data.whatsapp}
                                        onChange={handleChange}
                                        placeholder="08xxxxxxxxxx"
                                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Nama Rekening */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Nama Rekening
                                    </label>
                                    <input
                                        type="text"
                                        name="nama_rekening"
                                        value={data.nama_rekening}
                                        onChange={handleChange}
                                        placeholder="Nama pemilik rekening"
                                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Pilih Bank */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Pilih Bank
                                    </label>
                                    <select
                                        name="bank"
                                        value={data.bank}
                                        onChange={handleChange}
                                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">-- Pilih Bank --</option>
                                        <option value="BCA">BCA</option>
                                        <option value="BRI">BRI</option>
                                        <option value="BNI">BNI</option>
                                        <option value="Mandiri">Mandiri</option>
                                        <option value="CIMB">CIMB Niaga</option>
                                    </select>
                                </div>

                                {/* Sistem Pembayaran */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Sistem Pembayaran
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <label
                                            className={`border rounded-2xl p-3 text-center cursor-pointer font-semibold ${data.sistem_pembayaran === 'Lunas'
                                                ? 'bg-blue-950 text-white border-blue-700'
                                                : 'bg-white'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="sistem_pembayaran"
                                                value="Lunas"
                                                className="hidden"
                                                onChange={handleChange}
                                            />
                                            Lunas
                                        </label>

                                        <label
                                            className={`border rounded-2xl p-3 text-center cursor-pointer font-semibold ${data.sistem_pembayaran === 'DP 50%'
                                                ? 'bg-orange-500 text-white border-orange-500'
                                                : 'bg-white'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="sistem_pembayaran"
                                                value="DP 50%"
                                                className="hidden"
                                                onChange={handleChange}
                                            />
                                            DP 50%
                                        </label>
                                    </div>
                                </div>

                                {/* Upload Bukti */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Upload Bukti Pembayaran
                                    </label>
                                    <label className="border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                        <i className="fas fa-cloud-upload-alt text-3xl text-blue-600 mb-2"></i>
                                        <span className="text-sm text-gray-600">
                                            Klik untuk upload bukti transfer
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>

                                    {preview && (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="mt-4 rounded-2xl w-full h-48 object-cover border"
                                        />
                                    )}
                                </div>

                                {/* Tombol Submit */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.02] transition"
                                >
                                    Kirim Pembayaran
                                </button>
                            </form>
                        </div>

                        {/* INFO */}
                        <div className="mt-5 bg-yellow-50 border border-yellow-300 rounded-2xl p-4">
                            <p className="text-sm text-yellow-800 font-medium">
                                * Pastikan bukti transfer jelas agar admin dapat memverifikasi pembayaran lebih cepat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}