# Supabase Setup Guide

## Masalah: Data tidak muncul di homepage

Jika data sudah ada di dashboard admin tapi tidak muncul di homepage, kemungkinan penyebabnya:

### 1. Row Level Security (RLS) Policies

Supabase menggunakan RLS untuk keamanan. Anda perlu mengaktifkan policy untuk public read access.

**Langkah-langkah:**

1. Buka Supabase Dashboard: https://supabase.com/dashboard
2. Pilih project Anda
3. Klik **Authentication** > **Policies**
4. Untuk setiap table (projects, testimonials, articles), tambahkan policy:

#### Policy untuk table `projects`:
```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy untuk read public (Published projects)
CREATE POLICY "Public can view published projects"
ON projects FOR SELECT
USING (status = 'Published');

-- Policy untuk authenticated users (admin)
CREATE POLICY "Authenticated users can do everything"
ON projects FOR ALL
USING (auth.role() = 'authenticated');
```

#### Policy untuk table `testimonials`:
```sql
-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Policy untuk read public (Published testimonials)
CREATE POLICY "Public can view published testimonials"
ON testimonials FOR SELECT
USING (status = 'Published');

-- Policy untuk authenticated users (admin)
CREATE POLICY "Authenticated users can do everything"
ON testimonials FOR ALL
USING (auth.role() = 'authenticated');
```

#### Policy untuk table `articles`:
```sql
-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policy untuk read public (Published articles)
CREATE POLICY "Public can view published articles"
ON articles FOR SELECT
USING (status = 'Published');

-- Policy untuk authenticated users (admin)
CREATE POLICY "Authenticated users can do everything"
ON articles FOR ALL
USING (auth.role() = 'authenticated');
```

### 2. Cek Status Data

Pastikan data yang Anda buat di admin dashboard memiliki status **"Published"**, bukan "Draft" atau "Pending".

### 3. Cek Environment Variables

Pastikan file `.env` memiliki credentials yang benar:

```env
VITE_SUPABASE_URL=https://qjggkcizqcuaxgjwwpiz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Test Koneksi

Buka browser console (F12) di http://localhost:3000 dan lihat output test koneksi.

Jika ada error seperti:
- `"new row violates row-level security policy"` → RLS policy belum diset
- `"relation does not exist"` → Table belum dibuat
- `"permission denied"` → Policy tidak benar

### 5. Quick Fix: Disable RLS (Tidak Recommended untuk Production)

Jika ingin test cepat, Anda bisa disable RLS sementara:

```sql
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE articles DISABLE ROW LEVEL SECURITY;
```

**⚠️ WARNING:** Ini membuat semua data public dan bisa diedit siapa saja. Hanya untuk testing!

### 6. Cara Mengecek di Supabase Dashboard

1. Buka **Table Editor**
2. Pilih table (projects/testimonials/articles)
3. Lihat apakah ada data
4. Cek kolom `status` - harus "Published"
5. Klik icon shield (🛡️) untuk melihat RLS policies

## Troubleshooting

### Data tidak muncul setelah RLS diaktifkan:

1. Cek browser console untuk error messages
2. Pastikan status = 'Published' (case sensitive!)
3. Refresh halaman dengan Ctrl+Shift+R (hard refresh)
4. Cek Network tab di browser DevTools untuk melihat response dari Supabase

### Masih tidak bisa?

Jalankan query ini di SQL Editor Supabase:

```sql
-- Cek apakah ada data published
SELECT COUNT(*) FROM projects WHERE status = 'Published';
SELECT COUNT(*) FROM testimonials WHERE status = 'Published';
SELECT COUNT(*) FROM articles WHERE status = 'Published';

-- Lihat semua policies
SELECT * FROM pg_policies WHERE tablename IN ('projects', 'testimonials', 'articles');
```
