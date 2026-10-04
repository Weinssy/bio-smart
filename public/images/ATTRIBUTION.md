# Atribusi & Lisensi Aset Visual Bio Smart SMA

Dokumen ini mencatat status lisensi, atribusi, dan asal-usul seluruh aset visual yang digunakan pada aplikasi `Bio Smart (Weinssy/biosmart-sma)`.

---

## 1. Diagram Vektor Lokal (Proof of Concept - 100% Local-First)

Ketiga diagram interaktif berikut disimpan langsung di dalam repositori (`public/images/diagrams/`) dan diprecache secara otomatis oleh Service Worker (`vite-plugin-pwa` / Workbox) sehingga **100% dapat diakses secara offline** tanpa ketergantungan runtime ke server eksternal:

### A. Model Mosaik Cair Membran Sel
* **File Lokal**: `public/images/diagrams/sel/membran-sel.svg`
* **Status Karya**: *Adapted / Inspired Educational Vector Artwork*
* **Deskripsi**: Vektor SVG edukasi mandiri beresolusi terukur (`viewBox="0 0 800 600"`), menggambarkan dwilapis fosfolipid (kepala hidrofilik, ekor hidrofobik), protein integral (saluran), protein perifer, glikoprotein, glikolipid, dan kolesterol.
* **Referensi Visual Asal**: Terinspirasi oleh diagram *Cell membrane detailed diagram* karya Mariana Ruiz Villarreal (LadyofHats) di [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Cell_membrane_detailed_diagram_id.svg).
* **Lisensi Referensi**: Public Domain.
* **Penggunaan Runtime**: 100% Lokal (resolusi melalui `import.meta.env.BASE_URL`).

### B. Anatomi Jantung Manusia
* **File Lokal**: `public/images/diagrams/sistem-organ/anatomi-jantung.svg`
* **Status Karya**: *Adapted / Inspired Educational Vector Artwork*
* **Deskripsi**: Vektor SVG edukasi mandiri (`viewBox="0 0 800 800"`), menggambarkan 4 ruang jantung utama (Atrium Kanan, Ventrikel Kanan, Atrium Kiri, Ventrikel Kiri), pembuluh besar (Aorta, Vena Kava Superior/Inferior, Arteri Pulmonalis, Vena Pulmonalis), dan Septum Interventrikular untuk kurikulum Biologi SMA.
* **Referensi Visual Asal**: Disesuaikan dari skema anatomi jantung manusia oleh Wapcaplet di [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Diagram_of_the_human_heart_(cropped).svg).
* **Lisensi Referensi**: CC BY-SA 3.0.
* **Penggunaan Runtime**: 100% Lokal (resolusi melalui `import.meta.env.BASE_URL`).

### C. Sistem Pernapasan Manusia
* **File Lokal**: `public/images/diagrams/sistem-organ/sistem-pernapasan.svg`
* **Status Karya**: *Adapted / Inspired Educational Vector Artwork*
* **Deskripsi**: Vektor SVG edukasi mandiri (`viewBox="0 0 800 800"`), menggambarkan saluran pernapasan atas (Laring/Faring), Trakea dengan cincin tulang rawan, Bronkus primer (kiri & kanan), Paru-paru (Pulmo), dan Diafragma.
* **Referensi Visual Asal**: Terinspirasi oleh skema sistem pernapasan manusia oleh Mariana Ruiz Villarreal (LadyofHats) di [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Respiratory_system_complete_en.svg).
* **Lisensi Referensi**: Public Domain.
* **Penggunaan Runtime**: 100% Lokal (resolusi melalui `import.meta.env.BASE_URL`).

---

## 2. Aset Gambar Statis Eksternal (Non-Interactive Image)

Beberapa materi pengayaan non-diagram interaktif masih merujuk ke URL eksternal sebagai materi visual pelengkap:

1. **Diagram Tahapan Mitosis**
   * **URL Sumber**: `https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Mitosis_diagram.jpg/800px-Mitosis_diagram.jpg`
   * **Pembuat / Sumber**: Wikimedia Commons
   * **Lisensi**: Public Domain / CC
   * **Status Runtime**: Eksternal. Dilengkapi komponen penanganan kegagalan (*graceful fallback UI*) jika koneksi offline atau terblokir.

2. **Fertilisasi Sperma dan Ovum**
   * **URL Sumber**: `https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sperm-egg.jpg/800px-Sperm-egg.jpg`
   * **Pembuat / Sumber**: Wikimedia Commons
   * **Lisensi**: Public Domain / CC
   * **Status Runtime**: Eksternal (dengan graceful fallback).

3. **Piramida Makanan Seimbang**
   * **URL Sumber**: `https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Food_Pyramid.jpg/600px-Food_Pyramid.jpg`
   * **Pembuat / Sumber**: USDA / Wikimedia Commons
   * **Lisensi**: Public Domain
   * **Status Runtime**: Eksternal (dengan graceful fallback).

---

## 3. Kompatibilitas Deployment & PWA

* Seluruh diagram lokal (`.svg`) diikutsertakan dalam `workbox.globPatterns` pada konfigurasi `vite.config.js`.
* Ketika aplikasi dijalankan secara luring (offline) setelah instalasi PWA, ketiga diagram interaktif dipastikan tampil 100% tanpa galat jaringan.
