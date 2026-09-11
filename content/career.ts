/**
 * 연락처 · 스킬 · 경력.
 * 전화번호와 상세 주소는 공개 사이트에 싣지 않는다 — 메일로 받는 편이 안전하다.
 */
export const contact = {
  email: "tnwls2dkdlel@gmail.com",
  github: "https://github.com/tnwlsdldkdlel",
  blog: "https://velog.io/@ooooohsu/posts",
  location: "서울",
};

/**
 * About 섹션의 인적사항 — 출처는 `docs/resume-2025.pdf`.
 * 전화번호·상세 주소는 여기에도 두지 않는다(위 주석 참고).
 */
export const personal = [
  { key: "이름", value: "오수진 · OH SU JIN" },
  { key: "경력", value: "개발 6년차 · 프론트엔드 2023 –" },
  { key: "거주", value: "서울 강남구" },
  { key: "학력", value: "강남대학교 전자공학과 학사" },
  { key: "메일", value: contact.email, href: `mailto:${contact.email}` },
];

/** 히어로에 세우는 핵심 스택 — 여섯 개만. 나머지는 경력 섹션에 있다. */
export const coreStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Zustand",
  "Playwright",
  "AWS",
];

export const skills = [
  { group: "프론트엔드", items: ["React", "Next.js", "TypeScript", "Vue", "JavaScript", "HTML/CSS"] },
  { group: "상태·데이터", items: ["Zustand", "TanStack Query", "Redux", "jotai", "Zod"] },
  { group: "측정·테스트", items: ["Lighthouse CLI", "Chrome DevTools", "React Profiler", "Playwright", "Puppeteer", "Vitest"] },
  { group: "인프라·협업", items: ["AWS S3·CloudFront·EC2", "GitHub Actions", "CodeBuild", "NginX", "Node.js"] },
];

export type CareerEntry = {
  period: string;
  company: string;
  role: string;
  summary: string;
  /** 그 회사에서 낸 정량 성과 — 숫자가 있는 것만 */
  results?: string[];
  current?: boolean;
};

export const career: CareerEntry[] = [
  {
    period: "2026.01 – 재직 중",
    company: "(주)엠플랜잇",
    role: "프론트엔드 개발자",
    summary:
      "서비스·어드민·캠페인 랜딩·사내 도구까지 14개 프로젝트를 프론트엔드 전담으로 맡아 운영까지 끌고 갔습니다. 아래 '주요 작업'이 이 기간의 기록입니다.",
    results: [
      "페이지 전송량 20.30MB → 1.54MB (−92%) · CLS 0.546 → 0.000",
      "Astro → Next.js 마이그레이션, 웹폰트 796KB → 149KB",
      "사내 대시보드 Lighthouse 100 / 전송량 1,782KB → 246KB",
    ],
    current: true,
  },
  {
    period: "2025.01 – 2025.12",
    company: "열매컴퍼니",
    role: "프론트엔드 개발자",
    summary:
      "미술품 조각투자 플랫폼과 경매 데이터 분석 대시보드를 담당했습니다. React Profiler·Lighthouse CLI·Puppeteer로 병목을 먼저 재고 고치는 방식을 이때 굳혔습니다.",
    results: [
      "회원 리스트 초기 렌더링 5,699ms → 렌더링 비용 92.7% 개선",
      "반응형 디자인 시스템 구축으로 모바일 이탈률 18% → 9%",
      "커서 기반 하이브리드 페이징 도입 — API 응답 시간 최대 66% 단축",
      "배너 관리 기능 — 청약 신청률 169.63% 증가 · 교체 시간 2시간 → 5분",
      "동일 CI 계정 식별 UI 개선 — 계정 혼동 CS 문의 99% 감소",
      "청약 캘린더 실시간 연동 — GA 기준 트래픽 85% 증가",
    ],
  },
  {
    period: "2023.10 – 2024.12",
    company: "엠쓰리모바일",
    role: "프론트엔드 개발자 (대리)",
    summary:
      "Android 단말기 설정 배포·중앙 관리 솔루션을 1인 개발로 맡았습니다. 화면부터 배포 파이프라인까지 혼자 돌리는 경험을 여기서 쌓았습니다.",
    results: [
      "1,000건 이상 로그 데이터 대시보드 성능 최적화·시각화",
      "JSON 표준화 + QR 배포 솔루션 — GA 기준 트래픽 69% 증가",
      "GitHub Actions + NginX 무중단 CI/CD 직접 구축, 활성 사용자 455명 무오류 처리",
      "웹 매뉴얼 다국어(i18n) 관리 시스템 · 검색 기능 구현",
    ],
  },
  {
    period: "2023.07 – 2023.10",
    company: "에루샤",
    role: "개발자",
    summary:
      "인증·결제 모듈과 운영 프로세스를 구현했습니다. PASS·IPIN 인증과 결제 연동, 쿠폰·등급 자동화를 담당했습니다.",
  },
  {
    period: "2021.04 – 2023.06",
    company: "지혜로운세상",
    role: "개발자",
    summary:
      "통신사 메시지·모바일 상품권 서비스와 가상자산 세금 계산 서비스를 만들었습니다. 프론트 구현과 함께 Node.js 자동화·Redis 인증까지 풀스택으로 다뤘습니다.",
    results: [
      "RCS 리치 미디어 입력·미리보기 UI/UX 구현",
      "node-cron 외부 API 연동 자동화 + 429 예외 처리",
      "Redis 기반 이메일 인증 로그인 — 보안·성능 개선",
    ],
  },
  {
    period: "2018.03 – 2020.04",
    company: "테크노프로 디자인 (일본 고베)",
    role: "품질",
    summary: "개발로 전향하기 전, 일본에서 품질 업무를 담당했습니다.",
  },
];

export const education = [
  { period: "2014.03 – 2018.02", name: "강남대학교 전자공학과", note: "학사 졸업" },
  {
    period: "2020.05 – 2020.10",
    name: "중앙정보처리학원",
    note: "자바 응용 SW 개발자 취업과정 수료",
  },
];
