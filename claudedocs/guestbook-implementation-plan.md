# 방명록 (Guestbook) 기능 구현 계획

## 개요
GiftSection과 ShareSection 사이에 Supabase + Cloudflare Turnstile을 활용한 방명록 섹션 추가

## 결정 사항
- **서버 검증**: Supabase Edge Function
- **삭제 기능**: 없음 (관리자만 Supabase Dashboard에서 삭제)
- **목록 표시**: 초기 5개 + "더보기" 버튼
- **실시간 업데이트**: 없음 (작성 시에만 목록 갱신)

## 기술 스택
- **Supabase**: PostgreSQL + Row Level Security + Edge Function
- **Cloudflare Turnstile**: 봇 방지
- **@supabase/supabase-js**: Supabase 클라이언트
- **@marsidev/react-turnstile**: React Turnstile 컴포넌트

---

## Phase 1: 환경 설정 (사용자 작업)

### 1.1 Supabase 프로젝트 설정
- [ ] Supabase 계정 생성 및 프로젝트 생성
- [ ] Project URL 및 Anon Key 복사

### 1.2 Cloudflare Turnstile 설정
- [ ] Cloudflare Dashboard → Turnstile → Add Site
- [ ] Site Key 및 Secret Key 획득

### 1.3 환경 변수 파일 생성 (`.env.local`)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_TURNSTILE_SITE_KEY=your-site-key
```

### 1.4 의존성 설치
```bash
npm install @supabase/supabase-js @marsidev/react-turnstile
```

---

## Phase 2: 데이터베이스 스키마 (Supabase SQL Editor)

```sql
-- 방명록 테이블 생성
create table if not exists guestbook (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  message text not null
);

-- 인덱스 생성
create index guestbook_created_at_idx on guestbook (created_at desc);

-- RLS 활성화
alter table guestbook enable row level security;

-- 읽기 정책 (모두 가능)
create policy "Enable read access for all users"
on guestbook for select using (true);

-- 삽입 정책 (모두 가능)
create policy "Enable insert for all users"
on guestbook for insert with check (true);
```

---

## Phase 3: Supabase Edge Function (Turnstile 검증)

### 3.1 Edge Function 생성
Supabase Dashboard → Edge Functions → New Function → `verify-turnstile`

```typescript
// supabase/functions/verify-turnstile/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { token } = await req.json()

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: Deno.env.get('TURNSTILE_SECRET_KEY'),
          response: token,
        }),
      }
    )

    const data = await response.json()

    return new Response(
      JSON.stringify({ success: data.success }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Verification failed' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
```

### 3.2 Edge Function Secret 설정
Supabase Dashboard → Edge Functions → verify-turnstile → Secrets
- `TURNSTILE_SECRET_KEY`: Cloudflare에서 받은 Secret Key

---

## Phase 4: 코드 구현

### 4.1 생성할 파일

| 파일 경로 | 설명 |
|----------|------|
| `src/lib/supabase.ts` | Supabase 클라이언트 |
| `src/types/guestbook.ts` | 타입 정의 |
| `src/components/sections/GuestbookSection.tsx` | 메인 섹션 |

### 4.2 타입 정의 (`src/types/guestbook.ts`)
```typescript
export interface GuestbookEntry {
  id: string;
  created_at: string;
  name: string;
  message: string;
}
```

### 4.3 Supabase 클라이언트 (`src/lib/supabase.ts`)
```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

### 4.4 GuestbookSection 구조
```
GuestbookSection
├── 제목 ("방명록")
├── 작성 폼
│   ├── 이름 입력 (required)
│   ├── 메시지 입력 (textarea, required)
│   ├── Turnstile 위젯
│   └── 제출 버튼
├── 메시지 목록
│   └── 메시지 카드 (이름, 날짜, 내용)
└── "더보기" 버튼 (5개씩 추가 로드)
```

### 4.5 스타일링
- 기존 프로젝트 패턴 따르기
- CSS 변수: `--color-rose-primary`, `--font-display`, `--font-body`
- `useScrollAnimation` 훅 사용
- 모바일 우선 디자인

---

## Phase 5: App.tsx 통합

### 5.1 임포트 추가
```typescript
import GuestbookSection from "./components/sections/GuestbookSection";
```

### 5.2 섹션 추가 (GiftSection 다음)
```tsx
<div className="snap-section">
  <GiftSection ... />
</div>
<div className="snap-section">
  <GuestbookSection />
</div>
<div className="snap-section">
  <ShareSection ... />
</div>
```

---

## 수정할 파일 목록

| 파일 | 작업 |
|------|------|
| `src/lib/supabase.ts` | 새로 생성 |
| `src/types/guestbook.ts` | 새로 생성 |
| `src/components/sections/GuestbookSection.tsx` | 새로 생성 |
| `src/App.tsx` | GuestbookSection 임포트 및 추가 |
| `.env.local` | 환경 변수 추가 (사용자 작업) |

---

## 제출 플로우

1. 사용자가 이름, 메시지 입력
2. Turnstile 위젯 완료 (토큰 획득)
3. "메시지 남기기" 버튼 클릭
4. Edge Function으로 토큰 검증
5. 검증 성공 시 Supabase에 메시지 저장
6. 목록 갱신 (새 메시지 표시)
