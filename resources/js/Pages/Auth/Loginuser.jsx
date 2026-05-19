import React, { useState } from 'react'
import { Head, Link, useForm, usePage } from '@inertiajs/react'

const slides = [
    {
        title: 'Selamat Datang di\nMedan Mini Soccer',
        desc: 'Platform booking lapangan minisoccer\nterlengkap dan terpercaya',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        title: 'Booking Lapangan\nDengan Mudah',
        desc: 'Pesan lapangan favorit Anda\nhanya dengan sekali klik',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: 'Sesuaikan Dengan\nKebutuhan Anda',
        desc: 'Pilih jadwal, lapangan, dan layanan\ntambahan sesuai keinginan',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        ),
    },
]

export default function Loginuser() {
    const { data, setData, post, reset, processing, errors } = useForm({
        email: '',
        password: '',
    })

    const { flash } = usePage().props;

    const [currentSlide, setCurrentSlide] = useState(0)
    const [showLogin, setShowLogin] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1)
        } else {
            setShowLogin(true)
        }
    }

    const skipOnboarding = () => {
        setShowLogin(true)
    }

    const submit = (e) => {
        e.preventDefault()
        post('/loginuser', {
            onSuccess: () => {
                reset();
            }
        })
    }

    const guestLogin = () => {

        const kodetamu = 'Tamu-' + Math.random().toString(36).substring(2, 10)
        localStorage.setItem('kodetamu', kodetamu);
        window.location.href = '/home'
    }

    if (showLogin) {
        return (
            <>
                <Head title="Login" />
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
                    <div className="max-w-md mx-auto px-5 py-8 min-h-screen flex flex-col justify-center">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a9.112 9.112 0 01-6 2.292m0-14.25v14.25" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold text-white">Masuk ke Akun Anda</h1>
                            <p className="text-sm text-blue-200/60 mt-1">Silakan masukkan email dan password</p>
                        </div>

                        {/* Card */}

                        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-5">
                            {/* Error Alert */}
                            {flash.error && (
                                <div role="alert" className="bg-red-500/20 border border-red-500/30 text-red-200 rounded-xl px-4 py-3 mb-4 flex items-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4 mt-0.5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className="text-xs">{flash.error}</span>
                                </div>
                            )}

                            <form onSubmit={submit}>
                                {/* Email */}
                                <div className="mb-4">
                                    <label className="text-xs font-semibold text-blue-200/70 uppercase tracking-wide mb-2 block">Email</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-300/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="nama@email.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-blue-200/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            autoComplete="email"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email}</p>}
                                </div>

                                {/* Password */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-xs font-semibold text-blue-200/70 uppercase tracking-wide">Password</label>
                                        <a href="#" className="text-xs text-blue-400 font-medium hover:text-blue-300 transition-colors">Lupa password?</a>
                                    </div>
                                    <div className="relative">

                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-300/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Masukkan password"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-blue-200/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300/50 hover:text-blue-300 transition-colors"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.05 6.05m3.828 3.828L6.05 6.05M6.05 6.05L3 3m3.878 3.878L3 3m13.078 13.078l2.922 2.922M15.95 15.95l2.922 2.922M18.95 18.95L21 21" /></svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.password}</p>}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold h-12 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 flex items-center justify-center"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : 'Masuk'}
                                </button>
                            </form>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex-1 h-px bg-white/10"></div>
                            <span className="text-xs text-blue-200/40 font-medium">atau</span>
                            <div className="flex-1 h-px bg-white/10"></div>
                        </div>

                        {/* Guest Button */}
                        <button
                            type="button"
                            className="w-full bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-white font-semibold h-12 rounded-xl transition-all duration-200 mb-5 flex items-center justify-center gap-2"
                            onClick={guestLogin}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            Masuk sebagai Tamu
                        </button>

                        {/* Footer */}
                        <p className="text-center text-xs text-blue-200/40">
                            Belum punya akun?{' '}
                            <Link href="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                                Daftar sekarang
                            </Link>
                        </p>

                        <p className="text-center text-xs text-blue-200/30 mt-2">
                            Dengan masuk, Anda menyetujui{' '}
                            <a href="#" className="text-blue-400/60 hover:text-blue-300 transition-colors">Syarat & Ketentuan</a>
                        </p>
                    </div>
                </div>
            </>
        )
    }

    // Onboarding slides
    return (
        <>
            <Head title="Selamat Datang" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
                <div className="max-w-md mx-auto px-6 min-h-screen flex flex-col">
                    {/* Skip button */}
                    <div className="flex justify-end pt-6">
                        <button
                            onClick={skipOnboarding}
                            className="text-sm text-blue-300/60 hover:text-blue-300 font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                            Lewati
                        </button>
                    </div>

                    {/* Slide Content */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                        {/* Icon */}
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 rounded-full flex items-center justify-center mb-8 text-blue-400">
                            {slides[currentSlide].icon}
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-bold text-white mb-3 whitespace-pre-line leading-tight">
                            {slides[currentSlide].title}
                        </h1>

                        {/* Description */}
                        <p className="text-sm text-blue-200/60 whitespace-pre-line leading-relaxed">
                            {slides[currentSlide].desc}
                        </p>
                    </div>

                    {/* Bottom Section */}
                    <div className="pb-10">
                        {/* Dots Indicator */}
                        <div className="flex justify-center gap-2 mb-8">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide
                                        ? 'w-8 bg-blue-500'
                                        : 'w-2 bg-white/20 hover:bg-white/30'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Next / Get Started Button */}
                        <button
                            onClick={nextSlide}
                            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold h-12 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
                        >
                            {currentSlide === slides.length - 1 ? (
                                <>
                                    Mulai Sekarang
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </>
                            ) : (
                                <>
                                    Berikutnya
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
