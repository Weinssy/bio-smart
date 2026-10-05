import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/home.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page-container scroll-smooth text-slate-900 bg-[#fcfdfc] font-sans">
      

<header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 transition-all duration-200" data-purpose="primary-navigation">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex items-center justify-between h-20 gap-4">

<Link className="flex items-center gap-3 shrink-0 group focus:outline-none focus:ring-2 focus:ring-pine-800 rounded-lg p-1" to="/">
<div className="w-11 h-11 rounded-xl bg-pine-900 flex items-center justify-center text-white shadow-md shadow-pine-900/15 group-hover:scale-105 transition-transform duration-200">

<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round" />
<path d="M12 4v4m3-2h-6" strokeLinecap="round" strokeLinejoin="round" />
</svg>
</div>
<div>
<div className="flex items-center gap-1.5">
<span className="text-xl font-bold tracking-tight text-slate-900">Bio&nbsp;<span className="text-pine-800">Smart</span></span>
<span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-pine-100 text-pine-800 uppercase tracking-wider">SMA</span>
</div>
<p className="text-xs text-slate-500 font-medium">Belajar Biologi Interaktif</p>
</div>
</Link>

<div className="hidden md:flex flex-1 max-w-md mx-6" data-purpose="search-box">
<div className="relative w-full">
<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<circle cx="11" cy="11" r="8" />
<path d="M21 21l-4.35-4.35" strokeLinecap="round" />
</svg>
</div>
<input className="w-full pl-10 pr-14 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-pine-800 rounded-xl text-sm transition-all focus:outline-none focus:ring-4 focus:ring-pine-800/10 placeholder-slate-400" placeholder="Cari materi sel, genetika, organ tubuh..." type="text" />
<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
<kbd className="inline-flex items-center border border-slate-200 px-1.5 py-0.5 rounded-md text-[11px] font-mono text-slate-400 bg-white shadow-xs">Ctrl K</kbd>
</div>
</div>
</div>

<nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-600">
<Link className="px-3.5 py-2 rounded-lg hover:text-pine-900 hover:bg-slate-50 font-semibold text-pine-900 transition" to="/katalog">Katalog Modul</Link>
<Link className="px-3.5 py-2 rounded-lg hover:text-pine-900 hover:bg-slate-50 transition" to="/lab">Lab Virtual</Link>
<Link className="px-3.5 py-2 rounded-lg hover:text-pine-900 hover:bg-slate-50 transition" to="/anatomi">Anatomi 3D</Link>
<Link className="px-3.5 py-2 rounded-lg hover:text-pine-900 hover:bg-slate-50 transition" to="/kuis">Bank Kuis</Link>
<Link className="px-3.5 py-2 rounded-lg hover:text-pine-900 hover:bg-slate-50 transition" to="/">Modul Guru</Link>
</nav>

<div className="flex items-center gap-3">
<button className="hidden sm:inline-flex text-sm font-semibold text-slate-700 hover:text-pine-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition">
            Masuk Siswa
          </button>
<Link className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pine-900 hover:bg-pine-950 text-white text-sm font-medium shadow-md shadow-pine-950/15 hover:shadow-lg transition-all focus:ring-2 focus:ring-pine-800 focus:ring-offset-2" to="/lab">

<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
</svg>
<span>Mulai Praktikum</span>
</Link>
</div>
</div>
</div>
</header>

<main className="flex-grow">

<section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-100">

<div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute top-1/2 -right-32 w-96 h-96 bg-emerald-50 rounded-full blur-3xl pointer-events-none"></div>
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
<div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

<div className="lg:col-span-7 space-y-6 text-center lg:text-left">
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-pine-900 text-xs font-semibold shadow-xs">
<span className="w-2 h-2 rounded-full bg-pine-600 animate-pulse"></span>
              Kurikulum Merdeka 2024/2025 • Fase F Kelas XI &amp; XII SMA
            </div>
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Eksplorasi Dunia Biologi <span className="text-pine-800 underline decoration-pine-200 decoration-wavy decoration-2">Interaktif,</span> Nyata, &amp; Seru.
            </h1>
<p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Akses modul pembelajaran digital biologi tingkat SMA berstandar nasional. Dilengkapi simulasi laboratorium virtual, visualisasi sel dan organ tubuh 3D 360°, serta materi berbasis inkuiri sains terpadu.
            </p>
<div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
<Link className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-pine-900 hover:bg-pine-950 text-white font-semibold text-sm shadow-lg shadow-pine-950/20 transition-all" to="/katalog">
<span>Eksplorasi Modul Sekarang</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
</svg>
</Link>
<Link className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm shadow-xs transition-all" to="/lab">
<svg className="w-4 h-4 text-pine-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<span>Coba Praktikum Virtual</span>
</Link>
</div>

<div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
<div>
<p className="text-2xl font-bold text-slate-900">30+</p>
<p className="text-xs text-slate-500 font-medium">Topik Kurikulum Merdeka</p>
</div>
<div>
<p className="text-2xl font-bold text-slate-900">12 Lab</p>
<p className="text-xs text-slate-500 font-medium">Simulasi Interaktif Mandiri</p>
</div>
<div>
<p className="text-2xl font-bold text-slate-900">100%</p>
<p className="text-xs text-slate-500 font-medium">Bebas Akses Pelajar SMA</p>
</div>
</div>
</div>

<div className="lg:col-span-5 relative" data-purpose="microscope-preview-card">
<div className="relative bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/60">

<div className="flex items-center justify-between pb-4 border-b border-slate-100">
<div className="flex items-center gap-2.5">
<div className="w-3 h-3 rounded-full bg-rose-500"></div>
<div className="w-3 h-3 rounded-full bg-amber-500"></div>
<div className="w-3 h-3 rounded-full bg-emerald-500"></div>
<span className="ml-2 text-xs font-semibold text-slate-600">Mikroskop Digital Biosmart v2.4</span>
</div>
<span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-pine-800 border border-emerald-200">Live 1000x</span>
</div>

<div className="relative mt-4 h-64 sm:h-72 rounded-2xl bg-gradient-to-br from-slate-950 via-pine-950 to-slate-900 overflow-hidden flex items-center justify-center p-6 border border-slate-800">

<div className="absolute inset-0 opacity-20 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>

<div className="relative w-44 h-44 rounded-full border-2 border-emerald-400/40 flex items-center justify-center animate-[spin_40s_linear_infinite]">
<div className="w-36 h-36 rounded-full bg-emerald-800/30 border border-emerald-500/60 backdrop-blur-sm flex items-center justify-center">

<div className="w-14 h-14 rounded-full bg-emerald-400/80 shadow-lg shadow-emerald-400/50 flex items-center justify-center text-slate-950 text-[10px] font-bold">
                      Nukleus
                    </div>
</div>

<div className="absolute top-2 left-10 w-5 h-7 bg-emerald-400 rounded-full blur-[0.5px]"></div>
<div className="absolute bottom-4 right-10 w-6 h-8 bg-emerald-300 rounded-full blur-[0.5px]"></div>
<div className="absolute right-3 top-16 w-5 h-7 bg-emerald-500 rounded-full blur-[0.5px]"></div>
</div>

<div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg text-white text-xs flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-emerald-400"></span>
<span>Fokus Halus: <strong>98.4%</strong></span>
</div>
<div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur border border-white/10 px-2.5 py-1.5 rounded-lg text-white text-xs flex items-center gap-1.5">
<svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
<span>360° Rotasi</span>
</div>
</div>

<div className="mt-4 pt-3 flex items-center justify-between">
<div>
<h4 className="text-sm font-bold text-slate-900">Sel Tumbuhan (Allium Cepa)</h4>
<p className="text-xs text-slate-500">Sub-topik: Dinding Sel, Vakuola &amp; Kloroplas</p>
</div>
<button className="px-3 py-1.5 text-xs font-semibold text-pine-900 bg-pine-50 hover:bg-pine-100 rounded-lg transition">
                  Mulai Uji Coba →
                </button>
</div>
</div>
</div>
</div>
</div>
</section>


<section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="katalog">

<div className="relative overflow-hidden rounded-2xl bg-pine-900 text-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-pine-950/10 mb-10" data-purpose="catalog-announcement-banner">

<div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-end pr-4 sm:pr-10">
<svg className="w-64 h-64 text-white" fill="currentColor" viewBox="0 0 24 24">
<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
</svg>
</div>
<div className="relative z-10 max-w-2xl">

<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold text-emerald-100 mb-4">
<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<span>Bahan Ajar • Kurikulum Merdeka Fase F</span>
</div>

<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
            Katalog Materi Biologi SMA
          </h2>
<p className="text-emerald-100/90 text-sm sm:text-base font-normal max-w-xl">
            Eksplorasi seluruh modul bahan ajar Biologi interaktif lengkap dengan latihan terarah dan panduan praktikum laboratorium.
          </p>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<article className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 hover:border-pine-600 transition-all duration-200 hover:shadow-xl hover:shadow-pine-900/5 group overflow-hidden" data-purpose="module-card">

<div className="h-1.5 w-full bg-pine-600"></div>
<div className="p-6">

<div className="w-12 h-12 rounded-xl bg-emerald-50 text-pine-700 flex items-center justify-center mb-4">

<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<circle cx="12" cy="12" r="9" />
<circle cx="12" cy="12" r="3" />
<path d="M12 3v3m0 12v3m9-9h-3M6 12H3" strokeLinecap="round" />
</svg>
</div>
<h3 className="text-xl font-bold text-slate-900 group-hover:text-pine-800 transition-colors mb-2">
              Biologi Sel
            </h3>
<p className="text-sm text-slate-600 leading-relaxed mb-6">
              Memahami unit terkecil kehidupan: struktur, fungsi, dan interaksi antar komponen seluler, membran plasma, serta transpor zat.
            </p>

<div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
<span className="flex items-center gap-1.5">
<svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                6 Sub-topik
              </span>
<span className="flex items-center gap-1.5">
<svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                16 Jam
              </span>
</div>
</div>

<div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 group-hover:bg-emerald-50/40 transition">
<Link className="inline-flex items-center gap-1.5 text-sm font-bold text-pine-800 group-hover:gap-2.5 transition-all" to="/">
<span>Buka Materi</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" /></svg>
</Link>
</div>
</article>

<article className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 hover:border-purple-600 transition-all duration-200 hover:shadow-xl hover:shadow-purple-900/5 group overflow-hidden" data-purpose="module-card">

<div className="h-1.5 w-full bg-purple-600"></div>
<div className="p-6">

<div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">

<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M19.5 4.5l-15 15M4.5 4.5l15 15M12 2v20M2 12h20" strokeLinecap="round" strokeLinejoin="round" />
</svg>
</div>
<h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-800 transition-colors mb-2">
              Genetika &amp; Hereditas
            </h3>
<p className="text-sm text-slate-600 leading-relaxed mb-6">
              Mempelajari mekanisme pewarisan sifat, persilangan hukum Mendel I &amp; II, mutasi genetik, dan ekspresi kode genetika DNA.
            </p>

<div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
<span className="flex items-center gap-1.5">
<svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                4 Sub-topik
              </span>
<span className="flex items-center gap-1.5">
<svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                12.5 Jam
              </span>
</div>
</div>

<div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 group-hover:bg-purple-50/40 transition">
<Link className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-700 group-hover:gap-2.5 transition-all" to="/">
<span>Buka Materi</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" /></svg>
</Link>
</div>
</article>

<article className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 hover:border-amber-600 transition-all duration-200 hover:shadow-xl hover:shadow-amber-900/5 group overflow-hidden" data-purpose="module-card">

<div className="h-1.5 w-full bg-amber-600"></div>
<div className="p-6">

<div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">

<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<circle cx="12" cy="5" r="2" />
<path d="M12 7v10m-4-6h8m-6 9l2-3 2 3" strokeLinecap="round" strokeLinejoin="round" />
</svg>
</div>
<h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors mb-2">
              Sistem Anatomi Tubuh
            </h3>
<p className="text-sm text-slate-600 leading-relaxed mb-6">
              Mempelajari organ-organ vital pada anatomi manusia seperti sistem peredaran darah, pencernaan, pernapasan, serta imunitas.
            </p>

<div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
<span className="flex items-center gap-1.5">
<svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                8 Sub-topik
              </span>
<span className="flex items-center gap-1.5">
<svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                17.8 Jam
              </span>
</div>
</div>

<div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 group-hover:bg-amber-50/40 transition">
<Link className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 group-hover:gap-2.5 transition-all" to="/">
<span>Buka Materi</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" /></svg>
</Link>
</div>
</article>

<article className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-600 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-900/5 group overflow-hidden" data-purpose="module-card">

<div className="h-1.5 w-full bg-emerald-600"></div>
<div className="p-6">

<div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">

<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M12 19V5m0 0l-4 4m4-4l4 4m-8 6l-3 3h14l-3-3" strokeLinecap="round" strokeLinejoin="round" />
</svg>
</div>
<h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-2">
              Ekologi &amp; Keanekaragaman
            </h3>
<p className="text-sm text-slate-600 leading-relaxed mb-6">
              Mempelajari interaksi makhluk hidup dengan lingkungannya, piramida ekologi, daur biogeokimia, dan isu pelestarian hayati.
            </p>

<div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
<span className="flex items-center gap-1.5">
<svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                4 Sub-topik
              </span>
<span className="flex items-center gap-1.5">
<svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                9.5 Jam
              </span>
</div>
</div>

<div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 group-hover:bg-emerald-50/40 transition">
<Link className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 group-hover:gap-2.5 transition-all" to="/">
<span>Buka Materi</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" /></svg>
</Link>
</div>
</article>

<article className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 hover:border-teal-600 transition-all duration-200 hover:shadow-xl hover:shadow-teal-900/5 group overflow-hidden" data-purpose="module-card">

<div className="h-1.5 w-full bg-teal-600"></div>
<div className="p-6">

<div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">

<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" />
</svg>
</div>
<h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-800 transition-colors mb-2">
              Bioteknologi Modern
            </h3>
<p className="text-sm text-slate-600 leading-relaxed mb-6">
              Aplikasi fermentasi, kloning, kultur jaringan, teknik PCR &amp; elektroforesis, serta rekayasa genetika masa depan.
            </p>

<div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
<span className="flex items-center gap-1.5">
<svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                5 Sub-topik
              </span>
<span className="flex items-center gap-1.5">
<svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                11.0 Jam
              </span>
</div>
</div>

<div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 group-hover:bg-teal-50/40 transition">
<Link className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-800 group-hover:gap-2.5 transition-all" to="/">
<span>Buka Materi</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" /></svg>
</Link>
</div>
</article>

<article className="flex flex-col justify-between bg-slate-900 text-white rounded-2xl border border-slate-800 hover:border-pine-500 transition-all duration-200 hover:shadow-xl hover:shadow-slate-950/20 group overflow-hidden" data-purpose="module-card">

<div className="h-1.5 w-full bg-emerald-500"></div>
<div className="p-6">

<div className="w-12 h-12 rounded-xl bg-white/10 text-emerald-400 flex items-center justify-center mb-4">

<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
</svg>
</div>
<div className="flex items-center gap-2 mb-2">
<h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                Modul Guru &amp; LKPD
              </h3>
<span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">Resmi</span>
</div>
<p className="text-sm text-slate-300 leading-relaxed mb-6">
              Lembar Kerja Peserta Didik (LKPD), rubrik asesmen sumatif &amp; formatif, serta modul ajar siap pakai untuk pendidik.
            </p>

<div className="flex items-center gap-4 text-xs font-semibold text-slate-400 pt-2 border-t border-slate-800">
<span className="flex items-center gap-1.5">
<svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                PDF &amp; DOCX
              </span>
<span className="flex items-center gap-1.5">
<svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                Kriteria TP &amp; KKTP
              </span>
</div>
</div>

<div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800 group-hover:bg-slate-950 transition">
<Link className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 group-hover:gap-2.5 transition-all" to="/">
<span>Unduh Bahan Ajar</span>
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" /></svg>
</Link>
</div>
</article>
</div>
</section>


<section className="py-16 bg-slate-50/80 border-y border-slate-200/80" id="lab">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="max-w-3xl mx-auto text-center mb-12">
<span className="text-xs font-bold uppercase tracking-wider text-pine-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Laboratorium &amp; Eksplorasi Virtual
          </span>
<h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pengalaman Belajar Sains Tanpa Batas Fisik
          </h2>
<p className="mt-2 text-slate-600 text-sm sm:text-base">
            Dirancang agar siswa SMA dapat mempraktikkan konsep biologi abstrak secara empiris melalui simulasi komputer yang presisi.
          </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

<div className="md:col-span-2 lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between" data-purpose="bento-card">
<div>
<div className="flex items-center justify-between mb-4">
<span className="w-10 h-10 rounded-xl bg-pine-100 text-pine-900 flex items-center justify-center">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" />
</svg>
</span>
<span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-pine-900 border border-emerald-200">Interaktif HTML5</span>
</div>
<h3 className="text-xl font-bold text-slate-900 mb-2">Simulasi Osmosis Sel &amp; Uji Enzim Katalase</h3>
<p className="text-sm text-slate-600 leading-relaxed mb-6">
                Ubah parameter suhu (0°C – 80°C) dan derajat keasaman pH (2 - 12) secara real-time untuk mengamati denaturasi enzim katalase hati ayam dan gelembung gas oksigen secara kuantitatif.
              </p>
</div>

<div className="bg-slate-900 text-white rounded-2xl p-4 text-xs font-mono">
<div className="flex items-center justify-between pb-2 border-b border-slate-800">
<span className="text-emerald-400">STATUS: REAKSI AKTIF</span>
<span className="text-slate-400">Gas O₂: 42.8 mL/s</span>
</div>
<div className="grid grid-cols-2 gap-3 mt-3">
<div className="bg-slate-800/80 p-2 rounded-lg">
<span className="text-slate-400 block text-[10px]">Suhu Reaksi:</span>
<span className="font-bold text-white text-sm">37.0 °C (Optimum)</span>
</div>
<div className="bg-slate-800/80 p-2 rounded-lg">
<span className="text-slate-400 block text-[10px]">pH Ekosistem:</span>
<span className="font-bold text-white text-sm">7.2 (Netral)</span>
</div>
</div>
</div>
</div>

<div className="md:col-span-1 lg:col-span-1 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between" data-purpose="bento-card">
<div>
<div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-4">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" strokeLinecap="round" strokeLinejoin="round" />
</svg>
</div>
<h3 className="text-xl font-bold text-slate-900 mb-2">Diseksi Digital Anatomi 3D</h3>
<p className="text-sm text-slate-600 leading-relaxed">
                Eksplorasi lapisan jantung mamalia, paru-paru, dan nefron ginjal layer-by-layer dengan mode Augmented Reality.
              </p>
</div>
<div className="mt-6 pt-4 border-t border-slate-100">
<span className="text-xs font-semibold text-amber-700 flex items-center gap-1">
                Akses Model 3D →
              </span>
</div>
</div>

<div className="md:col-span-1 lg:col-span-1 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between" data-purpose="bento-card">
<div>
<div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center mb-4">
<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeLinecap="round" strokeLinejoin="round" />
</svg>
</div>
<h3 className="text-xl font-bold text-slate-900 mb-2">Sinkronisasi Tanpa Ribet</h3>
<p className="text-sm text-slate-600 leading-relaxed">
                Hasil praktikum dan kuis dapat diunduh dalam format <code>.JSON</code> atau PDF otomatis untuk diserahkan ke Google Classroom guru.
              </p>
</div>
<div className="mt-6 pt-4 border-t border-slate-100">
<span className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                Format Terstandar →
              </span>
</div>
</div>
</div>
</div>
</section>


<section className="py-16 bg-white">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="bg-gradient-to-r from-pine-900 to-emerald-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
<div className="max-w-2xl text-center lg:text-left">
<span className="text-xs font-bold tracking-wider text-emerald-300 uppercase">Siap Mulai Pembelajaran?</span>
<h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">
              Tingkatkan Nilai Pemahaman Biologi di Sekolah Sekarang
            </h2>
<p className="text-emerald-100 text-sm sm:text-base mt-3">
              Bergabunglah dengan ribuan siswa dan guru SMA se-Indonesia dalam platform sains interaktif berbasis kurikulum terbaru.
            </p>
</div>
<div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
<Link className="px-6 py-3.5 rounded-xl bg-white text-pine-950 font-bold text-sm text-center shadow-lg hover:bg-slate-100 transition" to="/katalog">
              Buka Katalog Modul
            </Link>
<Link className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm text-center backdrop-blur-sm transition" to="/">
              Hubungi MGMP Biologi
            </Link>
</div>
</div>
</div>
</section>

</main>

<footer className="bg-white border-t border-slate-200 pt-12 pb-8 mt-auto" data-purpose="site-footer">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">

<div className="md:col-span-2 space-y-3">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-lg bg-pine-900 flex items-center justify-center text-white">
<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round" />
</svg>
</div>
<span className="text-lg font-bold text-slate-900 tracking-tight">Bio&nbsp;<span className="text-pine-800">Smart</span></span>
</div>
<p className="text-sm text-slate-500 max-w-sm">
            Platform Media Pembelajaran Biologi Interaktif Sekolah Menengah Atas Berbasis Kurikulum Merdeka (Fase F).
          </p>
</div>

<div>
<h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Materi Utama</h4>
<ul className="space-y-2 text-sm text-slate-600">
<li><Link className="hover:text-pine-800 transition" to="/">Biologi Sel &amp; Organel</Link></li>
<li><Link className="hover:text-pine-800 transition" to="/">Genetika &amp; Pewarisan Sifat</Link></li>
<li><Link className="hover:text-pine-800 transition" to="/">Anatomi &amp; Fisiologi Manusia</Link></li>
<li><Link className="hover:text-pine-800 transition" to="/">Ekologi &amp; Keanekaragaman</Link></li>
</ul>
</div>

<div>
<h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Bantuan &amp; Regulasi</h4>
<ul className="space-y-2 text-sm text-slate-600">
<li><Link className="hover:text-pine-800 transition" to="/">Panduan Guru Pengampu</Link></li>
<li><Link className="hover:text-pine-800 transition" to="/">Kebijakan Privasi Siswa</Link></li>
<li><Link className="hover:text-pine-800 transition" to="/">Ketentuan Layanan</Link></li>
<li><Link className="hover:text-pine-800 transition" to="/">Kemendikbudristek RI</Link></li>
</ul>
</div>
</div>

<div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
<div>
          © 2024 BioSMA Indonesia • Modul Biologi Digital Berstandar Kurikulum Merdeka Kemendikbudristek RI.
        </div>
<div className="flex items-center gap-6 font-medium">
<Link className="hover:text-slate-800 transition" to="/">Kebijakan Privasi</Link>
<Link className="hover:text-slate-800 transition" to="/">Ketentuan Layanan</Link>
<Link className="hover:text-slate-800 transition" to="/">Kontak Guru Pengampu</Link>
</div>
</div>
</div>
</footer>


    </div>
  );
}
