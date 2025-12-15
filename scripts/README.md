# 이미지 최적화 스크립트

이 폴더에는 프로젝트의 이미지를 자동으로 최적화하는 스크립트가 포함되어 있습니다.

## optimize-images.mjs

JPEG/PNG 이미지를 WebP 형식으로 변환하고 LQIP(Low Quality Image Placeholder)를 생성합니다.

### 기능

- ✅ JPEG/PNG → WebP 변환 (quality: 85)
- ✅ LQIP 생성 (width: 40px, quality: 20)
- ✅ 파일 크기 비교 및 압축률 계산
- ✅ 진행 상황 실시간 표시
- ✅ 컬러 출력으로 가독성 향상

### 사용법

#### 기본 사용 (src/assets/main 폴더)

```bash
npm run optimize:images
```

#### 다른 폴더 지정

```bash
npm run optimize:images src/assets/gallery
```

또는 직접 실행:

```bash
node scripts/optimize-images.mjs src/assets/gallery
```

### 출력 예시

```
🚀 이미지 최적화 시작
📁 대상 폴더: src/assets/main

✅ 5개 이미지 파일 발견

📸 처리 중: 1.jpeg
  원본: 249KB
  ✅ WebP: 197KB (21.0% 감소)
  ✅ LQIP: 498B

📸 처리 중: 2.jpeg
  원본: 371KB
  ✅ WebP: 348KB (6.0% 감소)
  ✅ LQIP: 330B

==================================================
📊 최적화 완료
==================================================
총 처리: 5개 파일
원본 크기: 1.26MB
최적화 후: 1.00MB
총 감소량: 260KB (21.0%)
==================================================
```

### 생성되는 파일

| 입력 | 출력 |
|------|------|
| `image.jpeg` | `image.webp` (최적화된 WebP) |
| `image.jpeg` | `image-lqip.webp` (저품질 플레이스홀더) |
| `image.png` | `image.webp` (최적화된 WebP) |
| `image.png` | `image-lqip.webp` (저품질 플레이스홀더) |

### 설정 변경

`optimize-images.mjs` 파일의 `CONFIG` 객체를 수정:

```javascript
const CONFIG = {
  webp: {
    quality: 85,      // WebP 품질 (0-100)
    effort: 6,        // 압축 노력 (0-6, 높을수록 느리지만 작음)
  },
  lqip: {
    width: 40,        // LQIP 너비 (픽셀)
    quality: 20,      // LQIP 품질 (0-100)
  },
  extensions: ['.jpg', '.jpeg', '.png'],  // 처리할 확장자
};
```

### 의존성

- `sharp`: 이미지 처리 라이브러리 (sharp-cli에 포함되어 자동 설치됨)

### 주의사항

- 기존에 같은 이름의 `.webp` 파일이 있으면 **덮어씁니다**
- 원본 JPEG/PNG 파일은 삭제되지 않고 유지됩니다
- LQIP는 매우 작은 크기(수백 바이트)로 생성됩니다

### 트러블슈팅

#### "sharp not found" 오류

```bash
npm install -D sharp
```

#### Permission denied

스크립트에 실행 권한 부여:

```bash
chmod +x scripts/optimize-images.mjs
```

#### 특정 이미지 변환 실패

- 이미지 파일이 손상되지 않았는지 확인
- 충분한 디스크 공간이 있는지 확인
- 다른 이미지는 정상적으로 처리됩니다 (오류가 발생해도 스크립트는 계속 진행)
