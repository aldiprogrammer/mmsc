import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

export default function Layanan({ tgl }) {
    const [scrolled, setScrolled] = useState(false);
    const scrollRef = useRef(null);
    const [jam, setJam] = useState([]);
    const [bola, setBola] = useState([]);
    const [foto, setFoto] = useState([]);
    const [rompi, setRompi] = useState([]);
    const [wasit, setWasit] = useState([]);
    const [showbola, setShowBola] = useState(false);
    const [showrompi, setShowRompi] = useState(false);
    const [showfoto, setShowFoto] = useState(false);
    const [showwasit, setShowWasit] = useState(false);
    const [idlap, setIdlap] = useState(0);
    const [totalharga, setTotalharga] = useState(0);
    const [selectJamData, setSelectJamData] = useState([]);





    const getJam = async () => {
        try {
            const selectJam = JSON.parse(localStorage.getItem('selectJam') || '[]');
            const ids = JSON.stringify(selectJam.map(item => item.id));
            const response = await axios.get('/jambookinglayanan/' + ids);
            setJam(response.data);
        } catch (error) {

        }
    }

    const getFoto = async () => {
        try {
            const response = await axios.get('/fotograper');
            console.log(response.data);
            setFoto(response.data);
        } catch (error) {

        }
    }

    const getRompi = async () => {
        try {
            const response = await axios.get('/rompi');
            console.log(response.data);
            setRompi(response.data);
        } catch (error) {

        }
    }

    const getBola = async () => {
        try {
            const response = await axios.get('/bola');
            console.log(response.data);
            setBola(response.data);
        } catch (error) {

        }
    }

    const getWasit = async () => {
        try {
            const response = await axios.get('/wasit');
            console.log(response.data);
            setWasit(response.data);
        } catch (error) {

        }
    }

    const handleshow = (a, id) => {
        if (a == 'foto') {
            setIdlap(id)
            setShowFoto(!showfoto);
        } else if (a == 'bola') {
            setIdlap(id)
            setShowBola(!showbola);
        } else if (a == 'rompi') {
            setIdlap(id);
            setShowRompi(!showrompi);
        } else if (a == 'wasit') {
            setIdlap(id)
            setShowWasit(!showwasit);
        }
    }

    const syncFromStorage = () => {
        const data = JSON.parse(localStorage.getItem("selectJam") || '[]');
        setSelectJamData(data);
        const total = data.reduce((sum, item) => {
            return sum + Number(item.hargalap || 0) +
                Number(item.hargafoto || 0) +
                Number(item.hargabola || 0) +
                Number(item.hargarompi || 0) +
                Number(item.hargawasit || 0);
        }, 0);
        setTotalharga(total);
    }

    const handleLayanan = (layanan, idlayanan, harga, idjam) => {
        setSelectJamData(prev => {
            const update = prev.map(item => {
                if (item.id == idjam) {

                    if (layanan == 'foto') {
                        if (item.foto == idlayanan) {
                            return { ...item, foto: "", hargafoto: "" };
                        }
                        return { ...item, foto: idlayanan, hargafoto: harga };

                    } else if (layanan == 'bola') {
                        if (item.bola == idlayanan) {
                            return { ...item, bola: "", hargabola: "" };
                        }
                        return { ...item, bola: idlayanan, hargabola: harga };

                    } else if (layanan == 'rompi') {
                        if (item.rompi == idlayanan) {
                            return { ...item, rompi: "", hargarompi: "" };
                        }
                        return { ...item, rompi: idlayanan, hargarompi: harga };

                    } else if (layanan == 'wasit') {
                        if (item.wasit == idlayanan) {
                            return { ...item, wasit: "", hargawasit: "" };
                        }
                        return { ...item, wasit: idlayanan, hargawasit: harga };
                    }
                }
                return item;
            })
            localStorage.setItem("selectJam", JSON.stringify(update));
            const total = update.reduce((sum, item) => {
                return sum + Number(item.hargalap || 0) +
                    Number(item.hargafoto || 0) +
                    Number(item.hargabola || 0) +
                    Number(item.hargarompi || 0) +
                    Number(item.hargawasit || 0);
            }, 0);
            setTotalharga(total);
            return update;
        })
    }

    useEffect(() => {
        syncFromStorage();
        getJam();
        getWasit();
        getBola();
        getRompi();
        getFoto();
    }, [])

    const serviceMeta = {
        foto: { icon: 'fa-camera', label: 'Fotograper', color: 'blue', data: foto },
        bola: { icon: 'fa-futbol', label: 'Bola', color: 'emerald', data: bola },
        rompi: { icon: 'fa-shirt', label: 'Rompi', color: 'violet', data: rompi },
        wasit: { icon: 'fa-user', label: 'Wasit', color: 'orange', data: wasit },
    }

    const colorMap = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500', light: 'bg-blue-500/10' },
        emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500', light: 'bg-emerald-500/10' },
        violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', dot: 'bg-violet-500', light: 'bg-violet-500/10' },
        orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500', light: 'bg-orange-500/10' },
    }

    return (
        <div className="bg-gray-50 md:flex md:items-center md:justify-center md:min-h-screen">
            <div className="w-full h-screen bg-white overflow-y-auto relative md:max-w-[375px] md:mx-auto md:shadow-xl md:border md:rounded-sm">

                {/* HEADER */}
                <div className={`sticky top-0 z-50 px-4 py-4 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur border-b border-gray-100' : 'bg-gradient-to-r from-blue-950 to-blue-900'}`}>
                    <div className="flex items-center gap-3">
                        <button onClick={() => window.history.back()} className={`text-lg ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <h3 className={`font-bold text-lg ${scrolled ? 'text-gray-800' : 'text-white'}`}>Layanan Tambahan</h3>
                    </div>
                </div>

                {/* SUMMARY CARD */}
                <div className='px-4 pt-4'>
                    <div className='bg-blue-950 rounded-2xl px-5 py-4 shadow-lg shadow-blue-900/20'>
                        <div className='flex items-center'>
                            <div className='flex-1 text-center'>
                                <div className='text-[10px] text-blue-200/80 uppercase tracking-widest font-medium'>Jam Booking</div>
                                <div className='mt-1 text-xl font-bold text-white'>{jam.length}</div>
                            </div>
                            <div className='w-px h-10 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent'></div>
                            <div className='flex-1 text-center'>
                                <div className='text-[10px] text-blue-200/80 uppercase tracking-widest font-medium'>Total Harga</div>
                                <div className='mt-1 text-xl font-bold text-white'>Rp {totalharga.toLocaleString('id-ID')}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* JAM + SERVICE CARDS */}
                <div className='px-4 pb-32 mt-5 space-y-5'>
                    {jam.map((item, index) => (
                        <div key={item.id} className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>

                            {/* JAM HEADER */}
                            <div className='bg-gradient-to-r from-gray-50 to-white px-4 py-3.5 border-b border-gray-100'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-blue-950 to-blue-700 flex items-center justify-center shadow-sm'>
                                            <i className='fas fa-clock text-white text-xs'></i>
                                        </div>
                                        <div>
                                            <div className='text-sm font-bold text-gray-800'>{item.jam_mulai} - {item.jam_berakhir} WIB</div>
                                            <div className='text-[10px] text-gray-400 flex items-center gap-1 mt-0.5'>
                                                <i className='fas fa-calendar-alt'></i> {tgl}
                                            </div>
                                        </div>
                                    </div>
                                    {(() => {
                                        const jd = selectJamData.find(j => j.id == item.id)
                                        const ada = jd?.foto || jd?.bola || jd?.rompi || jd?.wasit
                                        return ada ? (
                                            <div className='text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200'>
                                                <i className='fas fa-check-circle mr-1'></i>Terisi
                                            </div>
                                        ) : null
                                    })()}
                                </div>
                            </div>

                            {/* SERVICE LIST */}
                            <div className='px-4 py-3 space-y-2'>
                                {['foto', 'bola', 'rompi', 'wasit'].map(key => {
                                    const meta = serviceMeta[key]
                                    const colors = colorMap[meta.color]
                                    const isOpen = key == 'foto' ? showfoto : key == 'bola' ? showbola : key == 'rompi' ? showrompi : showwasit
                                    const isThisOpen = isOpen && idlap == item.id
                                    const jamData = selectJamData.find(j => j.id == item.id)
                                    const selectedId = jamData?.[key]

                                    return (
                                        <div key={key}>
                                            <button
                                                onClick={() => handleshow(key, item.id)}
                                                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl border transition-all ${isThisOpen ? colors.border + ' ' + colors.bg : 'border-transparent hover:bg-gray-50'}`}
                                            >
                                                <div className='flex items-center gap-3'>
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedId ? colors.bg : 'bg-gray-100/80'}`}>
                                                        <i className={`fas ${meta.icon} text-sm ${selectedId ? colors.text : 'text-gray-400'}`}></i>
                                                    </div>
                                                    <div className='text-left'>
                                                        <div className={`text-sm font-semibold ${selectedId ? colors.text : 'text-gray-700'}`}>
                                                            {meta.label}
                                                        </div>
                                                        {selectedId && (
                                                            <div className='text-[10px] text-emerald-600 font-medium flex items-center gap-1'>
                                                                <i className='fas fa-check-circle text-[8px]'></i>Ditambahkan
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition ${isThisOpen ? colors.bg : 'bg-gray-100'}`}>
                                                    <i className={`fas fa-chevron-${isThisOpen ? 'up' : 'down'} text-[10px] ${isThisOpen ? colors.text : 'text-gray-400'} transition-transform`}></i>
                                                </div>
                                            </button>

                                            <div className={`overflow-hidden transition-all duration-200 ${isThisOpen ? 'max-h-96 mt-1.5' : 'max-h-0'}`}>
                                                {meta.data.length === 0 ? (
                                                    <div className='px-4 py-3 text-xs text-gray-400 text-center'>Tidak tersedia</div>
                                                ) : (
                                                    <div className='bg-white rounded-xl border border-gray-100 divide-y divide-gray-50'>
                                                        {meta.data.map((opt, idx) => {
                                                            const nameKey = key == 'bola' ? 'bola' : key == 'rompi' ? 'rompi' : 'nama'
                                                            const isChecked = selectedId == opt.id
                                                            return (
                                                                <label
                                                                    key={idx}
                                                                    onClick={(e) => { e.stopPropagation(); handleLayanan(key, opt.id, opt.harga, item.id) }}
                                                                    className='flex items-center justify-between px-4 py-3.5 cursor-pointer hover:bg-gray-50/80 transition'
                                                                >
                                                                    <div className='flex items-center gap-3'>
                                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${isChecked ? colors.border + ' bg-white' : 'border-gray-300'}`}>
                                                                            {isChecked && <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`}></div>}
                                                                        </div>
                                                                        <span className='text-sm text-gray-700'>{opt[nameKey]}</span>
                                                                    </div>
                                                                    <span className='text-xs font-semibold text-gray-400'>+Rp{Number(opt.harga).toLocaleString('id-ID')}</span>
                                                                </label>
                                                            )
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}

                    {jam.length === 0 && (
                        <div className='flex flex-col items-center justify-center py-20 text-center'>
                            <div className='w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4'>
                                <i className='fas fa-clock text-gray-300 text-2xl'></i>
                            </div>
                            <p className='text-sm text-gray-400 font-medium'>Belum ada jam booking</p>
                            <p className='text-xs text-gray-300 mt-1'>Pilih jadwal terlebih dahulu</p>
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <div className="fixed bottom-0 left-0 w-full md:flex md:justify-center z-40">
                    <div className="w-full md:max-w-[375px] bg-white border-t border-gray-200 px-4 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                        <div className='flex items-center justify-between mb-3'>
                            <span className='text-sm text-gray-500 font-medium'>Total Pembayaran</span>
                            <span className='text-lg font-extrabold text-blue-950'>Rp{totalharga.toLocaleString('id-ID')}</span>
                        </div>
                        <button
                            onClick={() => window.history.back()}
                            className="w-full py-3.5 bg-blue-950 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 active:scale-[0.98] transition-all"
                        >
                            <i className='fas fa-arrow-left mr-2'></i> Kembali ke Pembayaran
                        </button>
                    </div>
                </div>

                <div className="h-24"></div>

            </div>
        </div>
    )
}
