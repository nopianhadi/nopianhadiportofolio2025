-- ============================================
-- PORTFOLIO DATABASE SCHEMA
-- ============================================
-- Database untuk aplikasi portfolio dengan management project, artikel, dan testimoni
-- Platform: Supabase (PostgreSQL)

-- ============================================
-- 1. PROJECTS TABLE
-- ============================================
-- Menyimpan data project portfolio
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  client VARCHAR(255) NOT NULL,
  year VARCHAR(4) NOT NULL,
  category VARCHAR(100) NOT NULL,
  hero_image TEXT NOT NULL,
  overview TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  results TEXT[] NOT NULL DEFAULT '{}',
  technologies TEXT[] NOT NULL DEFAULT '{}',
  duration VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  images TEXT[] DEFAULT '{}',
  video TEXT,
  live_demo TEXT,
  source_code TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'Draft' CHECK (status IN ('Published', 'Draft')),
  testimonial_quote TEXT,
  testimonial_author VARCHAR(255),
  testimonial_position VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);

-- ============================================
-- 2. ARTICLES TABLE
-- ============================================
-- Menyimpan data artikel/blog
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Draft' CHECK (status IN ('Published', 'Draft')),
  date DATE NOT NULL,
  image TEXT NOT NULL,
  author VARCHAR(255) NOT NULL DEFAULT 'Nopian Hadi',
  author_bio TEXT,
  author_avatar TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  read_time VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_tags ON articles USING GIN(tags);

-- ============================================
-- 3. TESTIMONIALS TABLE
-- ============================================
-- Menyimpan data testimoni dari klien
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  image TEXT NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Published', 'Pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating DESC);

-- ============================================
-- 4. USER PROFILES TABLE
-- ============================================
-- Menyimpan data profil user/admin
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  location VARCHAR(255),
  bio TEXT,
  avatar TEXT,
  website TEXT,
  github TEXT,
  linkedin TEXT,
  twitter TEXT,
  instagram TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- ============================================
-- 5. TRIGGER FUNCTIONS
-- ============================================
-- Fungsi untuk auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger ke semua tabel
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
-- Enable RLS untuk semua tabel
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy untuk public read access (hanya data Published)
CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT
  USING (status = 'Published');

CREATE POLICY "Public can view published articles"
  ON articles FOR SELECT
  USING (status = 'Published');

CREATE POLICY "Public can view published testimonials"
  ON testimonials FOR SELECT
  USING (status = 'Published');

-- Policy untuk authenticated users (admin) - full access
CREATE POLICY "Authenticated users can do everything on projects"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on articles"
  ON articles FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy untuk user_profiles - users can only access their own profile
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- 7. COMMENTS
-- ============================================
COMMENT ON TABLE projects IS 'Tabel untuk menyimpan data project portfolio';
COMMENT ON TABLE articles IS 'Tabel untuk menyimpan data artikel/blog';
COMMENT ON TABLE testimonials IS 'Tabel untuk menyimpan data testimoni klien';
COMMENT ON TABLE user_profiles IS 'Tabel untuk menyimpan data profil user/admin';
