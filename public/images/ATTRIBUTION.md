# Atribusi & Lisensi Aset Visual Bio Smart SMA

Dokumen ini mencatat status lisensi, atribusi, dan asal-usul seluruh aset visual yang digunakan pada aplikasi `Bio Smart (Weinssy/biosmart-sma)`.

---

## 1. Diagram Vektor Edukasi Lokal (100% Local-First & Offline Capable)

Seluruh diagram interaktif disimpan langsung di dalam repositori (`public/images/diagrams/`) dan diprecache secara otomatis oleh Service Worker (`vite-plugin-pwa` / Workbox) sehingga **100% dapat diakses secara luring (offline)** tanpa ketergantungan runtime ke server eksternal:

### A. Anatomi & Struktur Sel / Organ (Variant: `anatomy`)
1. **Model Mosaik Cair Membran Sel**
   * **File Lokal**: `public/images/diagrams/sel/membran-sel.svg`
   * **Status Karya**: *Adapted / Inspired Educational Vector Artwork*
   * **Deskripsi**: Vektor SVG edukasi mandiri (`viewBox="0 0 800 600"`), menggambarkan dwilapis fosfolipid, protein integral, protein perifer, glikoprotein, glikolipid, dan kolesterol.
   * **Referensi Asal**: Terinspirasi oleh skema *Cell membrane detailed diagram* karya Mariana Ruiz Villarreal (LadyofHats) di Wikimedia Commons (Public Domain).

2. **Anatomi Jantung Manusia**
   * **File Lokal**: `public/images/diagrams/sistem-organ/anatomi-jantung.svg`
   * **Status Karya**: *Adapted / Inspired Educational Vector Artwork*
   * **Deskripsi**: Vektor SVG edukasi mandiri (`viewBox="0 0 800 800"`), menggambarkan 4 ruang jantung utama, pembuluh darah besar (Aorta, Vena Kava, Arteri & Vena Pulmonalis), dan Septum Interventrikular.
   * **Referensi Asal**: Disesuaikan dari diagram jantung manusia oleh Wapcaplet di Wikimedia Commons (CC BY-SA 3.0).

3. **Sistem Pernapasan Manusia**
   * **File Lokal**: `public/images/diagrams/sistem-organ/sistem-pernapasan.svg`
   * **Status Karya**: *Adapted / Inspired Educational Vector Artwork*
   * **Deskripsi**: Vektor SVG edukasi mandiri (`viewBox="0 0 800 800"`), menggambarkan Laring/Faring, Trakea bercincin kartilago, Bronkus, Paru-paru (Pulmo), dan Diafragma.
   * **Referensi Asal**: Terinspirasi oleh diagram respirasi karya Mariana Ruiz Villarreal (LadyofHats) di Wikimedia Commons (Public Domain).

### B. Diagram Alur & Proses Biologis (Variant: `process`)
4. **Tahapan Pembelahan Sel (Mitosis)**
   * **File Lokal**: `public/images/diagrams/sel/mitosis.svg`
   * **Status Karya**: *Original Educational Vector Artwork*
   * **Deskripsi**: Vektor SVG edukasi mandiri (`viewBox="0 0 960 600"`), menggambarkan 6 tahapan runtut mitosis eukariotik: Interfase, Profase, Metafase, Anafase, Telofase, dan Sitokinesis lengkap dengan representasi kromatid, gelendong spindel, dan sentrosom.
   * **Referensi Konseptual**: Kurikulum Biologi SMA (Campbell Biology & materi pembelajaran nasional). Bebas dari elemen pihak ketiga berhak cipta tertutup.

5. **Proses Perjalanan & Fertilisasi Manusia**
   * **File Lokal**: `public/images/diagrams/reproduksi/fertilisasi.svg`
   * **Status Karya**: *Original Educational Vector Artwork*
   * **Deskripsi**: Vektor SVG edukasi mandiri (`viewBox="0 0 960 600"`), memetakan perjalanan ovum dari ovulasi di Ovarium, Fimbriae, migrasi sperma di Tuba Fallopi, penetrasi akrosom/fertilisasi zigot, pembelahan morula, hingga implantasi blastokista di endometrium rahim.
   * **Referensi Konseptual**: Konsep fisiologi reproduksi manusia Biologi SMA.

### C. Diagram Berlapis / Berjenjang (Variant: `layered`)
6. **Piramida Makanan & Gizi Seimbang**
   * **File Lokal**: `public/images/diagrams/ekologi/piramida-makanan.svg`
   * **Status Karya**: *Original Educational Vector Artwork*
   * **Deskripsi**: Vektor SVG berjenjang simetris (`viewBox="0 0 960 620"`), memetakan 4 tingkatan piramida gizi seimbang: Lapisan Dasar (Karbohidrat Makanan Pokok), Lapisan Kedua (Sayur & Buah), Lapisan Ketiga (Lauk-Pauk Protein), dan Lapisan Puncak (Gula, Garam, Minyak yang dibatasi).
   * **Referensi Konseptual**: Panduan Gizi Seimbang Kementerian Kesehatan RI & materi nutrisi biologi SMA.

---

## 2. Ketergantungan Eksternal Runtime

* **Status:** **0% (NIHIL)**. Seluruh materi visual pembelajaran pada modul Biologi Sel, Genetika, Sistem Organ, dan Ekologi telah sepenuhnya dimigrasikan ke vektor lokal berkecepatan tinggi.
* Tidak ada permintaan HTTP/HTTPS runtime ke Wikimedia, Unsplash, maupun CDN gambar eksternal saat aplikasi dijalankan.

---

## 3. Kompatibilitas Deployment & PWA

* Seluruh berkas SVG terdaftar dalam Workbox precache (`dist/sw.js`) dan otomatis di-cache saat Service Worker terinstal.
* Kompatibel penuh dengan subpath base GitHub Pages: `/biosmart-sma/`.
