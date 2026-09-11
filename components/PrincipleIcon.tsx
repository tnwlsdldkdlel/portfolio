/** 소개 섹션의 원칙 네 줄에 붙는 표식 — 이미지 대신 인라인 SVG. */
const paths: Record<string, React.ReactNode> = {
  // 측정 막대 — 재고 나서 고친다. 작은 크기에서 계기판보다 형태가 또렷하다
  gauge: (
    <>
      <path d="M5.2 19.4v-5.6" />
      <path d="M12 19.4V4.6" />
      <path d="M18.8 19.4v-9.2" />
    </>
  ),
  // 되돌아오는 화살표 — 효과 없으면 되돌린다
  undo: (
    <>
      <path d="M4.2 9.2h10.3a5.3 5.3 0 0 1 0 10.6H8.6" />
      <path d="m8.4 5 -4.2 4.2L8.4 13.4" />
    </>
  ),
  // 상단 바가 있는 프레임 — 마크업 단계
  frame: (
    <>
      <rect x="3.6" y="4.6" width="16.8" height="14.8" rx="2.4" />
      <path d="M3.6 9.4h16.8" />
    </>
  ),
  // 접힌 모서리 문서 — 기록
  note: (
    <>
      <path d="M6.2 3.8h8.2l4.4 4.4V19a1.2 1.2 0 0 1-1.2 1.2H6.2A1.2 1.2 0 0 1 5 19V5a1.2 1.2 0 0 1 1.2-1.2Z" />
      <path d="M9 12.4h6M9 16h4" />
    </>
  ),
};

export function PrincipleIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
