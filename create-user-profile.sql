-- ============================================
-- CREATE USER PROFILE - HELPER SCRIPT
-- ============================================
-- Script untuk membuat user profile setelah user register di Supabase Auth
--
-- CARA MENGGUNAKAN:
-- 1. Buat user dulu di Supabase Dashboard → Authentication → Users
-- 2. Lihat list users untuk mendapatkan UUID
-- 3. Copy UUID user yang ingin dibuatkan profile
-- 4. Ganti 'USER-UUID-HERE' dibawah dengan UUID tersebut
-- 5. Jalankan script ini di SQL Editor

-- ============================================
-- STEP 1: Lihat semua users yang sudah terdaftar
-- ============================================
-- Jalankan query ini untuk melihat user yang sudah ada

SELECT 
  id,
  email,
  created_at,
  raw_user_meta_data->>'full_name' as full_name,
  email_confirmed_at IS NOT NULL as email_confirmed
FROM auth.users
ORDER BY created_at DESC;

-- ============================================
-- STEP 2: Check user mana yang belum punya profile
-- ============================================

SELECT 
  au.id,
  au.email,
  CASE 
    WHEN up.id IS NULL THEN '❌ Belum ada profile'
    ELSE '✅ Sudah ada profile'
  END as status
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
ORDER BY au.created_at DESC;

-- ============================================
-- STEP 3: Create profile untuk user tertentu
-- ============================================
-- 🔥 GANTI 'USER-UUID-HERE' DENGAN UUID ASLI! 🔥

INSERT INTO user_profiles (
  id, 
  name, 
  email, 
  phone, 
  location, 
  bio, 
  avatar, 
  website,
  github, 
  linkedin, 
  twitter, 
  instagram
) VALUES (
  'USER-UUID-HERE',  -- ⚠️ GANTI INI!
  'Nopian Hadi',
  'admin@example.com',  -- Sesuaikan dengan email user
  '+62 812-3456-7890',
  'Jakarta, Indonesia',
  'Full Stack Developer & UI/UX Designer dengan 5+ tahun pengalaman dalam membangun aplikasi web modern. Passionate about clean code, best practices, dan user experience yang exceptional. Spesialisasi dalam React, TypeScript, Node.js, dan PostgreSQL.',
  'https://i.pravatar.cc/150?img=12',
  'https://nopianhadi.com',
  'https://github.com/nopianhadi',
  'https://linkedin.com/in/nopianhadi',
  'https://twitter.com/nopianhadi',
  'https://instagram.com/nopianhadi'
);

-- ============================================
-- OPSI: Auto-create profile untuk SEMUA users
-- ============================================
-- Gunakan ini untuk otomatis create profile basic untuk semua user yang belum punya
-- Profile akan menggunakan data dari auth.users

INSERT INTO user_profiles (id, name, email, phone, location, bio, avatar)
SELECT 
  au.id,
  COALESCE(
    au.raw_user_meta_data->>'full_name', 
    SPLIT_PART(au.email, '@', 1)
  ) as name,
  au.email,
  '',
  '',
  'Portfolio user',
  'https://i.pravatar.cc/150?u=' || au.id
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
WHERE up.id IS NULL;

-- ============================================
-- STEP 4: Verifikasi profile berhasil dibuat
-- ============================================

SELECT 
  up.id,
  up.name,
  up.email,
  up.location,
  up.created_at
FROM user_profiles up
ORDER BY up.created_at DESC;

-- ============================================
-- CONTOH: Update profile yang sudah ada
-- ============================================
-- Jika ingin update profile existing

-- UPDATE user_profiles 
-- SET 
--   name = 'Nama Baru',
--   phone = '+62 812-3456-7890',
--   location = 'Jakarta, Indonesia',
--   bio = 'Bio baru...',
--   website = 'https://website.com'
-- WHERE id = 'USER-UUID-HERE';

-- ============================================
-- CONTOH: Delete profile
-- ============================================
-- Hati-hati! Profile akan terhapus permanent

-- DELETE FROM user_profiles WHERE id = 'USER-UUID-HERE';

-- ============================================
-- TIPS & CATATAN
-- ============================================
--
-- 1. User profile HARUS memiliki ID yang sama dengan auth.users
-- 2. Email di user_profiles HARUS sama dengan email di auth.users
-- 3. Jika user dihapus dari auth.users, profile akan otomatis terhapus (CASCADE)
-- 4. RLS Policy: User hanya bisa akses profile mereka sendiri
-- 5. Untuk aplikasi production, profile sebaiknya dibuat otomatis saat user register
--
-- ============================================
