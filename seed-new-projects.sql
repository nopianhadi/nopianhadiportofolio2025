-- Seed data untuk 6 project baru
-- Jalankan query ini di Supabase SQL Editor

-- 1. Weddfin — Wedding Financial Planner
INSERT INTO "public"."projects" (
  "title", "client", "year", "category", "hero_image", 
  "overview", "challenge", "solution", "results", "technologies", 
  "duration", "role", "images", "video", "live_demo", "source_code", 
  "status", "testimonial_quote", "testimonial_author", "testimonial_position"
) VALUES (
  'Weddfin – Wedding Financial Planner',
  'Internal Project (Wedding Market)',
  '2025',
  'Web Application',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
  'Platform web untuk membantu calon pengantin mengatur keuangan pernikahan secara terencana dan transparan.',
  'Banyak pasangan kesulitan mengatur anggaran dan membandingkan vendor dalam satu tempat.',
  'Dibangun dengan pendekatan minimalis dan UX yang mudah digunakan, serta integrasi dengan sistem vendor Wedding Market.',
  ARRAY[
    '500+ pasangan mendaftar dalam 2 bulan pertama',
    '70% pengguna melanjutkan ke perencanaan vendor',
    'Rating kepuasan pengguna 4.8/5'
  ],
  ARRAY['React', 'Tailwind CSS', 'Netlify', 'Firebase'],
  '3 bulan',
  'Frontend Developer & UI Designer',
  ARRAY[
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800'
  ],
  NULL,
  'https://weddfin.netlify.app/',
  NULL,
  'Published',
  NULL,
  NULL,
  NULL
);

-- 2. StartupDesaa — Platform Startup Digital untuk Desa
INSERT INTO "public"."projects" (
  "title", "client", "year", "category", "hero_image", 
  "overview", "challenge", "solution", "results", "technologies", 
  "duration", "role", "images", "video", "live_demo", "source_code", 
  "status", "testimonial_quote", "testimonial_author", "testimonial_position"
) VALUES (
  'StartupDesaa – Digitalisasi Ekonomi Desa',
  'Program Desa Digital',
  '2025',
  'Web Portal',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
  'Website edukatif dan showcase untuk membantu desa mengembangkan potensi lokal melalui inovasi digital.',
  'Kurangnya platform yang menampilkan inovasi dan startup dari desa di seluruh Indonesia.',
  'Membangun website dengan CMS ringan dan desain modern agar mudah diperbarui oleh admin desa.',
  ARRAY[
    '25 desa terdaftar di bulan pertama',
    'Mendapat perhatian dari komunitas Startup Lokal',
    'Diadopsi sebagai model proyek percontohan'
  ],
  ARRAY['React', 'Vite', 'Tailwind', 'Netlify CMS'],
  '4 bulan',
  'Fullstack Developer',
  ARRAY[
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800'
  ],
  NULL,
  'https://startupdesaa.netlify.app/',
  NULL,
  'Published',
  NULL,
  NULL,
  NULL
);

-- 3. Amigdala Foundation — Platform Sosial & Edukasi
INSERT INTO "public"."projects" (
  "title", "client", "year", "category", "hero_image", 
  "overview", "challenge", "solution", "results", "technologies", 
  "duration", "role", "images", "video", "live_demo", "source_code", 
  "status", "testimonial_quote", "testimonial_author", "testimonial_position"
) VALUES (
  'Amigdala Foundation',
  'Yayasan Amigdala',
  '2024',
  'Nonprofit Website',
  'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800',
  'Website resmi yayasan yang bergerak di bidang pendidikan dan pemberdayaan masyarakat.',
  'Membuat tampilan profesional namun tetap humanis untuk menarik relawan dan donatur.',
  'Mendesain layout yang bersih dengan tone lembut, serta navigasi intuitif.',
  ARRAY[
    '100+ relawan terdaftar',
    '20+ program sosial terdokumentasi',
    'Mendapat pengakuan sebagai yayasan inspiratif'
  ],
  ARRAY['React', 'Tailwind', 'Netlify', 'Formspree'],
  '2 bulan',
  'Web Developer & Designer',
  ARRAY[
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800'
  ],
  NULL,
  'https://amigdalafoundation.netlify.app/',
  NULL,
  'Published',
  NULL,
  NULL,
  NULL
);

-- 4. Hadior — Personal Branding & Portfolio
INSERT INTO "public"."projects" (
  "title", "client", "year", "category", "hero_image", 
  "overview", "challenge", "solution", "results", "technologies", 
  "duration", "role", "images", "video", "live_demo", "source_code", 
  "status", "testimonial_quote", "testimonial_author", "testimonial_position"
) VALUES (
  'Hadior – Personal Branding Website',
  'Hadi',
  '2025',
  'Portfolio Website',
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
  'Website pribadi untuk menampilkan portofolio digital, proyek, dan profil profesional Hadi.',
  'Membuat desain minimalis namun kuat untuk identitas digital pribadi.',
  'Menerapkan konsep "clean layout" dengan animasi lembut dan CTA yang jelas.',
  ARRAY[
    'Meningkatkan engagement LinkedIn hingga 40%',
    '10+ tawaran proyek baru',
    'Desain diapresiasi oleh komunitas web dev lokal'
  ],
  ARRAY['React', 'Tailwind', 'Framer Motion', 'Netlify'],
  '2 bulan',
  'Frontend Developer & Copywriter',
  ARRAY[
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800'
  ],
  NULL,
  'https://hadior.netlify.app/',
  NULL,
  'Published',
  NULL,
  NULL,
  NULL
);

-- 5. Perumahan Sari Dona — Website Properti
INSERT INTO "public"."projects" (
  "title", "client", "year", "category", "hero_image", 
  "overview", "challenge", "solution", "results", "technologies", 
  "duration", "role", "images", "video", "live_demo", "source_code", 
  "status", "testimonial_quote", "testimonial_author", "testimonial_position"
) VALUES (
  'Perumahan Sari Dona – Site Showcase',
  'Sari Dona Property',
  '2025',
  'Company Profile',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
  'Website resmi untuk memperkenalkan unit hunian dan lokasi strategis Perumahan Sari Dona.',
  'Menampilkan katalog rumah yang menarik dengan kecepatan loading cepat.',
  'Menggunakan desain modern dengan grid layout dan optimasi gambar untuk performa tinggi.',
  ARRAY[
    '300+ kunjungan organik per bulan',
    'Peningkatan 50% minat pembelian via form online',
    'Desain mendapat umpan balik positif dari agen properti'
  ],
  ARRAY['React', 'Tailwind', 'Netlify', 'Google Maps API'],
  '1,5 bulan',
  'Web Designer & Developer',
  ARRAY[
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
  ],
  NULL,
  'https://perumahansaridona.netlify.app/',
  NULL,
  'Published',
  NULL,
  NULL,
  NULL
);

-- 6. Moza Group Indonesia — Corporate Profile
INSERT INTO "public"."projects" (
  "title", "client", "year", "category", "hero_image", 
  "overview", "challenge", "solution", "results", "technologies", 
  "duration", "role", "images", "video", "live_demo", "source_code", 
  "status", "testimonial_quote", "testimonial_author", "testimonial_position"
) VALUES (
  'Moza Group Indonesia',
  'Moza Group',
  '2025',
  'Company Website',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  'Website resmi Moza Group yang menampilkan layanan perusahaan di bidang kontraktor, properti, dan teknologi.',
  'Menampilkan banyak lini bisnis dalam satu tampilan yang tetap profesional dan responsif.',
  'Membangun struktur modular dan visual yang elegan untuk menonjolkan portofolio bisnis.',
  ARRAY[
    '5 divisi perusahaan berhasil diintegrasikan ke satu platform',
    'Waktu loading <2 detik',
    'Mendapat umpan balik positif dari manajemen'
  ],
  ARRAY['React', 'Tailwind', 'Framer Motion', 'Netlify'],
  '3 bulan',
  'Fullstack Developer',
  ARRAY[
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
  ],
  NULL,
  'https://mozagroupindonesia.netlify.app/',
  NULL,
  'Published',
  NULL,
  NULL,
  NULL
);

-- Verifikasi data yang baru ditambahkan
SELECT 
  title,
  client,
  year,
  category,
  duration,
  role,
  array_length(results, 1) as results_count,
  array_length(technologies, 1) as tech_count,
  status
FROM projects
WHERE year = '2025' OR (year = '2024' AND client = 'Yayasan Amigdala')
ORDER BY created_at DESC;
