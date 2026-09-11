# 포트폴리오

퍼블리싱 · 웹 성능 중심의 프론트엔드 포트폴리오. Next.js App Router · 전 페이지 정적 생성.

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 (23 라우트 전부 정적)
npm start        # 빌드본 실행
npm test         # node:test — 러너도 트랜스파일러도 없다
npm run verify   # lint → test → build
```

## 배포 전에 채울 것

| 항목 | 위치 | 비고 |
|---|---|---|
| 도메인 | `NEXT_PUBLIC_SITE_URL` 환경변수 | canonical · sitemap · OG가 여기서 파생된다 |
| 연락처 | `content/career.ts` 의 `contact` | 전화번호·상세 주소는 일부러 뺐다 |
| 검색엔진 소유 확인 | `app/layout.tsx` 의 `metadata.verification` | 구글 · 네이버 |

## 구조

```
content/projects.ts   프로젝트 14개 — 수치·판단 근거를 전부 여기 둔다
content/profile.ts    소개 · 역량 · 히어로 롤러 지표 · 콜로폰(이 사이트 자체 측정값)
content/career.ts     연락처 · 스킬 · 경력 · 학력
app/                  라우트 + sitemap · robots · llms.txt · OG 이미지
app/globals.css       단일 CSS. 컴포넌트별 모듈 없음 (요청 1개)
components/           서버 컴포넌트만. "use client" 0개
lib/metric.mjs        지표 문자열 → 카드 썸네일 막대 비율 (+ metric.test.mjs)
components/ProjectRow.tsx    프로젝트 목록 한 행 (카드 아님)
components/SkillLine.tsx     핵심 스택 6개 + 강조 이동 애니메이션
components/Skills.tsx        역량 카드 4개 + 스킬 태그 그룹
components/Kicker.tsx        섹션 제목 — 글자가 차례로 튀어 오른다
components/Reveal.tsx        화면 진입 감지 (유일한 "use client")
components/HeroFacts.tsx     연락처 아이콘 (인라인 SVG)
components/Career.tsx        경력 타임라인 · 스킬 · 학력
scripts/subset-fonts.py  Pretendard 서브셋 생성
```

### 목록의 막대에 스크린샷이 없는 이유

프로젝트 목록의 막대는 이미지가 아니라 `content/projects.ts` 의 수치에서 그때그때 그린다.
`lib/metric.mjs` 가 `"20.30MB"` · `"1,782KB"` · `"64"` 같은 문자열을 비교 가능한 수로 바꾸고,
막대 길이는 CSS `width` 로만 표현한다. 숫자를 못 읽는 지표(`"100 / 100"`)는 차트 대신 값을 크게 쓴다.
덕분에 데이터만 고치면 막대가 따라오고, 이미지는 계속 0장으로 남는다.

페이지를 추가하는 게 아니라 **데이터를 추가**하면 된다. `content/projects.ts` 에 항목을 넣으면
목록·상세 페이지·sitemap·llms.txt가 함께 늘어난다.

## 웹폰트

한글 웹폰트는 전체를 싣지 않고, 이 사이트에 실제로 쓰인 글리프만 남긴 서브셋을 쓴다.

```bash
pip install fonttools brotli
python scripts/subset-fonts.py
```

- 본문: Pretendard 2벌, 원본 1,520KB → **122KB** (−92.0%), 글리프 715자
- 인사말 "Hello!": Shrikhand를 **그 6글자만** 남겨 15.6KB → **1.1KB**
- 라벨류에 모노 웹폰트를 쓰지 않는다 — 자간으로만 구분한다.
- **문구를 고치면 반드시 다시 돌린다.** 특히 `DISPLAY_TEXT` 를 바꿨다면.
- 결과물 `public/fonts/*.woff2` 는 커밋한다. 원본 `.fonts-src/` 는 gitignore.
- **문구를 크게 고쳤으면 다시 돌려야 한다.** 빠진 글자는 fallback 서체로 그려진다.

## 측정 (2026-09-11 · `next start` · brotli · 첫 방문)

| 항목 | 값 |
|---|---|
| 첫 화면 전송량 | 322KB (HTML 20.2 · CSS 4.4 · JS 174 · 폰트 124) |
| JavaScript | 174KB — 직접 쓴 건 38줄(`components/Reveal.tsx`), 나머지는 Next 런타임 |
| 이미지 | 0장 (장식은 CSS, 아이콘은 인라인 SVG) |
| CLS | 0 |

수치를 고쳤으면 `content/profile.ts` 의 `colophon` 도 같이 고친다 — 화면에 그대로 나간다.

## SEO / GEO

- `app/sitemap.ts` · `app/robots.ts` — `site.url` 한 곳에서 파생
- JSON-LD: Person · WebSite(layout) + CreativeWork(프로젝트 상세)
- `app/llms.txt/route.ts` — 생성형 검색·LLM 크롤러용 요약본. 프로젝트 데이터에서 자동 생성
- `app/opengraph-image.tsx` — 코드로 생성. 한글 글리프를 싣지 않으려 라틴·숫자만 사용

## 히어로

**카드를 쓰지 않는다.** 인사 세 줄이 주인공이고, 그 아래를 hairline 두 줄로만 나눈다 —
핵심 스택 한 줄(강조가 한 칸씩 옮겨 간다), 연락처 아이콘 한 줄. 흰 박스를 얹으면 시선이 셋으로 쪼개져서
정작 이름이 묻힌다. 긴 소개는 "일하는 방식" 섹션으로 내렸다.
롤러는 `headlineMetrics`(content/profile.ts) 4개를 3초마다 넘기는데, JS 없이 CSS
`translateY` 스텝 이동만 쓴다 — 맨 끝에 첫 항목을 복제해 루프가 튀지 않게 하고,
그 복제본만 `aria-hidden` 으로 빼둔다. `prefers-reduced-motion` 이면 멈춘 채 첫 항목만 보인다.

지표를 늘리거나 줄이면 `--count` 가 따라가지만, `@keyframes roll` 의 구간은 4개 기준으로
쓰여 있다 — 개수를 바꾸면 키프레임도 같이 고쳐야 한다.

## 섹션 순서

About me → Skills → Projects → Career → 이 사이트. 사람 → 능력 → 증거 순서다.
개선 기록 표는 Projects 섹션 맨 위에 둔다 — 따로 떨어뜨리면 무슨 수치인지 알 수 없다.

섹션 제목(`components/Kicker.tsx`)은 터미널처럼 한 글자씩 찍히고 커서가 따라간다.
페이드가 아니라 `steps(1)` 로 딱 켜야 "찍히는" 느낌이 난다. 커서는 각 글자의 `::after` 이고
`animation-fill-mode` 를 두지 않아 제 구간이 끝나면 저절로 사라진다 — 마지막 글자의 커서만
계속 깜빡인다. 제목 길이가 제각각이라 한 글자 간격(`--tick`)을 계산해 전체를 ~700ms 로 맞춘다.
재생 시점은 `components/Reveal.tsx` 의 IntersectionObserver 가 잡는다 (제목은 `data-reveal-repeat`
이 붙어 화면을 오갈 때마다 다시 재생되고, 섹션 본문은 한 번만) —
처음엔 CSS `animation-timeline: view()` 로 했지만 Chrome 계열에서만 돌고
스크롤 위치에 묶여 빠르게 내리면 지나가 버려서 바꿨다.

**숨김은 JS 가 붙은 뒤에만 적용한다**(`html.js-reveal`). 스크립트가 실패해도 내용이
사라지지 않게 하려는 것이다. `prefers-reduced-motion` 에서도 숨김을 풀어 둔다.

## 디자인

밝은 단색 배경(`#f0f3ef`)에 흰 카드, 초록 액센트(`#1c7a51`). 색은 `app/globals.css` 최상단
토큰에서만 바꾼다 — 카드 썸네일 그라디언트 6종도 같은 초록 축의 인접 색이다.

**글자 크기 하한은 0.875rem(14px).** 라벨·캡션도 그 아래로 내리지 않는다.

프로젝트 목록은 **카드가 아니라 행**이다. 썸네일 패널 대신 지표 막대 하나를 행 안에 둔다.

## 의도적으로 넣지 않은 것

- **다크 모드** — 라이트 전용
- **테스트 러너 · 트랜스파일러** — `lib/` 만 `.mjs` 로 두고 `node --test` 로 돌린다
- **클라이언트 상태 · 애니메이션 라이브러리** — 등장 감지는 38줄짜리 관찰자 하나, 모션은 전부 CSS
- **이미지** — 한 장도 없다. 필요해지면 `next/image` 로 넣고 콜로폰 수치를 갱신할 것
