# Data Management Strategy for Wedding Invitation

## 현재 상황 분석

### 현재 문제점

- 모든 데이터가 `App.tsx` 컴포넌트 내부에 하드코딩됨
- 데이터 수정 시 코드 변경 필요
- 재사용성 낮음
- 타입 안정성 부족
- 여러 곳에 분산된 데이터 (신랑/신부 정보, 계좌, 식장 정보 등)

### 관리해야 할 데이터

```typescript
// 1. 신랑/신부 기본 정보
- 이름, 연락처

// 2. 계좌 정보 (6개)
- 신랑, 신랑 아버지, 신랑 어머니
- 신부, 신부 아버지, 신부 어머니

// 3. 결혼식 정보
- 날짜, 시간, 요일
- 식장 이름, 주소
- 좌표 (위도, 경도)

// 4. 부모님 정보
- 양가 부모님 이름

// 5. 교통 정보
- 지하철, 버스, 주차 안내

// 6. 지도 정보
- 카카오맵 URL, 이미지 URL
```

---

## 데이터 관리 방식 옵션

### 옵션 1: JSON 파일 (권장 ⭐)

**구조:**

```
src/
├── data/
│   └── wedding.json
└── types/
    └── wedding.ts
```

**장점:**

- ✅ 간단하고 직관적
- ✅ 코드 변경 없이 데이터만 수정 가능
- ✅ JSON Schema로 유효성 검증 가능
- ✅ 빌드 타임에 번들링되어 추가 요청 없음
- ✅ 타입스크립트 타입 정의 가능

**단점:**

- ❌ 런타임에 동적 변경 불가
- ❌ 여러 청첩장 관리 시 파일 교체 필요

**적합한 경우:**

- 단일 청첩장 프로젝트
- 데이터가 배포 후 변경되지 않음
- 간단한 구조

---

### 옵션 2: TypeScript 상수 파일

**구조:**

```
src/
├── constants/
│   ├── wedding.ts
│   ├── accounts.ts
│   └── venue.ts
└── types/
    └── wedding.ts
```

**장점:**

- ✅ 완벽한 타입 안정성
- ✅ IDE 자동완성 지원
- ✅ 컴파일 타임 에러 검출
- ✅ 트리 쉐이킹 가능
- ✅ 모듈별 분리 가능

**단점:**

- ❌ 데이터 변경 시 코드 수정 필요
- ❌ 빌드 필요

**적합한 경우:**

- 타입 안정성 최우선
- 개발자가 데이터 관리
- 복잡한 비즈니스 로직

---

### 옵션 3: 환경 변수 (.env)

**구조:**

```
.env
.env.example
```

**장점:**

- ✅ 민감한 정보 보호 (계좌번호 등)
- ✅ 배포 환경별 다른 값 사용 가능
- ✅ Git에서 제외 가능

**단점:**

- ❌ 문자열만 지원 (객체 구조 불가)
- ❌ 많은 변수 관리 어려움
- ❌ 타입 안정성 부족

**적합한 경우:**

- API 키, 민감한 정보
- 환경별 설정 값
- 소수의 설정 값

---

### 옵션 4: CMS/Headless CMS (고급)

**예시:** Contentful, Strapi, Sanity

**장점:**

- ✅ 비개발자가 데이터 수정 가능
- ✅ 실시간 업데이트
- ✅ 미디어 관리 기능
- ✅ 여러 청첩장 관리 가능
- ✅ API 제공

**단점:**

- ❌ 외부 서비스 의존
- ❌ 추가 비용 (무료 플랜 제한)
- ❌ 네트워크 요청 필요
- ❌ 복잡한 설정

**적합한 경우:**

- 청첩장 플랫폼 서비스
- 여러 커플의 청첩장 관리
- 비개발자 사용자

---

### 옵션 5: Firebase/Supabase (중급)

**구조:**

```
Firebase Realtime Database / Firestore
또는
Supabase PostgreSQL
```

**장점:**

- ✅ 실시간 업데이트
- ✅ 인증/권한 관리
- ✅ 무료 플랜 제공
- ✅ 방명록, RSVP 기능 확장 가능

**단점:**

- ❌ 외부 서비스 설정 필요
- ❌ 네트워크 요청 오버헤드
- ❌ 초기 로딩 시간 증가

**적합한 경우:**

- RSVP, 방명록 등 동적 기능 필요
- 실시간 업데이트 필요
- 데이터베이스 경험 있음

---

## 권장 솔루션: JSON + TypeScript

### 이유

1. **단순성**: 이 프로젝트는 단일 청첩장 (정적 데이터)
2. **타입 안정성**: TypeScript 인터페이스로 타입 보장
3. **유지보수성**: 데이터와 로직 분리
4. **성능**: 추가 네트워크 요청 없음
5. **버전 관리**: Git으로 데이터 변경 이력 추적

### 구현 구조

```
src/
├── data/
│   └── wedding.json          # 모든 청첩장 데이터
├── types/
│   └── wedding.ts            # 타입 정의
├── hooks/
│   └── useWeddingData.ts     # 데이터 접근 훅 (선택)
└── App.tsx                   # 데이터 import하여 사용
```

---

## 데이터 구조 설계

### wedding.json

```json
{
  "couple": {
    "groom": {
      "name": "곽동현",
      "fullName": "곽동현",
      "phone": "01029473827",
      "father": "곽○○",
      "mother": "○○○"
    },
    "bride": {
      "name": "최유진",
      "fullName": "최유진",
      "phone": "01029473827",
      "father": "최○○",
      "mother": "○○○"
    }
  },
  "wedding": {
    "date": "2026-03-21",
    "time": "14:00",
    "dayOfWeek": "토요일",
    "venue": {
      "name": "식장 이름",
      "address": "서울시 강남구 테헤란로 123",
      "hall": "3층 그랜드볼룸",
      "location": {
        "latitude": 37.4979,
        "longitude": 127.0276
      }
    }
  },
  "accounts": {
    "groom": {
      "groom": {
        "name": "신랑 곽동현",
        "bank": "카카오뱅크",
        "account": "3333-01-2345678",
        "kakaoPayLink": "https://qr.kakaopay.com/Ej86awFY5"
      },
      "father": {
        "name": "아버지 곽○○",
        "bank": "국민은행",
        "account": "123-456-789012"
      },
      "mother": {
        "name": "어머니 ○○○",
        "bank": "신한은행",
        "account": "110-123-456789"
      }
    },
    "bride": {
      "bride": {
        "name": "신부 최유진",
        "bank": "카카오뱅크",
        "account": "3333-09-8765432",
        "kakaoPayLink": "https://qr.kakaopay.com/BRIDE_LINK"
      },
      "father": {
        "name": "아버지 최○○",
        "bank": "우리은행",
        "account": "1002-123-456789"
      },
      "mother": {
        "name": "어머니 ○○○",
        "bank": "하나은행",
        "account": "123-910-123456"
      }
    }
  },
  "transportation": {
    "subway": "2호선 강남역 3번 출구에서 도보 5분",
    "bus": "간선버스: 146, 148, 301\n지선버스: 4318, 4319",
    "parking": "건물 지하 1층~3층 주차 가능 (최대 3시간 무료)"
  },
  "map": {
    "kakao": {
      "url": "https://map.kakao.com/?urlX=509642&urlY=1113296&urlLevel=3",
      "imageUrl": "https://map2.daum.net/map/mapservice?FORMAT=PNG&SCALE=2.5&MX=509642&MY=1113296&S=0&IW=504&IH=310&LANG=0&COORDSTM=WCONGNAMUL&logo=kakao_logo"
    }
  },
  "gallery": {
    "images": [
      "/images/gallery/image1.jpeg",
      "/images/gallery/image2.jpeg",
      "/images/gallery/image3.jpeg",
      "/images/gallery/image4.jpeg",
      "/images/gallery/image5.jpeg",
      "/images/gallery/image6.jpeg",
      "/images/gallery/image7.jpeg",
      "/images/gallery/image8.jpeg",
      "/images/gallery/image9.jpeg",
      "/images/gallery/image10.jpeg"
    ]
  },
  "metadata": {
    "title": "최유진과 곽동현 결혼합니다 🤵🏻‍♂️👰🏻‍♀️",
    "description": "2026년 03월 21일 토요일 오후",
    "ogImage": "/thumbnail.jpeg",
    "bgmUrl": "/bgm.mp3"
  }
}
```

### wedding.ts (타입 정의)

```typescript
export interface PersonInfo {
  name: string;
  fullName?: string;
  phone?: string;
  father?: string;
  mother?: string;
}

export interface AccountInfo {
  name: string;
  bank: string;
  account: string;
  kakaoPayLink?: string;
}

export interface VenueInfo {
  name: string;
  address: string;
  hall?: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface WeddingInfo {
  date: string;
  time: string;
  dayOfWeek: string;
  venue: VenueInfo;
}

export interface WeddingData {
  couple: {
    groom: PersonInfo;
    bride: PersonInfo;
  };
  wedding: WeddingInfo;
  accounts: {
    groom: {
      groom: AccountInfo;
      father: AccountInfo;
      mother: AccountInfo;
    };
    bride: {
      bride: AccountInfo;
      father: AccountInfo;
      mother: AccountInfo;
    };
  };
  transportation: {
    subway: string;
    bus: string;
    parking: string;
  };
  map: {
    kakao: {
      url: string;
      imageUrl: string;
    };
  };
  gallery: {
    images: string[];
  };
  metadata: {
    title: string;
    description: string;
    ogImage: string;
    bgmUrl: string;
  };
}
```

---

## 구현 방법

### 1단계: 타입 정의

**src/types/wedding.ts** 파일 생성 (위 타입 정의 사용)

### 2단계: 데이터 파일

**src/data/wedding.json** 파일 생성 (위 JSON 구조 사용)

### 3단계: App.tsx에서 사용

```typescript
import weddingData from './data/wedding.json';
import type { WeddingData } from './types/wedding';

function App() {
  const data = weddingData as WeddingData;

  return (
    <div>
      <CoupleGallerySection
        groomPhone={data.couple.groom.phone}
        bridePhone={data.couple.bride.phone}
        onCall={handleCall}
      />
      <GiftSection
        groomAccounts={data.accounts.groom}
        brideAccounts={data.accounts.bride}
      />
      <LocationSection
        placeName={data.wedding.venue.name}
        address={data.wedding.venue.address}
        latitude={data.wedding.venue.location.latitude}
        longitude={data.wedding.venue.location.longitude}
        subway={data.transportation.subway}
        bus={data.transportation.bus}
        parking={data.transportation.parking}
      />
    </div>
  );
}
```

### 4단계: 선택적 - Custom Hook (권장)

**src/hooks/useWeddingData.ts**

```typescript
import weddingData from "../data/wedding.json";
import type { WeddingData } from "../types/wedding";

export function useWeddingData() {
  return weddingData as WeddingData;
}

// 사용
function App() {
  const data = useWeddingData();
  // ...
}
```

---

## 향후 확장 가능성

### 다국어 지원 (i18n)

```
src/data/
├── wedding.ko.json
├── wedding.en.json
└── wedding.ja.json
```

### 테마 지원

```json
{
  "theme": {
    "primaryColor": "#fecdd3",
    "accentColor": "#fbbf24",
    "fontFamily": "serif"
  }
}
```

### 환경별 데이터

```
src/data/
├── wedding.dev.json
├── wedding.staging.json
└── wedding.prod.json
```

---

## 마이그레이션 체크리스트

- [ ] `src/types/wedding.ts` 파일 생성
- [ ] `src/data/wedding.json` 파일 생성
- [ ] App.tsx에서 하드코딩된 데이터 제거
- [ ] JSON 데이터 import 및 사용
- [ ] 모든 컴포넌트에 데이터 props 전달
- [ ] 타입 에러 수정
- [ ] 기능 테스트
- [ ] 데이터 유효성 검증 (선택)

---

## 보안 고려사항

### 민감한 정보 처리

**계좌번호, 전화번호 등:**

- Git에 포함해도 무방 (공개될 정보)
- 단, 개인정보 보호가 중요하다면:
  1. `.env` 파일 사용
  2. 빌드 시 주입
  3. 서버리스 함수로 보호

**카카오페이 링크:**

- QR 코드 URL은 공개 가능
- 단, 계좌 정보는 마스킹 고려

---

## 결론

**권장 방식: JSON + TypeScript**

1. ✅ **간단함**: 설정 최소화
2. ✅ **타입 안정성**: 컴파일 타임 검증
3. ✅ **유지보수**: 데이터와 로직 분리
4. ✅ **성능**: 빌드 타임 번들링
5. ✅ **확장성**: 향후 i18n, 테마 등 확장 가능

이 프로젝트의 규모와 요구사항에 가장 적합한 솔루션입니다.
