# Mobile Wedding Invitation Specification

## Project Overview
모바일 청첩장 웹 애플리케이션

## Tech Stack
- React 19.1.1
- TypeScript
- Tailwind CSS v4
- Vite

## Design Requirements

### Layout Structure
각 섹션은 모바일 뷰포트 기준 전체 화면을 채우는 full-height 레이아웃

### Sections (순서대로)

#### 1. Main Photo Section (메인 사진)
- **Purpose**: 신랑 신부의 메인 사진 표시
- **Layout**: 전체 화면 (100vh)
- **Content**:
  - 대표 사진
  - 신랑 신부 이름
  - 결혼식 날짜 (간단한 표시)

#### 2. Date & Venue Info (날짜 및 식장 정보)
- **Purpose**: 결혼식 개최 정보
- **Layout**: 전체 화면 (100vh)
- **Content**:
  - 결혼식 날짜 및 시간
  - 식장 이름
  - 식장 주소

#### 3. Parents Section (부모님 파트)
- **Purpose**: 양가 부모님 정보
- **Layout**: 전체 화면 (100vh)
- **Content**:
  - 신랑측 부모님 성함
  - 신부측 부모님 성함

#### 4. Couple Section (신랑 신부 파트)
- **Purpose**: 신랑 신부 소개
- **Layout**: 전체 화면 (100vh)
- **Content**:
  - 신랑 정보 (이름, 연락처)
  - 신부 정보 (이름, 연락처)

#### 5. Calendar Section (날짜 상세)
- **Purpose**: 결혼식 날짜를 캘린더로 표시
- **Layout**: 전체 화면 (100vh)
- **Content**:
  - 캘린더 컴포넌트
  - D-day 카운터

#### 6. Location Guide (교통 안내)
- **Purpose**: 식장 위치 및 교통편 안내
- **Layout**: 전체 화면 (100vh)
- **Content**:
  - 지도 (네이버 지도 연동 예정)
  - 대중교통 안내
  - 주차 안내

#### 7. Gift Section (마음 전하는 곳)
- **Purpose**: 축의금 계좌 정보
- **Layout**: 전체 화면 (100vh)
- **Content**:
  - 신랑측 계좌번호 (복사 기능)
  - 신부측 계좌번호 (복사 기능)
  - 카카오페이 송금 링크

#### 8. Share Links (링크)
- **Purpose**: 청첩장 공유
- **Layout**: 전체 화면 (100vh)
- **Content**:
  - 카카오톡 공유
  - URL 복사
  - SNS 공유

## Styling Guidelines

### Color Scheme
- Primary: 우아한 파스텔 톤 (추후 결정)
- Background: White / Soft beige
- Text: Dark gray / Black
- Accent: Gold / Rose gold

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

### Phase 1: Basic Layout (Current)
- ✅ Section structure defined
- 🔄 Full-height layout implementation
- ⏳ Basic styling with Tailwind CSS

### Phase 2: Content Integration
- ⏳ Add actual content to each section
- ⏳ Image integration
- ⏳ Typography setup

### Phase 3: Interactive Features
- ⏳ Calendar component
- ⏳ Map integration (Naver Maps)
- ⏳ Copy to clipboard functionality
- ⏳ Share functionality (KakaoTalk)

### Phase 4: Polish & Optimization
- ⏳ Animations
- ⏳ Performance optimization
- ⏳ Cross-browser testing
- ⏳ Final design refinements

## Technical Notes

### Tailwind CSS v4 Configuration
- Using `@tailwindcss/vite` plugin
- No separate config file needed (v4 uses CSS-based configuration)

### File Structure
```
src/
├── App.tsx           # Main application component
├── components/       # Reusable components (to be created)
├── assets/          # Images and static files
└── styles/          # Custom styles (if needed)
```

## Next Steps
1. Implement full-height sections with Tailwind CSS
2. Add basic styling and visual hierarchy
3. Create component structure for each section
4. Integrate actual content and images
