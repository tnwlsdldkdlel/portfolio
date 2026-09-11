# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 명령

```bash
npm run dev            # 개발 서버
npm run verify         # lint → test → build. 커밋 전 게이트
npm test               # node:test (러너·트랜스파일러 없음)
node --test lib/metric.test.mjs   # 단일 파일만
npm start              # 빌드본 실행 (기본 3000, 측정은 -p 4400 으로 띄워 왔다)

python scripts/subset-fonts.py    # 웹폰트 재생성 (fonttools + brotli 필요)
```

## 이 저장소의 두 가지 의무

기능을 고치는 것과 별개로, 고치면 **반드시 같이 해야 하는 일**이 둘 있다.

**1. 화면 문구를 바꿨으면 폰트를 다시 서브셋한다.**
한글 웹폰트는 전체를 싣지 않고 `content/`·`app/`·`components/` 소스를 훑어 실제로 쓰인 글리프만
남긴다(원본 1,536KB → 125KB). 새로 쓴 글자가 서브셋에 없으면 그 글자만 fallback 서체로 그려진다.
히어로 "Hello!" 에 쓰는 디스플레이 서체는 `DISPLAY_TEXT` 상수의 글자만 담으므로, 그 문구를 바꿀
때도 마찬가지다.

**2. 성능 수치를 바꿨으면 `content/profile.ts` 의 `colophon` 도 고친다.**
이 사이트는 마지막 섹션에서 자기 전송량·JS·CLS를 실측값으로 공개한다. 코드가 무거워졌는데
콜로폰이 그대로면 사이트가 거짓말을 한다. 측정은 `next start` + brotli + 첫 방문 기준이고,
조건 문구도 `colophon.condition` 에 적혀 있다.

## 구조

**데이터가 먼저다.** 페이지를 만드는 게 아니라 `content/` 에 데이터를 넣으면 화면이 따라온다.

| 파일 | 담는 것 |
|---|---|
| `content/projects.ts` | 프로젝트 14개 — 수치·판단 근거. 목록·상세·sitemap·llms.txt가 전부 여기서 파생 |
| `content/profile.ts` | 히어로 문구 · 역량 · `site.url` · 콜로폰 |
| `content/career.ts` | 연락처 · 스킬 · 경력 · 학력 |

프로젝트 수치는 각 레포 `HANDOFF.md` 에서 옮긴 **실측값**이다. 원본이 갱신돼도 자동 동기화는
없으니 손으로 옮긴다. 지어낸 숫자를 넣지 않는다 — 이 사이트의 전제가 무너진다.

`site.url` 한 곳에서 canonical·sitemap·robots·OG가 파생된다. 도메인은 `NEXT_PUBLIC_SITE_URL` 로 준다.

## 알아두면 시간 아끼는 것들

**목록의 지표 막대는 이미지가 아니다.** `lib/metric.mjs` 가 `"20.30MB"` · `"1,782KB"` · `"64"` 를
KB 기준 수로 정규화해 막대 길이를 만든다. 숫자를 못 읽는 값(`"100 / 100"`)은 막대 없이 값만 쓴다.
이 파일만 `.mjs` 인 이유는 테스트 러너와 트랜스파일러를 추가하지 않고 `node --test` 로 돌리기
위해서다 — TS로 바꾸려면 러너가 딸려 온다.

**클라이언트 코드는 `components/Reveal.tsx` 38줄이 전부다.** IntersectionObserver 하나가 등장
애니메이션을 튼다. CSS `animation-timeline: view()` 로 하던 걸 바꾼 것인데, 그건 Chrome 계열에서만
돌고 스크롤 위치에 묶여 빠르게 내리면 지나가 버린다.

- 숨김은 JS가 붙은 뒤에만 적용한다(`html.js-reveal`) — 스크립트가 실패해도 내용이 사라지지 않게.
- 제목은 `data-reveal-repeat` 이라 화면을 오갈 때마다 다시 재생되고, 섹션 본문은 한 번만 재생된다.
- 제목 애니메이션 선택자는 `.kicker[data-reveal="in"]` 로 **한정해야 한다.** 후손 선택자로 쓰면
  상위 `section[data-reveal="in"]` 에도 걸려 제목 리셋이 먹지 않는다(겪은 버그).

**앵커 링크는 두 종류를 구분한다.** 경로 없는 해시(`#about`)는 순수 `<a>` — App Router 의
`<Link>` 가 같은 페이지 해시에서 스크롤을 놓친다. 경로가 붙은 `/#about`(헤더 내비)은 `<Link>` 를
쓴다(ESLint `no-html-link-for-pages`).

## 디자인 제약 (사용자 지시)

바꾸기 전에 반드시 확인받는다.

- **카드형 UI 지양.** 히어로와 프로젝트 목록은 hairline + 행 구조다. 흰 박스를 늘리지 않는다.
- **글자 크기 하한 `0.875rem`(14px).** 라벨·캡션도 그 아래로 내리지 않는다.
- **다크 모드 없음.** 배경은 단색 `#f0f3ef`, 액센트 초록 `#1c7a51`. 색은 `app/globals.css` 최상단
  토큰에서만 바꾼다.
- **서체는 Pretendard 하나** (+ "Hello!" 전용 디스플레이 1벌). 모노 웹폰트를 다시 들이지 않는다.
- **이미지 0장.** 장식은 CSS, 아이콘은 인라인 SVG. 필요해지면 콜로폰 수치부터 고친다.

## 커밋

- 이 저장소는 **개인 프로젝트**다. 커밋 메시지에 태스크 번호를 붙이지 않는다.
- 커밋 작성자는 로컬 설정(`git config --local`)의 개인 GitHub 계정을 쓴다 — 전역은 회사 계정이므로
  `--local` 설정을 지우지 않는다.
- `docs/` 는 `.gitignore` 대상이라 일자별 핸드오프 로그는 커밋되지 않는다. `HANDOFF.md` 는 커밋된다.
