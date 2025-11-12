-- ============================================
-- RESET DATABASE
-- ============================================
-- ⚠️ WARNING: Script ini akan MENGHAPUS semua data!
-- Gunakan hanya untuk development/testing
-- JANGAN jalankan di production tanpa backup!

-- ============================================
-- 1. DROP POLICIES
-- ============================================

DROP POLICY IF EXISTS "Public can view published projects" ON projects;
DROP POLICY IF EXISTS "Public can view published articles" ON articles;
DROP POLICY IF EXISTS "Public can view published testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can do everything on projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can do everything on articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can do everything on testimonials" ON testimonials;
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;

-- ============================================
-- 2. DROP TRIGGERS
-- ============================================

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;

-- ============================================
-- 3. DROP FUNCTION
-- ============================================

DROP FUNCTION IF EXISTS update_updated_at_column();

-- ============================================
-- 4. DROP INDEXES
-- ============================================

DROP INDEX IF EXISTS idx_projects_status;
DROP INDEX IF EXISTS idx_projects_category;
DROP INDEX IF EXISTS idx_projects_year;
DROP INDEX IF EXISTS idx_articles_status;
DROP INDEX IF EXISTS idx_articles_category;
DROP INDEX IF EXISTS idx_articles_date;
DROP INDEX IF EXISTS idx_articles_tags;
DROP INDEX IF EXISTS idx_testimonials_status;
DROP INDEX IF EXISTS idx_testimonials_rating;
DROP INDEX IF EXISTS idx_user_profiles_email;

-- ============================================
-- 5. DROP TABLES
-- ============================================

DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- ============================================
-- KONFIRMASI
-- ============================================

-- Cek tabel yang tersisa (harus kosong)
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
AND table_name IN ('projects', 'articles', 'testimonials', 'user_profiles');

-- ============================================
-- NEXT STEPS
-- ============================================
-- Setelah menjalankan script ini:
-- 1. Jalankan schema.sql untuk recreate tables
-- 2. Jalankan seed-data.sql untuk insert data
-- ============================================
