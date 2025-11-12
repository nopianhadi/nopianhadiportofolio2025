# Requirements Document

## Introduction

Proyek ini bertujuan untuk meningkatkan desain portfolio Roy Jones menjadi lebih modern, minimalis, dan profesional dengan fokus pada white space, hierarki visual yang jelas, dan pengalaman pengguna yang intuitif. Enhancement ini akan mencakup perbaikan pada tipografi, desain kartu, animasi interaktif, dan konsistensi visual di seluruh halaman.

## Glossary

- **Portfolio System**: Aplikasi web React yang menampilkan karya, pengalaman, dan artikel dari Roy Jones sebagai product designer
- **Card Component**: Komponen UI yang menampilkan informasi dalam format kartu dengan visual, teks, dan interaksi
- **CTA (Call-to-Action)**: Tombol atau elemen interaktif yang mendorong pengguna untuk melakukan aksi tertentu
- **White Space**: Ruang kosong di sekitar elemen desain yang meningkatkan keterbacaan dan fokus visual
- **Hover Effect**: Efek visual yang muncul ketika pengguna mengarahkan kursor mouse ke elemen interaktif
- **3D Decorative Element**: Elemen grafis tiga dimensi yang digunakan untuk dekorasi visual
- **Scroll Animation**: Animasi yang dipicu saat pengguna menggulir halaman
- **Typography Hierarchy**: Sistem pengaturan ukuran dan berat font untuk menciptakan struktur informasi yang jelas

## Requirements

### Requirement 1: Minimalist Layout dengan White Space

**User Story:** Sebagai pengunjung portfolio, saya ingin melihat tata letak yang lapang dan tidak penuh sesak, sehingga saya dapat dengan mudah memindai dan fokus pada konten penting.

#### Acceptance Criteria

1. THE Portfolio System SHALL menggunakan tata letak satu kolom untuk konten utama dengan lebar maksimal 1200px
2. THE Portfolio System SHALL menerapkan padding minimal 80px antara setiap section utama pada viewport desktop
3. THE Portfolio System SHALL menggunakan margin minimal 40px di sekitar setiap Card Component
4. THE Portfolio System SHALL mempertahankan rasio white space terhadap konten minimal 40% pada setiap section
5. WHEN viewport width kurang dari 768px, THE Portfolio System SHALL mengurangi padding antar section menjadi 48px

### Requirement 2: Palet Warna Monokromatik dengan Aksen Strategis

**User Story:** Sebagai pengunjung portfolio, saya ingin melihat skema warna yang profesional dan elegan, sehingga fokus saya tetap pada konten dan CTA yang penting.

#### Acceptance Criteria

1. THE Portfolio System SHALL menggunakan warna putih (#FFFFFF) sebagai background utama
2. THE Portfolio System SHALL menggunakan warna hitam (#000000) dan abu-abu (#6B7280, #9CA3AF, #E5E7EB) untuk teks dan elemen UI
3. THE Portfolio System SHALL menggunakan warna oranye/merah (#FF6B35 atau #EF4444) hanya untuk CTA button utama
4. THE Portfolio System SHALL menggunakan warna biru (#3B82F6) hanya untuk tag dan label interaktif
5. THE Portfolio System SHALL membatasi penggunaan warna aksen maksimal 10% dari total area visual

### Requirement 3: Tipografi Modern dan Hierarki yang Jelas

**User Story:** Sebagai pengunjung portfolio, saya ingin membaca teks dengan mudah dan memahami struktur informasi dengan cepat, sehingga saya dapat menavigasi konten secara efisien.

#### Acceptance Criteria

1. THE Portfolio System SHALL menggunakan satu keluarga font sans-serif modern (Inter, Poppins, atau Gilroy) untuk seluruh halaman
2. THE Portfolio System SHALL menggunakan ukuran font 48px hingga 72px dengan font-weight 700 untuk heading utama section
3. THE Portfolio System SHALL menggunakan ukuran font 16px hingga 18px dengan font-weight 400 untuk body text
4. THE Portfolio System SHALL menggunakan line-height minimal 1.6 untuk body text dan 1.2 untuk headings
5. THE Portfolio System SHALL mempertahankan kontras warna teks terhadap background minimal 4.5:1 sesuai WCAG AA

### Requirement 4: Desain Kartu Portfolio dengan Visual Dominan

**User Story:** Sebagai perekrut atau klien potensial, saya ingin melihat preview visual dari proyek portfolio dengan informasi minimal, sehingga saya tertarik untuk mengklik dan melihat detail lebih lanjut.

#### Acceptance Criteria

1. THE Portfolio System SHALL menampilkan Card Component untuk setiap proyek dengan mockup visual sebagai elemen dominan
2. THE Portfolio System SHALL menampilkan judul proyek, kategori, dan CTA "View case" pada setiap portfolio card
3. THE Portfolio System SHALL menggunakan border-radius 16px untuk semua portfolio cards
4. THE Portfolio System SHALL menampilkan mockup proyek dalam dark mode theme dengan kontras tinggi terhadap background terang
5. WHEN pengguna mengarahkan cursor ke portfolio card, THE Portfolio System SHALL menampilkan hover effect dengan scale transform 1.02 dan shadow elevation

### Requirement 5: Desain Kartu Artikel dengan Struktur Blog

**User Story:** Sebagai pengunjung yang tertarik dengan konten, saya ingin melihat preview artikel dengan gambar dan informasi dasar, sehingga saya dapat memilih artikel yang ingin saya baca.

#### Acceptance Criteria

1. THE Portfolio System SHALL menampilkan Card Component untuk setiap artikel dengan gambar di bagian atas
2. THE Portfolio System SHALL menampilkan judul artikel, tanggal publikasi, dan link "Read article" pada setiap article card
3. THE Portfolio System SHALL menggunakan background putih dengan box-shadow subtle (0 4px 6px rgba(0,0,0,0.1)) untuk article cards
4. THE Portfolio System SHALL menggunakan border-radius 12px untuk article cards
5. WHEN pengguna mengarahkan cursor ke article card, THE Portfolio System SHALL meningkatkan shadow elevation menjadi (0 8px 16px rgba(0,0,0,0.15))

### Requirement 6: Animasi 3D Decorative Elements

**User Story:** Sebagai pengunjung portfolio, saya ingin melihat elemen visual yang dinamis dan menarik, sehingga pengalaman browsing saya lebih engaging dan memorable.

#### Acceptance Criteria

1. THE Portfolio System SHALL menampilkan minimal 3 elemen grafis 3D (thumbs up, plus sign, location pin) sebagai dekorasi
2. WHEN halaman dimuat, THE Portfolio System SHALL menerapkan floating animation dengan durasi 3 detik dan infinite loop pada 3D elements
3. WHEN pengguna menggerakkan mouse, THE Portfolio System SHALL menerapkan parallax effect dengan movement range 20px pada 3D elements
4. THE Portfolio System SHALL menggunakan opacity 0.6 hingga 0.8 untuk 3D decorative elements agar tidak mengganggu konten utama
5. THE Portfolio System SHALL menyembunyikan 3D decorative elements pada viewport width kurang dari 768px

### Requirement 7: Hover Effects untuk Interaktivitas

**User Story:** Sebagai pengguna, saya ingin mendapatkan feedback visual ketika berinteraksi dengan elemen clickable, sehingga saya tahu elemen mana yang dapat diklik.

#### Acceptance Criteria

1. WHEN pengguna mengarahkan cursor ke CTA button, THE Portfolio System SHALL mengubah background color dengan transition duration 200ms
2. WHEN pengguna mengarahkan cursor ke CTA button, THE Portfolio System SHALL menerapkan scale transform 1.05
3. WHEN pengguna mengarahkan cursor ke Card Component, THE Portfolio System SHALL menerapkan scale transform 1.02 dengan transition duration 300ms
4. WHEN pengguna mengarahkan cursor ke link text, THE Portfolio System SHALL mengubah color dengan transition duration 150ms
5. THE Portfolio System SHALL menggunakan cursor pointer untuk semua elemen interaktif

### Requirement 8: Scroll Animations untuk Section Transitions

**User Story:** Sebagai pengunjung portfolio, saya ingin melihat konten muncul secara bertahap saat saya scroll, sehingga pengalaman browsing terasa lebih dinamis dan tidak monoton.

#### Acceptance Criteria

1. WHEN section masuk ke viewport dengan threshold 20%, THE Portfolio System SHALL menerapkan fade-in animation dengan opacity 0 ke 1
2. WHEN section masuk ke viewport, THE Portfolio System SHALL menerapkan slide-up animation dengan translateY 40px ke 0
3. THE Portfolio System SHALL menggunakan animation duration 600ms dengan easing function ease-out untuk scroll animations
4. THE Portfolio System SHALL menerapkan stagger delay 100ms untuk setiap Card Component dalam satu section
5. THE Portfolio System SHALL memastikan scroll animation hanya terjadi satu kali per section untuk menghindari distraksi

### Requirement 9: Responsive Design untuk Mobile Experience

**User Story:** Sebagai pengguna mobile, saya ingin mengakses portfolio dengan tampilan yang optimal di perangkat saya, sehingga saya dapat melihat semua konten dengan nyaman.

#### Acceptance Criteria

1. WHEN viewport width kurang dari 768px, THE Portfolio System SHALL mengubah grid layout dari multi-column menjadi single-column
2. WHEN viewport width kurang dari 768px, THE Portfolio System SHALL mengurangi font size heading menjadi 32px hingga 48px
3. WHEN viewport width kurang dari 768px, THE Portfolio System SHALL mengurangi padding horizontal menjadi 16px
4. THE Portfolio System SHALL mempertahankan aspect ratio 16:9 untuk semua gambar pada berbagai viewport sizes
5. WHEN viewport width kurang dari 768px, THE Portfolio System SHALL menyembunyikan decorative elements yang tidak esensial

### Requirement 10: Navigation Flow yang Intuitif

**User Story:** Sebagai perekrut atau klien, saya ingin mengikuti alur cerita yang logis dari hero section hingga contact CTA, sehingga saya dapat memahami value proposition designer dengan efektif.

#### Acceptance Criteria

1. THE Portfolio System SHALL menampilkan sections dalam urutan: Hero, Selected Work, About, Testimonials, Articles, Contact CTA
2. THE Portfolio System SHALL menyediakan navigation menu di header dengan link ke setiap section utama
3. WHEN pengguna mengklik navigation link, THE Portfolio System SHALL melakukan smooth scroll ke section target dengan duration 800ms
4. THE Portfolio System SHALL menampilkan visual indicator (underline atau dot) pada navigation menu untuk section yang sedang aktif
5. THE Portfolio System SHALL menyediakan "back to top" button yang muncul ketika pengguna scroll lebih dari 500px dari top
