-- ============================================
-- SUPABASE STORAGE BUCKET SETUP
-- Jalankan script ini di Supabase SQL Editor
-- ============================================

-- 1. CREATE BUCKET untuk public files
INSERT INTO storage.buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- 2. CREATE POLICY untuk public bucket
-- Policy untuk public read (siapa saja bisa lihat)
CREATE POLICY "Public files are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'public');

-- Policy untuk authenticated users upload (admin bisa upload)
CREATE POLICY "Authenticated users can upload public files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'public');

-- Policy untuk authenticated users update (admin bisa update)
CREATE POLICY "Authenticated users can update public files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'public');

-- Policy untuk authenticated users delete (admin bisa delete)
CREATE POLICY "Authenticated users can delete public files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'public');

-- ============================================
-- VERIFICATION
-- ============================================

-- Cek bucket yang sudah dibuat
SELECT * FROM storage.buckets WHERE id = 'public';

-- Cek policies untuk bucket public
SELECT * FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects';

-- ============================================
-- ALTERNATIVE: Setup via Supabase Dashboard
-- ============================================
-- Jika lebih mudah, Anda bisa setup via Dashboard:
-- 1. Buka Supabase Dashboard → Storage
-- 2. Klik "New bucket"
-- 3. Nama: public
-- 4. Public bucket: ON (centang)
-- 5. Klik "Create bucket"
-- 6. Policies akan otomatis dibuat
