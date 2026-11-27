# Kasir Klinik Pijat SEHAT NUSANTARA

Aplikasi POS (point of sale) berbasis web yang **ramah pembaca layar** untuk klinik pijat tunanetra, dengan laporan keuangan mengikuti format **SAK EMKM** (Laba Rugi, Neraca, Catatan) dan ekspor Excel.

## Struktur berkas

- `index.html` — kerangka halaman + area cetak struk
- `styles.css` — seluruh tampilan + gaya cetak struk
- `db.js` — penyimpanan data (saat ini di perangkat / localStorage)
- `utils.js` — fungsi bantu + navigasi tombol back
- `screens.js` — semua layar aplikasi
- `sw.js`, `manifest.json` — PWA (bisa dipakai offline)
- `xlsx.full.min.js`, `qrcode.min.js` — pustaka Excel & QR (berjalan offline)
- `icon-192.png`, `icon-512.png` — ikon aplikasi

## Perubahan pada versi ini (27 November 2026)

**Perbaikan yang diminta:**
- Tombol **back HP/browser** kini kembali ke layar sebelumnya, tidak lagi keluar dari aplikasi. Di menu utama, back tidak langsung menutup aplikasi.
- Membuat **barang stok custom** dipermudah: bagian "Buat Barang Baru" dipindah ke atas, nama/satuan/minimum bisa diisi bebas.
- **Daftar aset** kini punya **jumlah unit** dan harga per unit.
- **Layanan, terapis, pelanggan, dan barang stok** kini bisa **diedit**, tidak hanya dihapus.
- **Peringatan sebelum menghapus** data yang masih terpakai (mis. terapis yang masih punya komisi belum dibayar, atau barang yang terhubung ke layanan).

**Fitur baru:**
- Sumber dana aset **"dana hibah"** (selain kas usaha dan modal pribadi), dengan baris "Modal hibah/sumbangan" di neraca.
- **Cetak struk** untuk printer Bluetooth, printer biasa, atau simpan sebagai PDF.
- **Logo klinik** pada identitas, tampil di struk cetak.

**Perbaikan teknis penting:** fungsi fitur voucher sempat hilang dari berkas sehingga menyebabkan error yang mematikan sebagian menu (termasuk tombol Pengaturan). Fungsi voucher sudah dipulihkan.

## Catatan cetak struk (printer Bluetooth)

Tombol "Cetak struk" memakai sistem cetak bawaan perangkat. Untuk **printer termal Bluetooth** yang umum di Indonesia, pasang aplikasi pendamping gratis **RawBT** di HP Android; saat menekan "Cetak", pilih RawBT sebagai tujuan. Struk juga bisa disimpan sebagai **PDF** atau dicetak ke printer biasa. Aplikasi tidak memasangkan (pairing) printer Bluetooth secara langsung dari web, karena mayoritas printer termal murah memakai Bluetooth Classic yang tidak didukung penuh oleh peramban.

## Catatan untuk pengembangan server

Versi ini masih menyimpan seluruh data **di perangkat** (localStorage) agar bisa langsung dipakai dan diuji. Untuk dijadikan fasilitas multi-pengguna di server (login per klinik, data tersimpan terpusat), bagian penyimpanan di `db.js` perlu diarahkan ke login dan database server melalui API; tampilan dan laporan tidak perlu diubah. Catatan keamanan: PIN pemilik saat ini disimpan apa adanya di perangkat — jangan dibawa pola itu ke server; simpan secara ter-hash di sisi server.
