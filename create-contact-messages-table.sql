-- ============================================
-- CONTACT MESSAGES TABLE SETUP
-- Jalankan script ini di Supabase SQL Editor
-- ============================================

-- 1. CREATE TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'Unread' CHECK (status IN ('Unread', 'Read', 'Replied', 'Archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. CREATE INDEX untuk performa
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- 3. ENABLE RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 4. DROP existing policies if any
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can view all contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can delete contact messages" ON contact_messages;

-- 5. CREATE POLICIES

-- Policy untuk public insert (siapa saja bisa kirim pesan)
CREATE POLICY "Anyone can insert contact messages"
ON contact_messages FOR INSERT
TO public
WITH CHECK (true);

-- Policy untuk authenticated users read (admin bisa lihat semua)
CREATE POLICY "Authenticated users can view all contact messages"
ON contact_messages FOR SELECT
TO authenticated
USING (true);

-- Policy untuk authenticated users update (admin bisa update status)
CREATE POLICY "Authenticated users can update contact messages"
ON contact_messages FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy untuk authenticated users delete (admin bisa hapus)
CREATE POLICY "Authenticated users can delete contact messages"
ON contact_messages FOR DELETE
TO authenticated
USING (true);

-- 6. CREATE FUNCTION untuk auto-update updated_at
CREATE OR REPLACE FUNCTION update_contact_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. CREATE TRIGGER
DROP TRIGGER IF EXISTS update_contact_messages_updated_at_trigger ON contact_messages;
CREATE TRIGGER update_contact_messages_updated_at_trigger
    BEFORE UPDATE ON contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_contact_messages_updated_at();

-- ============================================
-- VERIFICATION
-- ============================================

-- Cek table structure
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
