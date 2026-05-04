import { Link } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Jammain({ lapangan, lainya, jambooking }) {

    const banners = [lapangan.gambar2, lapangan.gambar2];
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState([]);
    const [services, setServices] = useState({});
    const [jam, setJam] = useState([]);
    const [tanggal, setTanggal] = useState();
    const [totalHarga, setTotalHarga] = useState(0)

    // JAM SLOT
    const jamSlots = Array.from({ length: 18 }, (_, i) => {
        const start = i + 6;
        const end = start + 1;

        const format = (val) => val.toString().padStart(2, "0");

        return {
            label: `${format(start)}:00 - ${format(end)}:00`,
            value: `${format(start)}-${format(end)}`
        };
    });


    const toggle = (value, harga) => {
        setSelected((prev) => {
            let updated;

            if (prev.includes(value)) {
                setTotalHarga((prevTotal) => prevTotal - Number(harga));
                updated = prev.filter((item) => item !== value);
            } else {
                setTotalHarga((prevTotal) => prevTotal + Number(harga));
                updated = [...prev, value];
            }

            console.log(updated); // ✅ Data terbaru
            return updated;
        });
    };




    // MODAL STATE
    const [openModal, setOpenModal] = useState(false);
    const [activeService, setActiveService] = useState(null);
    const [tempHour, setTempHour] = useState(1);

    // BUKA MODAL (SAFE)
    const openServiceModal = (service) => {
        setActiveService(service);
        setTempHour(services[service] || 1); // kalau sudah ada value, pakai itu
        setOpenModal(true);
    };

    // SIMPAN SERVICE
    const saveService = () => {
        setServices((prev) => ({
            ...prev,
            [activeService]: tempHour
        }));

        setOpenModal(false);
        setActiveService(null);
        setTempHour(1);
    };

    // ❌ FIX BATAL (INI YANG PENTING)
    const cancelModal = () => {
        setOpenModal(false);
        setActiveService(null);
        setTempHour(1);
    };


    const handleTanggal = async (e) => {
        setTanggal(e)
        try {
            const response = await axios.get('/jambooking/' + lapangan.id + '/' + e);
            // console.log(response);
            setJam(response.data)

        } catch (error) {

        }
    }

    // AUTO SLIDER
    useEffect(() => {

        const savedSelected = JSON.parse(localStorage.getItem("selectedJam")) || [];
        const savedTotal = JSON.parse(localStorage.getItem("totalHarga")) || 0;
        const savedServices = JSON.parse(localStorage.getItem("services")) || {};

        setSelected(savedSelected);
        setTotalHarga(savedTotal);
        setServices(savedServices);

        setJam(jambooking)
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Simpan otomatis setiap selected / total / layanan berubah
    useEffect(() => {
        localStorage.setItem("selectedJam", JSON.stringify(selected));
        localStorage.setItem("totalHarga", JSON.stringify(totalHarga));
        localStorage.setItem("services", JSON.stringify(services));
    }, [selected, totalHarga, services]);

    return (
        <div className="bg-gray-200 md:flex md:items-center md:justify-center md:min-h-screen">

            <div className="w-full h-screen bg-white overflow-y-auto relative md:max-w-[375px] md:mx-auto md:shadow-2xl md:border md:rounded-sm">

                {/* HEADER */}
                <div className="relative w-full h-[280px] overflow-hidden rounded-b-[40px]">

                    <div
                        className="flex h-full transition-transform duration-700"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {banners.map((banner, index) => (
                            <div key={index} className="min-w-full h-full relative">
                                <img src={banner} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/35"></div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute top-0 left-0 w-full flex justify-between px-5 pt-6 z-20">
                        <h1 className="text-white font-bold text-xl">
                            {lapangan.lapangan}
                        </h1>
                    </div>
                </div>

                <div className="px-4 pb-28 mt-4">

                    {/* WARNING */}
                    <div className="mb-4 bg-red-500 text-white p-4 rounded-xl text-sm">
                        ⚠ Booking tidak bisa dibatalkan setelah diproses
                    </div>

                    {/* TANGGAL */}
                    <div className="mb-4">
                        <label className="text-gray-500 font-semibold block mb-2">
                            Pilih Tanggal Booking
                        </label>
                        <input type="date" className="input input-bordered w-full" onChange={(e) => handleTanggal(e.target.value)} />
                    </div>

                    {/* LAYANAN */}
                    <div className="mb-5">
                        <label className="text-gray-500 font-semibold block mb-2">
                            Layanan Tambahan
                        </label>

                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: "Fotografer", value: "fotografer", icon: "fa-camera" },
                                { label: "Sewa Rompi", value: "rompi", icon: "fa-shirt" },
                                { label: "Sewa Bola", value: "bola", icon: "fa-futbol" },
                            ].map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => openServiceModal(item.value)}
                                    className={`p-4 rounded-2xl border text-center transition
                                    ${services[item.value]
                                            ? "bg-blue-900 text-white border-blue-900"
                                            : "bg-white text-gray-700 border-gray-200"
                                        }`}
                                >
                                    <i className={`fas ${item.icon} text-lg`}></i>

                                    <div className="text-xs font-semibold mt-1">
                                        {item.label}
                                    </div>

                                    {services[item.value] && (
                                        <div className="text-[10px] mt-1">
                                            {services[item.value]} jam
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* JAM SLOT */}
                    <div className="grid grid-cols-3 gap-1">
                        {jam.map((jam, i) => {
                            const active = selected.includes(jam.id);

                            return (
                                <button
                                    key={i}
                                    onClick={() => toggle(jam.id, jam.harga)}
                                    className={`p-4 text-xs rounded-2xl border
                                    ${active
                                            ? "bg-blue-900 text-white border-blue-900"
                                            : "bg-white text-blue-950 border-gray-200"
                                        }`}
                                >
                                    {jam.jam_mulai} - {jam.jam_berakhir}
                                    <div className='mt-2 text-gray-500 font-bold'>
                                        Rp {Number(jam.harga).toLocaleString('id-ID')}
                                        {/* {toLocalteString(jam.harga)} */}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* FOOTER */}
                <div className="fixed bottom-0 left-0 w-full md:flex md:justify-center">
                    <div className="w-full md:max-w-[375px] bg-white border-t p-4 shadow-lg">
                        <div className='flex justify-between mb-3'>
                            <div className="text-sm text-gray-500 mb-2">
                                {selected.length} jam • {Object.keys(services).length} layanan
                            </div>

                            <div className='font-bold text-lg text-blue-900'>Rp {totalHarga.toLocaleString('id-ID')}</div>
                        </div>
                        <Link href='/pembayaran'>
                            <button
                                disabled={selected.length === 0}
                                className={`w-full py-4 rounded-2xl font-bold
                            ${selected.length > 0
                                        ? "bg-blue-900 text-white"
                                        : "bg-gray-300 text-gray-500"
                                    }`}
                            >
                                <i className='fas f-money'></i> Pembayaran
                            </button>
                        </Link>

                    </div>
                </div>

                <div className="h-24"></div>

                {/* MODAL */}
                {openModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                        <div className="bg-white w-[90%] max-w-sm rounded-2xl p-5">

                            <h2 className="text-lg font-bold mb-2">
                                Atur Jam Layanan
                            </h2>

                            <p className="text-sm text-gray-500 mb-4">
                                Layanan: <b>{activeService}</b>
                            </p>

                            <select
                                value={tempHour}
                                onChange={(e) => setTempHour(Number(e.target.value))}
                                className="w-full border p-3 rounded-lg"
                            >
                                {Array.from(
                                    { length: selected.length || 1 },
                                    (_, i) => i + 1
                                ).map((h) => (
                                    <option key={h} value={h}>
                                        {h} Jam
                                    </option>
                                ))}
                            </select>

                            <p className="text-[10px] text-gray-400 mt-2">
                                Maksimal {selected.length || 1} jam sesuai booking
                            </p>

                            <div className="flex gap-2 mt-5">

                                <button
                                    onClick={cancelModal}
                                    className="w-full bg-gray-200 py-2 rounded-lg"
                                >
                                    Batal
                                </button>

                                <button
                                    onClick={saveService}
                                    className="w-full bg-blue-900 text-white py-2 rounded-lg"
                                >
                                    Simpan
                                </button>

                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}