# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Common Development Tasks
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint on the codebase
- `npm run preview` - Preview the production build locally

### Testing
This project does not currently have tests configured. If tests are added, update this section.

## Architecture Overview

### Project Type
Mobile-first React wedding invitation web application for 최유진 & 권동현's wedding.

### Tech Stack
- **React 19.1.1** with TypeScript
- **Vite 7.1.7** for build tooling
- **Tailwind CSS v4** for styling (using @tailwindcss/vite plugin)
- **ESLint** with TypeScript and React configurations

### Data Architecture
**Centralized JSON-based data management** with TypeScript type safety:
- All wedding data stored in `src/data/wedding.json`
- Type definitions in `src/types/wedding.ts`
- Components receive data as props from main App component
- No external API dependencies - all data is static JSON

### Key Data Types
```typescript
interface WeddingData {
  couple: { groom: PersonInfo; bride: PersonInfo; };
  wedding: WeddingInfo; // date, time, venue with coordinates
  accounts: { groom: {...}; bride: {...}; }; // 6 total accounts for gift section
  map: { kakao: { url: string; imageUrl: string; }; };
  gallery: { images: string[]; }; // 10 gallery images
  metadata: { title: string; description: string; ogImage: string; bgmUrl: string; };
}
```

### Component Architecture
**Section-based organization** - each section is a full-height mobile screen:
1. `MainPhotoSection` - Hero section with couple names and wedding date
2. `DateVenueSection` - Wedding details (date, time, venue)
3. `ParentsSection` - Both families' parent information
4. `CoupleGallerySection` - Photo gallery + contact buttons
5. `CalendarSection` - Calendar with D-day countdown
6. `LocationSection` - Venue map and transportation info
7. `DressCodeSection` - Dress code information
8. `GiftSection` - Account information for monetary gifts
9. `ShareSection` - KakaoTalk sharing and link copying

### Special Components
- `BackgroundMusic` - Auto-play background music with toggle control
- `PhotoGallery` - Grid gallery with full-screen modal viewer
- `WeddingCalendar` - Custom calendar component with D-day calculation

### File Structure Patterns
```
src/
├── components/
│   ├── sections/           # Full-screen section components
│   └── [SpecialComponents] # Standalone utility components
├── data/
│   └── wedding.json        # All wedding data
├── types/
│   └── wedding.ts          # TypeScript interfaces
├── utils/
│   └── kakao.ts            # Kakao SDK integration
└── assets/
    └── gallery/            # Gallery images (image1-10.jpeg)
```

### Asset Management
- **Public assets**: `public/` for direct URL access (bgm.mp3, favicon, OG images)
- **Imported assets**: `src/assets/` for component imports (gallery images)
- **Gallery images**: Exactly 10 images named `image1.jpeg` through `image10.jpeg`

### External Integrations
- **Kakao SDK**: For KakaoTalk sharing functionality
- **Kakao Maps**: For venue location display
- **Clipboard API**: For copying links and account information

### Mobile-First Design
- All sections use `min-h-screen` for full viewport height
- Snap scroll between sections with `snap-container` and `snap-section` classes
- Optimized for mobile viewport (320px - 480px width)
- Alternating background colors: white and rose-50

### State Management
- No external state management (Redux, Zustand, etc.)
- Local component state only (useState for modal, music player, etc.)
- Props drilling from main App component to sections

## Development Notes

### Data Updates
To modify wedding information, edit `src/data/wedding.json` - no component code changes needed.

### Adding New Sections
1. Create new component in `src/components/sections/`
2. Import and add to App.tsx within a `snap-section` div
3. Follow existing pattern of receiving data via props

### Styling Conventions
- Tailwind CSS v4 with CSS-based configuration
- Color palette: Rose theme (rose-50, rose-200, etc.) with yellow accents for Kakao branding
- Typography: Serif for headings, sans-serif for body text
- Consistent spacing with Tailwind's space utilities

### TypeScript Patterns
- All components are functional components with TypeScript
- Props interfaces defined inline or imported from `types/wedding.ts`
- Strict typing for wedding data structure