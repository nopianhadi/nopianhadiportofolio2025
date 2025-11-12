-- ============================================
-- PORTFOLIO DATABASE SEED DATA
-- ============================================
-- Data contoh untuk testing dan development
-- Jalankan setelah schema.sql

-- ============================================
-- 1. SEED DATA - PROJECTS
-- ============================================

INSERT INTO projects (
  title, client, year, category, hero_image, overview, challenge, solution,
  results, technologies, duration, role, images, video, live_demo, source_code,
  status, testimonial_quote, testimonial_author, testimonial_position
) VALUES 
(
  'E-Commerce Platform Redesign',
  'TechMart Indonesia',
  '2024',
  'Web Application',
  'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
  'Redesign dan pengembangan ulang platform e-commerce untuk meningkatkan user experience dan konversi penjualan.',
  'Platform lama memiliki tingkat bounce rate tinggi (65%) dan konversi yang rendah. User interface yang tidak mobile-friendly menyebabkan 70% pengguna mobile meninggalkan situs.',
  'Menerapkan responsive design dengan mobile-first approach, mengoptimasi loading speed dengan lazy loading dan code splitting, serta implementasi UI/UX best practices menggunakan React dan Tailwind CSS.',
  ARRAY['Bounce rate turun 40%', 'Konversi meningkat 55%', 'Loading time turun dari 5s ke 1.2s', 'Mobile engagement naik 80%'],
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'AWS S3', 'Redis'],
  '6 bulan',
  'Lead Frontend Developer',
  ARRAY[
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800'
  ],
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://demo-techmart.com',
  'https://github.com/example/techmart',
  'Published',
  'Tim sangat profesional dan hasil kerja melampaui ekspektasi kami. Platform baru kami sekarang jauh lebih cepat dan user-friendly!',
  'Budi Santoso',
  'CTO, TechMart Indonesia'
),
(
  'Corporate Website Revamp',
  'PT Maju Bersama',
  '2024',
  'Company Website',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  'Pembuatan website company profile modern dengan fitur blog, portfolio showcase, dan contact management system.',
  'Perusahaan membutuhkan website yang mencerminkan brand identity modern mereka dan dapat menarik klien baru. Website lama sudah outdated dan tidak SEO-friendly.',
  'Membangun website dari scratch menggunakan React dan Next.js untuk SEO optimization, mengintegrasikan CMS untuk easy content management, dan menerapkan modern design dengan animasi yang smooth.',
  ARRAY['Organic traffic naik 120%', 'Inquiry dari website naik 85%', 'PageSpeed score 95/100', 'Domain Authority naik dari 15 ke 42'],
  ARRAY['Next.js', 'React', 'TypeScript', 'Sanity CMS', 'Framer Motion', 'Vercel'],
  '4 bulan',
  'Full Stack Developer',
  ARRAY[
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800'
  ],
  NULL,
  'https://majubersama.com',
  NULL,
  'Published',
  'Website baru kami sangat memukau! Kami mendapat banyak pujian dari klien dan traffic naik signifikan.',
  'Siti Rahma',
  'Marketing Director, PT Maju Bersama'
),
(
  'Food Delivery Mobile App',
  'FoodExpress',
  '2023',
  'Web Application',
  'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800',
  'Aplikasi pemesanan makanan online dengan fitur real-time tracking, multiple payment methods, dan loyalty program.',
  'Kompetisi ketat di industri food delivery mengharuskan aplikasi memiliki performa tinggi dan user experience yang seamless untuk mempertahankan pengguna.',
  'Mengembangkan Progressive Web App (PWA) dengan real-time updates menggunakan WebSocket, implementasi service worker untuk offline capability, dan integrasi dengan berbagai payment gateway.',
  ARRAY['200K+ downloads dalam 6 bulan', '4.7/5 rating di app store', 'Average order time turun 35%', 'Retention rate 72%'],
  ARRAY['React Native', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Stripe', 'Google Maps API'],
  '8 bulan',
  'Tech Lead',
  ARRAY[
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800'
  ],
  NULL,
  'https://foodexpress-app.com',
  NULL,
  'Published',
  'Aplikasi ini game-changer untuk bisnis kami. Technical implementation sangat solid dan scalable.',
  'Michael Chen',
  'CEO, FoodExpress'
),
(
  'Learning Management System',
  'EduTech Academy',
  '2023',
  'Web Portal',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
  'Platform pembelajaran online dengan video streaming, quiz interaktif, progress tracking, dan certificate generation.',
  'Membangun platform yang dapat menangani ribuan siswa secara bersamaan dengan video streaming berkualitas tinggi tanpa lag.',
  'Implementasi video transcoding dan adaptive streaming, database optimization untuk handle concurrent users, dan caching strategy untuk mengurangi server load.',
  ARRAY['Support 10K+ concurrent users', '99.9% uptime', '50K+ enrolled students', 'Average completion rate 78%'],
  ARRAY['React', 'Django', 'PostgreSQL', 'AWS Media Services', 'Docker', 'Kubernetes', 'Redis'],
  '10 bulan',
  'Backend Developer',
  ARRAY[
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800'
  ],
  NULL,
  NULL,
  NULL,
  'Published',
  'Platform ini sangat robust dan dapat scale sesuai kebutuhan kami. Great work!',
  'Dr. Ahmad Fauzi',
  'Director, EduTech Academy'
),
(
  'Nonprofit Organization Website',
  'Yayasan Peduli Anak',
  '2024',
  'Nonprofit Website',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
  'Website untuk yayasan nonprofit dengan fitur donation management, volunteer registration, dan impact showcase.',
  'Yayasan membutuhkan website yang dapat menarik donor dan volunteer, serta menunjukkan transparansi penggunaan dana.',
  'Membuat website dengan storytelling yang kuat, integrasi payment gateway untuk donasi online, dan dashboard transparansi untuk menampilkan penggunaan dana secara real-time.',
  ARRAY['Online donation naik 300%', '500+ volunteer registrations', 'Featured in 5 major media', 'Donor retention 85%'],
  ARRAY['Next.js', 'Strapi CMS', 'Stripe', 'Tailwind CSS', 'Chart.js'],
  '3 bulan',
  'Full Stack Developer',
  ARRAY[
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800',
    'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800'
  ],
  NULL,
  'https://pedulianak.org',
  NULL,
  'Published',
  'Website ini membantu kami mencapai lebih banyak orang. Donasi online meningkat drastis!',
  'Ibu Ratna',
  'Founder, Yayasan Peduli Anak'
),
(
  'Portfolio Website untuk Designer',
  'Sarah Creative Studio',
  '2024',
  'Portfolio Website',
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800',
  'Portfolio website untuk freelance designer dengan gallery showcase, blog, dan contact form.',
  'Designer membutuhkan website yang visual stunning dan fast loading untuk showcase karya-karya terbaik.',
  'Implementasi image optimization dengan next-gen formats (WebP, AVIF), lazy loading, dan parallax effects untuk visual impact maksimal.',
  ARRAY['PageSpeed 98/100', 'Client inquiry naik 150%', 'Featured on design blogs', 'Average session duration 4.5 min'],
  ARRAY['Next.js', 'Framer Motion', 'Contentful', 'Vercel', 'Sharp'],
  '2 bulan',
  'Frontend Developer',
  ARRAY[
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
  ],
  NULL,
  'https://sarahcreative.design',
  'https://github.com/example/sarah-portfolio',
  'Published',
  NULL,
  NULL,
  NULL
);

-- ============================================
-- 2. SEED DATA - ARTICLES
-- ============================================

INSERT INTO articles (
  title, excerpt, content, category, status, date, image, author,
  author_bio, author_avatar, tags, read_time
) VALUES 
(
  'Panduan Lengkap Membangun Website Modern dengan React',
  'Pelajari cara membangun website modern menggunakan React, TypeScript, dan Tailwind CSS dari awal hingga deployment.',
  'React telah menjadi salah satu library JavaScript paling populer untuk membangun user interface. Dalam artikel ini, kita akan membahas step-by-step cara membangun website modern.\n\n## Setup Project\n\nPertama, kita akan setup project menggunakan Vite:\n\n```bash\nnpm create vite@latest my-project -- --template react-ts\ncd my-project\nnpm install\n```\n\n## Install Tailwind CSS\n\nSelanjutnya, install Tailwind CSS untuk styling:\n\n```bash\nnpm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p\n```\n\n## Component Architecture\n\nGunakan component-based architecture untuk memudahkan maintenance dan reusability...',
  'Tutorial',
  'Published',
  '2024-01-15',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
  'Nopian Hadi',
  'Full Stack Developer dengan 5+ tahun pengalaman dalam web development',
  'https://i.pravatar.cc/150?img=12',
  ARRAY['React', 'TypeScript', 'Web Development', 'Tutorial'],
  '8 menit'
),
(
  '10 Tips Optimasi Performa Website untuk SEO',
  'Tingkatkan ranking website Anda di search engine dengan mengoptimalkan performa loading speed dan Core Web Vitals.',
  'Performa website adalah salah satu faktor penting dalam SEO. Google menggunakan Core Web Vitals sebagai ranking factor. Berikut 10 tips untuk optimasi performa:\n\n## 1. Image Optimization\n\nGunakan format image modern seperti WebP atau AVIF. Compress image tanpa mengurangi kualitas visual.\n\n## 2. Lazy Loading\n\nImplementasikan lazy loading untuk image dan video agar tidak load semua resources sekaligus.\n\n## 3. Code Splitting\n\nPecah JavaScript bundle menjadi chunks yang lebih kecil menggunakan dynamic import.\n\n## 4. CDN Usage\n\nGunakan Content Delivery Network untuk serve static assets dari server terdekat user...',
  'Tips & Trik',
  'Published',
  '2024-01-20',
  'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800',
  'Nopian Hadi',
  'Full Stack Developer dengan 5+ tahun pengalaman dalam web development',
  'https://i.pravatar.cc/150?img=12',
  ARRAY['SEO', 'Performance', 'Web Development', 'Optimization'],
  '6 menit'
),
(
  'Kenapa TypeScript Penting untuk Developer Modern',
  'TypeScript memberikan type safety dan better developer experience. Pelajari kenapa Anda harus mulai menggunakan TypeScript.',
  'TypeScript adalah superset dari JavaScript yang menambahkan static typing. Berikut alasan kenapa TypeScript penting:\n\n## Type Safety\n\nType system di TypeScript membantu catch error lebih awal, bahkan sebelum code dijalankan. Ini mengurangi runtime error.\n\n```typescript\nfunction greet(name: string): string {\n  return `Hello, ${name}`;\n}\n\ngreet(123); // Error: Argument type number is not assignable to parameter type string\n```\n\n## Better IDE Support\n\nIDE dapat memberikan better autocomplete, intellisense, dan refactoring tools dengan TypeScript.\n\n## Maintainability\n\nCode TypeScript lebih mudah dimaintain terutama untuk large codebase dengan banyak developer...',
  'Pengembangan',
  'Published',
  '2024-01-25',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
  'Nopian Hadi',
  'Full Stack Developer dengan 5+ tahun pengalaman dalam web development',
  'https://i.pravatar.cc/150?img=12',
  ARRAY['TypeScript', 'JavaScript', 'Programming', 'Best Practices'],
  '7 menit'
),
(
  'Desain UI/UX: Prinsip Dasar yang Harus Dipahami',
  'Pelajari prinsip-prinsip dasar desain UI/UX yang akan membuat produk digital Anda lebih user-friendly dan engaging.',
  'UI/UX design adalah aspek crucial dalam product development. Berikut prinsip-prinsip dasarnya:\n\n## 1. User-Centered Design\n\nSelalu prioritaskan kebutuhan user. Lakukan user research dan testing untuk memahami behavior user.\n\n## 2. Consistency\n\nMaintain consistency dalam design elements seperti colors, typography, spacing, dan interaction patterns.\n\n## 3. Hierarchy\n\nGunakan visual hierarchy untuk guide user attention ke element penting. Size, color, dan position mempengaruhi hierarchy.\n\n## 4. Accessibility\n\nPastikan design accessible untuk semua user termasuk yang memiliki disabilities. Gunakan proper color contrast dan semantic HTML...',
  'Desain',
  'Published',
  '2024-02-01',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
  'Nopian Hadi',
  'Full Stack Developer dengan 5+ tahun pengalaman dalam web development',
  'https://i.pravatar.cc/150?img=12',
  ARRAY['UI/UX', 'Design', 'User Experience', 'Best Practices'],
  '10 menit'
),
(
  'Studi Kasus: Migrasi Aplikasi dari JavaScript ke TypeScript',
  'Pengalaman nyata dalam memigrasikan large codebase dari JavaScript ke TypeScript, challenges yang dihadapi, dan lessons learned.',
  'Kami baru saja menyelesaikan migrasi aplikasi dengan 100K+ lines of code dari JavaScript ke TypeScript. Ini pengalaman kami:\n\n## Background\n\nAplikasi e-commerce kami mulai sulit dimaintain karena sering terjadi runtime errors yang sulit di-debug.\n\n## Migration Strategy\n\nKami menggunakan incremental migration approach:\n\n1. Setup TypeScript config dengan allowJS: true\n2. Install type definitions untuk dependencies\n3. Convert file-by-file starting from utility functions\n4. Add types gradually menggunakan any type dulu\n5. Stricten type checking secara bertahap\n\n## Challenges\n\nBanyak challenges yang kami hadapi:\n- Legacy code yang poorly structured\n- Third-party libraries tanpa type definitions\n- Learning curve untuk team...',
  'Studi Kasus',
  'Published',
  '2024-02-05',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
  'Nopian Hadi',
  'Full Stack Developer dengan 5+ tahun pengalaman dalam web development',
  'https://i.pravatar.cc/150?img=12',
  ARRAY['TypeScript', 'Migration', 'Case Study', 'Best Practices'],
  '12 menit'
),
(
  'REST API vs GraphQL: Mana yang Lebih Baik?',
  'Perbandingan mendalam antara REST API dan GraphQL, use cases, kelebihan dan kekurangan masing-masing.',
  'REST dan GraphQL adalah dua pendekatan populer untuk building APIs. Mari kita bandingkan:\n\n## REST API\n\n### Kelebihan:\n- Simple dan straightforward\n- Widely adopted, banyak tools dan libraries\n- Caching mudah dengan HTTP caching\n- Stateless architecture\n\n### Kekurangan:\n- Over-fetching atau under-fetching data\n- Multiple round trips untuk complex data\n- API versioning bisa jadi complex\n\n## GraphQL\n\n### Kelebihan:\n- Client bisa request exactly data yang dibutuhkan\n- Single endpoint untuk all operations\n- Strong typing dengan schema\n- Great developer experience\n\n### Kekurangan:\n- Learning curve lebih steep\n- Caching lebih complex\n- Potential security issues dengan complex queries...',
  'Pengembangan',
  'Published',
  '2024-02-10',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
  'Nopian Hadi',
  'Full Stack Developer dengan 5+ tahun pengalaman dalam web development',
  'https://i.pravatar.cc/150?img=12',
  ARRAY['API', 'REST', 'GraphQL', 'Backend'],
  '9 menit'
),
(
  'Tren Web Development 2024 yang Wajib Diketahui',
  'Eksplorasi tren dan teknologi terbaru dalam web development yang akan mendominasi tahun 2024.',
  'Industri web development terus berkembang. Berikut tren yang akan hot di 2024:\n\n## 1. AI-Powered Development\n\nAI tools seperti GitHub Copilot dan ChatGPT akan semakin integrate dalam development workflow.\n\n## 2. Edge Computing\n\nVercel Edge Functions, Cloudflare Workers, dan sejenisnya akan semakin popular untuk better performance.\n\n## 3. Server Components\n\nReact Server Components membawa paradigm baru dalam rendering strategies.\n\n## 4. WebAssembly\n\nWASM akan semakin mature dan digunakan untuk compute-intensive tasks di browser.\n\n## 5. Micro-Frontends\n\nArchitecture pattern ini akan semakin adopted untuk large-scale applications...',
  'Berita',
  'Published',
  '2024-02-15',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800',
  'Nopian Hadi',
  'Full Stack Developer dengan 5+ tahun pengalaman dalam web development',
  'https://i.pravatar.cc/150?img=12',
  ARRAY['Trends', 'Web Development', '2024', 'Technology'],
  '8 menit'
);

-- ============================================
-- 3. SEED DATA - TESTIMONIALS
-- ============================================

INSERT INTO testimonials (
  name, position, company, message, rating, image, date, status
) VALUES 
(
  'Budi Santoso',
  'CTO',
  'TechMart Indonesia',
  'Bekerja dengan tim ini adalah pengalaman luar biasa. Mereka tidak hanya technical skilled, tapi juga memahami business needs kami. Project selesai on time dengan kualitas yang melampaui ekspektasi. Highly recommended!',
  5,
  'https://i.pravatar.cc/150?img=33',
  '2024-01-20',
  'Published'
),
(
  'Siti Rahma',
  'Marketing Director',
  'PT Maju Bersama',
  'Website baru kami sangat memukau! Design modern, cepat, dan SEO-friendly. Traffic naik signifikan dalam 2 bulan pertama. Tim sangat responsive dan professional dalam handling setiap request.',
  5,
  'https://i.pravatar.cc/150?img=20',
  '2024-01-25',
  'Published'
),
(
  'Michael Chen',
  'CEO',
  'FoodExpress',
  'Aplikasi yang dibangun sangat robust dan scalable. Dapat handle ribuan concurrent users tanpa masalah. Technical implementation sangat solid. Great partner for long-term collaboration!',
  5,
  'https://i.pravatar.cc/150?img=15',
  '2024-02-01',
  'Published'
),
(
  'Dr. Ahmad Fauzi',
  'Director',
  'EduTech Academy',
  'Platform LMS yang dibangun exceed our expectations. User experience excellent, dan technical architecture yang scalable memungkinkan kami grow dengan confident. Terima kasih atas kerja keras tim!',
  5,
  'https://i.pravatar.cc/150?img=51',
  '2024-02-05',
  'Published'
),
(
  'Ibu Ratna',
  'Founder',
  'Yayasan Peduli Anak',
  'Website ini game-changer untuk yayasan kami. Online donation meningkat 300% dan kami bisa reach lebih banyak people. Terima kasih telah membantu mission kami!',
  5,
  'https://i.pravatar.cc/150?img=25',
  '2024-02-10',
  'Published'
),
(
  'Sarah Anderson',
  'Freelance Designer',
  'Sarah Creative Studio',
  'Portfolio website yang dibuat sangat beautiful dan fast. Client impressions meningkat drastis. Banyak yang compliment website saya. Worth every penny!',
  5,
  'https://i.pravatar.cc/150?img=47',
  '2024-02-12',
  'Published'
),
(
  'Hendra Wijaya',
  'Product Manager',
  'StartupXYZ',
  'Kerjasama yang sangat baik. Tim memiliki good understanding of modern web technologies dan best practices. Communication smooth dan delivery on schedule.',
  4,
  'https://i.pravatar.cc/150?img=13',
  '2024-02-15',
  'Published'
),
(
  'Linda Kusuma',
  'Business Owner',
  'Linda Boutique',
  'Senang sekali dengan hasil website e-commerce kami. Simple, elegant, dan mudah digunakan. Customer feedback sangat positive!',
  5,
  'https://i.pravatar.cc/150?img=23',
  '2024-02-18',
  'Published'
);

-- ============================================
-- 4. SEED DATA - USER PROFILES
-- ============================================
-- ⚠️ PENTING: User profile membutuhkan user sudah terdaftar di Supabase Auth terlebih dahulu!
-- 
-- LANGKAH-LANGKAH:
-- 1. Buat user di Supabase Dashboard → Authentication → Users
-- 2. Copy UUID user tersebut
-- 3. Ganti 'USER-UUID-HERE' di query dibawah dengan UUID asli
-- 4. Jalankan query ini
--
-- Atau gunakan script otomatis di bawah untuk membuat profile dari existing users

-- ============================================
-- OPSI 1: Insert Manual (Ganti UUID-nya!)
-- ============================================

-- Profile untuk admin utama
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
  'GANTI-DENGAN-UUID-USER-DARI-AUTH',  -- ⚠️ WAJIB GANTI!
  'Nopian Hadi',
  'admin@example.com',
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
-- OPSI 2: Auto-create dari existing auth users
-- ============================================
-- Gunakan query ini untuk otomatis membuat profile untuk semua user yang belum punya profile

-- INSERT INTO user_profiles (id, name, email, phone, location, bio, avatar)
-- SELECT 
--   au.id,
--   COALESCE(au.raw_user_meta_data->>'full_name', SPLIT_PART(au.email, '@', 1)) as name,
--   au.email,
--   '',
--   '',
--   'Saya adalah pengguna portfolio website',
--   'https://i.pravatar.cc/150?u=' || au.id
-- FROM auth.users au
-- LEFT JOIN user_profiles up ON au.id = up.id
-- WHERE up.id IS NULL;

-- ============================================
-- CONTOH DATA LENGKAP (untuk referensi)
-- ============================================
-- Uncomment dan ganti UUID jika ingin menambah user profiles lain

-- INSERT INTO user_profiles (
--   id, name, email, phone, location, bio, avatar, website,
--   github, linkedin, twitter, instagram
-- ) VALUES 
-- (
--   'UUID-USER-2',
--   'Sarah Designer',
--   'sarah@example.com',
--   '+62 813-7777-8888',
--   'Bandung, Indonesia',
--   'UI/UX Designer specializing in creating beautiful and intuitive user interfaces.',
--   'https://i.pravatar.cc/150?img=47',
--   'https://sarahdesign.com',
--   'https://github.com/sarahdesigner',
--   'https://linkedin.com/in/sarahdesigner',
--   'https://twitter.com/sarahdesigner',
--   'https://instagram.com/sarahdesigner'
-- ),
-- (
--   'UUID-USER-3',
--   'Ahmad Developer',
--   'ahmad@example.com',
--   '+62 815-9999-0000',
--   'Surabaya, Indonesia',
--   'Backend Developer with expertise in Node.js, Python, and cloud infrastructure.',
--   'https://i.pravatar.cc/150?img=33',
--   'https://ahmaddev.com',
--   'https://github.com/ahmaddev',
--   'https://linkedin.com/in/ahmaddev',
--   'https://twitter.com/ahmaddev',
--   'https://instagram.com/ahmaddev'
-- );

-- ============================================
-- END OF SEED DATA
-- ============================================

-- Query untuk verifikasi data
-- SELECT COUNT(*) FROM projects;
-- SELECT COUNT(*) FROM articles;
-- SELECT COUNT(*) FROM testimonials;
-- SELECT COUNT(*) FROM user_profiles;
