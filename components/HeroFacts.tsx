import { contact } from "@/content/career";

/**
 * 히어로 맨 아래 연락처 — 아이콘만.
 * 이미지 대신 인라인 SVG라 요청도 0건이고 색은 currentColor를 따른다.
 */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
      <path d="m3.5 7.5 7.7 5.6a1.4 1.4 0 0 0 1.6 0l7.7-5.6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M4.5 20.5h15" />
      <path d="M14.6 4.4a1.9 1.9 0 0 1 2.7 0l1.3 1.3a1.9 1.9 0 0 1 0 2.7l-8.9 8.9-4 .7.7-4z" />
    </svg>
  );
}

export function HeroFacts() {
  return (
    <div className="facts">
      <p className="facts__links">
        <a href={`mailto:${contact.email}`} aria-label="메일 보내기" title="메일">
          <MailIcon />
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub 프로필 열기 (새 창)"
          title="GitHub"
        >
          <GitHubIcon />
        </a>
        <a
          href={contact.blog}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="블로그 열기 (새 창)"
          title="Blog"
        >
          <BlogIcon />
        </a>
      </p>
    </div>
  );
}
