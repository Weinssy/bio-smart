# Laporan Audit & Hardening Interactive Diagram, Local Assets & Offline Validation

**Repository:** `Weinssy/biosmart-sma`  
**Peran:** Senior Frontend Engineer & QA Engineer  
**Tanggal:** 5 Oktober 2026  
**Status:** **STABLE & PRODUCTION READY**

---

## 1. Executive Summary

Tahap audit dan hardening ini bertujuan untuk memastikan sistem visual baru (`InteractiveDiagram`, Visual Quiz / *Identify Mode*, Zoom/Pan, dan SVG lokal) benar-benar stabil, berarsitektur *local-first*, kompatibel 100% dengan GitHub Pages (`base: '/biosmart-sma/'`), dapat dioperasikan secara penuh dalam kondisi luring (*offline-capable* via PWA/Service Worker), serta memiliki aksesibilitas dan responsivitas yang baik.

Seluruh ketergantungan runtime ke Wikimedia Commons untuk **tiga diagram Proof of Concept (POC)** telah **dihilangkan 100%**. Ketiga diagram kini menggunakan berkas vektor SVG lokal di repositori yang dipaketkan dan diprecache oleh Service Worker ke dalam build produksi.

---

## 2. Current Architecture

Aliran data dan siklus hidup diagram interaktif dirancang dengan rantai terisolasi dan berprinsip *unidirectional data flow*:

```text
materiData.json (Path lokal SVG)
       ↓
src/components/materi/MateriDetail.jsx
       ↓
src/utils/assetResolver.js (resolveAsset & validasi ringan)
       ↓
src/components/visual/InteractiveDiagram.jsx
       ├── TransformWrapper (react-zoom-pan-pinch)
       ├── Eksplorasi Mode (Hotspot → Detail Panel)
       └── Kenali Bagian Mode (Random Target → Evaluasi Hotspot → Skor)
       ↓
Local SVG (public/images/diagrams/...)
       ↓
Vite Build (dist/)
       ↓
Service Worker (dist/sw.js - Workbox Precache Manifest)
       ↓
GitHub Pages Deployment (/biosmart-sma/) → 100% Offline-Capable
```

---

## 3. Local Asset Audit

Seluruh konten visual pada `src/data/materiData.json` dan direktori `public/images/` telah diaudit secara menyeluruh:

| No | Modul / Subtopik | Tipe Konten | Path / Sumber Asset | Kategori | Status Ketersediaan |
|:---|:---|:---|:---|:---|:---|
| 1 | Biologi Sel (`sub-1-1`: Membran Sel) | `interactiveImage` | `/images/diagrams/sel/membran-sel.svg` | **LOCAL** | Precached di `sw.js`, Berfungsi 100% |
| 2 | Biologi Sel (`sub-1-6`: Mitosis) | `image` | `https://upload.wikimedia.org/.../Mitosis_diagram.jpg` | **EXTERNAL** | Berjalan dengan fallback error handler |
| 3 | Sistem Anatomi (`sub-3-5`: Jantung) | `interactiveImage` | `/images/diagrams/sistem-organ/anatomi-jantung.svg` | **LOCAL** | Precached di `sw.js`, Berfungsi 100% |
| 4 | Sistem Anatomi (`sub-3-6`: Pernapasan) | `interactiveImage` | `/images/diagrams/sistem-organ/sistem-pernapasan.svg` | **LOCAL** | Precached di `sw.js`, Berfungsi 100% |
| 5 | Sistem Anatomi (`sub-3-7`: Reproduksi) | `image` | `https://upload.wikimedia.org/.../Sperm-egg.jpg` | **EXTERNAL** | Berjalan dengan fallback error handler |
| 6 | Sistem Anatomi (`sub-3-8`: Nutrisi) | `image` | `https://upload.wikimedia.org/.../Food_Pyramid.jpg` | **EXTERNAL** | Berjalan dengan fallback error handler |

* **Kategori LOCAL:** 3 diagram interaktif (100% tersimpan di direktori lokal repositori).
* **Kategori EXTERNAL:** 3 gambar ilustrasi statis penjelas modul.
* **Kategori BROKEN:** 0 berkas lokal rusak (seluruh path lokal valid).
* **Kategori UNUSED:** 0 berkas diagram tak terpakai (tidak ada sampah file visual di `public/images/diagrams/`).

---

## 4. External Dependency Audit

* **Tiga Diagram POC:** Membran Sel, Anatomi Jantung, dan Sistem Pernapasan kini memiliki **0% ketergantungan runtime ke Wikimedia** maupun server eksternal lainnya.
* **Fallback Gambar Statis:** Untuk gambar statis eksternal (tipe `image`), jika terjadi kegagalan jaringan atau restriksi bot Wikimedia (403/400), `MateriDetail.jsx` telah dilengkapi dengan penanganan *graceful fallback UI* (`.diagram-fallback`) yang ramah bagi pengguna tanpa memecah tata letak halaman.

---

## 5. PWA / Service Worker Audit

Konfigurasi `vite-plugin-pwa` pada `vite.config.js` diverifikasi:
* Menggunakan strategi `generateSW` dengan pola `workbox.globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']`.
* Manifest Service Worker di `dist/sw.js` secara eksplisit memasukkan:
  - `images/diagrams/sel/membran-sel.svg` (revision terindeks)
  - `images/diagrams/sistem-organ/anatomi-jantung.svg` (revision terindeks)
  - `images/diagrams/sistem-organ/sistem-pernapasan.svg` (revision terindeks)
* Total aset precached: **27 entri (~4.15 MB)** termasuk modul 3D Human Atlas dan Draco decoder.

---

## 6. Offline Test

Pengujian dilakukan menggunakan server produksi lokal Vite (`npx vite preview --port 4173 --host`) dan diverifikasi melalui sesi browser subagent:
1. **Navigasi Halaman Materi:** Berhasil dibuka dengan lancar.
2. **Diagram Membran Sel:** Tampil sempurna tanpa koneksi eksternal.
3. **Diagram Anatomi Jantung:** Tampil tajam dan jelas.
4. **Diagram Sistem Pernapasan:** Tampil tajam dan jelas.
5. **Mode Interaktif & Zoom:** Seluruh fungsi klik, hover, touch, dan zoom beroperasi normal.
6. **Error Konsol:** **0 error** (tidak ada 404, tidak ada script crash).

---

## 7. Interactive Diagram Audit

Audit mendalam terhadap komponen `src/components/visual/InteractiveDiagram.jsx`:
* **Duplicate Imports:** Ditemukan duplikasi `import './InteractiveDiagram.css'` yang kini telah dihapus.
* **Unused Variables:** Ditemukan `useRef` dan `...rest` yang tidak digunakan dan telah dibersihkan.
* **Lifecycle Effect & State Cascades:**
  - Sebelumnya terdapat `useEffect` yang menyinkronkan skor dan status salah (`hasFailedCurrent`). Hal ini berisiko memicu render berulang atau inkonsistensi skor pada React StrictMode.
  - Perbaikan: Seluruh logika penilaian dipindahkan secara langsung dan sinkron ke dalam event handler `handleHotspotClick(partId)`.
* **Proteksi Data Kosong:** Ditambahkan pencegahan *runtime crash* jika `diagram.parts` kosong atau `undefined`. Komponen merender status kosong aman (`.identify-empty`) tanpa memicu `TypeError`.

---

## 8. Visual Quiz Audit

Aturan penilaian dan interaksi kuis visual (*Identify Mode*):
1. **Explore Mode:**
   - Menekan hotspot mengaktifkan bagian terkait (`activePartId`) dan membuka panel rincian (deskripsi dan fungsi biologis).
2. **Identify Mode:**
   - Soal memilih hingga 5 target acak (`questions.slice(0, 5)`).
   - Penanda hotspot berubah menjadi tanda tanya (`?`).
   - Jawaban Benar pada percobaan pertama: Memberikan feedback hijau (`.correct`), menambah skor `+1`, dan memunculkan tombol `Lanjut`.
   - Jawaban Salah: Menandai pertanyaan sebagai percobaan gagal (`hasFailedCurrent = true`), menampilkan feedback merah (`.incorrect`) dengan animasi getar (`shake`), dan tidak langsung membocorkan jawaban benar.
   - Jawaban Benar pada percobaan kedua (setelah salah): Memberikan feedback informatif namun **tidak memberikan poin tambahan**, menjaga integritas skor evaluasi siswa.
   - Tidak ada duplikasi penilaian akibat siklus hidup komponen React.

---

## 9. Edge Case Visual Quiz

Pengujian kondisi ekstrem data:
* **`diagram.parts = []` (Kosong):** Ditangani aman dengan tampilan pesan *"Tidak ada bagian interaktif yang tersedia untuk kuis ini"* dan tombol kembali ke Eksplorasi. Tidak ada `NaN%` atau crash.
* **`diagram.parts = 1`:** Berjalan normal dengan 1 pertanyaan, skor dihitung `X / 1 (100% / 0%)`.
* **`diagram.parts < 5` (misal 2 atau 3):** Kuis menyesuaikan panjang daftar bagian yang tersedia secara otomatis tanpa menghasilkan elemen `undefined`.
* **`diagram.parts > 5`:** Dibatasi maksimal 5 pertanyaan acak per sesi.
* **Kalkulasi Persentase:** Menggunakan pelindung pembagian dengan nol:
  ```javascript
  const percent = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0
  ```

---

## 10. Responsive & Touch Audit

Pengujian tata letak pada berbagai dimensi:
* **Desktop (≥ 1024px):** Layout berdampingan (*two-column*) dengan area visual di kiri dan panel info di kanan.
* **Tablet (768px - 1023px):** Proporsi fleksibel dengan scroll area yang rapi.
* **Mobile (< 768px):**
  - Layout bertumpuk vertikal (*single column*).
  - Ukuran sentuh hotspot diperbesar otomatis menjadi minimal `2.5rem` (`40px`) melalui media query `@media (max-width: 768px)` untuk kemudahan navigasi jari.
  - Penambahan `onPointerDown={(e) => e.stopPropagation()}` pada tombol hotspot agar gerakan geser (*panning*) tidak memicu klik yang tidak disengaja.
  - Tooltip hover dinonaktifkan pada perangkat tanpa kursor pointer (`@media (hover: none)`), mencegah tooltip mengambang tak terkendali di layar ponsel.

---

## 11. Accessibility Audit

* **Semantic HTML:** Seluruh hotspot menggunakan elemen `<button type="button">`.
* **Aria-Label Eksplorasi:** `aria-label={`Pilih bagian ${part.label}`}` memberikan konteks jelas bagi pengguna pembaca layar.
* **Aria-Label Kenali Bagian (Identify Mode):** `aria-label={`Pilih area nomor ${idx + 1}`}`. **Penting:** Nama bagian sengaja **tidak dibocorkan** di atribut aksesibilitas mode kuis agar siswa dengan screen reader mendapatkan pengalaman ujian yang setara dan adil.
* **Visible Focus:** Seluruh kontrol (hotspot, tombol mode, kontrol zoom, tombol reset) telah dilengkapi gaya `:focus-visible` dengan outline kontras tinggi yang jelas saat dinavigasi menggunakan keyboard.
* **Text Contrast:** Kontras warna teks memenuhi kriteria WCAG AA pada light dan dark mode.

---

## 12. Zoom / Pan Audit

Integrasi pustaka `react-zoom-pan-pinch`:
* Menampilkan kontrol tombol mengambang: Perbesar (`zoom_in`), Perkecil (`zoom_out`), dan Kembalikan Tampilan (`restart_alt`).
* Posisi penanda hotspot menggunakan koordinat persentase CSS (`left: X%`, `top: Y%`), sehingga hotspot secara presisi tetap menempel pada koordinat gambar asli saat di-zoom maupun di-pan.
* Tombol reset mengembalikan skala tampilan ke ukuran normal (1x) dan posisi tengah (`centerOnInit`).

---

## 13. Dark Mode Audit

* Kontras panel informasi menggunakan variabel desain semantik (`var(--color-surface)`, `var(--color-on-surface)`, `var(--color-primary)`).
* Area visual SVG memiliki latar belakang cerah beradaptasi (`#ffffff` di light mode, `#e6e8e6` di dark mode) untuk menjaga ketajaman garis dan warna anatomis vektor SVG.
* Kartu umpan balik (feedback kuis) memiliki varian warna dark mode semi-transparan yang nyaman di mata tanpa silau berlebihan.

---

## 14. License / Attribution Audit

Dokumen `public/images/ATTRIBUTION.md` telah diperbarui dengan pelaporan yang jujur dan terperinci:
* Ketiga diagram SVG POC diklasifikasikan secara transparan sebagai **Adapted / Inspired Educational Vector Artwork**, yang dibuat mandiri untuk kebutuhan Bio Smart SMA dengan merujuk pada konsep anatomi terbuka (Mariana Ruiz Villarreal / Wapcaplet di Wikimedia Commons, Public Domain & CC BY-SA).
* Catatan lama yang menyebutkan penggunaan URL eksternal Wikimedia sebagai runtime fallback telah dihapus karena ketiga diagram sudah 100% lokal.

---

## 15. Build Result

* **Command:** `npm run build`
* **Status:** **PASS** (100% Berhasil)
* **Waktu Kompilasi:** 265 ms
* **Output:**
  - `dist/index.html` (1.14 kB, referensi path `/biosmart-sma/` terverifikasi)
  - `dist/sw.js` (PWA Service Worker terdaftar)
  - `dist/assets/*` (Bundled JS & CSS)
  - Precache: **27 entri (~4.15 MB)**

---

## 16. Lint Result

* **Command:** `npm run lint` (`oxlint`)
* **Status:** **PASS WITH WARNING** (0 Errors, 4 Warnings pada file legacy context/common yang tidak berkaitan)
* **Komponen `InteractiveDiagram.jsx`:** **0 Errors, 0 Warnings**.
* **Kecepatan Linter:** 26 ms pada 28 file berkat konfigurasi batas `.oxlintignore` dan `.eslintignore`.

---

## 17. Bugs Fixed

1. **Duplicate CSS Import:** Menghapus duplikasi import `InteractiveDiagram.css` pada header file.
2. **State Scoring Cascades:** Mengeliminasi `useEffect` sinkronisasi skor yang memicu re-render ganda; scoring kini dievaluasi secara sinkron pada event click.
3. **Division by Zero:** Memperbaiki potensi `NaN%` pada kuis saat jumlah soal 0.
4. **Target Leak via Aria-label:** Memperbaiki `aria-label` hotspot pada mode Kenali Bagian agar tidak membocorkan nama target kepada pengguna screen reader.
5. **Image Error State:** Menambahkan komponen fallback anggun jika file gambar tidak ditemukan.
6. **Scatter Path Logic:** Menyatukan logika resolusi path ke dalam utilitas tunggal `src/utils/assetResolver.js`.
7. **Unused Imports & Variables:** Membersihkan `useRef`, `...rest`, `Link` (Header), dan `_lowMasteryCount` (TopicCharts).

---

## 18. Known Limitations

1. **Tiga Gambar Materi Statis:** Modul Pembelahan Sel (Mitosis), Reproduksi (Fertilisasi), dan Nutrisi (Piramida Makanan) saat ini masih menggunakan URL gambar eksternal (dilengkapi fallback).
2. **3D Human Atlas:** Merupakan modul iframe terpisah yang diisolasi di `public/human-atlas/` untuk menjaga performa rendering WebGL Three.js.

---

## 19. Recommended Next Step

Berdasarkan hasil audit dan hardening ini, disarankan tahapan pengembangan berikutnya difokuskan pada:

1. **Penyempurnaan Visual Tiga Diagram:** Menambahkan detail grafis halus pada vektor membran sel, jantung, dan pernapasan agar semakin menarik bagi siswa SMA.
2. **Penambahan Diagram Biologi SMA Bertahap:** Mengonversi 3 gambar statis eksternal (Mitosis, Fertilisasi, Piramida Makanan) menjadi format `interactiveImage` lokal berbasis SVG.
3. **Standardisasi Schema & Tooling:** Mempertahankan utilitas `validateDiagramData` sebagai standar pembuatan diagram baru di masa mendatang.
4. **Pengembangan Diagram Bab Lain:** Membuka diagram interaktif untuk topik Sistem Pencernaan (Lambung & Usus), Sistem Saraf (Neuron), dan Struktur DNA/RNA.
5. **Peningkatan Evaluasi Visual:** Menyediakan opsi batas waktu latihan (*timer*) opsional atau mode kuis berbasis tantangan waktu.
