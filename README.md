# 오수진 포트폴리오 - The Performance Architect

성능 중심의 기술 서사를 시각화하는 웹 포트폴리오입니다.

## 기술 스택

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Fonts:** Inter, Montserrat
- **Language:** TypeScript

## 디자인 시스템

- **테마:** Strict Black & White (B&W)
- **컬러:** 
  - Background: `#FFFFFF`
  - Text/Borders/Buttons: `#000000`
  - Accent: 검정 배경에 흰색 글씨 (Inverted)

## 시작하기

개발 서버 실행:

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
app/
  ├── components/     # 재사용 가능한 컴포넌트
  ├── lib/           # 유틸리티 함수
  ├── types/         # TypeScript 타입 정의
  ├── layout.tsx     # 루트 레이아웃
  ├── page.tsx       # 메인 페이지
  └── globals.css    # 글로벌 스타일
```

## 주요 기능

- ✅ B&W 디자인 시스템
- ✅ 성능 지표 시각화 (Impact Badges)
- ✅ 스마트 이력서 다운로드 (Impact Popup)
- 🔄 Velog 블로그 연동 (예정)
- 🔄 프로젝트 상세 페이지 (예정)

## 성능 목표

Lighthouse 점수 모든 항목 100점 달성
