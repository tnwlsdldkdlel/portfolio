"use client";

import { useEffect } from "react";

/**
 * 화면에 들어온 요소를 한 번만 재생시킨다.
 *
 * CSS `animation-timeline: view()` 로 하던 일인데, 그건 Chrome 계열에서만 돌고
 * 스크롤 위치에 묶여 있어 빠르게 내리면 지나가 버린다. 관찰자 하나가 더 확실하다.
 *
 * 숨김 상태는 JS가 붙은 뒤에만 적용한다(`js-reveal`) — 스크립트가 실패해도
 * 내용이 사라지지 않게 하려는 것이다.
 *
 * `data-reveal-repeat` 이 붙은 요소(섹션 제목)는 화면을 벗어나면 다시 접어 두고,
 * 되돌아오면 또 재생한다. 섹션 본문은 한 번만 — 스크롤을 오르내릴 때마다 글이
 * 사라졌다 나타나면 읽기 어렵다.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (!("IntersectionObserver" in window)) return;
    root.classList.add("js-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const repeat = entry.target.hasAttribute("data-reveal-repeat");

          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "in");
            if (!repeat) io.unobserve(entry.target);
          } else if (repeat) {
            entry.target.setAttribute("data-reveal", "");
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
