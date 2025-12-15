# 이미지 최적화 스펙 문서

## 1. 현황 분석

### 현재 이미지 현황

| 파일명 | 크기 | 해상도 | 용도 |
|--------|------|--------|------|
| 1.png | 4.3MB | 1280x4739 | 메인 사진 섹션 |
| 2.png | 1.9MB | 1280x3531 | 부모님 편지 |
| 3.png | 1.6MB | 1280x2560 | 서로에게 쓴 편지 |
| 4.png | 257KB | 1280x1608 | 웨딩 날짜 |
| gallery/* | 812KB~2.4MB | 다양함 | 갤러리 (10장) |

**총 용량**: ~21MB (메인 4장: ~8MB, 갤러리 10장: ~13MB)

### 문제점
1. **초기 로딩 시간**: 모든 이미지가 한 번에 로드되어 First Contentful Paint (FCP) 지연
2. **대역폭 낭비**: 사용자가 보지 않는 하단 이미지까지 미리 로드
3. **모바일 환경**: 3G/LTE 환경에서 심각한 로딩 지연
4. **PNG 포맷**: 사진 콘텐츠에 비효율적인 포맷 사용

---

## 2. 최적화 전략 (권장 우선순위)

### 2.1 포맷 변환 (즉시 적용 가능 - 가장 효과적)

**권장**: PNG → WebP (또는 AVIF)

| 포맷 | JPEG 대비 압축률 | 브라우저 지원 | 권장 |
|------|-----------------|--------------|------|
| WebP | 25-35% 향상 | 97%+ | O (주력) |
| AVIF | 50% 향상 | 92%+ | O (Progressive Enhancement) |

**예상 효과**:
- 1.png: 4.3MB → ~1.5MB (65% 감소)
- 2.png: 1.9MB → ~700KB (63% 감소)
- 3.png: 1.6MB → ~600KB (62% 감소)
- **총 메인 이미지**: 8MB → ~2.8MB

**구현 방법**:
```bash
# Sharp CLI로 일괄 변환
npx sharp-cli --input src/assets/main/*.png --output src/assets/main/webp --format webp --quality 85
```

---

### 2.2 Lazy Loading (빠른 구현 - 높은 효과)

**원칙**: 첫 번째 화면(Above-the-fold)만 즉시 로드, 나머지는 지연 로드

#### Option A: Native Lazy Loading (단순)
```tsx
// MainPhotoSection은 eager (첫 화면)
<img src={mainPhoto} loading="eager" alt="메인 사진" />

// 나머지 섹션은 lazy
<img src={parentsLetter} loading="lazy" alt="부모님 편지" />
```

#### Option B: react-intersection-observer (세밀한 제어)
```tsx
import { useInView } from 'react-intersection-observer';

function LazySection({ src, alt }: { src: string; alt: string }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px', // 200px 전에 미리 로드 시작
  });

  return (
    <div ref={ref}>
      {inView && <img src={src} alt={alt} />}
    </div>
  );
}
```

**예상 효과**:
- 초기 로드: 8MB → 4.3MB (첫 화면만)
- Time to Interactive: 50-60% 개선

---

### 2.3 Responsive Images (권장)

모바일 우선 설계에 맞춘 반응형 이미지 제공:

```tsx
<picture>
  {/* 최신 브라우저용 AVIF */}
  <source
    srcSet="/images/main/1-640w.avif 640w, /images/main/1-1280w.avif 1280w"
    type="image/avif"
    sizes="(max-width: 640px) 640px, 1280px"
  />
  {/* WebP 폴백 */}
  <source
    srcSet="/images/main/1-640w.webp 640w, /images/main/1-1280w.webp 1280w"
    type="image/webp"
    sizes="(max-width: 640px) 640px, 1280px"
  />
  {/* 레거시 폴백 */}
  <img src="/images/main/1.png" alt="메인 사진" />
</picture>
```

**생성할 이미지 버전**:
- 640w: 모바일 (대부분의 사용자)
- 1280w: 태블릿/고해상도

---

### 2.4 Progressive Loading (LQIP)

**Blur-up 기법**: 저품질 플레이스홀더 → 고품질 이미지 전환

```tsx
function ProgressiveImage({
  lowQualitySrc,
  highQualitySrc,
  alt
}: ProgressiveImageProps) {
  const [src, setSrc] = useState(lowQualitySrc);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setSrc(highQualitySrc);
      setIsLoaded(true);
    };
    img.src = highQualitySrc;
  }, [highQualitySrc]);

  return (
    <img
      src={src}
      alt={alt}
      className={`transition-all duration-500 ${
        isLoaded ? '' : 'blur-lg scale-105'
      }`}
    />
  );
}
```

**LQIP 생성**:
```bash
# 20px 너비의 블러용 이미지 생성 (~1-2KB)
npx sharp-cli --input src/assets/main/1.png --output src/assets/main/1-lqip.webp --width 20 --format webp --quality 20
```

---

### 2.5 빌드 타임 최적화 (Vite Plugin)

**vite-plugin-image-optimizer** 설정:

```ts
// vite.config.ts
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      webp: {
        lossless: false,
        quality: 85,
      },
      avif: {
        lossless: false,
        quality: 80,
      },
    }),
  ],
});
```

**설치**:
```bash
npm install -D vite-plugin-image-optimizer sharp
```

---

## 3. 구현 로드맵

### Phase 1: 즉시 효과 (1-2시간)

1. **포맷 변환**: PNG → WebP 수동 변환
2. **Native Lazy Loading**: `loading="lazy"` 추가
3. **예상 개선**: 로딩 시간 60-70% 감소

```tsx
// Before
<img src={mainPhoto} alt="메인 사진" />

// After
<img
  src={mainPhotoWebp}
  loading="lazy"
  width={1280}
  height={4739}
  alt="메인 사진"
/>
```

### Phase 2: 자동화 (2-3시간)

1. **Vite Plugin 설정**: 빌드 시 자동 최적화
2. **이미지 사이즈 variants 생성**: 640w, 1280w
3. **picture 요소 적용**: 반응형 이미지

### Phase 3: UX 향상 (선택사항, 3-4시간)

1. **LQIP 구현**: 블러 플레이스홀더
2. **Skeleton UI**: 로딩 상태 표시
3. **Intersection Observer**: 세밀한 로드 타이밍 제어

---

## 4. 최종 권장 구조

```
src/assets/main/
├── 1.webp           # 최적화된 원본 (1280w)
├── 1-640w.webp      # 모바일용
├── 1-lqip.webp      # 블러 플레이스홀더 (~2KB)
├── 2.webp
├── 2-640w.webp
├── 2-lqip.webp
...
```

---

## 5. 성능 목표

| 지표 | 현재 (추정) | 목표 | 개선율 |
|------|------------|------|--------|
| 총 이미지 용량 | ~21MB | ~5MB | 76% |
| 초기 로드 용량 | ~8MB | ~1.5MB | 81% |
| LCP (3G) | >10s | <3s | 70% |
| 모바일 성능 점수 | 40-50 | 80+ | 60%+ |

---

## 6. 참고 자료

- [Image Optimization Guide 2025](https://requestmetrics.com/web-performance/high-performance-images/)
- [Vite Plugin Image Optimizer](https://github.com/FatehAK/vite-plugin-image-optimizer)
- [React Intersection Observer](https://www.codingeasypeasy.com/blog/react-intersection-observer-lazy-loading-images-and-more-for-performance)
- [Progressive Image Loading in React](https://blog.logrocket.com/progressive-image-loading-react-tutorial/)
- [MDN: Fix LCP with Image Optimization](https://developer.mozilla.org/en-US/blog/fix-image-lcp/)

---

## 7. 빠른 시작 가이드

### 최소 노력으로 최대 효과 얻기

```bash
# 1. Sharp CLI 설치
npm install -D sharp-cli

# 2. WebP 변환 (수동)
npx sharp -i src/assets/main/1.png -o src/assets/main/1.webp -f webp -q 85

# 3. 컴포넌트 수정
# - import 경로를 .webp로 변경
# - loading="lazy" 추가 (첫 화면 제외)
# - width/height 명시

# 4. 결과 확인
npm run build && npm run preview
# Chrome DevTools → Network → Img 필터로 로드 시간 확인
```

**예상 소요 시간**: 30분
**예상 개선**: 초기 로딩 50-60% 감소
