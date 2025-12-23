"use client";

import { useState, useEffect } from "react";

const navItems = [
  { id: "info", label: "Info", href: "#info" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "media", label: "Media", href: "#media" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("info");
  const [shouldShowColoredHeader, setShouldShowColoredHeader] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;
    
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const headerHeight = 90; // 헤더 높이
          const threshold = 5; // 여유값 (버벅거림 방지)
          
          // 헤더 높이만큼 스크롤했으면 (헤더가 안 보이면) 강조색 배경 헤더가 위에서 아래로 나타남
          // 경계값에 여유를 두어 안정화
          const shouldShow = scrollY >= (headerHeight - threshold);
          setShouldShowColoredHeader(shouldShow);

          // 활성 섹션 감지 (RAF 콜백 안으로 이동하여 최적화)
          const sections = navItems.map((item) => {
            const element = document.getElementById(item.id);
            if (element) {
              const rect = element.getBoundingClientRect();
              return {
                id: item.id,
                top: rect.top,
                bottom: rect.bottom,
              };
            }
            return null;
          }).filter(Boolean) as Array<{ id: string; top: number; bottom: number }>;

          const currentSection = sections.find(
            (section) => section.top <= 100 && section.bottom >= 100
          );

          if (currentSection) {
            setActiveSection(currentSection.id);
          }
          
          ticking = false;
          rafId = null;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      // CSS scroll-padding-top을 사용하므로 수동 오프셋 제거
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* 초기 헤더: 화이트 배경 */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white h-[90px] m-0 p-0 ${
          shouldShowColoredHeader ? 'hidden' : ''
        }`}
      >
        <nav className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-around h-full">
            {/* 중간: 네비게이션 링크 */}
            <ul className="hidden md:flex gap-10 items-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`font-display text-[30px] font-bold transition-colors relative z-0 focus-visible:outline-2 focus-visible:outline-[#35D399] focus-visible:outline-offset-2 focus-visible:rounded ${
                      activeSection === item.id
                        ? "text-black"
                        : "text-black hover:text-black"
                    }`}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute inset-0 bg-[#FDE68A] -z-10" style={{ transform: 'skewX(-12deg)' }} aria-hidden="true"></span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* 오른쪽: Contact Me 버튼 */}
            <div className="hidden md:block">
              <button 
                className="border-4 border-black font-display text-[30px] font-bold hover:bg-[#000000] hover:text-[#ffffff] transition-colors rounded-lg p-[5px] focus-visible:outline-2 focus-visible:outline-[#35D399] focus-visible:outline-offset-2"
                aria-label="연락하기"
              >
                Contact Me
              </button>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              className="md:hidden border-2 border-black px-3 py-2 hover:bg-[#35D399] hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 토글"
            >
              <span className="font-semibold">{isMobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>

          {/* 모바일 메뉴 */}
          {isMobileMenuOpen && (
            <ul className="md:hidden mt-4 space-y-2 pt-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block py-2 font-display text-lg font-bold transition-colors relative z-0 focus-visible:outline-2 focus-visible:outline-[#35D399] focus-visible:outline-offset-2 focus-visible:rounded ${
                      activeSection === item.id
                        ? "text-black"
                        : "text-black hover:text-[#35D399]"
                    }`}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute inset-0 bg-[#FDE68A] -z-10" style={{ transform: 'skewX(-12deg)' }} aria-hidden="true"></span>
                    )}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button 
                  className="border-2 border-black px-6 py-3 font-display text-lg font-bold w-full hover:bg-[#35D399] hover:text-white transition-colors rounded-lg focus-visible:outline-2 focus-visible:outline-[#35D399] focus-visible:outline-offset-2"
                  aria-label="연락하기"
                >
                  Contact Me
                </button>
              </li>
            </ul>
          )}
        </nav>
      </header>

      {/* 헤더가 안 보일 때 위에서 아래로 나타나는 강조색 헤더 */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out h-[90px] m-0 p-0 ${
          shouldShowColoredHeader 
            ? 'translate-y-0 bg-[#35D399]/90 backdrop-blur-sm' 
            : '-translate-y-full'
        }`}
      >
        <nav className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-around h-full w-full">

            {/* 중간: 네비게이션 링크 */}
            <ul className="hidden md:flex gap-10 items-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`font-display text-[30px] font-bold transition-colors relative focus-visible:outline-2 focus-visible:outline-[#35D399] focus-visible:outline-offset-2 focus-visible:rounded ${
                      activeSection === item.id
                        ? "text-black"
                        : "text-black hover:text-black"
                    }`}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute inset-0 bg-[#FDE68A] -z-10" style={{ transform: 'skewX(-12deg)' }} aria-hidden="true"></span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* 오른쪽: Contact Me 버튼 */}
            <div className="hidden md:block">
              <button 
                className="border-4 border-black font-display text-[30px] font-bold hover:bg-[#000000] hover:text-[#ffffff] transition-colors rounded-lg p-[5px] focus-visible:outline-2 focus-visible:outline-[#35D399] focus-visible:outline-offset-2"
                aria-label="연락하기"
              >
                Contact Me
              </button>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              className="md:hidden border-2 border-black px-3 py-2 hover:bg-[#35D399] hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 토글"
            >
              <span className="font-semibold">{isMobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>

          {/* 모바일 메뉴 */}
          {isMobileMenuOpen && (
            <ul className="md:hidden mt-4 space-y-2 pt-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block py-2 font-display text-lg font-bold transition-colors relative focus-visible:outline-2 focus-visible:outline-[#35D399] focus-visible:outline-offset-2 focus-visible:rounded ${
                      activeSection === item.id
                        ? "text-black"
                        : "text-black hover:text-[#35D399]"
                    }`}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute inset-0 bg-[#FDE68A] -z-10" style={{ transform: 'skewX(-12deg)' }} aria-hidden="true"></span>
                    )}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button 
                  className="border-2 border-black px-6 py-3 font-display text-lg font-bold w-full hover:bg-[#35D399] hover:text-white transition-colors rounded-lg focus-visible:outline-2 focus-visible:outline-[#35D399] focus-visible:outline-offset-2"
                  aria-label="연락하기"
                >
                  Contact Me
                </button>
              </li>
            </ul>
          )}
        </nav>
      </header>
    </>
  );
}

