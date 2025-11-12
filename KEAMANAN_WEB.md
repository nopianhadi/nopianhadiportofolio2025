# 🔒 Panduan Keamanan Web Portfolio

## Ringkasan Perbaikan Keamanan

Saya telah memperbaiki keamanan website portfolio Anda dengan menambahkan berbagai fitur keamanan penting. Berikut adalah ringkasan lengkapnya:

---

## 🛡️ Fitur Keamanan yang Ditambahkan

### 1. **Keamanan Login Admin**

#### ✅ Rate Limiting
- Maksimal 5 percobaan login gagal
- Lockout otomatis selama 5 menit setelah 5 kali gagal
- Counter percobaan tersisa ditampilkan
- Timer countdown saat lockout

#### ✅ Validasi Input
- Format email divalidasi
- Input tidak boleh kosong
- Trim whitespace otomatis

#### ✅ Error Messages
- Pesan error generic (tidak expose detail sistem)
- Tidak memberitahu apakah email atau password yang salah
- Mencegah username enumeration attack

#### ✅ Session Management
- Auto-redirect jika sudah login
- Session timeout warning (5 menit sebelum expire)
- Auto-logout saat session expired
- Refresh session capability

#### ✅ Logout Functionality
- Tombol logout dengan konfirmasi
- Clear session secara aman
- Redirect ke login page

---

### 2. **Keamanan Form Kontak**

#### ✅ Input Validation & Sanitization
- Email format validation
- Name validation (hanya huruf, spasi, tanda hubung, apostrof)
- Input length limiting:
  - Nama: max 100 karakter
  - Email: max 100 karakter
  - Pesan: max 2000 karakter
- Trim whitespace otomatis
- Lowercase email otomatis

#### ✅ Spam Protection
- Deteksi URL dalam pesan
- Deteksi script tags
- Deteksi event handlers (onclick, onerror, dll)
- Deteksi JavaScript injection

#### ✅ Rate Limiting
- Cooldown 1 menit antar submission
- Timestamp disimpan di localStorage
- Mencegah spam submission

---

### 3. **Database Security (Supabase RLS)**

#### ✅ Row Level Security (RLS)
- RLS aktif di semua tabel
- Policies granular (SELECT, INSERT, UPDATE, DELETE terpisah)

#### ✅ Public Access
- Hanya bisa lihat data dengan status "Published"
- Tidak bisa edit/delete data

#### ✅ Authenticated Access (Admin)
- Bisa view semua data (Published & Draft)
- Bisa insert, update, delete semua data
- Full CRUD access

#### ✅ Contact Messages
- Public bisa insert (kirim pesan)
- Admin bisa view, update, delete
- Status tracking (Unread/Read)

#### ✅ Audit & Rate Limit Tables
- Audit log untuk tracking aktivitas admin
- Rate limit log untuk monitoring

---

### 4. **Environment Variables Security**

#### ✅ File Structure
```
.env.example       → Template (di-commit)
.env.local         → Development (TIDAK di-commit)
.env               → Dihapus dari git (sudah di .gitignore)
```

#### ✅ Validation
- Check kredensial saat startup
- Validate URL format
- Error jika kredensial tidak ada

#### ✅ Secure Auth Flow
- PKCE flow (lebih secure)
- Auto refresh token
- Persist session di localStorage

---

### 5. **Security Utilities**

File baru: `src/utils/security.ts`

#### ✅ Functions Available:
- `sanitizeString()` - Sanitasi input
- `isValidEmail()` - Validasi email
- `isValidName()` - Validasi nama
- `hasSpamPatterns()` - Deteksi spam
- `checkRateLimit()` - Rate limiting
- `validatePasswordStrength()` - Validasi password
- `escapeHtml()` - Escape HTML
- `isValidUrl()` - Validasi URL
- `generateSecureToken()` - Generate token
- `hashString()` - Hash dengan SHA-256

---

### 6. **Security Headers**

#### ✅ Headers Ditambahkan:
- `X-Frame-Options: DENY` - Prevent clickjacking
- `X-Content-Type-Options: nosniff` - Prevent MIME sniffing
- `X-XSS-Protection: 1; mode=block` - XSS protection
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` - Kontrol resource loading
- `Strict-Transport-Security` - Force HTTPS

---

## 📁 File Baru yang Dibuat

1. **src/components/admin/LogoutButton.tsx**
   - Tombol logout dengan konfirmasi
   - Loading state
   - Error handling

2. **src/components/admin/SessionTimeout.tsx**
   - Warning sebelum session expire
   - Countdown timer
   - Extend session capability

3. **src/utils/security.ts**
   - Utility functions untuk keamanan
   - Reusable di seluruh aplikasi

4. **SECURITY.md**
   - Dokumentasi lengkap keamanan
   - Best practices
   - Checklist deployment

5. **SECURITY_CHECKLIST.md**
   - Checklist detail untuk production
   - Regular security tasks
   - Incident response plan

6. **KEAMANAN_WEB.md** (file ini)
   - Panduan dalam Bahasa Indonesia
   - Ringkasan perbaikan

7. **.env.example**
   - Template environment variables
   - Untuk developer baru

8. **public/_headers**
   - Security headers untuk hosting
   - Netlify/Vercel compatible

---

## 🚀 Cara Setup

### 1. Environment Variables

```bash
# Copy template
cp .env.example .env.local

# Edit .env.local dengan kredensial Supabase Anda
# JANGAN commit file .env.local!
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase RLS

1. Buka Supabase Dashboard
2. Pergi ke SQL Editor
3. Copy-paste isi file `supabase-policies.sql`
4. Jalankan query

### 4. Buat Admin User

1. Buka Supabase Dashboard
2. Pergi ke Authentication > Users
3. Klik "Add User"
4. Masukkan email & password
5. Confirm email (jika email verification aktif)

### 5. Test Keamanan

```bash
# Development
npm run dev

# Test login dengan kredensial salah (5x)
# Test contact form spam detection
# Test rate limiting
```

---

## ⚠️ PENTING: Sebelum Deploy

### Checklist Pre-Deployment

- [ ] Hapus file `.env` dari repository
- [ ] Pastikan `.env.local` tidak ter-commit
- [ ] Set environment variables di hosting platform
- [ ] Jalankan `npm audit` dan fix vulnerabilities
- [ ] Test semua fitur keamanan
- [ ] Verify RLS policies aktif di Supabase
- [ ] Enable HTTPS di production
- [ ] Test login dari production URL

### Environment Variables di Hosting

**Netlify:**
```
Site settings > Build & deploy > Environment > Environment variables
```

**Vercel:**
```
Project Settings > Environment Variables
```

**Variables yang perlu di-set:**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🔍 Testing Keamanan

### Test Login Rate Limiting

1. Buka `/admin/login`
2. Masukkan email/password salah 5x
3. Harus muncul lockout 5 menit
4. Tunggu atau refresh page

### Test Contact Form

1. Buka halaman contact
2. Coba kirim pesan dengan URL → Harus ditolak
3. Coba kirim 2x dalam 1 menit → Kedua harus ditolak
4. Tunggu 1 menit, coba lagi → Harus berhasil

### Test Session Timeout

1. Login ke admin panel
2. Tunggu ~55 menit (atau ubah timer di code untuk testing)
3. Harus muncul warning 5 menit sebelum expire
4. Bisa extend session atau logout

### Test RLS Policies

1. Logout dari admin
2. Buka browser console
3. Coba query data Draft:
```javascript
const { data } = await supabase
  .from('projects')
  .select('*')
  .eq('status', 'Draft');
console.log(data); // Harus kosong atau error
```

---

## 🛠️ Troubleshooting

### Login Tidak Berfungsi

1. Check environment variables di `.env.local`
2. Verify Supabase URL & Anon Key benar
3. Check RLS policies aktif
4. Check user sudah dibuat di Supabase Auth

### Contact Form Tidak Kirim

1. Check RLS policy untuk `contact_messages`
2. Verify table `contact_messages` ada
3. Check browser console untuk error
4. Verify Supabase connection

### Session Timeout Tidak Muncul

1. Check apakah `SessionTimeout` component di-import
2. Verify session expiry time di Supabase settings
3. Check browser console untuk error

---

## 📊 Monitoring

### Hal yang Perlu Dimonitor

1. **Failed Login Attempts**
   - Check di Supabase logs
   - Alert jika > 10 per jam

2. **Contact Form Submissions**
   - Check spam patterns
   - Review pesan mencurigakan

3. **Session Activity**
   - Monitor active sessions
   - Check unusual activity

4. **Error Logs**
   - Review error logs regular
   - Fix recurring errors

---

## 🔄 Maintenance

### Harian
- Check failed login attempts
- Review contact messages
- Monitor error logs

### Mingguan
- Review audit logs
- Check rate limit logs
- Update dependencies jika ada security patch

### Bulanan
- Run `npm audit`
- Update dependencies
- Review & update passwords
- Test backup restoration

---

## 📞 Support

Jika ada pertanyaan atau menemukan bug keamanan:

- **Email**: nopianhadi2@gmail.com
- **WhatsApp**: 0895-4061-8407

---

## 📚 Resources

- [Supabase Security Docs](https://supabase.com/docs/guides/auth/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Checklist](https://github.com/virajkulkarni14/WebDeveloperSecurityChecklist)

---

**Dibuat**: 2024-01-XX  
**Terakhir Update**: 2024-01-XX  
**Versi**: 1.0.0

---

## ✨ Summary

Website portfolio Anda sekarang memiliki:

✅ Login yang aman dengan rate limiting  
✅ Form kontak dengan spam protection  
✅ Database security dengan RLS  
✅ Session management yang proper  
✅ Input validation & sanitization  
✅ Security headers  
✅ Audit logging capability  
✅ Dokumentasi lengkap  

**Website Anda sekarang jauh lebih aman! 🎉**
