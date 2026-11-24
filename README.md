# Portofolio Ach. Nurul Mukhlishin (React + Vite)

## Menjalankan
1. Pasang Node.js (nodejs.org), lalu di terminal folder ini: `npm install`
2. `npm run dev` lalu buka alamat yang tampil (biasanya http://localhost:5173)

## Mengganti isi
- Teks proyek, pengalaman, keterampilan, dan kontak: `src/data.js`
- Foto: simpan sebagai `public/profil.jpg`

## Supabase (opsional, untuk komentar dan sertifikat online)
1. Buat project di supabase.com, buka SQL Editor, jalankan `supabase/setup.sql`.
2. Salin `.env.example` menjadi `.env`, isi URL dan anon key (Settings > API).
3. Sertifikat: unggah gambar ke Storage (bucket publik), lalu tambahkan barisnya
   di tabel `certificates` dengan kolom `Img` berisi URL gambar.
Tanpa Supabase, komentar hanya tersimpan di browser masing-masing.

## Online
Repository ini disiapkan untuk deployment otomatis ke GitHub Pages melalui GitHub Actions.
Sebelum deployment pertama:
1. Buka **Settings > Pages** di repository.
2. Pada **Build and deployment**, pilih **GitHub Actions** sebagai **Source**.
3. Simpan perubahan, lalu push ke branch `main` (atau jalankan workflow dari tab **Actions**).

Setelah workflow **Deploy to GitHub Pages** berhasil, website dapat dibuka di:
https://achnurulmukhlishin99-hub.github.io/achnurulmukhlishin/

Repository:
https://github.com/achnurulmukhlishin99-hub/achnurulmukhlishin

Jika Supabase ingin diaktifkan untuk komentar dan sertifikat online, tambahkan
`VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` sebagai Actions variables pada repository.
Jangan gunakan service-role key atau unggah file `.env` ke GitHub.

Sebagai alternatif, jalankan `npm run build` lalu unggah isi folder `dist` ke Netlify
atau hubungkan repository ke Vercel.
