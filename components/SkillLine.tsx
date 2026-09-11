import { coreStack } from "@/content/career";

/**
 * 핵심 스택 한 줄 — 강조가 왼쪽에서 오른쪽으로 옮겨 간다.
 * 뱃지도 상자도 없이 색만 바뀐다(CSS `animation-delay` 계단, JS 0).
 */
export function SkillLine() {
  return (
    <p className="stack" aria-label="핵심 기술 스택">
      {coreStack.map((item, i) => (
        <span
          className="stack__item"
          key={item}
          style={{ "--i": i, "--n": coreStack.length } as React.CSSProperties}
        >
          {item}
        </span>
      ))}
    </p>
  );
}
