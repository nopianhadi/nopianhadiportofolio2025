-- ============================================
-- SUPABASE RLS POLICIES SETUP
-- Jalankan script ini di Supabase SQL Editor
-- ============================================

-- 1. PROJECTS TABLE
-- ============================================

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public can view published projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can view all projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;

-- Policy untuk public read (hanya Published projects)
CREATE POLICY "Public can view published projects"
ON projects FOR SELECT
TO public
USING (status = 'Published');

-- Separate policies untuk authenticated users (lebih granular)
CREATE POLICY "Authenticated users can view all projects"
ON projects FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert projects"
ON projects FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
ON projects FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
ON projects FOR DELETE
TO authenticated
USING (true);


-- 2. TESTIMONIALS TABLE
-- ============================================

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public can view published testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can view all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON testimonials;

-- Policy untuk public read (hanya Published testimonials)
CREATE POLICY "Public can view published testimonials"
ON testimonials FOR SELECT
TO public
USING (status = 'Published');

-- Separate policies untuk authenticated users
CREATE POLICY "Authenticated users can view all testimonials"
ON testimonials FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert testimonials"
ON testimonials FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
ON testimonials FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
ON testimonials FOR DELETE
TO authenticated
USING (true);


-- 3. ARTICLES TABLE
-- ============================================

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public can view published articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can view all articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON articles;

-- Policy untuk public read (hanya Published articles)
CREATE POLICY "Public can view published articles"
ON articles FOR SELECT
TO public
USING (status = 'Published');

-- Separate policies untuk authenticated users
CREATE POLICY "Authenticated users can view all articles"
ON articles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert articles"
ON articles FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
ON articles FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete articles"
ON articles FOR DELETE
TO authenticated
USING (true);


-- ============================================
-- VERIFICATION QUERIES
-- Jalankan untuk memastikan policies sudah aktif
-- ============================================

-- Cek RLS status
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename IN ('projects', 'testimonials', 'articles');

-- Cek policies yang aktif
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename IN ('projects', 'testimonials', 'articles')
ORDER BY tablename, policyname;

-- Cek jumlah data Published
SELECT 'projects' as table_name, COUNT(*) as total, 
       SUM(CASE WHEN status = 'Published' THEN 1 ELSE 0 END) as published
FROM projects
UNION ALL
SELECT 'testimonials', COUNT(*), 
       SUM(CASE WHEN status = 'Published' THEN 1 ELSE 0 END)
FROM testimonials
UNION ALL
SELECT 'articles', COUNT(*), 
       SUM(CASE WHEN status = 'Published' THEN 1 ELSE 0 END)
FROM articles;


-- ============================================
-- QUICK FIX: Disable RLS (HANYA UNTUK TESTING!)
-- ⚠️ WARNING: Jangan gunakan di production!
-- ============================================

-- Uncomment baris di bawah jika ingin disable RLS untuk testing
-- ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE articles DISABLE ROW LEVEL SECURITY;


-- ============================================
-- 4. CONTACT MESSAGES TABLE
-- ============================================

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can view all messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can delete messages" ON contact_messages;

-- Policy untuk public insert (siapa saja bisa kirim pesan)
CREATE POLICY "Anyone can insert contact messages"
ON contact_messages FOR INSERT
TO public
WITH CHECK (true);

-- Policy untuk authenticated users (admin bisa lihat, update, delete)
CREATE POLICY "Authenticated users can view all messages"
ON contact_messages FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update messages"
ON contact_messages FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete messages"
ON contact_messages FOR DELETE
TO authenticated
USING (true);


-- ============================================
-- 5. SECURITY ENHANCEMENTS
-- ============================================

-- Add rate limiting function (requires pg_cron extension)
-- This is a basic example, adjust based on your needs

-- Create a function to check rate limiting
CREATE OR REPLACE FUNCTION check_rate_limit(
  user_identifier TEXT,
  action_type TEXT,
  max_attempts INTEGER,
  time_window INTERVAL
)
RETURNS BOOLEAN AS $$
DECLARE
  attempt_count INTEGER;
BEGIN
  -- Count attempts in the time window
  SELECT COUNT(*) INTO attempt_count
  FROM rate_limit_log
  WHERE identifier = user_identifier
    AND action = action_type
    AND created_at > NOW() - time_window;
  
  -- Return true if under limit
  RETURN attempt_count < max_attempts;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create rate limit log table (optional, for tracking)
CREATE TABLE IF NOT EXISTS rate_limit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_rate_limit_log_lookup 
ON rate_limit_log(identifier, action, created_at);

-- Enable RLS on rate_limit_log
ALTER TABLE rate_limit_log ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view rate limit logs
CREATE POLICY "Authenticated users can view rate limit logs"
ON rate_limit_log FOR SELECT
TO authenticated
USING (true);


-- ============================================
-- 6. AUDIT LOG TABLE (Optional but recommended)
-- ============================================

CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id TEXT,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view audit logs
CREATE POLICY "Authenticated users can view audit logs"
ON audit_log FOR SELECT
TO authenticated
USING (true);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_log_table_name ON audit_log(table_name);
