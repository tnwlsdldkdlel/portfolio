# HANDOFF — 포트폴리오 사이트

Next.js 16 App Router · 전 페이지 정적(23라우트) · `npm run verify`(lint→test→build) 통과.
로컬 확인: `npm start` → :4400 (또는 `npm run dev`).

| 영역 | 상태 |
|---|---|
| 콘텐츠 데이터 (프로젝트 14 · 경력 6 · 스킬 · 프로필) | ✅ `content/` 3파일에 집중 |
| 히어로 (Hello! · 핵심 스택 · 연락처 아이콘) | ✅ 카드 없이 선·타이포만 |
| 섹션 (About → Skills → Projects → Career → 이 사이트) | ✅ 앵커 이동 실측 |
| 등장 애니메이션 (제목 타이핑 · 섹션 페이드) | ✅ 관찰자 1개, 재진입 반복 |
| 프로젝트 목록 (행 + 지표 막대) | ✅ 카드형 폐기, 수치에서 자동 생성 |
| SEO·GEO (메타·JSON-LD·sitemap·robots·llms.txt·OG) | ✅ `site.url` 한 곳에서 파생 |
| 웹폰트 서브셋 (Pretendard 2 + 디스플레이 1 = 124KB) | ✅ `scripts/subset-fonts.py` |
| 성능 실측·콜로폰 공개 (첫 화면 322KB) | ✅ 값 변경 시 `profile.ts` 동기화 필수 |
| 배포 | 🔶 도메인·검색엔진 인증 미설정 |

**규칙**: 글자 크기 하한 `0.875rem` · 카드형 UI 지양 · 다크모드 없음 · 서체는 Pretendard(+Hello! 전용 1벌).
**주의**: 문구를 고치면 `python scripts/subset-fonts.py` 재실행 — 빠진 글자는 fallback 서체로 그려진다.

**다음**: 01 About me 섹션부터 내용 수정 예정. 미해결·상세: `docs/handoff/2026/09/2026-09-11.md`
