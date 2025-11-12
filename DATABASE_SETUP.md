# 🗄️ Database Setup Guide

Panduan lengkap untuk setup database Supabase untuk aplikasi portfolio.

## 📋 Prerequisites

- Akun Supabase (gratis di [supabase.com](https://supabase.com))
- Project Supabase yang sudah dibuat

## 🚀 Langkah Setup

### 1. Buat Project di Supabase

1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Klik **"New Project"**
3. Isi detail project:
   - **Name**: Portfolio Database
   - **Database Password**: (simpan password ini!)
   - **Region**: Pilih yang terdekat dengan Anda
4. Tunggu project selesai di-provision (sekitar 2 menit)

### 2. Jalankan Schema SQL

1. Buka project Anda di Supabase Dashboard
2. Klik menu **"SQL Editor"** di sidebar kiri
3. Klik **"New Query"**
4. Copy semua isi dari file `schema.sql`
5. Paste ke SQL Editor
6. Klik tombol **"Run"** atau tekan `Ctrl + Enter`
7. Pastikan muncul pesan sukses tanpa error

### 3. Import Seed Data

1. Masih di SQL Editor, buat New Query lagi
2. Copy semua isi dari file `seed-data.sql`
3. Paste ke SQL Editor
4. Klik **"Run"** untuk execute
5. Verifikasi data berhasil masuk dengan query:

```sql
SELECT COUNT(*) FROM projects;
SELECT COUNT(*) FROM articles;
SELECT COUNT(*) FROM testimonials;
```

### 4. Konfigurasi Environment Variables

1. Di Supabase Dashboard, klik **"Settings"** → **"API"**
2. Copy **Project URL** dan **anon public key**
3. Buat file `.env.local` di root project Anda:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Restart development server

### 5. Setup Authentication (Opsional untuk Admin)

1. Klik menu **"Authentication"** di Supabase Dashboard
2. Klik **"Users"** → **"Add User"**
3. Masukkan email dan password untuk admin
4. Gunakan credentials ini untuk login ke admin panel

## 📊 Struktur Database

### Tabel: `projects`

Menyimpan data project portfolio dengan detail lengkap.

**Kolom utama:**
- `id` - UUID primary key
- `title` - Judul project
- `client` - Nama klien
- `category` - Kategori project
- `status` - Published/Draft
- `technologies` - Array teknologi yang digunakan
- `results` - Array hasil/achievements
- `images` - Array URL gambar

### Tabel: `articles`

Menyimpan artikel/blog posts.

**Kolom utama:**
- `id` - UUID primary key
- `title` - Judul artikel
- `excerpt` - Ringkasan artikel
- `content` - Konten lengkap (markdown supported)
- `category` - Kategori artikel
- `status` - Published/Draft
- `tags` - Array tags
- `author` - Nama penulis

### Tabel: `testimonials`

Menyimpan testimoni dari klien.

**Kolom utama:**
- `id` - UUID primary key
- `name` - Nama klien
- `company` - Nama perusahaan
- `message` - Isi testimoni
- `rating` - Rating 1-5
- `status` - Published/Pending

## 🔒 Row Level Security (RLS)

Database sudah dikonfigurasi dengan RLS policies:

### Public Access (Unauthenticated)
- ✅ Dapat **READ** data dengan status `Published`
- ❌ Tidak dapat CREATE, UPDATE, atau DELETE

### Authenticated Access (Admin)
- ✅ Full access: CREATE, READ, UPDATE, DELETE
- ✅ Dapat mengelola semua data termasuk Draft

## 🧪 Testing Database

Test koneksi database dengan menjalankan aplikasi:

```bash
npm run dev
```

Buka browser dan cek:
- Homepage: Data projects Published harus tampil
- Blog: Artikel Published harus tampil
- Admin Panel: Login dan coba CRUD operations

## 🔧 Troubleshooting

### Error: "relation does not exist"

**Solusi:** Schema belum dijalankan. Ulangi langkah 2.

### Error: "JWT expired" atau auth error

**Solusi:** 
1. Cek `.env.local` sudah benar
2. Restart development server
3. Clear browser cache/localStorage

### Data tidak muncul di frontend

**Solusi:**
1. Cek RLS policies sudah enabled
2. Verifikasi data status = 'Published'
3. Check console untuk error messages

### Cannot insert/update data

**Solusi:**
1. Pastikan sudah login sebagai admin
2. Cek RLS policies untuk authenticated users
3. Verify JWT token valid

## 📝 Maintenance

### Backup Database

Reguler backup database Anda:

1. Klik **"Database"** → **"Backups"** di Supabase
2. Enable **"Point in Time Recovery"** untuk production
3. Download manual backup secara berkala

### Update Schema

Jika ada perubahan schema:

1. Buat migration SQL file
2. Test di development environment dulu
3. Jalankan di production saat low-traffic time

### Monitor Performance

1. Klik **"Database"** → **"Query Performance"**
2. Optimize slow queries
3. Add indexes jika diperlukan

## 🆘 Support

Jika mengalami masalah:

1. Check [Supabase Documentation](https://supabase.com/docs)
2. Review RLS policies di **"Authentication"** → **"Policies"**
3. Check logs di **"Logs"** → **"Postgres Logs"**

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

**Happy Coding! 🚀**
