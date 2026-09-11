import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/content/career";
import { profile, site } from "@/content/profile";
import "./globals.css";

// 사용 글리프만 남긴 서브셋 — 원본 1,520KB → 118KB
const pretendard = localFont({
  src: [
    { path: "../public/fonts/Pretendard-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Pretendard-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-kr",
  fallback: ["Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
});


// "Hello!" 한 줄에만 쓴다 — 그 6글자만 남긴 서브셋(15.6KB → 1.1KB)
const display = localFont({
  src: [{ path: "../public/fonts/Display-400.woff2", weight: "400", style: "normal" }],
  display: "swap",
  variable: "--font-display",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description:
    "퍼블리싱과 웹 성능 최적화를 함께 하는 프론트엔드 개발자의 포트폴리오. 전송량 −92%, CLS 0.000, Lighthouse 100 등 14개 프로젝트의 실측 개선 수치와 측정 조건을 공개합니다.",
  keywords: [
    "프론트엔드 개발자",
    "웹 퍼블리셔",
    "웹 성능 최적화",
    "Core Web Vitals",
    "LCP",
    "CLS",
    "Lighthouse",
    "Next.js",
    "SEO",
    "GEO",
    "포트폴리오",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${profile.name} — ${profile.role}`,
    description:
      "14개 프로젝트의 실측 성능 개선 수치와 측정 조건을 공개하는 프론트엔드 포트폴리오.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description:
      "14개 프로젝트의 실측 성능 개선 수치와 측정 조건을 공개하는 프론트엔드 포트폴리오.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: profile.name,
      jobTitle: profile.role,
      description: profile.intro,
      knowsAbout: [
        "웹 성능 최적화",
        "Core Web Vitals",
        "웹 퍼블리싱",
        "Next.js",
        "React",
        "SEO",
        "생성형 검색 최적화(GEO)",
        "접근성",
      ],
      url: site.url,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "ko-KR",
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${display.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip" href="#main">
          본문으로 건너뛰기
        </a>

        <header className="masthead">
          <div className="shell masthead__inner">
            <Link href="/" className="masthead__mark">
              <span className="masthead__dot" aria-hidden="true" />
              <span>{profile.nameEn.split(/\s*[-·—]\s*/)[0]}</span>
              <span className="masthead__role">
                {profile.nameEn.split(/\s*[-·—]\s*/).slice(1).join(" · ")}
              </span>
            </Link>
            <nav className="masthead__nav" aria-label="주요">
              <Link href="/#about">About</Link>
              <Link href="/#skills">Skills</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/#career">Career</Link>
            </nav>
          </div>
          <div className="progress" aria-hidden="true" />
        </header>

        <main id="main">{children}</main>

        <Reveal />

        <footer className="footer">
          <div className="shell footer__inner">
            <span>
              {profile.name} · {profile.role}
            </span>
            <span className="footer__links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.github} target="_blank" rel="noreferrer noopener">
                GitHub ↗
              </a>
              <a href={contact.blog} target="_blank" rel="noreferrer noopener">
                Blog ↗
              </a>
            </span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
