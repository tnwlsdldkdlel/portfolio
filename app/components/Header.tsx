"use client";

import { useState, useEffect } from "react";

const navItems = [
  { id: "guide", label: "Guide", href: "#guide" },
  { id: "about", label: "About", href: "#about" },
  { id: "career", label: "Career", href: "#career" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "strengths", label: "Strengths", href: "#strengths" },
  { id: "writing", label: "Writing", href: "#writing" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("guide");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // 활성 섹션 감지
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
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Header 높이 고려
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-black transition-shadow ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#guide"
            onClick={(e) => handleNavClick(e, "#guide")}
            className="font-display text-xl font-bold hover:underline"
          >
            오수진
          </a>

          {/* 데스크톱 네비게이션 */}
          <ul className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`hover:underline transition-colors ${
                    activeSection === item.id
                      ? "font-semibold border-b-2 border-black"
                      : ""
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden border border-black px-3 py-2 invert-on-hover"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴 토글"
          >
            <span className="font-semibold">{isMobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <ul className="md:hidden mt-4 space-y-2 border-t border-black pt-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block py-2 hover:underline ${
                    activeSection === item.id
                      ? "font-semibold border-l-4 border-black pl-2"
                      : "pl-2"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

