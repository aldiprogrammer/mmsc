import { Head, router } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'

export default function Daftarteam({ team, pemain, point, jmlMain, idAuth }) {
    const [scrolled, setScrolled] = useState(false)
    const scrollRef = useRef(null)
    const [activeTab, setActiveTab] = useState('team')

    const logoUrl = (path) => {
        if (!path) return null
        if (path.startsWith('http')) return path
        if (path.startsWith('/storage')) return path
        return `/storage/${path}`
    }

    /* Team state */
    const [namaTeam, setNamaTeam] = useState(team?.nama_team || '')
    const [logoPreview, setLogoPreview] = useState(logoUrl(team?.logo_team))
    const [logoFile, setLogoFile] = useState(null)
    const [teamLoading, setTeamLoading] = useState(false)
    const [teamMsg, setTeamMsg] = useState({ type: '', text: '' })

    /* Player state */
    const [showPlayerForm, setShowPlayerForm] = useState(false)
    const [playerNama, setPlayerNama] = useState('')
    const [playerPosisi, setPlayerPosisi] = useState('')
    const [playerNo, setPlayerNo] = useState('')
    const [playerNickname, setPlayerNickname] = useState('')
    const [playerFotoPreview, setPlayerFotoPreview] = useState(null)
    const [playerFotoFile, setPlayerFotoFile] = useState(null)
    const [playerLoading, setPlayerLoading] = useState(false)
    const [playerMsg, setPlayerMsg] = useState({ type: '', text: '' })

    useEffect(() => {
        const el = scrollRef.current
        const handleScroll = () => {
            if (el) setScrolled(el.scrollTop > 20)
        }
        if (el) el.addEventListener('scroll', handleScroll)
        return () => { if (el) el.removeEventListener('scroll', handleScroll) }
    }, [])

    const handleLogoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setLogoFile(file)
            setLogoPreview(URL.createObjectURL(file))
        }
    }

    /* Team submit */
    const handleTeamSubmit = (e) => {
        e.preventDefault()
        if (!namaTeam.trim()) {
            setTeamMsg({ type: 'error', text: 'Nama team harus diisi' })
            return
        }
        setTeamLoading(true)
        setTeamMsg({ type: '', text: '' })

        const formData = new FormData()
        formData.append('nama_team', namaTeam)
        if (logoFile) formData.append('logo', logoFile)

        router.post('/daftarteam/save', formData, {
            onSuccess: () => {
                setTeamMsg({ type: 'success', text: 'Team berhasil disimpan!' })
            },
            onError: (errors) => {
                setTeamMsg({ type: 'error', text: errors.nama_team || 'Gagal menyimpan team' })
            },
            onFinish: () => {
                setTeamLoading(false)
            },
        })
    }

    /* Player submit */
    const handlePlayerSubmit = (e) => {
        e.preventDefault()
        if (!playerNama.trim()) {
            setPlayerMsg({ type: 'error', text: 'Nama pemain harus diisi' })
            return
        }
        setPlayerLoading(true)
        setPlayerMsg({ type: '', text: '' })

        const formData = new FormData()
        formData.append('nama', playerNama)
        formData.append('posisi', playerPosisi)
        formData.append('no_punggung', playerNo)
        formData.append('nickname', playerNickname)
        if (playerFotoFile) formData.append('foto', playerFotoFile)

        router.post('/daftarteam/pemain', formData, {
            onSuccess: () => {
                setPlayerMsg({ type: 'success', text: 'Pemain berhasil ditambahkan!' })
            },
            onError: (errors) => {
                setPlayerMsg({ type: 'error', text: errors.message || 'Gagal menambahkan pemain' })
            },
            onFinish: () => {
                setPlayerLoading(false)
            },
        })
    }

    const deletePlayer = (id) => {
        if (confirm('Hapus pemain ini?')) {
            router.delete(`/daftarteam/pemain/${id}`)
        }
    }

    const winrate = point ? Math.round((point.win / (point.play || 1)) * 100) : 0

    const posisiOptions = ['Penjaga Gawang', 'Bek', 'Gelandang', 'Sayap', 'Striker']

    return (
        <>
            <Head title="Daftar Team" />

            <div className="bg-gray-50 md:flex md:items-center md:justify-center md:min-h-screen">
                <div className="w-full h-screen bg-gray-50 overflow-y-auto relative md:max-w-[375px] md:mx-auto md:shadow-xl md:border md:border-gray-200 md:rounded-2xl" ref={scrollRef}>

                    {/* HEADER */}
                    <div className={`sticky top-0 z-50 px-4 py-4 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm' : 'bg-gradient-to-r from-blue-950 to-blue-900'}`}>
                        <div className="flex items-center gap-3">
                            <button onClick={() => window.history.back()} className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${scrolled ? 'bg-gray-100 text-gray-600' : 'bg-white/10 text-white'}`}>
                                <i className="fas fa-arrow-left text-sm"></i>
                            </button>
                            <h3 className={`font-bold text-lg ${scrolled ? 'text-gray-800' : 'text-white'}`}>Team & Pemain</h3>
                        </div>
                    </div>

                    {/* TABS */}
                    <div className="px-4 pt-4">
                        <div className="flex gap-1 p-1 bg-gray-200/70 rounded-xl">
                            <button
                                onClick={() => setActiveTab('team')}
                                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${activeTab === 'team'
                                        ? 'bg-white text-blue-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <i className="fas fa-shield-halved mr-1.5"></i>
                                Team
                            </button>
                            <button
                                onClick={() => setActiveTab('players')}
                                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${activeTab === 'players'
                                        ? 'bg-white text-blue-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <i className="fas fa-users mr-1.5"></i>
                                Pemain
                                {pemain && pemain.length > 0 && (
                                    <span className="ml-1 bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-md text-[10px]">{pemain.length}</span>
                                )}
                            </button>
                            {team && (
                                <button
                                    onClick={() => setActiveTab('stats')}
                                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${activeTab === 'stats'
                                            ? 'bg-white text-blue-900 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <i className="fas fa-chart-bar mr-1.5"></i>
                                    Statistik
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ============ TEAM TAB ============ */}
                    {activeTab === 'team' && (
                        <div className="px-4 pt-4 pb-8">
                            <div className="bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700 rounded-2xl px-5 py-6 shadow-lg shadow-blue-900/20">
                                <div className="flex flex-col items-center">
                                    {/* Logo Upload */}
                                    <label className="relative cursor-pointer group">
                                        <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center overflow-hidden transition group-hover:border-white/60">
                                            {logoPreview ? (
                                                <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                                            ) : (
                                                <i className="fas fa-camera text-2xl text-white/60"></i>
                                            )}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                                            <i className="fas fa-pen text-[8px] text-white"></i>
                                        </div>
                                        <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                                    </label>

                                    <h4 className="text-white font-bold text-base mt-3 mb-1">{team ? namaTeam || 'Team Anda' : 'Buat Team Baru'}</h4>
                                    {team && <p className="text-white/50 text-xs mb-3">Ketuk untuk mengubah nama team</p>}

                                    {/* Team Name Input */}
                                    <div className="mt-2 w-full">
                                        <input
                                            type="text"
                                            value={namaTeam}
                                            onChange={(e) => setNamaTeam(e.target.value)}
                                            placeholder="Masukkan nama team"
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm font-semibold text-center placeholder:text-white/40 focus:outline-none focus:border-white/50 transition"
                                        />
                                    </div>

                                    <button
                                        onClick={handleTeamSubmit}
                                        disabled={teamLoading}
                                        className="mt-3 w-full py-2.5 bg-white text-blue-900 rounded-xl font-bold text-sm hover:bg-white/90 active:scale-[0.98] transition disabled:opacity-50"
                                    >
                                        {teamLoading && <i className="fas fa-spinner fa-spin mr-2"></i>}
                                        {team ? 'Update Team' : 'Buat Team'}
                                    </button>

                                    {teamMsg.text && (
                                        <div className={`mt-2 text-xs font-medium ${teamMsg.type === 'success' ? 'text-green-300' : 'text-red-300'}`}>
                                            <i className={`fas fa-${teamMsg.type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-1`}></i>
                                            {teamMsg.text}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Info */}
                            {team && (
                                <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                                            <i className="fas fa-trophy text-blue-600"></i>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-gray-800">{team.nama_team}</div>
                                            <div className="text-[10px] text-gray-400">{pemain?.length || 0} pemain &bull; {point?.play || 0} pertandingan</div>
                                        </div>
                                        <div className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-full">
                                            {point?.point || 0} Poin
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!team && idAuth && (
                                <div className="mt-6 text-center py-8">
                                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                                        <i className="fas fa-shield-halved text-gray-300 text-xl"></i>
                                    </div>
                                    <p className="text-sm text-gray-400 font-medium">Belum memiliki team</p>
                                    <p className="text-xs text-gray-300 mt-1">Buat team di atas untuk mulai bermain</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ============ PLAYERS TAB ============ */}
                    {activeTab === 'players' && (
                        <div className="px-4 pt-4 pb-8">
                            {!team ? (
                                <div className="text-center py-16">
                                    <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                        <i className="fas fa-lock text-gray-300 text-2xl"></i>
                                    </div>
                                    <p className="text-sm text-gray-400 font-semibold">Buat team terlebih dahulu</p>
                                    <p className="text-xs text-gray-300 mt-1 mb-4">Anda perlu membuat team sebelum menambahkan pemain</p>
                                    <button
                                        onClick={() => setActiveTab('team')}
                                        className="bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-blue-500 transition"
                                    >
                                        <i className="fas fa-shield-halved mr-1.5"></i>
                                        Buat Team
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Add Player Button */}
                                    <button
                                        onClick={() => setShowPlayerForm(!showPlayerForm)}
                                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-500 active:scale-[0.98] transition flex items-center justify-center gap-2 mb-4"
                                    >
                                        <i className={`fas ${showPlayerForm ? 'fa-times' : 'fa-plus'}`}></i>
                                        {showPlayerForm ? 'Batal' : 'Tambah Pemain'}
                                    </button>

                                    {/* Player Form */}
                                    {showPlayerForm && (
                                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
                                            <h5 className="text-sm font-bold text-gray-800 mb-3">
                                                <i className="fas fa-user-plus text-blue-600 mr-1.5"></i>
                                                Data Pemain
                                            </h5>
                                            <form onSubmit={handlePlayerSubmit}>
                                                <div className="space-y-3">
                                                    <div className="flex justify-center mb-3">
                                                        <label className="relative cursor-pointer group">
                                                            <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden transition group-hover:border-blue-400">
                                                                {playerFotoPreview ? (
                                                                    <img src={playerFotoPreview} alt="Foto Pemain" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="text-center">
                                                                        <i className="fas fa-user text-xl text-gray-300"></i>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                                                                <i className="fas fa-camera text-[8px] text-white"></i>
                                                            </div>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0]
                                                                    if (file) {
                                                                        setPlayerFotoFile(file)
                                                                        setPlayerFotoPreview(URL.createObjectURL(file))
                                                                    }
                                                                }}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                    </div>

                                                    <div>
                                                        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Nama Pemain *</label>
                                                        <input
                                                            type="text"
                                                            value={playerNama}
                                                            onChange={(e) => setPlayerNama(e.target.value)}
                                                            placeholder="Nama lengkap pemain"
                                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Posisi</label>
                                                            <select
                                                                value={playerPosisi}
                                                                onChange={(e) => setPlayerPosisi(e.target.value)}
                                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
                                                            >
                                                                <option value="">Pilih posisi</option>
                                                                {posisiOptions.map((p) => (
                                                                    <option key={p} value={p}>{p}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">No. Punggung</label>
                                                            <input
                                                                type="number"
                                                                value={playerNo}
                                                                onChange={(e) => setPlayerNo(e.target.value)}
                                                                placeholder="10"
                                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Nickname</label>
                                                        <input
                                                            type="text"
                                                            value={playerNickname}
                                                            onChange={(e) => setPlayerNickname(e.target.value)}
                                                            placeholder="Nama panggilan"
                                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
                                                        />
                                                    </div>
                                                </div>

                                                {playerMsg.text && (
                                                    <div className={`mt-3 text-xs font-medium ${playerMsg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                                        <i className={`fas fa-${playerMsg.type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-1`}></i>
                                                        {playerMsg.text}
                                                    </div>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={playerLoading}
                                                    className="mt-4 w-full py-2.5 bg-blue-900 text-white rounded-xl font-bold text-sm hover:bg-blue-800 active:scale-[0.98] transition disabled:opacity-50"
                                                >
                                                    {playerLoading && <i className="fas fa-spinner fa-spin mr-2"></i>}
                                                    Simpan Pemain
                                                </button>
                                            </form>
                                        </div>
                                    )}

                                    {/* Player List */}
                                    {!pemain || pemain.length === 0 ? (
                                        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
                                                <i className="fas fa-user-plus text-gray-300 text-xl"></i>
                                            </div>
                                            <p className="text-sm text-gray-400 font-medium">Belum ada pemain</p>
                                            <p className="text-xs text-gray-300 mt-1">Tambahkan pemain ke team Anda</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {pemain.map((p, index) => (
                                                <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm hover:shadow-md transition-shadow">
                                                    <div className="flex items-center gap-3">
                                                        {/* Avatar / Foto */}
                                                        <div className="relative">
                                                            {p.foto ? (
                                                                <img
                                                                    src={logoUrl(p.foto)}
                                                                    alt={p.nama}
                                                                    className="w-12 h-12 rounded-xl object-cover border border-gray-100"
                                                                />
                                                            ) : (
                                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                                                                    <span className="text-lg font-extrabold text-white">{p.no_punggung || index + 1}</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Info */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-bold text-gray-800 truncate">{p.nama}</div>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                {p.posisi && (
                                                                    <span className="text-[10px] bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-md">
                                                                        {p.posisi}
                                                                    </span>
                                                                )}
                                                                {p.nickname && (
                                                                    <span className="text-[10px] text-gray-400">"{p.nickname}"</span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Delete */}
                                                        <button
                                                            onClick={() => deletePlayer(p.id)}
                                                            className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                                                        >
                                                            <i className="fas fa-trash text-red-400 hover:text-red-500 text-xs"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {/* ============ STATS TAB ============ */}
                    {activeTab === 'stats' && team && (
                        <div className="px-4 pt-4 pb-8">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {[
                                    { label: 'Main', value: point?.play || 0, icon: 'fa-futbol', color: 'blue' },
                                    { label: 'Menang', value: point?.win || 0, icon: 'fa-trophy', color: 'emerald' },
                                    { label: 'Seri', value: point?.draw || 0, icon: 'fa-equals', color: 'amber' },
                                    { label: 'Kalah', value: point?.lost || 0, icon: 'fa-xmark', color: 'red' },
                                ].map((s) => (
                                    <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-3 text-center shadow-sm">
                                        <div className={`w-8 h-8 rounded-lg bg-${s.color}-50 flex items-center justify-center mx-auto`}>
                                            <i className={`fas ${s.icon} text-${s.color}-500 text-xs`}></i>
                                        </div>
                                        <div className="mt-1.5 text-lg font-extrabold text-gray-800">{s.value}</div>
                                        <div className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Detail Card */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Goal</div>
                                        <div className="text-xl font-extrabold text-blue-600 mt-1">{point?.goal || 0}</div>
                                    </div>
                                    <div className="border-x border-gray-100">
                                        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Kebobolan</div>
                                        <div className="text-xl font-extrabold text-red-500 mt-1">{point?.kebobolan || 0}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Win Rate</div>
                                        <div className="text-xl font-extrabold text-emerald-600 mt-1">{winrate}%</div>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
                                    <span className="text-gray-500">Total Poin</span>
                                    <span className="font-extrabold text-blue-950">{point?.point || 0}</span>
                                </div>
                            </div>

                            {/* Win Rate Bar */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-gray-500 font-medium">Performa Team</span>
                                    <span className="text-gray-700 font-bold">{winrate}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-700"
                                        style={{ width: `${winrate}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="h-20"></div>
                </div>
            </div>
        </>
    )
}
