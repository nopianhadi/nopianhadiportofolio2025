# Setup Avatar Upload

Panduan untuk mengaktifkan fitur upload foto profil di halaman Settings.

## 🚀 Quick Setup (Via Dashboard)

### Cara Termudah - Supabase Dashboard:

1. **Buka Supabase Dashboard** → **Storage**
2. **Klik "New bucket"**
3. **Isi form:**
   - Bucket name: `public`
   - Public bucket: **✅ ON** (centang)
4. **Klik "Create bucket"**
5. **Selesai!** Policies akan otomatis dibuat

## 📝 Alternative Setup (Via SQL)

Jika ingin setup via SQL Editor:

1. Buka **Supabase Dashboard** → **SQL Editor**
2. Jalankan script `create-storage-bucket.sql`
3. Verifikasi bucket sudah dibuat

## ✅ Verifikasi Setup

Setelah bucket dibuat, cek di Supabase Dashboard:

1. **Storage** → Lihat bucket `public` sudah ada
2. **Policies** → Pastikan ada 4 policies:
   - Public files are publicly accessible (SELECT)
   - Authenticated users can upload (INSERT)
   - Authenticated users can update (UPDATE)
   - Authenticated users can delete (DELETE)

## 🎯 Cara Menggunakan

1. **Login ke Admin** → `/admin/login`
2. **Buka Settings** → `/admin/settings`
3. **Tab Profil** → Klik tombol **"Ganti Foto"**
4. **Pilih gambar** (JPG, PNG, atau GIF, max 2MB)
5. **Upload otomatis** dan foto langsung berubah

## 📁 Struktur Storage

```
public/
└── avatars/
    ├── avatar-1234567890.jpg
    ├── avatar-1234567891.png
    └── ...
```

## 🔒 Security

- **Public Read**: Siapa saja bisa lihat foto (untuk ditampilkan di website)
- **Authenticated Upload**: Hanya admin yang login bisa upload
- **Authenticated Update/Delete**: Hanya admin yang bisa update/hapus

## ⚙️ Fitur Upload

- ✅ Validasi format file (JPG, PNG, GIF)
- ✅ Validasi ukuran file (max 2MB)
- ✅ Loading indicator saat upload
- ✅ Auto-save setelah upload sukses
- ✅ Error handling
- ✅ Preview langsung setelah upload

## 🐛 Troubleshooting

### Upload gagal
1. Pastikan bucket `public` sudah dibuat
2. Cek policies sudah aktif
3. Pastikan user sudah login (authenticated)
4. Cek ukuran file tidak lebih dari 2MB
5. Cek format file (JPG, PNG, atau GIF)

### Foto tidak muncul
1. Pastikan bucket `public` adalah **public bucket**
2. Cek policy SELECT untuk public
3. Verifikasi URL foto di browser

### Error "bucket not found"
1. Buat bucket `public` di Storage
2. Pastikan nama bucket persis: `public` (lowercase)

## 📸 Format File yang Didukung

- **JPEG/JPG** - Recommended untuk foto
- **PNG** - Untuk gambar dengan transparansi
- **GIF** - Untuk animasi (tapi akan ditampilkan sebagai static)

## 💡 Tips

- Gunakan foto dengan rasio 1:1 (square) untuk hasil terbaik
- Compress foto sebelum upload untuk loading lebih cepat
- Nama file akan otomatis di-rename dengan timestamp
- Foto lama tidak otomatis terhapus (bisa dihapus manual di Storage)

## 🎉 Selesai!

Fitur upload avatar sudah siap digunakan. Admin bisa ganti foto profil dengan mudah!
