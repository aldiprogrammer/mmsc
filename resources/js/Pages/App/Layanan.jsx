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

    return (

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
                        <h3 className="font-bold">Layanan</h3>
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
                                        Rp. 5.000.000
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>


                <div className='p-4'>
                    {jam.map((item, index) => (
                        <div>
                            <div className='bg-gray-300 rounded-lg mt-2 text-xs font-bold flex justify-between text-blue-950'>
                                <div className='p-2'>
                                    <i className='fas fa-clock'></i>{" "}
                                    {item.jam_mulai} - {item.jam_berakhir} WIB
                                </div>
                                <div className='p-2'>
                                    <i className='fas fa-calendar'></i>{" "}
                                    {tgl}
                                </div>
                            </div>

                            <div className='bg-gray-500 p-5 mt-1 rounded-lg '>
                                <div className='flex justify-between text-gray-100' onClick={() => handleshow('foto', item.id)}>
                                    <div className='font-bold'>
                                        {selectJamData.find(j => j.id == item.id)?.foto ? <i className='fas fa-check-circle text-green-400 mr-1'></i> : ''}
                                        Fotograper
                                    </div>
                                    <div>
                                        {showfoto == true && idlap == item.id ? <>  <i className='fas fa-angle-down'></i></> : <>   <i className='fas fa-angle-right'></i></>}

                                    </div>
                                </div>

                                <div className={showfoto == true && idlap == item.id ? 'mt-2' : 'mt-2 hidden'}>
                                    {foto.map((ft, index) => (
                                        <div className='flex justify-between text-gray-100'>
                                            <div className='text-xs'>
                                                {ft.nama} - {Number(ft.harga).toLocaleString('id-ID')}
                                            </div>
                                            <div>
                                                <input name='foto' type="checkbox" value={ft.id} checked={selectJamData.find(j => j.id == item.id)?.foto == ft.id} onClick={(e) => { e.stopPropagation(); handleLayanan('foto', ft.id, ft.harga, item.id) }} class="checkbox checkbox-bg checkbox-sm" />
                                            </div>
                                        </div>
                                    ))}
                                </div>


                                <div className='flex justify-between mt-3 text-gray-100' onClick={() => handleshow('bola', item.id)}>
                                    <div className='font-bold'>
                                        {selectJamData.find(j => j.id == item.id)?.bola ? <i className='fas fa-check-circle text-green-400 mr-1'></i> : ''}
                                        Bola
                                    </div>
                                    <div>
                                        <div>
                                            {showbola == true && idlap == item.id ? <>  <i className='fas fa-angle-down'></i></> : <>   <i className='fas fa-angle-right'></i></>}
                                        </div>
                                    </div>
                                </div>
                                <div className={showbola == true && idlap == item.id ? 'mt-2' : 'mt-2 hidden'}>
                                    {bola.map((bl, index) => (
                                        <div className='flex justify-between text-gray-100'>
                                            <div className='text-xs'>
                                                {bl.bola} - {Number(bl.harga).toLocaleString('id-ID')}
                                            </div>
                                            <div>
                                                <input type="checkbox" name='bola' checked={selectJamData.find(j => j.id == item.id)?.bola == bl.id} class="checkbox checkbox-bg checkbox-sm" onClick={(e) => { e.stopPropagation(); handleLayanan('bola', bl.id, bl.harga, item.id) }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className='flex justify-between mt-3 text-gray-100' onClick={() => handleshow('rompi', item.id)}>
                                    <div className='font-bold'>
                                        {selectJamData.find(j => j.id == item.id)?.rompi ? <i className='fas fa-check-circle text-green-400 mr-1'></i> : ''}
                                        Rompi
                                    </div>
                                    <div>
                                        {showrompi == true && idlap == item.id ? <>  <i className='fas fa-angle-down'></i></> : <>   <i className='fas fa-angle-right'></i></>}
                                    </div>
                                </div>

                                <div className={showrompi == true && idlap == item.id ? 'mt-2' : 'mt-2 hidden'}>
                                    {rompi.map((rm, index) => (
                                        <div className='flex justify-between text-gray-100'>
                                            <div className='text-xs'>
                                                {rm.rompi} - {Number(rm.harga).toLocaleString('id-ID')}
                                            </div>
                                            <div>
                                                <input type="checkbox" name='rompi' checked={selectJamData.find(j => j.id == item.id)?.rompi == rm.id} class="checkbox checkbox-bg checkbox-sm" onClick={(e) => { e.stopPropagation(); handleLayanan('rompi', rm.id, rm.harga, item.id) }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>




                                <div className='flex justify-between mt-3 text-gray-100' onClick={() => handleshow('wasit', item.id)}>
                                    <div className='font-bold'>
                                        {selectJamData.find(j => j.id == item.id)?.wasit ? <i className='fas fa-check-circle text-green-400 mr-1'></i> : ''}
                                        Wasit
                                    </div>
                                    <div>
                                        {showwasit == true && idlap == item.id ? <>  <i className='fas fa-angle-down'></i></> : <>   <i className='fas fa-angle-right'></i></>}
                                    </div>
                                </div>

                                <div className={showwasit == true && idlap == item.id ? 'mt-2' : 'mt-2 hidden'}>
                                    {wasit.map((ws, index) => (
                                        <div className='flex justify-between text-gray-100'>
                                            <div className='text-xs'>
                                                {ws.nama} - {Number(ws.harga).toLocaleString('id-ID')}
                                            </div>
                                            <div>
                                                <input type="checkbox" name='wasit' checked={selectJamData.find(j => j.id == item.id)?.wasit == ws.id} class="checkbox checkbox-bg checkbox-sm" onClick={(e) => { e.stopPropagation(); handleLayanan('wasit', ws.id, ws.harga, item.id) }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>



                {/* FOOTER */}
                <div className="fixed bottom-0 left-0 w-full md:flex md:justify-center">
                    <div className="w-full md:max-w-[375px] bg-white border-t p-4 shadow-lg">
                        <div className='flex justify-between mb-3'>
                            <div className="text-sm text-gray-500 mb-2">
                                Total Harga
                            </div>

                            <div className='font-bold text-lg text-blue-900'>Rp {totalharga.toLocaleString('id-ID')}</div>
                        </div>


                    </div>
                </div>

                <div className="h-24"></div>


            </div >


        </div >
    )
}
