# Mobile Wedding Invitation Specification

## Project Overview

최유진 & 권동현 모바일 청첩장 웹 애플리케이션

## Tech Stack

- React 19.1.1
- TypeScript
- Tailwind CSS v4
- Vite

## Current Status

**Last Updated**: 2025-10-25

**Progress**: Phase 2 (Content Integration) - In Progress

**Completed Features**:

- ✅ Full-height layout implementation
- ✅ Background music with toggle control
- ✅ Photo gallery with modal viewer
- ✅ Basic styling and responsive design
- ✅ Asset management (public/ and src/assets/)

**Next Steps**:

- ⏳ Calendar component implementation
- ⏳ Map integration (Naver Maps)
- ⏳ Copy to clipboard functionality
- ⏳ KakaoTalk share integration

## Design Requirements

### Layout Structure

각 섹션은 모바일 뷰포트 기준 전체 화면을 채우는 full-height 레이아웃

### Sections (순서대로)

#### 1. Main Photo Section (메인 사진)

- **Purpose**: 신랑 신부의 메인 사진 표시
- **Layout**: 전체 화면 (min-h-screen)
- **Status**: ✅ Implemented
- **Content**:
  - 대표 사진 영역 (placeholder)
  - 신랑 신부 이름: "최유진 & 권동현"
  - 결혼식 날짜: "2026.03.XX"
- **Styling**:
  - 배경: gradient from rose-50 to white
  - 텍스트: serif 폰트, center aligned

#### 2. Date & Venue Info (날짜 및 식장 정보)

- **Purpose**: 결혼식 개최 정보
- **Layout**: 전체 화면 (min-h-screen)
- **Status**: ✅ Implemented
- **Content**:
  - 결혼식 날짜 및 시간 (placeholder)
  - 식장 이름 (placeholder)
  - 식장 주소 (placeholder)
- **Styling**:
  - 배경: white
  - 여백: space-y-8
  - border-top으로 섹션 구분

#### 3. Parents Section (부모님 파트)

- **Purpose**: 양가 부모님 정보
- **Layout**: 전체 화면 (min-h-screen)
- **Status**: ✅ Implemented
- **Content**:
  - 신랑측 (동현) 부모님 정보 (placeholder)
  - 신부측 (유진) 부모님 정보 (placeholder)
- **Styling**:
  - 배경: rose-50
  - border-top으로 양가 구분
  - space-y-12로 여백

#### 4. Photo Gallery Section (우리의 순간들)

- **Purpose**: 신랑 신부 사진 갤러리 및 연락처
- **Layout**: 전체 화면 (min-h-screen)
- **Status**: ✅ Implemented
- **Content**:
  - **Photo Gallery**: 3x4 격자 레이아웃 (10장)
    - 이미지 위치: `src/assets/gallery/image1~10.jpeg`
    - 클릭 시 전체 화면 모달 뷰어
    - 좌우 화살표로 이미지 탐색
    - 키보드 네비게이션 (← → ESC)
    - 사진 카운터 표시
  - **연락처**:
    - 신랑 권동현 (연락하기 버튼)
    - 신부 최유진 (연락하기 버튼)
- **Components**:
  - `PhotoGallery.tsx`: 갤러리 및 모달 뷰어
- **Features**:
  - Modal: fixed inset-0, 100vh/100vw
  - Image: max-w-full max-h-full, object-contain
  - Navigation: 화살표 버튼, 키보드 지원
  - Accessibility: ARIA labels, focus management

#### 5. Calendar Section (날짜 상세)

- **Purpose**: 결혼식 날짜를 캘린더로 표시
- **Layout**: 전체 화면 (min-h-screen)
- **Status**: ⏳ Placeholder
- **Content**:
  - 캘린더 컴포넌트 (예정)
  - D-day 카운터 (예정)
- **Styling**:
  - 배경: rose-50
  - 카드 스타일: white rounded-lg shadow-sm

#### 6. Location Guide (교통 안내)

- **Purpose**: 식장 위치 및 교통편 안내
- **Layout**: 전체 화면 (min-h-screen)
- **Status**: ⏳ Placeholder
- **Content**:
  - 지도 영역 (네이버 지도 연동 예정)
  - 🚇 지하철 안내 (placeholder)
  - 🚌 버스 안내 (placeholder)
  - 🚗 주차 안내 (placeholder)
- **Styling**:
  - 배경: white
  - 지도 영역: gray-100, h-64, rounded-lg

#### 7. Gift Section (마음 전하실 곳)

- **Purpose**: 축의금 계좌 정보
- **Layout**: 전체 화면 (min-h-screen)
- **Status**: ✅ Implemented (UI only, 기능 예정)
- **Content**:
  - 신랑측 계좌번호 (복사 기능 예정)
  - 신부측 계좌번호 (복사 기능 예정)
  - 💛 카카오페이 송금하기 버튼
    - 링크: `https://qr.kakaopay.com/Ej86awFY5`
- **Styling**:
  - 배경: rose-50
  - 카드: white rounded-lg shadow-sm
  - 복사 버튼: gray-800 background
  - 카카오페이: yellow-400 background

#### 8. Share Links (청첩장 공유하기)

- **Purpose**: 청첩장 공유
- **Layout**: 전체 화면 (min-h-screen)
- **Status**: ✅ Implemented (UI only, 기능 예정)
- **Content**:
  - 💬 카카오톡 공유 버튼 (기능 예정)
  - 🔗 링크 복사 버튼 (기능 예정)
  - Footer: © 2026 Wedding Invitation
- **Styling**:
  - 배경: white
  - 카카오톡: yellow-400 background
  - 링크 복사: border-2 border-gray-300

## Styling Guidelines

### Color Scheme (Implemented)

- **Primary**: Rose (rose-50, rose-200, rose-400, rose-600)
- **Background**:
  - White (white) - 짝수 섹션
  - Rose-50 - 홀수 섹션
  - Gradient: from-rose-50 to-white (메인 섹션)
- **Text**:
  - Heading: gray-800
  - Body: gray-600, gray-700
  - Muted: gray-500
- **Accent**:
  - Yellow-400 (카카오톡/카카오페이)
  - Gray-800 (버튼, 강조)

### Typography

- Heading: 우아한 serif 폰트
- Body: 가독성 좋은 sans-serif 폰트

### Responsive Design

- Mobile-first approach
- 최소 너비: 320px
- 최대 너비: 480px (모바일 최적화)
- Tablet/Desktop에서는 중앙 정렬

### Animation

- Smooth scroll between sections
- Subtle fade-in animations
- Smooth transitions

## Development Phases

### Phase 1: Basic Layout ✅ COMPLETED

- ✅ Section structure defined
- ✅ Full-height layout implementation (min-h-screen)
- ✅ Basic styling with Tailwind CSS
- ✅ Responsive design (mobile-first)
- ✅ Color scheme implementation

### Phase 2: Content Integration 🔄 IN PROGRESS

- ✅ Background music system
  - Auto-play on user interaction
  - Floating toggle button (bottom-left)
  - Component: `BackgroundMusic.tsx`
  - File: `public/bgm.mp3`
- ✅ Photo gallery (10 images)
  - 3x4 grid layout
  - Modal viewer with navigation
  - Component: `PhotoGallery.tsx`
  - Images: `src/assets/gallery/image1~10.jpeg`
- ✅ Asset management structure
  - Public folder for static assets (favicon, OG image, BGM)
  - Src/assets for imported images
- ⏳ Add actual wedding information
- ⏳ Typography setup and custom fonts

### Phase 3: Interactive Features ⏳ PENDING

- ⏳ Calendar component
  - Date display
  - D-day countdown
- ⏳ Map integration (Naver Maps API)
  - Location display
  - Directions
- ⏳ Copy to clipboard functionality
  - Account numbers
  - URL sharing
- ⏳ Share functionality
  - KakaoTalk share API
  - URL copy

### Phase 4: Polish & Optimization ⏳ PENDING

- ⏳ Smooth scroll animations
- ⏳ Fade-in animations
- ⏳ Performance optimization
  - Image lazy loading
  - Code splitting
- ⏳ Cross-browser testing
- ⏳ Mobile device testing
- ⏳ SEO optimization
- ⏳ Final design refinements

## Technical Notes

### Tailwind CSS v4 Configuration

- Using `@tailwindcss/vite` plugin
- No separate config file needed (v4 uses CSS-based configuration)

### File Structure

```
mobile-rsvp/
├── public/                      # Static assets (Vite public folder)
│   ├── bgm.mp3                 # Background music file
│   ├── love-letter.svg         # Favicon
│   └── KakaoTalk_Photo_..._002.jpeg  # OG image
├── src/
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Entry point
│   ├── components/             # React components
│   │   ├── BackgroundMusic.tsx # BGM player with toggle
│   │   └── PhotoGallery.tsx    # Photo gallery with modal
│   ├── assets/                 # Imported assets
│   │   └── gallery/            # Gallery images (10 files)
│   │       └── image1~10.jpeg
├── index.html                  # HTML template with meta tags
├── SPEC.md                     # This specification document
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Components Documentation

### BackgroundMusic Component

**File**: `src/components/BackgroundMusic.tsx`

**Features**:

- Audio element with loop
- Auto-play on user interaction (click, touch, scroll)
- Floating toggle button (fixed bottom-6 left-6)
- Play/Pause icon states
- Initial notification message

**Props**: None

**State**:

- `isPlaying`: boolean - current playback state
- `hasInteracted`: boolean - user interaction flag

### PhotoGallery Component

**File**: `src/components/PhotoGallery.tsx`

**Features**:

- 3x4 grid layout (3 columns, aspect-square)
- Click to open full-screen modal
- Modal navigation (← → arrows, keyboard)
- Photo counter (e.g., "3 / 10")
- Accessibility (ARIA labels, keyboard support)

**Props**: None

**State**:

- `selectedIndex`: number | null - currently selected photo

**Keyboard Support**:

- `←` Previous photo
- `→` Next photo
- `ESC` Close modal

## Asset Management

### Public Folder (`public/`)

Files accessed directly via URL path:

- `bgm.mp3` - Background music (accessed as `/bgm.mp3`)
- `love-letter.svg` - Favicon (accessed as `/love-letter.svg`)
- OG images for social sharing

**Usage**: Direct URL references in HTML or audio elements

### Src Assets (`src/assets/`)

Files imported in React components:

- Gallery images (`src/assets/gallery/`)
- Component-specific images

**Usage**: Import statements in components

```tsx
import image1 from "../assets/gallery/image1.jpeg";
```

## Meta Tags & SEO

**Implemented in** `index.html`:

- Title: "최유진과 권동현 결혼합니다 🤵🏻‍♂️👰🏻‍♀️"
- Description: "2026.03.XX (X) XX:XX"
- Open Graph tags for social sharing
- Twitter Card tags
- Favicon

## Next Steps

### Immediate (Phase 2 completion)

1. ✅ ~~Background music implementation~~
2. ✅ ~~Photo gallery with modal viewer~~
3. Add actual wedding information (dates, venue, names)
4. Implement copy to clipboard for account numbers
5. Implement URL copy functionality

### Short-term (Phase 3)

1. Calendar component with D-day counter
2. Naver Maps integration
3. KakaoTalk share API integration
4. Phone number links (tel:)

### Long-term (Phase 4)

1. Scroll animations
2. Image optimization and lazy loading
3. Performance testing
4. Cross-browser compatibility testing
5. Mobile device testing (iOS Safari, Android Chrome)
