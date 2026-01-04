# Scroll-Based Fade-In Animation 스펙 문서

## 1. 개요

### 1.1 목적
각 섹션이 뷰포트에 진입할 때 아래에서 위로 살짝 올라오며 fade-in 되는 애니메이션 효과를 구현합니다.

### 1.2 적용 범위
- **제외**: `MainPhotoSection.tsx` (첫 화면, 즉시 표시)
- **적용**: 나머지 모든 섹션 컴포넌트
  - DateVenueSection
  - ParentsSection
  - CoupleGallerySection
  - CoupleLetterSection
  - CoupleContactSection
  - CalendarSection
  - LocationSection
  - DressCodeSection
  - GiftSection
  - ShareSection

---

## 2. 기술 스택

### 2.1 핵심 기술
| 기술 | 용도 | 선택 이유 |
|------|------|----------|
| **Intersection Observer API** | 뷰포트 진입 감지 | 네이티브 API, 성능 우수, 외부 라이브러리 불필요 |
| **CSS Transform/Opacity** | 애니메이션 속성 | GPU 가속, 모바일 성능 최적화 |
| **React Custom Hook** | 로직 재사용 | 모든 섹션에서 동일한 패턴 적용 |
| **Tailwind CSS** | 스타일링 | 기존 프로젝트 스택과 일관성 |

### 2.2 기존 인프라 활용
프로젝트의 `src/index.css`에 이미 정의된 키프레임 활용:
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 3. 구현 명세

### 3.1 Custom Hook: `useScrollAnimation`

#### 인터페이스
```typescript
interface UseScrollAnimationOptions {
  threshold?: number;        // 뷰포트 진입 감지 임계값 (0-1)
  rootMargin?: string;       // 감지 영역 확장/축소
  triggerOnce?: boolean;     // 한 번만 트리거할지 여부
  delay?: number;            // 애니메이션 시작 지연 (ms)
}

interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  animationClass: string;    // 적용할 CSS 클래스
}
```

#### 기본값
```typescript
const defaultOptions = {
  threshold: 0.1,                    // 10% 보이면 트리거
  rootMargin: "0px 0px -50px 0px",   // 하단 50px 전에 트리거
  triggerOnce: true,                 // 한 번만 애니메이션
  delay: 0                           // 지연 없음
};
```

### 3.2 애니메이션 파라미터

| 속성 | 값 | 설명 |
|------|-----|------|
| **Duration** | 700ms | 현재 프로젝트 패턴(300-500ms)보다 약간 길게 |
| **Easing** | `ease-out` | 자연스러운 감속 효과 |
| **translateY** | 30px → 0px | 아래에서 위로 이동 |
| **Opacity** | 0 → 1 | 투명에서 불투명으로 |
| **Stagger Delay** | 100-150ms | 섹션 내 요소 간 순차 애니메이션 (옵션) |

### 3.3 CSS 유틸리티 클래스

```css
/* 추가할 유틸리티 클래스 */
@layer utilities {
  /* 초기 상태 (애니메이션 대기) */
  .scroll-hidden {
    opacity: 0;
    transform: translateY(30px);
  }

  /* 애니메이션 활성화 */
  .scroll-visible {
    animation: fadeInUp 0.7s ease-out forwards;
  }

  /* Stagger 지연 변형 */
  .scroll-delay-100 { animation-delay: 100ms; }
  .scroll-delay-200 { animation-delay: 200ms; }
  .scroll-delay-300 { animation-delay: 300ms; }
}
```

---

## 4. 컴포넌트 적용 패턴

### 4.1 기본 사용법
```tsx
function DateVenueSection({ data }: Props) {
  const { ref, animationClass } = useScrollAnimation();

  return (
    <div ref={ref} className={`snap-section ${animationClass}`}>
      {/* 섹션 내용 */}
    </div>
  );
}
```

### 4.2 Stagger 애니메이션 (선택적)
섹션 내 여러 요소를 순차적으로 애니메이션할 경우:
```tsx
function ParentsSection({ data }: Props) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="snap-section">
      <h2 className={isVisible ? 'scroll-visible' : 'scroll-hidden'}>
        제목
      </h2>
      <div className={isVisible ? 'scroll-visible scroll-delay-100' : 'scroll-hidden'}>
        첫 번째 요소
      </div>
      <div className={isVisible ? 'scroll-visible scroll-delay-200' : 'scroll-hidden'}>
        두 번째 요소
      </div>
    </div>
  );
}
```

---

## 5. 접근성 고려사항

### 5.1 Reduced Motion 지원
```css
@media (prefers-reduced-motion: reduce) {
  .scroll-hidden {
    opacity: 1;
    transform: none;
  }

  .scroll-visible {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

### 5.2 포커스 관리
- 애니메이션이 완료된 후에도 포커스 가능한 요소 접근 가능
- `visibility: hidden` 사용 금지 (접근성 문제)
- `opacity: 0`만 사용하여 스크린 리더 호환성 유지

---

## 6. 성능 최적화

### 6.1 모바일 최적화 전략
| 전략 | 구현 방법 |
|------|----------|
| **GPU 가속** | `transform`, `opacity`만 사용 (reflow/repaint 방지) |
| **Observer 해제** | `triggerOnce: true`로 한 번 트리거 후 observe 해제 |
| **will-change 최소화** | 애니메이션 대상 요소에만 선택적 적용 |
| **Passive 이벤트** | Intersection Observer는 기본적으로 passive |

### 6.2 예상 성능 영향
- **Lighthouse Performance**: ~1-2% 런타임 비용 (허용 범위)
- **CLS (Cumulative Layout Shift)**: 0 (레이아웃 변경 없음)
- **FID/INP**: 영향 없음 (CSS 애니메이션은 메인 스레드 차단 안 함)

---

## 7. 파일 구조

### 7.1 신규 생성 파일
```
src/
├── hooks/
│   └── useScrollAnimation.ts    # Custom Hook
└── index.css                    # 유틸리티 클래스 추가
```

### 7.2 수정 대상 파일
```
src/components/sections/
├── DateVenueSection.tsx         # Hook 적용
├── ParentsSection.tsx           # Hook 적용
├── CoupleGallerySection.tsx     # Hook 적용
├── CoupleLetterSection.tsx      # Hook 적용
├── CoupleContactSection.tsx     # Hook 적용
├── CalendarSection.tsx          # Hook 적용
├── LocationSection.tsx          # Hook 적용
├── DressCodeSection.tsx         # Hook 적용
├── GiftSection.tsx              # Hook 적용
└── ShareSection.tsx             # Hook 적용
```

---

## 8. 구현 체크리스트

### Phase 1: 기반 작업
- [ ] `useScrollAnimation` 커스텀 훅 생성
- [ ] CSS 유틸리티 클래스 추가 (`index.css`)
- [ ] Reduced motion 미디어 쿼리 추가

### Phase 2: 섹션 적용
- [ ] DateVenueSection 적용 및 테스트
- [ ] ParentsSection 적용
- [ ] CoupleGallerySection 적용
- [ ] CoupleLetterSection 적용
- [ ] CoupleContactSection 적용
- [ ] CalendarSection 적용
- [ ] LocationSection 적용
- [ ] DressCodeSection 적용
- [ ] GiftSection 적용
- [ ] ShareSection 적용

### Phase 3: QA
- [ ] 모바일 기기 테스트 (iOS Safari, Android Chrome)
- [ ] 스크롤 스냅과의 상호작용 검증
- [ ] Reduced motion 설정 테스트
- [ ] 성능 측정 (Lighthouse)

---

## 9. 예상 결과

### Before
섹션이 스크롤 시 즉시 표시됨 (정적)

### After
각 섹션이 뷰포트에 진입할 때:
1. 아래에서 30px 위치에서 시작
2. 700ms 동안 위로 이동하면서
3. opacity 0에서 1로 fade-in
4. 자연스러운 ease-out 감속 효과

---

## 10. 대안 검토

### 10.1 고려한 대안들

| 대안 | 장점 | 단점 | 결정 |
|------|------|------|------|
| **Framer Motion** | 풍부한 API, Spring 물리 | 번들 크기 증가 (~40KB) | 불채택 |
| **React Spring** | 성능 우수 | 학습 곡선, 복잡성 | 불채택 |
| **CSS Scroll-Driven** | 최신 API, 선언적 | 브라우저 지원 제한적 | 불채택 |
| **Intersection Observer + CSS** | 네이티브, 가벼움, 호환성 | 직접 구현 필요 | **채택** |

### 10.2 채택 이유
- 외부 의존성 없음 (번들 크기 유지)
- 프로젝트의 기존 CSS 애니메이션 패턴과 일관성
- 모바일 성능 최적화에 유리
- 브라우저 호환성 94%+ (Intersection Observer)

---

## 11. 참고 자료

- [Intersection Observer API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [CSS Animation Performance - web.dev](https://web.dev/animations-guide/)
- [Prefers-reduced-motion - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
