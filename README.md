# 🔬 Bio Smart - Platform Pembelajaran Biologi Interaktif

[![Deploy static content to Pages](https://github.com/Weinssy/bio-smart/actions/workflows/deploy.yml/badge.svg)](https://github.com/Weinssy/bio-smart/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Demo-Live%20Website-0d5c46?style=flat&logo=github)](https://weinssy.github.io/bio-smart/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Weinssy/bio-smart/releases)

**Bio Smart** adalah platform web pembelajaran biologi interaktif berbasis **Kurikulum Merdeka Fase F (Kelas XI & XII SMA)**. Dirancang untuk memberikan pengalaman belajar yang nyata, intuitif, dan menyenangkan melalui visualisasi 3D, simulasi laboratorium virtual mandiri, dan modul inkuiri sains terpadu.

🌐 **Akses Aplikasi**: [https://weinssy.github.io/bio-smart/](https://weinssy.github.io/bio-smart/)

---

## ✨ Fitur Unggulan

- **🏠 Beranda Interaktif**: Desain dashboard modern dengan preview mikroskop digital interaktif, statistik pembelajaran, dan akses cepat ke seluruh modul.
- **📚 Katalog Modul Bahan Ajar**: Modul lengkap Kurikulum Merdeka Fase F mencakup:
  - *Biologi Sel & Organel* (Membran sel, model mosaik cair interaktif, pembelahan mitosis)
  - *Genetika & Pewarisan Sifat* (Struktur DNA/RNA, sintesis protein, hukum Mendel)
  - *Sistem Anatomi Tubuh* (Jantung, peredaran darah, sistem respirasi)
  - *Ekologi & Keanekaragaman Hayati* (Piramida makanan, rantai energi, daur biogeokimia)
- **🧪 Lab Virtual Mandiri**: Simulasi praktikum mikroskop digital, uji zat makanan, dan fotosintesis langsung dari browser tanpa instalasi tambahan.
- **🫀 Anatomi Tubuh 3D**: Penjelajahan model organ dan anatomi tubuh interaktif 3D 360° menggunakan Three.js.
- **📝 Bank Kuis Interaktif**: Kuis berbatas waktu dengan evaluasi skor instan, kunci jawaban, dan pembahasan mendalam.
- **⚡ Quick Search (Ctrl + K)**: Command palette pencarian cepat untuk mencari materi, organ, istilah genetika, atau uji lab secara instan.
- **📱 Responsif & PWA**: Dukungan penuh untuk perangkat smartphone/tablet serta instalasi offline sebagai Progressive Web App (PWA).

---

## 🛠️ Teknologi yang Digunakan

- **Frontend Core**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/) (HashRouter untuk kompatibilitas GitHub Pages)
- **Styling**: Vanilla CSS Design Tokens, [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **PWA Support**: [Vite PWA Plugin](https://vite-pwa-org.netlify.app/) & Workbox
- **Deployment**: [GitHub Pages](https://pages.github.com/) via GitHub Actions

---

## 🚀 Menjalankan Secara Lokal

1. **Clone repositori**:
   ```bash
   git clone https://github.com/Weinssy/bio-smart.git
   cd bio-smart
   ```

2. **Pasang dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Buka `http://localhost:5173/bio-smart/` pada peramban Anda.

4. **Build untuk produksi**:
   ```bash
   npm run build
   ```

---

## 📄 Lisensi & Hak Cipta

© 2024–2026 **BioSMA Indonesia • Weinssy**. Seluruh hak cipta dilindungi undang-undang.
Modul Bahan Ajar Berstandar Kurikulum Merdeka Kemendikbudristek RI.
