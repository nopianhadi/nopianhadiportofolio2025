# 🚀 Quick Start - User Profile Setup

## Step-by-Step: Membuat User Profile

### 1️⃣ Buat User di Supabase

1. Buka **Supabase Dashboard** → **Authentication** → **Users**
2. Klik **"Add user"** → **"Create new user"**
3. Isi form:
   ```
   Email: admin@example.com
   Password: (buat password kuat)
   ✅ Auto Confirm User (centang ini!)
   ```
4. Klik **"Create user"**
5. **PENTING**: Copy **UUID user** yang baru dibuat (ada di kolom ID)

### 2️⃣ Lihat UUID User yang Sudah Dibuat

Di **SQL Editor**, jalankan query ini:

```sql
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC;
```

Copy **ID (UUID)** user yang ingin dibuatkan profile.

### 3️⃣ Buat User Profile

Buka file `create-user-profile.sql`, lalu:

1. **Copy query ini** ke SQL Editor:

```sql
INSERT INTO user_profiles (
  id, name, email, phone, location, bio, avatar, website,
  github, linkedin, twitter, instagram
) VALUES (
  'PASTE-UUID-USER-DISINI',  -- 👈 Ganti dengan UUID dari step 2
  'Nopian Hadi',
  'admin@example.com',       -- 👈 Sesuaikan dengan email user
  '+62 812-3456-7890',
  'Jakarta, Indonesia',
  'Full Stack Developer & UI/UX Designer',
  'https://i.pravatar.cc/150?img=12',
  'https://nopianhadi.com',
  'https://github.com/nopianhadi',
  'https://linkedin.com/in/nopianhadi',
  'https://twitter.com/nopianhadi',
  'https://instagram.com/nopianhadi'
);
```

2. **Ganti** `'PASTE-UUID-USER-DISINI'` dengan UUID asli
3. **Ganti** email sesuai dengan user yang dibuat
4. Klik **"Run"**

### 4️⃣ Verifikasi Profile Berhasil

Jalankan query ini:

```sql
SELECT COUNT(*) FROM user_profiles;
```

Harusnya return `1` (atau lebih jika ada multiple users).

### 5️⃣ Test Login & Settings

1. Buka aplikasi: `http://localhost:5173/admin/login`
2. Login dengan email & password yang dibuat di step 1
3. Setelah login, buka **Settings/Pengaturan**
4. Data profile harus tampil dan bisa diedit

---

## 🔥 Quick Commands

### Auto-create profile untuk SEMUA users

```sql
INSERT INTO user_profiles (id, name, email, avatar)
SELECT 
  au.id,
  SPLIT_PART(au.email, '@', 1) as name,
  au.email,
  'https://i.pravatar.cc/150?u=' || au.id
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
WHERE up.id IS NULL;
```

### Lihat users tanpa profile

```sql
SELECT au.id, au.email, '❌ No profile' as status
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
WHERE up.id IS NULL;
```

### Update profile

```sql
UPDATE user_profiles 
SET 
  name = 'Nama Baru',
  bio = 'Bio baru',
  phone = '+62 812-xxx'
WHERE email = 'admin@example.com';
```

---

## ⚠️ Common Issues

### Error: "violates foreign key constraint"
**Problem**: UUID tidak ada di auth.users  
**Solution**: Buat user dulu di Authentication → Users

### Error: "duplicate key value"
**Problem**: Profile untuk user ini sudah ada  
**Solution**: Update instead of insert, atau delete profile lama dulu

### Profile tidak muncul di Settings
**Problem**: User belum login atau session expired  
**Solution**: Logout → Login ulang, clear browser cache

---

## 📝 File Reference

- `schema.sql` → Database structure (jalankan pertama)
- `seed-data.sql` → Sample data projects/articles/testimonials
- `create-user-profile.sql` → Helper untuk create user profile (ini file!)
- `example-queries.sql` → Query examples untuk testing
- `reset-database.sql` → Reset/cleanup database (HATI-HATI!)

---

**Happy Coding! 🎉**
