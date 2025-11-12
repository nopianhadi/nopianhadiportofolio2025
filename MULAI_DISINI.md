# 🚀 MULAI DISINI - Panduan Keamanan Website Portfolio

## 👋 Selamat Datang!

Website portfolio Anda telah diperbaiki dengan fitur keamanan lengkap. File ini akan memandu Anda untuk memulai.

---

## ⚡ Quick Start (5 Menit)

### 1. Setup Environment Variables

```bash
# Copy template
cp .env.example .env.local

# Edit .env.local dengan text editor
# Masukkan kredensial Supabase Anda
```

**Isi .env.local:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database (Supabase)

1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Klik **SQL Editor**
4. Copy-paste isi file `supabase-policies.sql`
5. Klik **Run**

### 4. Buat Admin User

1. Di Supabase Dashboard
2. Klik **Authentication** > **Users**
3. Klik **Add User**
4. Masukkan email & password
5. Klik **Create User**

### 5. Jalankan Development Server

```bash
npm run dev
```

### 6. Test Login

1. Buka http://localhost:3000/admin/login
2. Login dengan email & password yang dibuat
3. Seharusnya masuk ke dashboard

---

## ✅ Apa yang Sudah Diperbaiki?

### 🔐 Login Admin
- ✅ Rate limiting (5 percobaan, lockout 5 menit)
- ✅ Validasi input
- ✅ Session timeout warning
- ✅ Auto-logout
- ✅ Logout button

### 📧 Form Kontak
- ✅ Validasi email & nama
- ✅ Spam detection
- ✅ Rate limiting (1 menit cooldown)
- ✅ Input sanitization

### 🗄️ Database
- ✅ Row Level Security (RLS)
- ✅ Public hanya lihat Published
- ✅ Admin bisa CRUD semua

### 🛡️ Security Headers
- ✅ X-Frame-Options
- ✅ Content-Security-Policy
- ✅ Strict-Transport-Security

---

## 📚 Dokumentasi Lengkap

Baca file-file ini untuk detail lebih lanjut:

### Untuk Pemula
1. **README_KEAMANAN.md** ⭐ Baca pertama!
2. **QUICK_SECURITY_GUIDE.md** ⚡ Panduan cepat

### Untuk Developer
3. **KEAMANAN_WEB.md** 📖 Panduan lengkap
4. **RINGKASAN_PERBAIKAN_KEAMANAN.md** 📋 Detail perbaikan

### Untuk Admin/DevOps
5. **SECURITY_CHECKLIST.md** ✅ Checklist production
6. **ROTATE_CREDENTIALS.md** 🔄 Rotasi kredensial

### Referensi
7. **DOKUMENTASI_INDEX.md** 📚 Index semua dokumentasi
8. **SECURITY_ARCHITECTURE.md** 🏗️ Arsitektur keamanan
9. **EXECUTIVE_SUMMARY.md** 📊 Summary eksekutif

---

## 🧪 Test Keamanan

### Test 1: Login Rate Limiting

1. Buka `/admin/login`
2. Login dengan password salah 5x
3. **Hasil**: Harus lockout 5 menit ✅

### Test 2: Contact Form Spam

1. Buka halaman contact
2. Isi form dengan URL di pesan
3. Submit
4. **Hasil**: Harus ditolak ✅

### Test 3: Contact Form Rate Limit

1. Kirim pesan pertama (berhasil)
2. Langsung kirim pesan kedua
3. **Hasil**: Kedua harus ditolak (cooldown 1 menit) ✅

---

## 🚨 Troubleshooting

### Login Tidak Berfungsi

**Cek:**
1. File `.env.local` ada dan benar
2. Kredensial Supabase valid
3. RLS policies sudah di-run
4. Admin user sudah dibuat

**Solusi:**
```bash
# Cek .env.local
cat .env.local

# Pastikan format benar
# VITE_SUPABASE_URL=https://...
# VITE_SUPABASE_ANON_KEY=eyJ...
```

### Contact Form Error

**Cek:**
1. Table `contact_messages` ada
2. RLS policy untuk contact_messages aktif
3. Browser console untuk error

**Solusi:**
- Re-run `supabase-policies.sql`
- Check Supabase logs

### Session Timeout Tidak Muncul

**Cek:**
1. Component `SessionTimeout` di-import
2. Session expiry time di Supabase

**Solusi:**
- Untuk testing, ubah timer di `SessionTimeout.tsx`

---

## 📞 Butuh Bantuan?

**Kontak:**
- Email: nopianhadi2@gmail.com
- WhatsApp: 0895-4061-8407

**Dokumentasi:**
- Baca `DOKUMENTASI_INDEX.md` untuk navigasi lengkap
- Baca `KEAMANAN_WEB.md` untuk detail

---

## 🎯 Langkah Selanjutnya

### Setelah Setup Lokal Berhasil:

1. **Test Semua Fitur**
   - Login & logout
   - Contact form
   - Session timeout

2. **Baca Dokumentasi**
   - `KEAMANAN_WEB.md` (20 menit)
   - `SECURITY_CHECKLIST.md` (15 menit)

3. **Persiapan Deploy**
   - Set environment variables di hosting
   - Deploy RLS policies
   - Test production

4. **Monitoring**
   - Setup monitoring
   - Check logs regular
   - Review security events

---

## ⚠️ PENTING!

### Jangan Lupa:

- ❌ **JANGAN** commit file `.env` atau `.env.local`
- ✅ **SELALU** gunakan `.env.local` untuk development
- ✅ **GANTI** kredensial jika `.env` pernah ter-commit
- ✅ **BACKUP** database secara regular
- ✅ **UPDATE** dependencies secara berkala

### File yang Harus Di-commit:

- ✅ `.env.example` (template)
- ✅ `.gitignore` (updated)
- ✅ Semua file dokumentasi
- ✅ Source code changes

### File yang TIDAK Boleh Di-commit:

- ❌ `.env`
- ❌ `.env.local`
- ❌ `.env.*.local`
- ❌ File dengan kredensial

---

## 📋 Checklist Setup

Centang setelah selesai:

- [ ] Copy `.env.example` ke `.env.local`
- [ ] Edit `.env.local` dengan kredensial Supabase
- [ ] Run `npm install`
- [ ] Run `supabase-policies.sql` di Supabase
- [ ] Buat admin user di Supabase
- [ ] Run `npm run dev`
- [ ] Test login berhasil
- [ ] Test contact form berhasil
- [ ] Baca `KEAMANAN_WEB.md`
- [ ] Baca `SECURITY_CHECKLIST.md`

---

## 🎉 Selamat!

Jika semua checklist di atas sudah ✅, maka:

**Website Anda sekarang AMAN dan siap digunakan! 🔒**

Untuk deploy ke production, baca:
- `SECURITY_CHECKLIST.md` (bagian Pre-Deployment)
- `KEAMANAN_WEB.md` (bagian Deploy)

---

**Happy Coding! 💻**

Jangan lupa untuk selalu update dependencies dan monitor security logs! 🛡️
