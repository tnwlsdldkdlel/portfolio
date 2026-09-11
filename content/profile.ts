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
  headline: "만드는 것보다 재는 것을 먼저 한다.",
  years: "6년차",
  greeting: "Hello!",
  // 히어로는 인사 두 줄까지. 나머지 이야기는 아래 섹션에서 한다.
  oneLiner: "프론트엔드 개발자",
  intro:
    "시안을 픽셀 그대로 옮기는 퍼블리싱과, 옮긴 것이 실제로 빠른지 재서 증명하는 일을 함께 합니다. 2026년 한 해 동안 14개 프로젝트를 프론트엔드 전담으로 맡았고, 대부분을 운영까지 끌고 갔습니다.",
  email: "",
  github: "",
  about: [
    "성능 작업에서 가장 많이 하는 일은 고치는 것이 아니라 재는 것입니다. 같은 배포본을 네 번 재면 Lighthouse 점수가 67·72·74·85로 흔들립니다. 한 번만 재고 기준선으로 삼으면, 그다음의 모든 판단이 운 좋은 실행 하나 위에 쌓입니다. 그래서 통제 조건과 3회 중앙값을 먼저 정하고, 절대 타이밍보다 전송 바이트와 캐시 히트를 1차 신호로 씁니다.",
    "효과가 없으면 되돌립니다. 도구가 권하는 최적화를 넣었다가 전후 차이가 측정 편차 안에 있으면 제거합니다. 코드가 늘어나는 대신 아무것도 빨라지지 않은 변경은, 다음 사람이 이유를 물을 때 답할 수 없는 부채가 됩니다.",
    "퍼블리싱은 성능의 반대편이 아니라 같은 일입니다. display:none으로 숨긴 이미지는 여전히 다운로드되고, 크기를 적지 않은 이미지는 레이아웃을 밀고, 서브셋하지 않은 웹폰트는 첫 페인트를 막습니다. 마크업 단계에서 정해지는 것이 나중에 최적화로 되돌리기 가장 어렵습니다.",
    "혼자 맡는 프로젝트가 많아서, 다음 사람(대개 몇 달 뒤의 저)이 읽을 기록을 남깁니다. 무엇을 했는지보다 무엇을 되살리면 안 되는지, 어떤 임시 조치에 만료 조건이 걸려 있는지를 적습니다.",
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
  capabilities: [
    {
      title: "웹 성능 최적화",
      items: [
        "Core Web Vitals 진단 — LCP 단계 분해, CLS 원인 추적, TBT·TTFB 계측",
        "전송 바이트 감축 — 이미지 파이프라인, 웹폰트 서브셋, 번들 예산 게이트",
        "캐시 전략 — immutable 장기 캐시, 캐시 버스팅, CDN 무효화 한계 파악",
        "통제된 A/B 측정 설계 — 외부 변수 차단, 반복 측정, 편차 범위 명시",
      ],
    },
    {
      title: "퍼블리싱 · 마크업",
      items: [
        "Figma 시안 픽셀 재현 — 시각 회귀 스냅샷으로 동일성 검증",
        "반응형 — 중간 해상도 경계까지 실측, 태블릿·모바일 분기점 설계",
        "디자인 토큰 · CSS Modules · 멀티 브랜드 분기",
        "접근성 기본 — 시맨틱 마크업, 키보드 조작, 대비",
      ],
    },
    {
      title: "SEO · GEO",
      items: [
        "메타·canonical·sitemap·robots를 상수 한 곳에서 파생",
        "JSON-LD 구조화 데이터 — Organization, WebSite, CreativeWork",
        "도메인 이전과 색인 관리, ISR 캐시로 인한 메타 미갱신 대응",
        "생성형 검색 인용 점유율(SOV) 측정 파이프라인 구축 경험",
      ],
    },
    {
      title: "프레임워크 · 인프라",
      items: [
        "Next.js App Router — RSC, 정적 익스포트, ISR, 메타데이터 API",
        "React 19 · TypeScript strict · Zustand · TanStack Query · Zod",
        "Astro → Next.js 마이그레이션, 동등성 검증 게이트 설계",
        "AWS S3 · CloudFront · Amplify · CodeBuild 기반 배포 파이프라인",
      ],
    },
  ],
};

/** 이 사이트 자체의 측정값 — 로컬 프로덕션 빌드(next start) · brotli 압축 기준 실측. */
export const colophon = {
  measuredAt: "2026-09-11",
  condition: "next build → next start · brotli · 첫 방문(캐시 없음) · 1440×1000",
  items: [
    {
      label: "첫 화면 전송량",
      value: "322KB",
      note: "HTML 20.4 · CSS 4.4 · JS 174 · 폰트 124",
    },
    {
      label: "웹폰트",
      value: "123KB",
      note: "Pretendard 2벌 + 인사말용 1벌 · 원본 1,536KB에서 −92.0%",
    },
    {
      label: "JavaScript",
      value: "174KB",
      note: "직접 쓴 건 38줄(화면 진입 감지) · 나머지는 Next 런타임",
    },
    { label: "CSS", value: "4.4KB", note: "파일 1개 · 이미지 0장" },
    { label: "CLS", value: "0", note: "이미지가 없어 레이아웃이 밀릴 일이 없다" },
    { label: "클라이언트 컴포넌트", value: "1개", note: "등장 애니메이션 관찰자 · 나머지는 서버 렌더" },
  ],
};
