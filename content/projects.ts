export type Metric = {
  label: string;
  before?: string;
  after: string;
  delta?: string;
  note?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  /** 이 서비스가 무엇인가 — 내가 한 일(tagline)과 섞지 않는다. */
  about: string;
  summary: string;
  role: string;
  /** 이 프로젝트에 붙은 인원 — 기여 경계를 읽는 사람이 가늠할 수 있게. */
  team: string;
  period: string;
  status: "운영 중" | "진행 중" | "완료" | "PoC";
  /** 누가 쓰는 물건인가 — 카드 뱃지로 나간다. */
  audience: "외부 서비스" | "사내 서비스";
  url?: string;
  urlLabel?: string;
  urlNote?: string;
  ogImage?: string;
  stack: string[];
  keywords: string[];
  featured?: boolean;
  /** 광고주 퍼블리싱 카드 한 장에 합쳐 넣는 건 — 개별 카드로 세우지 않는다. */
  publishing?: boolean;
  metrics?: Metric[];
  highlights: { title: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "soksok",
    about: "통신상품을 비교하고 상담을 신청하는 사이트",
    audience: "외부 서비스",
    name: "쏙쏙 컴퍼니",
    tagline:
      "Astro로 만들어진 통신·가전 비교 사이트를 Next.js로 옮기고, 웹폰트를 정밀 서브셋해 전송량을 절반으로 줄였다.",
    summary:
      "8개 라우트 전체를 Astro에서 Next.js App Router(정적 익스포트)로 이전하면서 JSON-LD·SEO·유입 통계를 동등하게 재현했다. 이전 자체보다 어려웠던 건 '바뀌지 않았음'을 증명하는 쪽이었다 — 라우트별 HTML 바이트 비교와 시각 회귀 스냅샷으로 픽셀 동일성을 게이트에 걸었다. 그다음 웹폰트를 실제 사용 글리프만 남겨 서브셋했다.",
    role: "프론트엔드 전담 · 마이그레이션 설계, 퍼블리싱, 성능 최적화, 배포 파이프라인",
    team: "백엔드 1 · 프론트 1(본인) · 디자이너 1",
    period: "2026.06 – 진행중",
    status: "운영 중",
    url: "https://soksokcompany.com",
    urlLabel: "soksokcompany.com",
    ogImage: "/og/soksok.png",
    stack: [
      "Next.js 15",
      "App Router",
      "정적 익스포트",
      "TypeScript",
      "Swiper",
      "Playwright",
      "AWS Amplify",
    ],
    keywords: [
      "Astro 마이그레이션",
      "웹폰트 서브셋",
      "시각 회귀 테스트",
      "JS 번들 예산",
      "정적 사이트",
    ],
    featured: true,
    metrics: [
      {
        label: "웹폰트 전송량",
        before: "796KB",
        after: "149KB",
        delta: "−81%",
        note: "실사용 글리프만 남긴 서브셋 5종",
      },
      {
        label: "Lighthouse Performance",
        before: "64",
        after: "82",
        note: "통제 A/B — 외부 위젯 차단·모바일·동일 로컬, 3회 중앙값",
      },
      { label: "FCP", before: "4.6s", after: "2.0s", delta: "−57%" },
      { label: "LCP", before: "7.9s", after: "4.6s", delta: "−42%" },
      {
        label: "페이지 총 전송량",
        before: "1,157KB",
        after: "512KB",
        delta: "−56%",
      },
      {
        label: "JS 번들",
        after: "902KB / 예산 950KB",
        note: "예산을 넘기면 빌드가 실패한다",
      },
      {
        label: "테스트",
        after: "단위 138 · E2E 24 · 시각 회귀 8종",
        note: "픽셀 동일성 검증 포함",
      },
      { label: "CSS", before: "7,891줄", after: "7,363줄", note: "죽은 규칙 0" },
    ],
    highlights: [
      {
        title: "폰트 서브셋 — 커닝 손실을 픽셀 비교로 잡아냈다",
        body: "빌드 산출물 HTML에서 실제 글리프를 뽑아 폰트를 서브셋했다. 첫 구현은 정규식으로 문자를 걸렀는데 공백과 &를 빼먹어 브라우저가 원본 5벌을 전부 내려받아 925KB로 오히려 나빠졌다 — 이미 설치돼 있던 jsdom 파싱으로 교체했다. 더 고약했던 건 육안으로 보이지 않는 커닝 손실이었다. 텍스트가 1~4px 밀리는 것을 시각 회귀 픽셀 비교로만 발견했고, harfbuzz를 직접 호출해 레거시 kern 테이블을 보존하는 조합을 A~G까지 실측해 찾았다. weight당 +3.8KB를 치르고 원본 대비 픽셀 차이 0을 얻었다.",
      },
      {
        title: "측정을 신뢰하는 법 — 단일 수치는 쓰지 않는다",
        body: "같은 배포본을 네 번 재니 Performance가 67·72·74·85로 흔들렸다(LCP 6.4·6.3·6.0·3.8s). 한 번만 쟀다면 운 좋은 실행 하나를 기준선으로 박을 뻔했다. 이후 모든 수치는 3회 중앙값 + 외부 위젯을 차단한 통제 조건에서만 채택했고, 절대 타이밍보다 바이트 수와 캐시 히트를 1차 신호로 삼았다.",
      },
      {
        title: "효과 없는 최적화는 되돌렸다",
        body: "Lighthouse가 지적한 fetchPriority를 히어로 이미지에 넣었지만, 적용 전후 우선순위가 둘 다 High로 동일했고 LCP도 4.6s에서 변하지 않았다. LCP 단계가 Load Delay 40ms · Render Delay 2,991ms라 fetchpriority가 줄일 구간 자체가 없었다. 실측으로 무효를 확인하고 제거했다.",
      },
      {
        title: "데이터 소스에 폴백을 두지 않았다",
        body: "카테고리·FAQ·상품 데이터는 빌드 타임 API가 정본이고 폴백이 없다. API가 죽으면 빌드가 실패한다 — 의도한 동작이고, 빌드 실패 자체를 검증했다. 낡은 폴백 데이터가 조용히 배포되는 것보다 배포가 멈추는 쪽이 안전하다고 봤다.",
      },
    ],
  },
  {
    slug: "dd-da",
    about: "숙소·여행 정보를 나누는 커뮤니티형 서비스.",
    audience: "외부 서비스",
    name: "dd-da",
    tagline:
      "전송량 20.3MB에 LCP 99.6초였던 서비스를 1.54MB · CLS 0.000으로 되돌렸다.",
    summary:
      "커뮤니티형 서비스의 프론트 성능과 SEO를 전담했다. Lighthouse Performance 49에 LCP가 99.6초로 찍혔는데 TBT도 서버 응답도 멀쩡했다 — 메인스레드 문제도 레이아웃 시프트도 아닌 순수 대역폭 문제였다. 배경 이미지 한 장이 13.3MB였다.",
    role: "프론트엔드 전담 · 성능 진단·최적화, SEO 기반 구축, 도메인 이전",
    team: "백엔드 1 · 프론트 1(본인)",
    period: "2026.03 – 2026.08",
    status: "운영 중",
    url: "https://dd-da.co.kr",
    urlLabel: "dd-da.co.kr",
    ogImage: "/og/dd-da.png",
    stack: [
      "Next.js",
      "App Router",
      "TypeScript",
      "jotai",
      "CloudFront",
      "next/image",
    ],
    keywords: [
      "Core Web Vitals",
      "LCP 최적화",
      "CLS",
      "이미지 파이프라인",
      "sitemap",
      "검색 색인",
    ],
    featured: true,
    metrics: [
      {
        label: "페이지 총 전송량",
        before: "20.30MB",
        after: "1.54MB",
        delta: "−92%",
      },
      {
        label: "Lighthouse Performance",
        before: "49",
        after: "77",
        delta: "+28",
      },
      {
        label: "CLS",
        before: "0.546",
        after: "0.000",
        note: "레이아웃 시프트 완전 제거",
      },
      {
        label: "배경 이미지",
        before: "13.3MB",
        after: "38.7KB",
        delta: "−99.7%",
        note: "SVG 안에 base64 JPEG → WebP",
      },
      { label: "LCP Load Delay", before: "7.0s", after: "3.7s", delta: "−47%" },
      {
        label: "CDN 이미지",
        before: "745KB PNG",
        after: "39.5KB WebP",
        delta: "1/19",
      },
      {
        label: "sitemap",
        after: "1,260 URL",
        note: "robots·canonical·lastmod 규격 충족",
      },
    ],
    highlights: [
      {
        title: "13.3MB짜리 SVG — 확장자는 벡터, 내용물은 4096×2730 JPEG",
        body: "background.svg가 13,957,754바이트였다. SVG 태그 자체는 787바이트고 나머지 전부가 base64로 박힌 JPEG였다. 게다가 pattern matrix 탓에 원본의 오른쪽 55% × 위쪽 47%만 화면에 남는 구조였다. 페이지 총 전송 20.30MB 중 13.6MB, 즉 67%가 이 한 장이었다. 이것이 대역폭을 독점해 LCP 요소인 배너 이미지 요청이 17초 늦게 시작되고 페인트가 68초 밀렸다. 디자인이 바뀌는 안(단색 + 패턴 타일)은 폐기하고, 원본 SVG의 렌더 결과를 그대로 구워 픽셀을 유지한 채 38.7KB WebP로 대체했다.",
      },
      {
        title: "CDN에 이미지 변환 기능이 없다는 것을 실측으로 확인",
        body: "쿼리스트링(?w=640, ?format=webp)과 Accept 헤더 협상을 전부 시도했지만 모두 원본 745,761B PNG가 그대로 왔다. CDN 레벨 변환이 불가능함을 확인한 뒤 next/image 경로로 돌려 39,500B WebP를 받아냈다 — 19분의 1이다. 기본 폭을 1080으로 잡은 근거는, 이미지 4종 중 3종이 이미 640px 이하라 축소 자체가 없고 나머지 하나만 1120→1080(3.6%)이라 화질 손실이 사실상 0이었기 때문이다.",
      },
      {
        title: "로컬에서 보이지 않는 개선을 구분했다",
        body: "로컬 측정에선 배경 교체 후에도 Performance가 50→49로 동일했다. 대역폭 절감이 본질인 최적화라 loopback에서는 드러나지 않는다. 다만 LCP Load Delay·Load Time이 정확히 절반으로 줄어 대역폭 경합 완화는 직접 확인됐고, 확정 효과를 '−9.95MB 전송 바이트'로 기록한 뒤 배포본 재측정으로 검증했다.",
      },
      {
        title: "도메인 이전과 색인 — ISR 캐시는 배포로 지워지지 않는다",
        body: "도메인을 옮기며 리다이렉트·sitemap·robots를 전환하고 검색엔진 사이트 이전을 성사시켰다. 이 과정에서 SEO 메타 값을 고쳐 배포해도 ISR 캐시 때문에 옛 값이 계속 나가는 함정을 만났고, 재검증 호출을 배포 절차에 넣었다.",
      },
    ],
  },
  {
    slug: "lab-dashboard",
    about: "커밋 이력과 태스크 데이터를 묶어 보여주는 사내 대시보드.",
    audience: "사내 서비스",
    name: "Lab Dashboard",
    tagline: "Lighthouse 100점짜리 화면에서 전송량의 87%가 20px 아바타였다.",
    summary:
      "커밋 이력과 태스크 데이터를 묶어 보여주는 사내 대시보드. 수집 파이프라인부터 화면·배포까지 전담했다. 성능 점수는 모바일·데스크톱 모두 100점이었지만, 점수가 문제를 가리고 있었다.",
    role: "설계 · 프론트엔드 · 수집 파이프라인 · 배포 전담",
    team: "백엔드 1 · 프론트 1(본인)",
    period: "2026.08",
    status: "운영 중",
    urlNote: "사내망 전용 — 외부 접근 불가",
    stack: [
      "Next.js",
      "App Router",
      "React Server Components",
      "TypeScript strict",
      "Aurora",
      "Lambda",
      "EventBridge",
    ],
    keywords: ["Lighthouse 100", "next/image", "RSC", "서버 캐싱", "사내 도구"],
    featured: true,
    metrics: [
      {
        label: "Lighthouse Performance",
        after: "100 / 100",
        note: "모바일 · 데스크톱",
      },
      { label: "총 전송량", before: "1,782KB", after: "246KB", delta: "−86%" },
      {
        label: "이미지 전송량",
        before: "1,548KB",
        after: "5.4KB",
        delta: "−99.7%",
      },
      { label: "TTI", before: "4.7s", after: "2.1s", delta: "−55%" },
      { label: "TTFB", after: "46ms", note: "10회 측정 중앙값" },
      { label: "LCP / CLS", after: "1.4s / 0", note: "모바일 기준" },
      { label: "HTML gzip", before: "294.7KB", after: "32.7KB", delta: "−89%" },
      { label: "테스트", after: "246개", note: "TypeScript strict" },
      { label: "수집 데이터", after: "21개 저장소 · 1,435건" },
    ],
    highlights: [
      {
        title: "100점이 가린 1,548KB",
        body: "총 23건 요청 1,782KB 중 이미지 5장이 1,547.6KB, 전체의 86.8%였다. 20×20px로 그려지는 아바타에 최대 458KB 원본이 그대로 내려오고 있었다. 아바타가 LCP 요소가 아니라서 점수에 반영되지 않았을 뿐, 저속망과 구성원 증가 구간에서는 그대로 체감된다. 설정 화면은 더 심해서 드롭다운을 열면 13장 9,363KB까지 갔다 — 구성원 수에 선형으로 증가하는 구조였다. 축소본으로 바꿔 총 전송량을 246KB로 내렸다.",
      },
      {
        title: "저장하지 않기로 한 것들",
        body: "태스크는 DB에 넣지 않고 프로세스 메모리에 5분 캐싱한다(단일 인스턴스 전제). 담당자 이름과 아바타도 저장하지 않는다 — 조회 응답에 딸려 오는 값이고, 저장해 두면 팀 바깥 담당자가 화면에서 빠지기 때문이다. 동시 요청은 single-flight로 묶어 추가 호출 없이 처리한다.",
      },
      {
        title: "공유 순수 로직을 한 곳에",
        body: "웹·Lambda·스크립트가 함께 쓰는 순수 로직을 core/로 분리하고, 서버 I/O는 lib/, 라우트 특수 파일만 app/에 뒀다. 코드 리뷰 8패스를 거치며 중복된 산술과 정렬 규칙을 공유 헬퍼로 통합했다.",
      },
      {
        title: "지금은 괜찮지만 지켜볼 것",
        body: "DOM 깊이 17 · 최대 자식 51로 TBT 60ms는 멀쩡하다. 다만 태스크가 늘면 선형으로 커지는 구조라, 느려지면 여기부터 본다고 문서에 못박아 뒀다. 고칠 것과 지켜볼 것을 구분하는 것도 최적화의 일부다.",
      },
    ],
  },
  {
    slug: "geo-metric-care",
    about: "URL 하나를 넣으면 SEO·GEO를 진단해 PDF 리포트를 메일로 보내는 서비스.",
    audience: "외부 서비스",
    name: "GEO METRIC CARE",
    tagline:
      "URL 하나를 넣으면 SEO·GEO를 진단해 PDF 리포트를 메일로 보내는 서비스.",
    summary:
      "URL 입력부터 크롤링·분석·PDF 생성·메일 발송까지의 파이프라인을 프론트와 함께 만들었다. 외부 URL을 받아 서버에서 크롤링하는 구조라 SSRF 방어와 개인정보 암호화가 기능만큼 중요했다.",
    role: "프론트엔드 · 분석 파이프라인 · 리포트 생성",
    team: "백엔드 1 · 프론트 1(본인)",
    period: "2026.03 – 2026.06",
    status: "운영 중",
    url: "https://geo.mplanit.co.kr",
    urlLabel: "geo.mplanit.co.kr",
    ogImage: "/og/geo-metric-care.png",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Node 20",
      "Playwright",
      "Vitest",
      "AWS",
    ],
    keywords: ["SEO 진단", "GEO", "SSRF 방어", "PDF 생성", "구조화 데이터"],
    featured: true,
    metrics: [
      { label: "테스트", after: "286건", note: "Vitest" },
      {
        label: "PDF 워터마크",
        after: "600 span 타일 · CSS rotate",
        note: "SVG 방식 7회 시도 끝에 전환",
      },
      { label: "개인정보", after: "AES-256-GCM 컬럼 암호화" },
      { label: "리포트 다운로드", after: "서명 토큰 · 7일 만료" },
    ],
    highlights: [
      {
        title: "외부 URL을 받는 서비스의 방어선",
        body: "URL 형식 검증 → SSRF 가드(내부·사설·메타데이터 IP·비-HTTP 스킴 차단) → 필터 → rate limit → robots 확인 순으로 통과한 뒤에야 크롤링한다. 분석 결과에 찍히는 외부 IP는 가리고, 로그인 페이지를 감지하면 별도로 분기한다. 로그인 감지는 오차단 위험이 있어 본문 패턴 매치에 더해 짧은 본문·비밀번호 입력 존재·타이틀 중 하나를 추가로 요구하는 다중 신호 방식으로 바꾸고 회귀 테스트를 붙였다.",
      },
      {
        title: "PDF 워터마크를 일곱 번 시도한 끝에",
        body: "SVG 경로는 Chromium PDF 래스터화에서 계속 깨졌다. 결국 HTML 텍스트 타일(600개 span을 CSS로 -30° 회전)로 전환했고, HMR로 즉시 확인할 수 있는 미리보기 라우트를 따로 만들어 시도 비용을 낮췄다.",
      },
      {
        title: "SEO를 코드로 고정",
        body: "사이트 상수 한 파일을 기준으로 robots·sitemap·코드 생성 OG 이미지·JSON-LD(Organization·WebSite)·페이지별 canonical·타이틀 템플릿을 전부 파생시켰다. 분석·미리보기·API 경로는 색인에서 제외했다.",
      },
      {
        title: "웹폰트 self-host로 기기별 깨짐 해결",
        body: "next/font로 본문·제목 서체를 self-host해 기기마다 폰트와 굵기가 다르게 그려지던 문제를 잡았다. 알림은 공통 모달 프로바이더로 통일하고, 배경 스크롤 잠금은 참조 카운터 훅으로 중첩 상황까지 처리했다.",
      },
    ],
  },
  {
    slug: "mds",
    about: "URL이나 Figma 디자인 시스템에서 토큰을 뽑아 문서 디자인 시스템을 만드는 도구.",
    audience: "사내 서비스",
    name: "MDS",
    tagline:
      "URL이나 Figma 디자인 시스템에서 토큰을 추출해 문서 디자인 시스템으로 만든다.",
    summary:
      "두 축으로 움직이는 서비스다. URL을 넣으면 문서 디자인 시스템과 가이드 프레임을 뽑아내고, Figma 디자인 시스템에서는 토큰을 추출해 광고주별로 바인딩한다. 플러그인과 서버가 계약을 공유하는 구조라 버전 불일치가 가장 큰 위험이었다.",
    role: "프론트엔드 · Figma 플러그인 · 추출 파이프라인 · 배포",
    team: "백엔드 1 · 프론트 1(본인)",
    period: "2026.06 – 2026.07",
    status: "운영 중",
    url: "https://mds.mplanit.co.kr",
    urlLabel: "mds.mplanit.co.kr",
    stack: [
      "Next.js",
      "TypeScript",
      "Figma Plugin API",
      "Playwright",
      "systemd",
      "AWS",
    ],
    keywords: [
      "디자인 토큰",
      "Figma 플러그인",
      "크롤러 최적화",
      "프로토콜 버저닝",
    ],
    featured: true,
    metrics: [
      {
        label: "크롤러",
        after: "상시 브라우저 + 광고 차단 + 인스턴스 재활용 + idle 타이머",
      },
      {
        label: "메모리",
        after: "2GB 상한으로 격리",
        note: "크롤러가 서버를 밀어내지 못하게",
      },
      {
        label: "플러그인 배포",
        after: "4자리 코드 · 정적 zip",
        note: "로컬·운영 자동 분기",
      },
      {
        label: "보안",
        after: "SSRF 가드 운영 검증",
        note: "내부·사설·메타데이터 차단",
      },
    ],
    highlights: [
      {
        title: "플러그인과 서버가 어긋나면 배너로 경고한다",
        body: "Figma 플러그인은 사용자 로컬에 임포트된 채로 남아 있어서, 서버 계약이 바뀌어도 옛 플러그인이 계속 붙는다. 프로토콜 버전 핸드셰이크를 넣어 버전이 어긋나면 플러그인 안에 경고 배너를 띄우고 접속 중인 서버 호스트를 라벨로 보여주게 했다. 로컬용·운영용 zip 이름도 분리해 임포트 사고를 줄였다.",
      },
      {
        title: "배포 헬스체크를 포트에서 서비스 상태로",
        body: "포트가 200을 돌려준다고 해서 서비스가 살아 있는 건 아니다. 헬스체크를 서비스 활성 상태까지 확인하도록 바꿨다. 설정과 시크릿은 각각 다른 저장소에서 기동 시 메모리로만 읽어 디스크에 남기지 않는다.",
      },
      {
        title: "크롤링 비용을 상수로",
        body: "요청마다 브라우저를 띄우지 않고 상시 인스턴스를 재활용하며, 광고·트래커를 차단해 불필요한 네트워크를 제거했다. idle 타이머로 유휴 시 자원을 반납한다.",
      },
    ],
  },
  {
    slug: "ai-lab",
    about: "여러 AI 서비스 모듈을 한 콘솔에서 운영·정산·조회하는 사내 플랫폼.",
    audience: "사내 서비스",
    name: "AI-LAB 통합 콘솔",
    tagline:
      "여러 AI 서비스 모듈을 한 콘솔에서 운영·정산·조회하는 사내 플랫폼 프론트엔드.",
    summary:
      "트래킹 SDK, GEO 지표, 디자인 시스템, 배너 생성, 릴스 스튜디오, 챗봇까지 서로 다른 모듈을 하나의 콘솔에 얹었다. 모듈마다 인증 방식과 데이터 모델이 달라서, 공통 레이어를 어디까지 끌어올릴지가 계속되는 판단이었다.",
    role: "프론트엔드 전담 · 6개월 연속 개발 (핸드오프 로그 39건)",
    team: "백엔드 1 · 프론트 1(본인)",
    period: "2026.03 – 진행 중",
    status: "진행 중",
    urlNote: "사내 운영 콘솔",
    stack: [
      "React 19",
      "Vite",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Zustand",
      "TanStack Query",
      "Zod",
      "axios",
    ],
    keywords: [
      "멀티 모듈 콘솔",
      "토큰 핸드오프",
      "서버 상태 관리",
      "디자인 시스템",
    ],
    featured: true,
    metrics: [
      {
        label: "통합 모듈",
        after: "6종",
        note: "트래킹 · GEO · MDS · Banner Fit · Reels · 챗봇",
      },
      { label: "개발 기간", after: "6개월 연속 · 핸드오프 39건" },
      {
        label: "공통화",
        after: "사용이력 필터바 · 요약 카드 · 운영자 패널 · Drawer",
      },
    ],
    highlights: [
      {
        title: "게스트 가드와 토큰 핸드오프",
        body: "외부 모듈로 넘어갈 때 쿠키로 토큰을 핸드오프하고, 로그아웃 시 서버 키를 폐기한다. 조직 트리에서 선택한 노드가 계정 필터로 전파되도록 상태를 설계해, 모듈이 늘어도 진입 경로는 하나로 유지된다.",
      },
      {
        title: "운영자 화면과 사용자 화면의 공용화",
        body: "프로젝트 상세 Drawer를 운영자와 마이페이지가 공유하되, 내부 식별자·토큰·원가는 사용자 쪽에 노출하지 않는다. 같은 컴포넌트를 쓰면서 노출 범위를 분기하는 편이, 화면을 두 벌 유지하는 것보다 어긋날 여지가 적었다.",
      },
      {
        title: "레포 위생도 작업의 일부로",
        body: "데드코드와 미사용 의존성을 정리하고 lint·타입체크·테스트·빌드를 전부 통과시키는 것을 마무리 기준으로 잡았다. 배포 환경변수는 파이프라인 단일 소스로, 개발 환경은 로컬 env 파일로 일원화했다.",
      },
    ],
  },
  {
    publishing: true,
    slug: "pass",
    about: "통신 3사 딥링크와 이벤트 응모를 붙인 캠페인 랜딩 페이지.",
    audience: "외부 서비스",
    name: "PASS 캠페인 랜딩",
    tagline:
      "통신 3사 딥링크와 이벤트 응모를 붙인 캠페인 랜딩. 폰트·이미지·캐시를 처음부터 설계했다.",
    summary:
      "정적 호스팅 + CDN으로 배포한 캠페인 페이지. 짧은 기간에 트래픽이 몰리는 성격이라 첫 로드가 전부였고, 폰트 자체 호스팅과 장기 캐시 헤더를 처음부터 깔고 갔다.",
    role: "퍼블리싱 · 성능 · 배포 · API 연동 전담",
    team: "백엔드 1 · 프론트 1(본인)",
    period: "2026.08",
    status: "운영 중",
    url: "https://pass.mplanit.co.kr",
    urlLabel: "pass.mplanit.co.kr",
    stack: [
      "HTML",
      "Vanilla CSS",
      "JavaScript",
      "AWS S3",
      "CloudFront",
      "배포 스크립트",
    ],
    keywords: ["캠페인 랜딩", "딥링크", "캐시 전략", "OG 공유", "반응형"],
    metrics: [
      {
        label: "이미지 낭비",
        before: "PC·모바일 2장 동시 다운로드",
        after: "picture로 1장",
        delta: "−200~265KB",
        note: "display:none은 다운로드를 막지 못한다",
      },
      { label: "폰트", after: "자체 호스팅 · 1년 immutable 캐시" },
      { label: "딥링크", after: "통신 3사 확정 링크" },
      {
        label: "반응형 검증",
        after: "1023px 경계 실측",
        note: "중간 해상도까지 시안 대조",
      },
    ],
    highlights: [
      {
        title: "display:none은 다운로드를 막지 못한다",
        body: "PC용·모바일용 이미지를 CSS로 숨기는 방식이라 기기마다 200~265KB를 그냥 버리고 있었다. picture 요소로 바꿔 필요한 한 장만 받도록 했다. 캠페인 페이지는 첫 방문이 곧 전부라 이런 낭비가 그대로 이탈로 간다.",
      },
      {
        title: "CDN 무효화는 브라우저 캐시를 지우지 못한다",
        body: "무효화만으로는 이미 브라우저에 박힌 JS·CSS가 갱신되지 않는다. HTML에 캐시 버스터 쿼리를 두고 배포 절차에 포함시켰다. 폰트는 1년 immutable로 따로 동기화하므로 갱신하려면 파일명을 바꿔야 한다 — 이 규칙을 배포 문서에 명시해 다음 사람이 같은 함정을 밟지 않게 했다.",
      },
      {
        title: "유입 채널을 원본 그대로",
        body: "유입 파라미터를 프론트에서 매핑하지 않고 원본 값 그대로 채널 코드로 전송한다. 매핑 테이블을 두면 새 채널이 생길 때마다 배포가 필요해지기 때문이다. 직접 유입은 아예 필드를 빼서 빈 값과 구분했다.",
      },
    ],
  },
  {
    slug: "soksok-admin",
    about: "상담 신청·광고 통계·관리자 관리를 다루는 운영 어드민.",
    audience: "사내 서비스",
    name: "쏙쏙 Admin",
    tagline:
      "Figma 시안 그대로 퍼블리싱한 운영 어드민. 도메인별 구조로 화면이 늘어도 흩어지지 않게.",
    summary:
      "상담 신청·광고 통계·관리자 관리를 다루는 운영 어드민. 디자인 토큰과 CSS Modules로 시안을 그대로 옮기되, 폴더 구조는 타입이 아니라 도메인 기준으로 잡았다.",
    role: "프론트엔드 전담 · 퍼블리싱 · API 연동 · 배포",
    team: "백엔드 1 · 프론트 1(본인)",
    period: "2026.07",
    status: "운영 중",
    urlNote: "운영자 전용",
    stack: [
      "React",
      "TypeScript",
      "CSS Modules",
      "디자인 토큰",
      "AWS S3",
      "CloudFront",
    ],
    keywords: [
      "어드민",
      "디자인 토큰",
      "CSS Modules",
      "라우트 가드",
      "엑셀 내보내기",
    ],
    metrics: [
      {
        label: "인증",
        after: "로그인 · refresh · 라우트 가드 · 최초 로그인 비밀번호 변경",
        note: "E2E 검증",
      },
      {
        label: "공통 컴포넌트",
        after: "DataTable · SearchPanel · Pagination · Modal · Skeleton",
      },
      { label: "배포", after: "푸시 시 자동 배포" },
    ],
    highlights: [
      {
        title: "도메인별 폴더와 타입별 폴더를 섞어 썼다",
        body: "페이지와 훅은 도메인(관리자·인증·상담·광고통계)별로 나누고, api·components·lib·store·types는 타입 기준을 유지했다. 화면 단위로 붙는 것은 도메인이 맞고, 여러 도메인이 함께 쓰는 것은 타입이 맞다. 한 가지 규칙으로 밀어붙이지 않는 편이 찾기 쉬웠다.",
      },
      {
        title: "엑셀 내보내기에 가드를 걸었다",
        body: "통계 내보내기는 기간이 필수이고 최대 1개월로 제한한다. 제한이 없으면 운영 DB를 통째로 긁는 쿼리가 언제든 나갈 수 있다. 비밀번호 확인 팝업도 함께 뒀다.",
      },
    ],
  },
  {
    publishing: true,
    slug: "aia",
    about: "암·치아·치매·종합건강 4개 보험 상품의 서브브랜드 상품 페이지.",
    audience: "외부 서비스",
    name: "보험 상품 서브브랜딩",
    tagline:
      "하나의 코드베이스에서 두 개의 서브브랜드를, 데이터 속성 하나로 갈라 낸다.",
    summary:
      "암·치아·치매·종합건강 4개 상품 페이지를 A안·B안 두 벌씩, 총 8벌 퍼블리싱했다. 브랜드가 둘이지만 구조는 같아서, 리포지토리 구조를 배포 버킷 구조와 일치시키고 브랜드 차이는 속성 하나로만 분기했다.",
    role: "퍼블리싱 전담 · 반응형 · 배포 파이프라인",
    team: "백엔드 1 · 프론트 1(본인)",
    period: "2026.08 – 진행 중",
    status: "진행 중",
    url: "https://aia.mplanit.co.kr",
    urlLabel: "aia.mplanit.co.kr",
    stack: ["HTML", "Vanilla CSS", "JavaScript", "AWS S3", "CodeBuild"],
    keywords: ["멀티 브랜드", "반응형", "디자인 토큰", "퍼블리싱"],
    metrics: [
      { label: "상품 페이지", after: "8벌", note: "4개 상품 × A·B안" },
      {
        label: "반응형",
        after: "1025~1920 · 태블릿·모바일 ≤1024",
        note: "분기점 1240",
      },
      {
        label: "브랜드 분기",
        after: "data-site 속성 1개",
        note: "헤더·푸터·팝업은 공용 조각",
      },
    ],
    highlights: [
      {
        title: "리포지토리 구조 = 배포 버킷 구조",
        body: "단일 버킷에 두 브랜드를 하위 경로로 나눠 배포한다. 로컬 폴더 구조를 버킷과 동일하게 맞춰서, 어떤 파일이 어디로 가는지 눈으로 확인할 수 있게 했다. 경로를 추측할 필요가 없으면 배포 사고도 줄어든다.",
      },
      {
        title: "임시 조치에는 만료 조건을 적어둔다",
        body: "모바일 작업이 끝나기 전까지 가로 스크롤을 막는 임시 규칙을 넣었다. 대신 '콘텐츠 모바일 마무리 시 걷어낼 것'이라는 조건을 문서 최상단에 경고로 박아 뒀다 — 임시 조치가 영구 조치가 되는 건 대개 만료 조건을 안 적었기 때문이다.",
      },
    ],
  },
  {
    slug: "chat-widget",
    about: "외부 사이트에 스크립트 한 줄로 붙는 임베드형 챗 위젯.",
    audience: "외부 서비스",
    name: "임베드 챗 위젯",
    tagline: "남의 사이트 위에 얹히는 위젯. 좌표계와 모바일 키보드가 전부였다.",
    summary:
      "외부 사이트에 스크립트 한 줄로 붙는 챗 위젯. 어떤 페이지에 얹힐지 모르기 때문에 좌표 계산과 스크롤 간섭 방지가 기능보다 중요했다.",
    role: "프론트엔드 전담 · 위젯 코어 · 배포 파이프라인",
    team: "백엔드 1 · 프론트 1(본인)",
    period: "2026.08",
    status: "운영 중",
    urlNote: "외부 사이트 임베드형",
    stack: ["TypeScript", "Vanilla DOM", "CI/CD", "AWS"],
    keywords: ["임베드 위젯", "드래그", "모바일 키보드", "스크롤 체이닝"],
    metrics: [
      {
        label: "펼침 방향",
        after: "사분면 자동 판정",
        note: "화면 밖으로 나가지 않게",
      },
      {
        label: "드래그",
        after: "단일 모듈로 통합",
        note: "버튼·헤더 경로 일원화",
      },
      { label: "빌드 게이트", after: "타입 검사를 CI 단계로 승격" },
      {
        label: "배포",
        after: "푸시 → 자동 배포 · 5회 실증",
        note: "백엔드 무영향 확인",
      },
    ],
    highlights: [
      {
        title: "스크롤 체이닝 — 위젯을 끝까지 스크롤하면 뒤 페이지가 밀린다",
        body: "패널 내부 스크롤이 끝에 닿으면 부모 페이지가 대신 스크롤되는 기본 동작이 있다. 남의 사이트 위에 얹히는 위젯에서는 이것이 곧 '사이트가 멋대로 움직인다'로 체감된다. 자동 포커스·입력창 높이·헤더 접힘까지 묶어 모바일 UX를 다시 잡았다.",
      },
      {
        title: "드래그 로직을 한 곳으로",
        body: "버튼과 헤더가 각각 드래그를 구현하고 있어서 전체화면 가드 같은 예외가 한쪽에만 들어가 있었다. 단일 모듈로 합치고 나니 예외 처리를 한 번만 쓰면 됐다.",
      },
    ],
  },
  {
    slug: "banner-fit",
    about: "프롬프트와 상품 이미지로 배너 크리에이티브를 만들고 규격별로 리사이즈하는 사내 도구.",
    audience: "사내 서비스",
    name: "Banner Fit",
    tagline:
      "AI로 광고 크리에이티브를 만들고, 로고를 얹고, 사이즈를 변형하는 생성 도구.",
    summary:
      "프롬프트와 상품 이미지로 배너 크리에이티브를 생성하고, 캔버스로 로고를 합성한 뒤 여러 규격으로 리사이즈하는 도구. 생성 결과를 잃는 것이 가장 큰 사고라 이탈 경고와 비율 유지에 공을 들였다.",
    role: "프론트엔드 전담 · 생성 플로우 · 캔버스 합성",
    team: "백엔드 1 · 프론트 1(본인)",
    period: "2026.06 – 2026.08",
    status: "운영 중",
    url: "https://banner-fit.mplanit.co.kr",
    urlLabel: "banner-fit.mplanit.co.kr",
    stack: ["TypeScript", "Canvas API", "멀티페이지", "디자인 토큰"],
    keywords: ["AI 생성", "Canvas 합성", "이탈 방지", "브라우저 호환성"],
    metrics: [
      { label: "테스트", after: "16 / 16 통과", note: "포맷 검사 게이트 포함" },
      { label: "프롬프트", after: "2,000자 · 결과물 비율 유지" },
      { label: "이탈 경고", after: "생성 중 이탈 시 확인" },
    ],
    highlights: [
      {
        title: "생성 결과를 잃지 않게",
        body: "AI 생성은 시간이 걸리고 비용이 든다. 작업 중 이탈 경고를 붙이고, 결과물 비율을 항상 유지해 다시 생성해야 하는 상황 자체를 줄였다.",
      },
      {
        title: "캔버스 합성 경로를 브라우저별로 실증",
        body: "로고 오버레이는 캔버스 합성이라 브라우저 엔진마다 결과가 다를 수 있다. WebKit·Chromium 양쪽에서 합성 경로를 직접 확인했다. 실기기 검증 수단이 없는 항목은 '미조치'로 남겨 추측으로 완료 처리하지 않았다.",
      },
    ],
  },
  {
    slug: "geo-pulse",
    about: "AI 검색 답변에서 브랜드가 얼마나 인용되는지 재는 점유율 측정 파이프라인.",
    audience: "사내 서비스",
    name: "GEO-Pulse",
    tagline:
      "AI 검색 답변에서 우리 브랜드가 얼마나 인용되는지 측정하는 파이프라인.",
    summary:
      "생성형 검색 시대의 점유율(SOV)을 재는 실험. 키워드에서 프롬프트 변형을 만들고, AI 답변을 받아 인용된 출처를 집계해 경쟁사와 비교한다. 자사 측정 결과는 0.0%였고, 그 0%가 곧 제품의 근거가 됐다.",
    role: "기획 · 파이프라인 · 대시보드 전담",
    team: "백엔드 1 · 프론트 1(본인)",
    period: "2026.05",
    status: "PoC",
    urlNote: "내부 PoC",
    stack: [
      "pnpm workspaces",
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
    ],
    keywords: [
      "GEO",
      "SOV 측정",
      "AI 검색",
      "데이터 파이프라인",
      "모노레포",
    ],
    metrics: [
      { label: "수집 데이터", after: "인용 808건 · 질의 실행 50회 · 일별 지표 55행" },
      { label: "측정 대상", after: "사이트 11개 · 키워드 10 · 프롬프트 변형 25" },
      { label: "자사 SOV", after: "0.0%", note: "'인용 없음'이 곧 진단 결과" },
      { label: "측정 비용", after: "워크스페이스당 1회 약 $1", note: "월 4회 ≈ $4" },
    ],
    highlights: [
      {
        title: "0%도 결과다",
        body: "자사 점유율 0.0%를 실패가 아니라 '인용 없음' 진단으로 확정하고 1단계를 종결했다. 같은 데이터를 다시 재는 건 회당 $1을 버리는 일이라, 입력 신호가 없는 추가 측정은 하지 않기로 결정했다. 측정 도구를 만들었으면 언제 측정을 멈출지도 정해야 한다.",
      },
      {
        title: "대시보드는 판단에 필요한 만큼만",
        body: "시드 검토(초안→활성 승격), SOV(핵심 지표 4종 + 사이트 바차트 + 키워드×사이트 매트릭스 + 시계열), 질의 실행 이력 드릴다운 — 세 화면으로 끝냈다. 파이프라인과 대시보드 자산은 새 워크스페이스에 그대로 재사용되도록 분리해 뒀다.",
      },
    ],
  },
  {
    slug: "publishing-dashboard",
    about: "퍼블리싱 산출물을 로컬에서 바로 띄워보는 사내 도구.",
    audience: "사내 서비스",
    name: "퍼블리싱 미리보기 대시보드",
    tagline: "의존성 0개, 단일 파일. 팀에는 실행 파일 하나만 전달한다.",
    summary:
      "퍼블리싱 산출물을 로컬에서 바로 띄워보는 사내 도구. 받는 사람이 개발자가 아닐 수 있어서, 설치 절차를 없애는 것이 기능보다 우선이었다.",
    role: "설계 · 구현 · 배포 전담",
    team: "백엔드 1 · 프론트 1(본인)",
    period: "2026.06 – 2026.08",
    status: "운영 중",
    urlNote: "로컬 실행 도구",
    stack: ["Node.js", "의존성 0", "단일 실행 파일"],
    keywords: ["사내 도구", "무의존성", "단일 실행 파일", "파일 감시"],
    metrics: [
      { label: "런타임 의존성", after: "0개", note: "단일 파일" },
      { label: "테스트", after: "26 / 26 통과" },
      {
        label: "배포물",
        after: "실행 파일 1개 (69MB)",
        note: "설정 파일은 옆에 자동 생성",
      },
      {
        label: "실행 환경",
        after: "JDK 자동 탐지·주입",
        note: "사용자 설정 파일을 건드리지 않는다",
      },
    ],
    highlights: [
      {
        title: "남의 설정 파일은 고치지 않는다",
        body: "빌드에 특정 JDK 버전이 필요한데 팀원마다 설치 경로가 다르다. 각자의 설정 파일을 수정하게 하는 대신, 실행할 때마다 탐지해서 인자로 넘기도록 했다. 없으면 화면에 설치 안내를, 있으면 헤더에 준비 완료 표시를 띄운다. 도구가 사용자 환경을 바꾸기 시작하면 그 도구는 신뢰를 잃는다.",
      },
      {
        title: "의존성 0으로 유지한 이유",
        body: "받는 사람이 설치 명령을 치지 않아도 되게 하려고 단일 파일에 의존성 없이 만들었다. 포트가 점유돼 있으면 스스로 복구하고, 저장하면 정적 미러가 즉시 반영된다. 결국 전달물은 실행 파일 하나다.",
      },
    ],
  },
  {
    slug: "lp-platform",
    about: "랜딩페이지를 섹션 단위로 조립하는 사내 빌더.",
    audience: "사내 서비스",
    name: "LP Platform",
    tagline:
      "설정 JSON으로 레이아웃을 그리던 엔진을 폐기하고, 섹션 컴포넌트로 되돌렸다.",
    summary:
      "랜딩페이지를 섹션 단위로 조립하는 빌더. 처음엔 HTML/설정 기반 레이아웃 엔진이었는데, 표현할 수 있는 것보다 설명해야 할 규칙이 빠르게 많아져서 React 섹션 컴포넌트 + 디자인 토큰 구조로 전면 교체했다.",
    role: "프론트엔드 · 에디터 · 렌더러 설계",
    team: "백엔드 1 · 프론트 1(본인)",
    period: "2026.04",
    status: "완료",
    urlNote: "사내 빌더",
    stack: ["React", "TypeScript", "디자인 토큰", "에디터 UI"],
    keywords: ["페이지 빌더", "섹션 렌더러", "타이포 토큰", "click-to-edit"],
    metrics: [
      { label: "섹션 타입", after: "17종", note: "단일 렌더러로 통합" },
      {
        label: "레이아웃 엔진",
        before: "HTML/config 기반",
        after: "React 섹션 컴포넌트",
        note: "전면 폐기",
      },
      {
        label: "식별자",
        after: "서버·클라이언트 대문자 통일",
        note: "전송 포맷 일치",
      },
    ],
    highlights: [
      {
        title: "설정 객체를 문자열 하나로 줄였다",
        body: "레이아웃 설정 JSON 객체를 없애고 최상위 레이아웃 식별자 문자열 하나만 남겼다. sticky·variant 같은 파생 설정은 전부 폐기했다. 설정으로 표현할 수 있는 경우의 수를 늘리는 것보다, 컴포넌트를 하나 더 만드는 쪽이 읽기 쉬웠다.",
      },
      {
        title: "disabled가 클릭을 삼키던 버그",
        body: "편집 모드에서 폼 요소를 클릭해 편집하는 구조인데, disabled 입력이 클릭 이벤트를 먹어서 선택이 되지 않았다. 포인터 이벤트를 끄는 방식으로 바꿔 편집 모드에서도 모든 하위 요소가 선택 가능해졌다.",
      },
    ],
  },
];

/** 개별 카드로 세울 건은 아니지만 실제로 맡았던 퍼블리싱 광고주 — 카드 한 장에 모아 쓴다. */
export const publishingClients = [
  "AIA생명",
  "PASS (통신 3사)",
  "웰컴금융",
  "쏙쏙컴퍼니",
  "엠플랜잇",
];

export const cardProjects = projects.filter((p) => !p.publishing);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
