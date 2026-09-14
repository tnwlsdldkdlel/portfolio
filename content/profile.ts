export const site = {
  // 배포 도메인이 정해지면 이 값만 바꾸면 canonical·sitemap·OG가 함께 따라갑니다.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.example.com",
  name: "프론트엔드 퍼블리싱 · 성능 최적화 포트폴리오",
  shortName: "Frontend Portfolio",
  locale: "ko_KR",
};

export const profile = {
  name: "오수진",
  nameEn: "OH SU JIN - Frontend Engineer",
  role: "프론트엔드 개발자 · 퍼블리싱 / 웹 성능",
  headline: "화면을 만들고, 그 화면을 다시 잽니다.",
  years: "6년차",
  greeting: "Hello!",
  // 히어로는 인사 두 줄까지. 나머지 이야기는 아래 섹션에서 한다.
  oneLiner: "프론트엔드 개발자",
  intro:
    "2021년 웹 개발로 시작해 2023년부터 프론트엔드에 집중했습니다. 통신사 서비스·미술품 투자 플랫폼·단말기 관리 솔루션 등 다양한 프로젝트를 거치며, 현재는 서비스·어드민·랜딩의 화면 설계부터 개발·배포·운영까지 경험하고 있습니다.",
  email: "",
  github: "",
  about: [
    {
      title: "재고 나서 고칩니다",
      icon: "gauge",
      body: "같은 배포본을 네 번 재면 Lighthouse 점수가 67·72·74·85로 흔들립니다. 통제 조건과 3회 중앙값을 먼저 정하고, 절대 타이밍 하나에 의존하기보다 전송 바이트를 1차 신호로 봅니다.",
    },
    {
      title: "효과 없으면 되돌립니다",
      icon: "undo",
      body: "전후 차이가 측정 편차 수준이라면 넣었던 최적화를 걷어냅니다. 코드만 늘고 아무것도 빨라지지 않은 변경은 부채로 남습니다.",
    },
    {
      title: "퍼블리싱에서 성능이 결정됩니다",
      icon: "frame",
      body: "숨긴 이미지도 내려받고, 크기를 적지 않은 이미지는 레이아웃을 밉니다. 마크업 단계에서 정해진 것은 나중에 되돌리기 어렵기 때문에 처음부터 성능을 고려합니다.",
    },
    {
      title: "기록을 남깁니다",
      icon: "note",
      body: "다음 사람이 그대로 재현할 수 있게, 무엇을 했는지보다 무엇을 되살리면 안 되는지와 임시 조치의 만료 조건을 적어 둡니다.",
    },
  ],
  // 히어로에 떠 있는 칩 — 무엇을 하는 사람인지 한눈에
  chips: [
    "Core Web Vitals",
    "웹폰트 서브셋",
    "Figma 픽셀 재현",
    "Next.js App Router",
    "번들 예산 게이트",
    "SEO · GEO",
    "시각 회귀 테스트",
    "접근성",
    "CDN · 캐시 전략",
  ],
  // 각 항목은 `주제 — 근거` 형태로 통일한다. 화면에서 " — " 앞뒤를 나눠 굵기를 준다.
  // 도구 이름은 여기 적지 않는다 — 아래 skills(career.ts) 한 곳에만 둔다.
  capabilities: [
    {
      title: "웹 성능 최적화",
      items: [
        "Core Web Vitals 진단 — LCP 단계 분해 · CLS 원인 추적 · TBT·TTFB 계측",
        "전송 바이트 감축 — 이미지 파이프라인 · 웹폰트 서브셋 · 번들 예산 게이트",
        "캐시 전략 — immutable 장기 캐시 · 캐시 버스팅 · CDN 무효화 한계 파악",
        "통제된 A/B 측정 설계 — 외부 변수 차단 · 반복 측정 · 편차 범위 명시",
      ],
    },
    {
      title: "퍼블리싱 · 마크업",
      items: [
        "Figma 시안 픽셀 재현 — 시각 회귀 스냅샷으로 동일성 검증",
        "반응형 — 중간 해상도 경계까지 실측 · 태블릿·모바일 분기점 설계",
        "디자인 토큰 — CSS Modules · 멀티 브랜드 분기",
        "접근성 기본 — 시맨틱 마크업 · 키보드 조작 · 대비",
      ],
    },
    {
      title: "SEO · GEO",
      items: [
        "메타 파생 — canonical·sitemap·robots를 상수 한 곳에서",
        "JSON-LD 구조화 데이터 — Organization · WebSite · CreativeWork",
        "색인 관리 — 도메인 이전 · ISR 캐시로 인한 메타 미갱신 대응",
        "생성형 검색 — 인용 점유율(SOV) 측정 파이프라인 구축",
      ],
    },
    {
      title: "프레임워크 · 인프라",
      items: [
        "Next.js App Router — RSC · 정적 익스포트 · ISR · 메타데이터 API",
        "Astro → Next.js 마이그레이션 — 동등성 검증 게이트 설계",
        "배포 파이프라인 — 정적 호스팅 · CDN 무효화 · 빌드 자동화",
      ],
    },
  ],
};

/** 이 사이트 자체의 측정값 — 로컬 프로덕션 빌드(next start) · brotli 압축 기준 실측. */
export const colophon = {
  measuredAt: "2026-09-14",
  condition: "next build → next start · brotli · 첫 방문(캐시 없음) · 1440×1000",
  items: [
    {
      label: "첫 화면 전송량",
      value: "298KB",
      note: "HTML 12.1 · CSS 5.0 · JS 155 · 폰트 126 · 카드 이미지는 지연 로드",
    },
    {
      label: "웹폰트",
      value: "125.6KB",
      note: "Pretendard 2벌 + 인사말용 1벌 · 원본 1,536KB에서 −91.8%",
    },
    {
      label: "JavaScript",
      value: "155KB",
      note: "직접 쓴 건 82줄(진입 감지 · 뒤로가기 · 상세 팝업) · 나머지는 Next 런타임",
    },
    { label: "CSS", value: "5.0KB", note: "파일 1개 · 장식은 전부 CSS" },
    { label: "CLS", value: "0", note: "카드 이미지에 크기를 박아 자리를 먼저 잡는다" },
    { label: "클라이언트 컴포넌트", value: "3개", note: "등장 관찰자 · 뒤로가기 · 상세 팝업 · 나머지는 서버 렌더" },
  ],
};
