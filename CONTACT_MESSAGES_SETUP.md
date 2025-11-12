# Setup Contact Messages

Panduan untuk mengaktifkan fitur Contact Messages di admin dashboard.

## 📋 Langkah-langkah Setup

### 1. Buat Tabel di Supabase

1. Buka **Supabase Dashboard** → **SQL Editor**
2. Jalankan script `create-contact-messages-table.sql`
3. Pastikan tabel `contact_messages` berhasil dibuat

### 2. Verifikasi Setup

Jalankan query berikut di SQL Editor untuk memastikan setup berhasil:

```sql
-- Cek struktur tabel
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'contact_messages'
ORDER BY ordinal_position;

-- Cek RLS status
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'contact_messages';

-- Cek policies
SELECT policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'contact_messages';
```

### 3. Test Form Contact

1. Buka website Anda
2. Scroll ke section **"Mari Terhubung"**
3. Isi form dengan data test:
   - Nama: Test User
   - Email: test@example.com
   - Subjek: Web Development
   - Pesan: Ini adalah test message
4. Klik **"Kirim Pesan"**
5. Pastikan muncul notifikasi sukses

### 4. Akses Admin Dashboard

1. Login ke admin: `/admin/login`
2. Buka dashboard: `/admin/dashboard`
3. Klik card **"Pesan Kontak"** atau langsung ke `/admin/messages`
4. Anda akan melihat pesan yang baru dikirim

## 🎯 Fitur Contact Messages

### Di Form Contact (Public)
- ✅ Kirim pesan langsung ke database
- ✅ Validasi form
- ✅ Notifikasi sukses/error
- ✅ Auto-clear form setelah sukses

### Di Admin Dashboard
- ✅ Lihat semua pesan
- ✅ Filter berdasarkan status (Unread, Read, Replied, Archived)
- ✅ Statistik pesan (total, belum dibaca, dll)
- ✅ Badge notifikasi untuk pesan belum dibaca
- ✅ Detail pesan lengkap
- ✅ Update status pesan
- ✅ Balas via email (mailto link)
- ✅ Hapus pesan
- ✅ Auto-mark as Read saat dibuka

## 📊 Status Pesan

| Status | Deskripsi |
|--------|-----------|
| **Unread** | Pesan baru yang belum dibaca |
| **Read** | Pesan sudah dibaca tapi belum dibalas |
| **Replied** | Pesan sudah dibalas |
| **Archived** | Pesan yang diarsipkan |

## 🔒 Security (RLS Policies)

### Public Access
- ✅ **INSERT**: Siapa saja bisa kirim pesan (form contact)
- ❌ **SELECT**: Tidak bisa melihat pesan orang lain
- ❌ **UPDATE**: Tidak bisa update
- ❌ **DELETE**: Tidak bisa hapus

### Authenticated Users (Admin)
- ✅ **SELECT**: Bisa lihat semua pesan
- ✅ **UPDATE**: Bisa update status pesan
- ✅ **DELETE**: Bisa hapus pesan
- ❌ **INSERT**: Tidak perlu (admin tidak kirim pesan)

## 🎨 UI Features

### Dashboard Stats
- Total pesan
- Pesan belum dibaca (dengan highlight)
- Badge notifikasi di card management

### Messages Page
- Grid layout responsif
- Filter cepat berdasarkan status
- List pesan dengan preview
- Detail pesan di sidebar
- Quick actions (update status, reply, delete)
- Timestamp dengan format Indonesia

## 📧 Email Integration

Saat ini menggunakan `mailto:` link untuk balas pesan. Untuk integrasi email otomatis, Anda bisa tambahkan:

1. **EmailJS** - Gratis untuk 200 email/bulan
2. **SendGrid** - Gratis untuk 100 email/hari
3. **Resend** - Modern email API
4. **Nodemailer** - Jika punya SMTP server

## 🚀 Next Steps (Optional)

- [ ] Email notification saat ada pesan baru
- [ ] Export pesan ke CSV/Excel
- [ ] Search/filter pesan
- [ ] Bulk actions (mark multiple as read, delete, etc)
- [ ] Email templates untuk reply
- [ ] Auto-reply untuk pesan tertentu
- [ ] Analytics (response time, popular subjects, etc)

## 🐛 Troubleshooting

### Pesan tidak terkirim
1. Cek console browser untuk error
2. Pastikan tabel `contact_messages` sudah dibuat
3. Cek RLS policies sudah aktif
4. Verifikasi Supabase connection

### Tidak bisa lihat pesan di admin
1. Pastikan sudah login sebagai admin
2. Cek RLS policies untuk authenticated users
3. Verifikasi user sudah authenticated di Supabase

### Error saat update/delete
1. Cek policies untuk UPDATE dan DELETE
2. Pastikan user authenticated
3. Lihat error di console

## 📝 Database Schema

```sql
contact_messages (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'Unread',
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
```

## 🎉 Selesai!

Fitur Contact Messages sudah siap digunakan. Pesan dari form contact akan langsung masuk ke admin dashboard dan bisa dikelola dengan mudah.
