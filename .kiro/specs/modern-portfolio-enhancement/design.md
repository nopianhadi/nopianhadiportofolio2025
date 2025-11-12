# Design Document

## Overview

Dokumen ini menjelaskan desain teknis untuk enhancement portfolio Roy Jones menjadi lebih modern, minimalis, dan profesional. Desain ini berfokus pada peningkatan visual hierarchy, interaktivitas, dan user experience melalui implementasi white space yang optimal, tipografi yang konsisten, animasi yang halus, dan responsive design yang sempurna.

### Design Principles

1. **Minimalism First**: Setiap elemen harus memiliki tujuan yang jelas. Hindari dekorasi yang tidak perlu.
2. **Content Hierarchy**: Gunakan ukuran, warna, dan spacing untuk membuat hierarki visual yang jelas.
3. **Progressive Enhancement**: Mulai dengan pengalaman dasar yang solid, tambahkan animasi dan efek sebagai enhancement.
4. **Performance Conscious**: Semua animasi dan efek harus smooth (60fps) dan tidak mengganggu performa.
5. **Accessibility First**: Semua interaksi harus accessible via keyboard, dan kontras warna harus memenuhi WCAG AA.

## Architecture

### Component Structure

```
Portfolio System
├── Layout Components
│   ├── Header (Navigation + Logo)
│   ├── Main Container (Max-width wrapper)
│   └── Footer (Contact CTA + Links)
├── Section Components
│   ├── Hero (Introduction + Statistics)
│   ├── SelectedWork (Portfolio Grid)
│   ├── About (Bio + Info)
│   ├── Testimonials (Quotes + Authors)
│   ├── Experience (Timeline)
│   └── Articles (Blog Cards)
├── UI Components
│   ├── Card (Base card component)
│   ├── Button (CTA buttons)
│   ├── Tag (Category labels)
│   └── AnimatedElement (Scroll animations)
└── Decorative Components
    ├── 3DElement (Floating graphics)
    ├── ParallaxWrapper (Mouse tracking)
    └── ScrollIndicator (Progress/Back to top)
```


### Technology Stack

- **Framework**: React 19.2.0 dengan TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS (utility-first approach)
- **Animation Library**: Framer Motion (untuk complex animations) atau CSS Transitions (untuk simple effects)
- **Intersection Observer API**: Untuk scroll-triggered animations
- **Mouse Tracking**: Custom hook untuk parallax effects

### State Management

Karena portfolio bersifat static dan tidak memerlukan complex state management, kita akan menggunakan:
- React useState untuk local component state (animation triggers, hover states)
- React useRef untuk DOM references (scroll positions, animation targets)
- React useEffect untuk side effects (scroll listeners, intersection observers)

## Components and Interfaces

### 1. Layout System

#### Container Component
```typescript
interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

**Design Specifications:**
- Max-width: 1200px untuk konten utama
- Horizontal padding: 16px (mobile), 24px (tablet), 32px (desktop)
- Vertical padding: 48px (mobile), 80px (desktop) antar sections

#### Section Component
```typescript
interface SectionProps {
  id: string;
  background?: 'white' | 'gray';
  spacing?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

**Design Specifications:**
- Background colors: #FFFFFF (white), #F6F6F6 (light gray)
- Section spacing: 80px (desktop), 48px (mobile)
- Minimum height: auto, dengan padding yang konsisten


### 2. Typography System

#### Font Configuration
```typescript
interface TypographyConfig {
  fontFamily: {
    primary: string; // 'Inter', 'Poppins', or 'Gilroy'
  };
  fontSize: {
    h1: string; // 72px (desktop), 48px (mobile)
    h2: string; // 56px (desktop), 36px (mobile)
    h3: string; // 32px (desktop), 24px (mobile)
    body: string; // 18px (desktop), 16px (mobile)
    small: string; // 14px
    xs: string; // 12px
  };
  fontWeight: {
    regular: 400;
    medium: 500;
    semibold: 600;
    bold: 700;
  };
  lineHeight: {
    tight: 1.2; // For headings
    normal: 1.5; // For body
    relaxed: 1.6; // For long-form content
  };
}
```

**Implementation Strategy:**
- Import Google Fonts (Inter) via index.html atau CSS
- Define custom Tailwind classes untuk consistency
- Ensure font loading optimization (font-display: swap)

**Tailwind Configuration:**
```javascript
// tailwind.config.js extension
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      'display-lg': ['72px', { lineHeight: '1.2', fontWeight: '700' }],
      'display-md': ['56px', { lineHeight: '1.2', fontWeight: '700' }],
      'heading': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
    }
  }
}
```


### 3. Color System

#### Color Palette
```typescript
interface ColorPalette {
  // Base colors
  white: '#FFFFFF';
  black: '#000000';
  
  // Gray scale (monochromatic)
  gray: {
    50: '#F9FAFB';
    100: '#F3F4F6';
    200: '#E5E7EB';
    300: '#D1D5DB';
    400: '#9CA3AF';
    500: '#6B7280';
    600: '#4B5563';
    700: '#374151';
    800: '#1F2937';
    900: '#111827';
  };
  
  // Accent colors (strategic use only)
  accent: {
    orange: '#FF6B35'; // Primary CTA
    red: '#EF4444'; // Alternative CTA
    blue: '#3B82F6'; // Tags and labels
  };
}
```

**Usage Guidelines:**
- Background: white (#FFFFFF) untuk sections utama, gray-50 (#F9FAFB) untuk alternating sections
- Text: gray-900 (#111827) untuk headings, gray-600 (#4B5563) untuk body, gray-400 (#9CA3AF) untuk secondary text
- Accent: orange/red untuk CTA buttons (max 2-3 per page), blue untuk tags (max 5-10% of visual space)
- Borders: gray-200 (#E5E7EB) untuk subtle borders, gray-300 (#D1D5DB) untuk prominent borders


### 4. Card Components

#### Portfolio Card Component
```typescript
interface PortfolioCardProps {
  title: string;
  category: string;
  imageUrl: string;
  projectUrl: string;
  darkMode?: boolean;
}
```

**Design Specifications:**
- Dimensions: Flexible grid (1-2 columns on mobile, 2-3 columns on desktop)
- Border radius: 16px
- Image aspect ratio: 16:9 atau 4:3 tergantung grid position
- Padding: 0 (image full-bleed dalam card)
- Shadow: 0 4px 12px rgba(0,0,0,0.08) default, 0 8px 24px rgba(0,0,0,0.12) on hover
- Transition: all 300ms ease-out

**Visual Hierarchy:**
1. Mockup image (dominant, 85% of card space)
2. Title + Category overlay (bottom-left, white background pill)
3. "View case" CTA (appears on hover, center of card)

**Hover State:**
- Scale: transform scale(1.02)
- Shadow elevation increase
- Overlay dengan gradient (rgba(0,0,0,0.3))
- CTA button fade in dengan slide-up animation

#### Article Card Component
```typescript
interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  articleUrl: string;
  readTime?: string;
}
```

**Design Specifications:**
- Dimensions: Equal width dalam grid, auto height
- Border radius: 12px
- Image aspect ratio: 16:9
- Padding: 24px untuk content area
- Background: white (#FFFFFF)
- Shadow: 0 2px 8px rgba(0,0,0,0.06) default, 0 4px 16px rgba(0,0,0,0.1) on hover
- Transition: all 250ms ease-out

**Structure:**
1. Image (top, full-width)
2. Content area (padding 24px)
   - Title (font-size 20px, font-weight 600)
   - Excerpt (font-size 16px, color gray-600, line-clamp 2)
   - Meta (date + read time, font-size 14px, color gray-400)
   - "Read article" link (font-size 14px, color blue-500)

**Hover State:**
- Shadow elevation increase
- Image slight zoom (scale 1.05)
- "Read article" link underline


### 5. Button Components

#### Primary CTA Button
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}
```

**Primary Button Design:**
- Background: gradient from orange (#FF6B35) to red (#EF4444)
- Text color: white (#FFFFFF)
- Font: 16px (md), 18px (lg), font-weight 600
- Padding: 12px 32px (md), 16px 40px (lg)
- Border radius: 9999px (fully rounded)
- Shadow: 0 4px 12px rgba(255,107,53,0.3)
- Transition: all 200ms ease-out

**Hover State:**
- Transform: scale(1.05)
- Shadow: 0 6px 20px rgba(255,107,53,0.4)
- Brightness: filter brightness(1.1)

**Secondary Button Design:**
- Background: gray-200 (#E5E7EB)
- Text color: gray-800 (#1F2937)
- Same dimensions as primary
- Hover: background gray-300, no scale transform

**Ghost Button Design:**
- Background: transparent
- Text color: gray-600
- Border: 1px solid gray-300
- Hover: background gray-50, border gray-400

