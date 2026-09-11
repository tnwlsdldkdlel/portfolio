/**
 * 섹션 제목 — 화면에 들어오면 터미널처럼 한 글자씩 찍히고 커서가 따라간다.
 * 재생 시점은 `components/Reveal.tsx` 의 관찰자가 잡고, 타이밍은 CSS 가 준다.
 * 글자를 쪼갰으므로 읽어주는 건 원문 한 덩어리(aria-label)에 맡긴다.
 */
export function Kicker({ children }: { children: string }) {
  const chars = [...children];

  // 제목 길이가 제각각이라 한 글자 간격을 조절해 전체 시간을 ~700ms 로 맞춘다.
  const step = Math.round(Math.min(64, Math.max(30, 700 / chars.length)));

  return (
    <h2
      className="kicker"
      data-reveal=""
      data-reveal-repeat=""
      /* 자식과 ::after 가 함께 쓰도록 루트에 둔다 */
      style={
        { "--tick": `${step}ms`, "--n": chars.length } as React.CSSProperties
      }
    >
      <span className="kicker__text" aria-label={children}>
        {chars.map((ch, i) => (
          <span
            className="kicker__ch"
            key={`${ch}-${i}`}
            aria-hidden="true"
            style={{ "--i": i } as React.CSSProperties}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </h2>
  );
}
