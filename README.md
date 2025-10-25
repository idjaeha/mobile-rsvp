# Mobile RSVP - 모바일 청첩장

모바일에 최적화된 웨딩 초대장 웹 애플리케이션입니다.

## 기술 스택

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.16
- **Code Quality**: ESLint 9.36.0

## 주요 기능

### 1. 메인 초대장 섹션

- 신랑 신부 이름과 결혼식 날짜 표시
- 대표 이미지 섹션

### 2. 결혼식 정보

- 날짜, 시간, 요일 정보
- 예식장 이름, 주소, 층 정보

### 3. 혼주 소개

- 신랑/신부 양가 부모님 정보 표시

### 4. 갤러리 섹션

- 커플 사진 갤러리 (스와이프 기능 지원)
- 이미지 preview 시 자동 포커스
- 전화 연결 기능 (원터치 콜)

### 5. 캘린더

- 결혼식 날짜 하이라이트 캘린더

### 6. 찾아오시는 길

- Kakao Map 연동
- 지하철, 버스, 주차 정보 제공
- 위치 정보 (위도, 경도)

### 7. 마음 전하실 곳 (축의금)

- 신랑/신부 측 계좌 정보
- 신랑/신부 및 양가 부모님 계좌 표시
- Kakao Pay QR 코드 지원

### 8. 공유하기

- Kakao Talk 공유 기능
- URL 링크 복사 기능

### 9. 배경 음악

- 자동 재생 배경 음악 지원

## 프로젝트 구조

```
src/
├── components/
│   ├── sections/
│   │   ├── MainPhotoSection.tsx       # 메인 사진 섹션
│   │   ├── DateVenueSection.tsx       # 날짜/장소 정보
│   │   ├── ParentsSection.tsx         # 혼주 정보
│   │   ├── CoupleGallerySection.tsx   # 갤러리 & 연락하기
│   │   ├── CalendarSection.tsx        # 캘린더
│   │   ├── LocationSection.tsx        # 찾아오시는 길
│   │   ├── GiftSection.tsx           # 마음 전하실 곳
│   │   └── ShareSection.tsx          # 공유하기
│   ├── WeddingCalendar.tsx           # 캘린더 컴포넌트
│   ├── PhotoGallery.tsx              # 사진 갤러리 컴포넌트
│   └── BackgroundMusic.tsx           # 배경 음악 컴포넌트
├── data/
│   └── wedding.json                  # 결혼식 데이터
├── types/
│   └── wedding.ts                    # TypeScript 타입 정의
├── utils/
│   └── kakao.ts                      # Kakao SDK 유틸
├── App.tsx                           # 메인 앱 컴포넌트
└── main.tsx                          # 엔트리 포인트
```

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
```

### 린트 실행

```bash
npm run lint
```

### 미리보기

```bash
npm run preview
```

## 설정 방법

### 1. 결혼식 정보 수정

`src/data/wedding.json` 파일을 수정하여 결혼식 정보를 업데이트합니다:

- 신랑/신부 정보
- 결혼식 날짜, 시간, 장소
- 계좌 정보
- 교통 정보
- 갤러리 이미지 경로

### 2. Kakao 개발자 키 설정

`src/utils/kakao.ts` 파일에서 Kakao JavaScript SDK 키를 설정합니다.

### 3. 이미지 및 음악 파일

`public/` 디렉토리에 다음 파일들을 추가합니다:

- `/images/` - 갤러리 이미지들
- `/thumbnail.jpeg` - OG 이미지
- `/bgm.mp3` - 배경 음악

## 최근 업데이트

- 스와이프 기능 추가
- 갤러리 preview 시 포커스 기능
- 데이터 하드코딩 제거 및 JSON 분리
- 카카오톡 공유 기능 구현
- 찾아오시는 길 기능 구현
- 컴포넌트 분리 및 구조 개선
