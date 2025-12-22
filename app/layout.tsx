import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "오수진 | The Performance Architect",
  description: "데이터와 측정 도구를 통해 비즈니스 문제를 해결하는 퍼포먼스 엔지니어",
  keywords: ["프론트엔드", "성능 최적화", "퍼포먼스 엔지니어", "포트폴리오"],
  metadataBase: new URL('https://portfolio.example.com'), // 실제 도메인으로 변경 필요
  openGraph: {
    title: "오수진 | The Performance Architect",
    description: "데이터와 측정 도구를 통해 비즈니스 문제를 해결하는 퍼포먼스 엔지니어",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
