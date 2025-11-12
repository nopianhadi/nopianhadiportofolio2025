# ⚡ Quick Security Guide - Portfolio Website

## 🚀 Setup Cepat (5 Menit)

### 1. Environment Variables
```bash
cp .env.example .env.local
# Edit .env.local dengan kredensial Supabase Anda
```

### 2. Supabase RLS
```sql
-- Copy-paste isi file supabase-policies.sql ke Supabase SQL Editor
-- Klik Run
```

### 3. Buat Admin User
```
Supabase Dashboard > Authentication > Users > Add User
```

### 4. Test
```bash
npm run dev
# Buka http://localhost:3000/admin/login
```

---

## 🔑 Fitur Keamanan Utama

| Fitur | Status | Deskripsi |
|-------|--------|-----------|
| Login Rate Limiting | ✅ | 5 percobaan, lockout 5 menit |
| Contact Form Validation | ✅ | Email, nama, spam detection |
| Database RLS | ✅ | Public = Published only |
| Session Timeout | ✅ | Warning 5 menit sebelum expire |
| Input Sanitization | ✅ | XSS & injection prevention |
| Security Headers | ✅ | CSP, X-Frame-Options, dll |

---

## 📋 Checklist Deploy

- [ ] .env tidak ter-commit
- [ ] Environment variables di hosting
- [ ] RLS policies aktif
- [ ] Admin user dibuat
- [ ] HTTPS aktif
- [ ] Test login & contact form

---

## 🧪 Quick Test

### Login Rate Limiting
```
1. Login salah 5x → Lockout 5 menit ✅
```

### Contact Form
```
1. Kirim dengan URL → Ditolak ✅
2. Kirim 2x < 1 menit → Ditolak ✅
```

### Session
```
1. Login → Tunggu 55 menit → Warning muncul ✅
```

---

## 🆘 Quick Fix

### Login Tidak Berfungsi
```bash
# Check .env.local
cat .env.local

# Verify Supabase connection
# Buka browser console, cek error
```

### Contact Form Error
```sql
-- Check RLS policy
SELECT * FROM pg_policies WHERE tablename = 'contact_messages';
```

---

## 📞 Need Help?

- Email: nopianhadi2@gmail.com
- WhatsApp: 0895-4061-8407

---

## 📚 Dokumentasi Lengkap

- **RINGKASAN_PERBAIKAN_KEAMANAN.md** - Ringkasan lengkap
- **KEAMANAN_WEB.md** - Panduan detail
- **SECURITY.md** - Technical documentation
- **SECURITY_CHECKLIST.md** - Production checklist

---

**Done! Website Anda sekarang aman! 🎉🔒**
