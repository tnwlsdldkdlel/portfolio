"use client";

import { useRouter } from "next/navigation";

/** 공유 링크로 이 페이지를 바로 열었으면 뒤로 갈 곳이 없다 — 그때만 목록으로 보낸다. */
export function BackLink() {
  const router = useRouter();

  function back() {
    const cameFromHere =
      window.history.length > 2 ||
      document.referrer.startsWith(window.location.origin);

    if (cameFromHere) router.back();
    else router.push("/#projects");
  }

  return (
    <button type="button" className="back" onClick={back}>
      ← 뒤로
    </button>
  );
}
