# 로컬 폰트 적용 스펙 문서

## 📋 개요

현재 프로젝트에서 Google Fonts 대신 로컬에 있는 **경기천년 폰트**를 적용하여 웹 성능을 개선하고 일관된 한글 타이포그래피를 구현합니다.

---

## 🎯 목표

1. **Google Fonts 의존성 제거**: 외부 CDN 요청 제거로 로딩 속도 개선
2. **한글 타이포그래피 최적화**: 웨딩 청첩장에 적합한 우아한 한글 폰트 적용
3. **웹 성능 향상**: WOFF2 형식 변환으로 파일 크기 30% 감소
4. **오프라인 지원**: 네트워크 없이도 폰트 로드 가능

---

## 📦 현재 상황 분석

### 보유 폰트 파일

```
src/assets/font/
├── 경기천년바탕OTF_Regular.otf    (3.5MB) - 본문용 기본체
├── 경기천년바탕OTF_Bold.otf       (3.5MB) - 본문용 굵은체
├── 경기천년제목OTF_Light.otf      (988KB) - 제목용 얇은체
├── 경기천년제목OTF_Medium.otf     (1.1MB) - 제목용 중간체
├── 경기천년제목OTF_Bold.otf       (1.1MB) - 제목용 굵은체
└── 경기천년제목OTFV_Bold.otf      (1.1MB) - 제목용 세로쓰기 굵은체
```

**총 용량**: ~11.3MB (OTF 원본)

### 현재 사용 중인 폰트 (Google Fonts)

```css
--font-display: "Lora", "Noto Serif KR", serif; /* 제목용 */
--font-secondary: "Crimson Pro", "Noto Serif KR", serif; /* 보조 제목용 */
--font-body: "Nunito Sans", -apple-system, sans-serif; /* 본문용 */
```

---

## 🔄 변환 전략

### OTF → WOFF2 변환 필요성

| 형식  | 용량 | 압축률 | 브라우저 지원 | 권장도 |
| ----- | ---- | ------ | ------------- | ------ |
| OTF   | 100% | 없음   | 95%+          | ❌     |
| WOFF  | ~60% | 기본   | 98%+          | ⚠️     |
| WOFF2 | ~40% | 고급   | 96%+          | ✅     |

**예상 효과**: 11.3MB → **약 4.5MB** (60% 감소)

### 변환 도구 옵션

1. **온라인 변환기** (빠르고 간단)

   - https://transfonter.org/ (추천)
   - https://fontsource.org/tools/converter
   - https://cloudconvert.com/otf-to-woff2

2. **CLI 도구** (자동화 가능)
   ```bash
   npm install -g woff2
   woff2_compress 경기천년바탕OTF_Regular.otf
   ```

---

## 📁 파일 구조 설계

### 옵션 A: Public 폴더 (권장)

```
public/
└── fonts/
    ├── GyeonggiCheonnyeonBatang-Regular.woff2
    ├── GyeonggiCheonnyeonBatang-Regular.woff
    ├── GyeonggiCheonnyeonBatang-Bold.woff2
    ├── GyeonggiCheonnyeonBatang-Bold.woff
    ├── GyeonggiCheonnyeonJemok-Light.woff2
    ├── GyeonggiCheonnyeonJemok-Light.woff
    ├── GyeonggiCheonnyeonJemok-Medium.woff2
    ├── GyeonggiCheonnyeonJemok-Medium.woff
    ├── GyeonggiCheonnyeonJemok-Bold.woff2
    └── GyeonggiCheonnyeonJemok-Bold.woff
```

**장점**:

- 빌드 시 해시 처리 안 됨 → URL이 변경되지 않음
- 캐싱 전략 단순화
- 절대 경로로 간단한 참조 (`/fonts/...`)

**단점**:

- 캐시 버스팅 수동 관리 필요

### 옵션 B: Assets 폴더

```
src/assets/fonts/
├── GyeonggiCheonnyeonBatang-Regular.woff2
├── GyeonggiCheonnyeonBatang-Bold.woff2
├── GyeonggiCheonnyeonJemok-Light.woff2
├── GyeonggiCheonnyeonJemok-Medium.woff2
└── GyeonggiCheonnyeonJemok-Bold.woff2
```

**장점**:

- Vite가 빌드 시 해시 추가 → 자동 캐시 버스팅
- 번들 최적화에 포함

**단점**:

- CSS에서 import 필요
- 상대 경로 관리 복잡도 증가

**✅ 추천**: **옵션 A (Public 폴더)** - 청첩장은 자주 업데이트되지 않으므로 캐싱 우선

---

## 💻 구현 방법

### 1단계: @font-face 선언

`src/index.css`에 추가:

```css
/* 경기천년 바탕체 (본문용) */
@font-face {
  font-family: "Gyeonggi Cheonnyeon Batang";
  src: local("경기천년바탕OTF"),
    url("/fonts/GyeonggiCheonnyeonBatang-Regular.woff2") format("woff2"), url("/fonts/GyeonggiCheonnyeonBatang-Regular.woff")
      format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Gyeonggi Cheonnyeon Batang";
  src: local("경기천년바탕OTF Bold"),
    url("/fonts/GyeonggiCheonnyeonBatang-Bold.woff2") format("woff2"), url("/fonts/GyeonggiCheonnyeonBatang-Bold.woff")
      format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* 경기천년 제목체 (제목용) */
@font-face {
  font-family: "Gyeonggi Cheonnyeon Jemok";
  src: local("경기천년제목OTF Light"),
    url("/fonts/GyeonggiCheonnyeonJemok-Light.woff2") format("woff2"), url("/fonts/GyeonggiCheonnyeonJemok-Light.woff")
      format("woff");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Gyeonggi Cheonnyeon Jemok";
  src: local("경기천년제목OTF Medium"),
    url("/fonts/GyeonggiCheonnyeonJemok-Medium.woff2") format("woff2"), url("/fonts/GyeonggiCheonnyeonJemok-Medium.woff")
      format("woff");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Gyeonggi Cheonnyeon Jemok";
  src: local("경기천년제목OTF Bold"),
    url("/fonts/GyeonggiCheonnyeonJemok-Bold.woff2") format("woff2"), url("/fonts/GyeonggiCheonnyeonJemok-Bold.woff")
      format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

### 2단계: CSS 변수 업데이트

`src/index.css`의 `:root` 섹션:

```css
:root {
  /* 기존 Google Fonts 제거 */
  --font-display: "Gyeonggi Cheonnyeon Jemok", "Noto Serif KR", serif;
  --font-secondary: "Gyeonggi Cheonnyeon Jemok", "Noto Serif KR", serif;
  --font-body: "Gyeonggi Cheonnyeon Batang", -apple-system, "Apple SD Gothic Neo",
    sans-serif;
}
```

### 3단계: font-display 최적화

- **`swap`**: 폰트 로딩 중 시스템 폰트를 표시 → FOIT(Flash of Invisible Text) 방지
- **`fallback`**: 대안 (더 짧은 대기 시간, 더 빠른 전환)
- **`optional`**: 네트워크 상태에 따라 폰트 로드 생략 가능

**✅ 추천**: `swap` (사용자가 즉시 콘텐츠를 볼 수 있도록)

---

## 📊 성능 최적화 전략

### 1. Preload 추가 (선택적)

중요한 폰트는 `index.html`에서 미리 로드:

```html
<link
  rel="preload"
  href="/fonts/GyeonggiCheonnyeonBatang-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link
  rel="preload"
  href="/fonts/GyeonggiCheonnyeonJemok-Medium.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

**주의**: 너무 많은 preload는 역효과 → **최대 2개**만 사용

### 2. 서브셋 폰트 생성 (고급)

한글 폰트는 11,172개의 글자를 포함하므로, 사용하는 글자만 포함:

```bash
# pyftsubset 사용 (fonttools)
pip install fonttools
pyftsubset 경기천년바탕OTF_Regular.otf \
  --unicodes="U+AC00-U+D7A3" \  # 한글 음절
  --output-file="GyeonggiCheonnyeonBatang-Regular-Subset.woff2"
```

**예상 효과**: 추가 50-70% 크기 감소 가능

### 3. 브라우저 캐싱 설정

Vite 빌드 시 `vite.config.ts`에 캐시 헤더 설정:

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (
            assetInfo.name?.endsWith(".woff2") ||
            assetInfo.name?.endsWith(".woff")
          ) {
            return "fonts/[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
```

---

## 🗂️ 파일 이름 규칙

### 영문 변환 표준

| 한글 원본               | 영문 변환                        | 용도      |
| ----------------------- | -------------------------------- | --------- |
| 경기천년바탕OTF_Regular | GyeonggiCheonnyeonBatang-Regular | 본문 기본 |
| 경기천년바탕OTF_Bold    | GyeonggiCheonnyeonBatang-Bold    | 본문 강조 |
| 경기천년제목OTF_Light   | GyeonggiCheonnyeonJemok-Light    | 제목 얇음 |
| 경기천년제목OTF_Medium  | GyeonggiCheonnyeonJemok-Medium   | 제목 중간 |
| 경기천년제목OTF_Bold    | GyeonggiCheonnyeonJemok-Bold     | 제목 굵음 |

**명명 규칙**:

- PascalCase 사용
- `FontFamily-Weight.format` 패턴
- 한글 파일명 회피 (일부 서버 호환성 문제)

---

## 🔍 테스트 체크리스트

### 기능 테스트

- [ ] 모든 섹션에서 폰트가 올바르게 렌더링됨
- [ ] 제목(h1, h2, h3)에 경기천년제목 적용
- [ ] 본문(p, div)에 경기천년바탕 적용
- [ ] font-weight 변경 시 올바른 폰트 파일 로드

### 성능 테스트

- [ ] Lighthouse 점수 개선 확인
- [ ] Network 탭에서 폰트 로딩 시간 측정
- [ ] WOFF2 우선 로드 확인 (WOFF는 fallback)
- [ ] font-display: swap으로 FOIT 없음 확인

### 호환성 테스트

- [ ] Chrome/Edge (최신)
- [ ] Safari (iOS 포함)
- [ ] Firefox
- [ ] 모바일 브라우저 (Android/iOS)

---

## 📈 예상 개선 효과

| 지표          | 현재 (Google Fonts) | 예상 (로컬 폰트) | 개선율 |
| ------------- | ------------------- | ---------------- | ------ |
| 폰트 요청 수  | 3-6개 (외부 CDN)    | 2-4개 (로컬)     | -33%   |
| 폰트 크기     | 미정 (동적 로드)    | ~4.5MB (WOFF2)   | -60%   |
| 첫 폰트 로드  | ~200-500ms          | ~100-200ms       | -50%   |
| 오프라인 지원 | ❌                  | ✅               | -      |

---

## ⚠️ 주의사항

### 1. 라이선스 확인

- **경기천년 폰트**: [공공누리 제1유형](https://www.gg.go.kr/contents/contents.do?ciIdx=1294&menuId=2457)
- 상업적 이용 가능 ✅
- 출처 표시 권장 (필수 아님)

### 2. 폰트 파일 용량

- 초기 로딩에 4.5MB 추가 → 모바일 사용자 고려
- 필요한 폰트만 선택적으로 로드 권장
- 서브셋 폰트 생성 고려

### 3. Fallback 폰트 유지

- 시스템 폰트를 fallback으로 항상 포함
- 폰트 로딩 실패 시 사용자 경험 보장

---

## 🚀 실행 계획

### Phase 1: 준비 (30분)

1. OTF → WOFF2/WOFF 변환 (온라인 도구 사용)
2. 파일 이름 영문으로 변경
3. `public/fonts/` 디렉토리 생성
4. 변환된 폰트 파일 이동

### Phase 2: 구현 (20분)

1. `src/index.css`에 @font-face 선언 추가
2. CSS 변수 업데이트
3. Google Fonts import 제거 (있다면)

### Phase 3: 테스트 (15분)

1. `npm run dev`로 개발 서버 실행
2. 각 섹션 폰트 렌더링 확인
3. Network 탭에서 폰트 로딩 확인
4. 모바일 미리보기 테스트

### Phase 4: 최적화 (선택적, 30분)

1. preload 추가 (필요 시)
2. 서브셋 폰트 생성 (고급)
3. Lighthouse 성능 측정

**총 예상 시간**: 1-2시간

---

## 📚 참고 자료

- [Vite Static Assets 가이드](https://github.com/vitejs/vite/blob/main/docs/guide/assets.md)
- [MDN @font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)
- [Web Font Optimization](https://web.dev/font-best-practices/)
- [경기천년체 공식 페이지](https://www.gg.go.kr/contents/contents.do?ciIdx=1294&menuId=2457)
- [Transfonter (폰트 변환 도구)](https://transfonter.org/)

---

## 🎯 최종 권장 사항

### 최소 구성 (빠른 구현)

```
public/fonts/
├── GyeonggiCheonnyeonBatang-Regular.woff2  (본문용)
├── GyeonggiCheonnyeonJemok-Medium.woff2    (제목용)
└── GyeonggiCheonnyeonJemok-Bold.woff2      (강조용)
```

### 완전 구성 (모든 weight 지원)

```
public/fonts/
├── GyeonggiCheonnyeonBatang-Regular.woff2
├── GyeonggiCheonnyeonBatang-Bold.woff2
├── GyeonggiCheonnyeonJemok-Light.woff2
├── GyeonggiCheonnyeonJemok-Medium.woff2
└── GyeonggiCheonnyeonJemok-Bold.woff2
```

**✅ 최종 추천**: **완전 구성** - 디자인 유연성 확보 + 파일 크기 허용 범위 내
