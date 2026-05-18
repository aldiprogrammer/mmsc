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
    const [copied, setCopied] = useState(false)

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
        tanggal: tgl,
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

    const rekeningTujuan = {
        bank: 'BCA',
        nomor: '1234567890',
        atas_nama: 'Medan Mini Soccer',
    }

    const copyRekening = () => {
        navigator.clipboard.writeText(rekeningTujuan.nomor)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }


    const handlejam = async () => {

        try {
            const response = await axios.get('/getjammain?ids=' + JSON.stringify(jam.map(item => item.id)));
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
                localStorage.removeItem("selectJam");
                localStorage.removeItem("idlap");


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
                            <h3 className="font-bold text-lg">Pembayaran</h3>
                            <div className="w-6"></div>
                        </div>
                    </div>

                    {/* BANNER */}
                    <div
                        className="relative h-44 bg-cover bg-center rounded-b-xl"
                        style={{
                            backgroundImage: "url('../img/bgpembayaran.png')",
                        }}
                    >
                        <div className="absolute inset-0 bg-blue-900/50  rounded-b-xl"></div>
                    </div>

                    {/* FORM */}
                    <div className="p-4">

                        <div className="bg-white rounded-3xl shadow-lg p-5 -mt-20 relative z-10 border">

                            {/* SUMMARY */}
                            <div className='flex justify-between items-start'>
                                <div>
                                    <div className='text-[10px] font-semibold text-gray-400 uppercase tracking-wider'>Jam Main</div>
                                    <div className='text-xs font-bold text-gray-900 mt-1'>
                                        {listjam.map((item, index) => (
                                            <div key={index}>
                                                {item.jam_mulai} - {item.jam_berakhir} WIB
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <div className='text-[10px] font-semibold text-gray-400 uppercase tracking-wider'>Total</div>
                                    <div className='text-sm font-extrabold text-blue-950 mt-1'>
                                        Rp {totalFromServices.toLocaleString('id-ID')}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-dashed border-gray-200 my-4"></div>

                            {/* LAYANAN */}
                            <Link href={'/layanan/' + tgl}>
                                <div className='bg-gray-50 rounded-xl p-3 flex justify-between items-center'>
                                    <div>
                                        <span className='text-sm font-semibold text-gray-700'>Layanan Tambahan</span>
                                        {hasAnyService && (
                                            <div className='flex gap-2 mt-2'>
                                                {hasFoto && <span className='text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium'><i className='fas fa-camera mr-1'></i>Foto</span>}
                                                {hasBola && <span className='text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium'><i className='fas fa-futbol mr-1'></i>Bola</span>}
                                                {hasRompi && <span className='text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium'><i className='fas fa-shirt mr-1'></i>Rompi</span>}
                                                {hasWasit && <span className='text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium'><i className='fas fa-user mr-1'></i>Wasit</span>}
                                            </div>
                                        )}
                                    </div>
                                    <i className='fas fa-chevron-right text-gray-400 text-xs'></i>
                                </div>
                            </Link>

                            <div className="border-t border-dashed border-gray-200 my-4"></div>

                            {/* REKENING TUJUAN */}
                            <div className='mb-5'>
                                <div className='text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2'>Transfer ke</div>
                                <div className='bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl p-4 text-white'>
                                    <div className='flex items-center gap-3 mb-3'>
                                        <div className='w-10 h-10 rounded-full bg-white/20 flex items-center justify-center'>
                                            <i className='fas fa-university'></i>
                                        </div>
                                        <div>
                                            <div className='text-[10px] text-blue-200'>{rekeningTujuan.bank}</div>
                                            <div className='text-sm font-bold tracking-wider'>{rekeningTujuan.nomor}</div>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='text-xs text-blue-200'>
                                            a.n. <span className='text-white font-semibold'>{rekeningTujuan.atas_nama}</span>
                                        </div>
                                        <button
                                            type='button'
                                            onClick={copyRekening}
                                            className='text-[10px] px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition font-semibold'
                                        >
                                            <i className={`fas ${copied ? 'fa-check' : 'fa-copy'} mr-1`}></i>
                                            {copied ? 'Tersalin' : 'Salin'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* FORM */}
                            <form onSubmit={handleSubmit} className="space-y-4">

                                {/* Nama Team */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                        Nama Team
                                    </label>
                                    <input
                                        type="text"
                                        name="nama_team"
                                        value={data.nama_team}
                                        onChange={handleChange}
                                        placeholder="Masukan nama team"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-gray-50/50"
                                        required
                                    />
                                </div>

                                {/* No Whatsapp */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                        No WhatsApp
                                    </label>
                                    <input
                                        type="number"
                                        name="whatsapp"
                                        value={data.whatsapp}
                                        onChange={handleChange}
                                        placeholder="08xxxxxxxxxx"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-gray-50/50"
                                        required
                                    />
                                </div>

                                {/* Nama Rekening Pengirim */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                        Nama Pemilik Rekening
                                    </label>
                                    <input
                                        type="text"
                                        name="nama_rekening"
                                        value={data.nama_rekening}
                                        onChange={handleChange}
                                        placeholder="Nama sesuai rekening"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-gray-50/50"
                                        required
                                    />
                                </div>

                                {/* Pilih Bank */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                        Pilih Bank
                                    </label>
                                    <select
                                        name="bank"
                                        value={data.bank}
                                        onChange={handleChange}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-gray-50/50"
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
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                        Sistem Pembayaran
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <label
                                            className={`border rounded-2xl p-3.5 text-center cursor-pointer font-semibold text-sm transition ${data.sistem_pembayaran === 'Lunas'
                                                    ? 'bg-blue-950 text-white border-blue-950 shadow-sm'
                                                    : 'bg-white text-gray-600 border-gray-200'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="sistem_pembayaran"
                                                value="Lunas"
                                                className="hidden"
                                                onChange={handleChange}
                                            />
                                            <i className={`fas fa-check-circle mr-1.5 ${data.sistem_pembayaran === 'Lunas' ? 'text-white' : 'text-gray-300'}`}></i>
                                            Lunas
                                        </label>

                                        <label
                                            className={`border rounded-2xl p-3.5 text-center cursor-pointer font-semibold text-sm transition ${data.sistem_pembayaran === 'DP 50%'
                                                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                                                    : 'bg-white text-gray-600 border-gray-200'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="sistem_pembayaran"
                                                value="DP 50%"
                                                className="hidden"
                                                onChange={handleChange}
                                            />
                                            <i className={`fas fa-check-circle mr-1.5 ${data.sistem_pembayaran === 'DP 50%' ? 'text-white' : 'text-gray-300'}`}></i>
                                            DP 50%
                                        </label>
                                    </div>
                                </div>

                                {/* Upload Bukti */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                        Upload Bukti Pembayaran
                                    </label>
                                    <label className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                        <div className='w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3'>
                                            <i className="fas fa-cloud-upload-alt text-xl text-blue-600"></i>
                                        </div>
                                        <span className="text-sm text-gray-500 font-medium">
                                            Klik untuk upload bukti transfer
                                        </span>
                                        <span className="text-[10px] text-gray-400 mt-1">JPG, PNG, WEBP max 2MB</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>

                                    {preview && (
                                        <div className='mt-3 relative'>
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="rounded-2xl w-full h-44 object-cover border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => { setPreview(null); setData('bukti', null) }}
                                                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center text-xs"
                                            >
                                                <i className='fas fa-times'></i>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* INFO NOTE */}
                                <div className='bg-yellow-50 border border-yellow-200 rounded-2xl p-3.5 flex gap-3'>
                                    <i className='fas fa-info-circle text-yellow-600 mt-0.5'></i>
                                    <p className="text-[11px] text-yellow-700 leading-relaxed">
                                        Pastikan bukti transfer jelas agar admin dapat memverifikasi pembayaran lebih cepat.
                                    </p>
                                </div>

                                {/* Tombol Submit */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.01] transition active:scale-[0.99]"
                                >
                                    <i className='fas fa-paper-plane mr-2'></i>
                                    Kirim Pembayaran
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}