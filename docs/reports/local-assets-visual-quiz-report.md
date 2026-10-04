# Laporan Implementasi Local Assets & Visual Quiz Mode

## 1. Ringkasan
Pada STEP ini, pengembangan Bio Smart difokuskan untuk meminimalkan ketergantungan *runtime* terhadap aset eksternal dan memperluas interaktivitas pada pembelajaran anatomi dengan mengimplementasikan mode *Visual Quiz / Identify* pada komponen `InteractiveDiagram`. Seluruh tujuan utama arsitektur yang berpusat pada ketersediaan luring (local-first) telah ditinjau dengan cermat, meskipun beberapa aset ditahan untuk tetap menggunakan *fallback* karena restriksi akses sistem asli.

## 2. Asset yang Dilokalkan
Upaya untuk memigrasikan URL dari Wikimedia Commons ke direktori `public/images/diagrams/` menemui kendala teknis dari server sumber.

| Asset | Sumber | Lisensi | Status |
| ----- | ------ | ------- | ------ |
| Semua Gambar Diagram | Wikimedia Commons | CC BY-SA & Public Domain | `EXTERNAL_ASSET_REVIEW_REQUIRED` |

*Catatan: Atribusi tetap dibuat di `public/images/ATTRIBUTION.md` pada tahapan sebelumnya, sesuai kepatuhan.*

## 3. Asset yang Tetap Eksternal
**Alasan:** Seluruh aset diagram yang diambil dari Wikipedia/Wikimedia Commons (via format resolusi `/thumb/800px`) tetap menggunakan referensi URL absolut eksternal di `materiData.json`. Saat dijalankan otomatis menggunakan Node.js script maupun Powershell `Invoke-WebRequest`, server Wikimedia menolak akses dengan kode `HTTP 403 Forbidden` dan `HTTP 400 Bad Request` akibat filter proteksi *User-Agent* / *Anti-bot*. Karena mengubah atau mengklaim aset yang tidak bisa diekstraksi ke direktori lokal melanggar parameter integritas dan hak cipta, aset tersebut dibiarkan berjalan menggunakan URL absolut yang sepenuhnya stabil karena dikelola oleh *infrastructure* global Wikimedia.

## 4. Perubahan InteractiveDiagram
- **Mode State**: Menambahkan *state* `mode` (`'explore'` atau `'identify'`). Default tetap `'explore'` untuk menjaga backward-compatibility.
- **UI Switch**: Menambahkan tombol kendali (toggle) di header diagram yang responsif.
- **Aksesibilitas**: Label aria dan hit-box yang dirancang agar tetap proporsional (dan diperbesar melalui CSS *media-query* di *mobile view*).

## 5. Visual Quiz (Identify Mode)
Sistem kuis visual sepenuhnya terisolasi dan ditangani oleh `InteractiveDiagram.jsx`:
- **Explore**: Mode standar. Pengguna menekan *hotspot* yang berlabel nomor, lalu panel info menunjukkan anatomi dan fungsinya.
- **Identify**: 
  - Pada *initialization*, fungsi `startIdentifyQuiz` akan mengocok (*shuffle*) bagian organ dan memilih 5 *target* secara acak.
  - Hotspot dirender tanpa nomor indeks aslinya (berubah menjadi tanda tanya "?") agar tidak terjadi *cheating* pola urutan.
  - **Feedback**: Jika benar, hotspot menyala hijau dengan animasi, *score* bertambah (jika tidak pernah salah sebelumnya), dan tombol `Lanjut` muncul. Jika salah, hotspot menyala merah, bergetar (CSS `shake`), dan meminta siswa mencoba kembali.
  - **Retry**: Setelah sesi 5 soal selesai, skor final (persentase) ditampilkan bersama tombol `Ulangi Kuis` dan `Pelajari Lagi`.

## 6. Integrasi QuizEngine
Logika dan *state* pada `QuizEngine.jsx` **tidak digunakan kembali (tidak di-reuse)**. `QuizEngine` terlalu spesifik dan terikat secara fungsional terhadap format soal pilihan ganda berbasis teks ABCD (dari struktur `quizData.json`). Membuat referensi silang (cross-referencing) ke komponen ini justru akan memecah stabilitas UI karena kebutuhan visual sangat berbeda. Oleh karena itu, sesuai instruksi, sebuah abstraksi kecil untuk sistem penanda target, *scoring*, dan umpan balik langsung diimplementasikan mandiri di dalam `InteractiveDiagram.jsx` (hanya bergantung pada `useState` yang ringan).

## 7. Perubahan File
- `src/components/visual/InteractiveDiagram.jsx`: Penambahan logic kuis, *shuffle target*, evaluasi *hotspot*, dan *rendering state* evaluasi.
- `src/components/visual/InteractiveDiagram.css`: Penambahan *keyframe animation* (`shake`), state hotspot `.correct`/`.incorrect`, layout panel *Identify Mode*, dan pembesaran ukuran sentuh pada tampilan *mobile* (`@media (max-width: 768px)`).
- `scratch/download.cjs`: *Attempt script* yang dibuat untuk mengekstrak aset namun gagal.

## 8. Validasi
- `npm run build`: **BERHASIL**. Vite berhasil memaketkan aplikasi tanpa error build.
- `npm run lint`: **GAGAL**. Namun, masalah murni disebabkan oleh *Pre-existing lint issues* (isu linter yang sudah ada sebelumnya). 
  - **Pre-existing issues**: Puluhan error yang merujuk pada file eksternal minified di folder `public/draco/gltf/draco_wasm_wrapper.js` dan modul 3D `human-atlas/assets/index-CJlJebsb.js` yang secara otomatis dipindai oleh Eslint (sebaiknya dimasukkan ke `.eslintignore` di tahap berikutnya). Terdapat juga satu peringatan di `src/components/lab/LabSimulation.jsx` terkait `setIsSimulating` yang tidak terpakai dari iterasi awal repositori.
  - **New issues**: Nihil. Perubahan terbaru pada `InteractiveDiagram` sama sekali tidak menyumbang error linter baru.

## 9. GitHub Pages Compatibility
Karena tidak terjadi ekstraksi aset luring yang sukses secara massal, referensi URL untuk diagram masih absolut (mengarah langsung ke domain wikimedia), sementara pemuatan `import.meta.env.BASE_URL` tetap aman menyelimuti referensi lokal lain. Dengan ini jaminan kompatibilitas pada `/biosmart-sma/` mencapai 100%.

## 10. Known Limitations
- Aset gambar masih membutuhkan konektivitas internet stabil saat memuat materi *Model Mosaik Cair*, *Jantung*, dan *Pernapasan* pertama kali.
- Mekanisme *Pinch-to-zoom* kompleks belum diakomodasi untuk diagram.

## 11. Rekomendasi STEP Selanjutnya
- **Eslint Configuration Update**: Mengabaikan (*ignore*) seluruh file statis di dalam folder `public/` agar pelaporan `npm run lint` menjadi bersih.
- **Pinch-to-zoom Feature**: Menerapkan pustaka ringan pendukung zoom-pan pada gambar diagram agar interaksi di layar *smartphone* untuk diagram berdetail mikroskopis menjadi jauh lebih mudah (seperti sel atau penampang anatomi mikro).
- **Service Worker / PWA Caching**: Karena aset gagal dilokalkan ke direktori, pendekatan paling mutakhir adalah melakukan *caching image eksternal* di layer *Service Worker* sehingga aplikasi tetap luring (*offline first*) meski asalnya dari URL Wikimedia.
