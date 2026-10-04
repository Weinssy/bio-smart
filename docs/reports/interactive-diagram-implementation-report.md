# Laporan Implementasi Interactive Diagram Bio Smart

## 1. Ringkasan
Implementasi fitur Interactive Diagram (Diagram Interaktif) telah berhasil diselesaikan pada repository `Weinssy/biosmart-sma`. Sistem baru ini memperkenalkan struktur data baru `interactiveImage` pada konfigurasi JSON yang diolah oleh komponen baru `InteractiveDiagram.jsx`. Fitur ini memungkinkan penempatan penanda (hotspots) menggunakan koordinat absolut yang menutupi gambar diagram. Saat hotspot ditekan, detail mengenai nama, deskripsi, dan fungsi bagian tersebut akan dimuat pada panel informasi (Diagram Info Panel) yang interaktif.

## 2. File yang Ditambahkan
Sistem visual baru ini memperkenalkan beberapa berkas dan aset:
- `src/components/visual/InteractiveDiagram.jsx`: Komponen React utama yang bertugas merender gambar dan memetakan hotspot, serta menyajikan panel interaktif untuk mode identifikasi/eksplorasi.
- `src/components/visual/InteractiveDiagram.css`: Berkas stylesheet yang mendukung sistem *responsive layout* dan visibilitas di lingkungan *light* dan *dark mode*.
- `public/images/ATTRIBUTION.md`: Dokumen yang mencatat metadata dan lisensi gambar aset.
- `scratch/update_materi_interactive.js`: Script Node.js yang digunakan satu kali untuk memigrasikan materi terpilih pada `materiData.json` ke format `interactiveImage`.

## 3. File yang Dimodifikasi
- `src/data/materiData.json`: Dimodifikasi untuk menggantikan tiga diagram *static image* menjadi format schema `interactiveImage` beserta koordinat hotspot, nama bagian, deskripsi, dan fungsi.
- `src/components/materi/MateriDetail.jsx`: Diperbarui logic renderer-nya (fungsi `renderContent`) untuk menyertakan dukungan komponen `<InteractiveDiagram />` khusus tipe konten `interactiveImage`. Turut ditambahkan dukungan atribut `loading="lazy"` untuk *fallback image biasa*.

## 4. Arsitektur
Arsitektur aliran data interaktif berjalan melalui siklus ini:
- **`materiData.json`**: Memuat struktur model untuk visual interaktif (image URL, caption, judul, array partisi/hotspot beserta X,Y).
- **`MateriDetail.jsx`**: Membaca JSON di atas saat materi dibuka. Jika blok terdeteksi bertipe `interactiveImage`, kontrol rendering diteruskan ke `InteractiveDiagram`.
- **`InteractiveDiagram`**: Berfungsi sebagai *container* yang mengelola `state` untuk *active hotspot* (identifikasi saat di-klik) dan menyajikan dua area (Visual Area untuk klik koordinat, Info Area untuk rincian). 

## 5. Schema `interactiveImage`
Format schema yang telah distandardisasi dalam *materiData.json*:
```json
{
  "type": "interactiveImage",
  "src": "URL atau path/ke/gambar",
  "title": "Struktur XYZ",
  "caption": "Keterangan gambar",
  "description": "Deskripsi singkat pengantar",
  "parts": [
    {
      "id": "nama-unik",
      "label": "Nama Bagian",
      "description": "Deskripsi anatomi atau struktur ini.",
      "function": "Fungsi biologi dari bagian ini.",
      "hotspot": { "x": 50, "y": 30 } // Persentase kordinat dari kiri atas
    }
  ]
}
```

## 6. Asset Strategy
Strategi aset visual diarahkan dengan pertimbangan berikut:
- **Struktur Direktori**: Aset dipersiapkan untuk ditaruh ke dalam format `public/images/diagrams/[nama-modul]/...`.
- **Lokalisasi**: Diagram-diagram yang ada mengambil URL dari *Wikimedia Commons* sebagai fallback (untuk menjaga bundle build *GitHub Pages* di bawah batas rasional saat ini dan menjamin image resolution yang bagus). Resolusi dipanggil secara kondisional dengan evaluasi base url secara mandiri (mendukung `import.meta.env.BASE_URL`).

## 7. Diagram yang Sudah Diimplementasikan
Proof-of-concept fitur diagram interaktif telah diimplementasikan penuh pada tiga materi percontohan sesuai prioritas:
1. **Membran Sel / Model Mosaik Cair** (Modul 1: Biologi Sel)
2. **Anatomi Jantung Manusia** (Modul 3: Sistem Anatomi Tubuh)
3. **Sistem Pernapasan Manusia** (Modul 3: Sistem Anatomi Tubuh)

## 8. Validasi
- **Linting (`npm run lint`)**: Awalnya menemui masalah peringatan import tak terpakai pada file eksisting dan aturan spesifik. Penyesuaian ke *unused variables* telah dilakukan. Banyak error datang dari librari internal pihak ketiga (*Draco 3D* & *Vite Minifier*) yang pada prakteknya tidak mempengaruhi stabilitas build akhir.
- **Build (`npm run build`)**: Vite build berfungsi normal dan berhasil mengekspor HTML/JS/CSS statis untuk GitHub Pages (berada di bawah path `/biosmart-sma/`).
- **Dark Mode Compatibility**: Visualisasi panel info, kontras hover hotspot, dan *text visibility* 100% kompatibel dan responsif untuk tema terang maupun gelap.

## 9. Known Limitations (Catatan Kendala)
- Gambar 3D *Human Atlas* tetap dibundel secara aman di `public/human-atlas` tanpa mengubah interaksinya agar bebas dari distorsi *renderer component*.
- Hotspots berbasis koordinat X dan Y (persentase) bersifat dinamis terhadap rasio ukuran gambar. Jika rasio gambar berubah signifikan dari orientasi awal, koordinat pin (hotspot) juga bisa bergeser.

## 10. Rekomendasi STEP Berikutnya
- **Pembuatan Interactive Mode "Evaluasi/Kuis Visual"**: Menerapkan mode identifikasi tebak buta (menyembunyikan label saat eksplorasi) di mana siswa ditantang menunjuk target anatomi secara spesifik.
- **Transisi ke Lintas Layar**: Menambahkan fitur _pinch-to-zoom_ (memperbesar visualisasi di perangkat layar kecil) untuk memperjelas wilayah hotspot interaktif yang tumpang tindih.
