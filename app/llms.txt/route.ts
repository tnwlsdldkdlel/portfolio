import { profile, site } from "@/content/profile";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

/**
 * 생성형 검색·LLM 크롤러가 읽는 요약본.
 * 페이지를 파싱하지 않아도 수치와 맥락이 그대로 전달되게 한다.
 */
export function GET() {
  const body = [
    `# ${profile.name} — ${profile.role}`,
    "",
    `> ${profile.intro}`,
    "",
    `사이트: ${site.url}`,
    "",
    "## 전문 분야",
    ...profile.capabilities.map(
      (c) => `- **${c.title}**: ${c.items.join(" / ")}`,
    ),
    "",
    "## 프로젝트",
    "",
    ...projects.flatMap((p) => {
      const metrics = (p.metrics ?? []).map((m) => {
        const value = m.before ? `${m.before} → ${m.after}` : m.after;
        const delta = m.delta ? ` (${m.delta})` : "";
        const note = m.note ? ` — ${m.note}` : "";
        return `  - ${m.label}: ${value}${delta}${note}`;
      });

      return [
        `### ${p.name} (${p.period}, ${p.status})`,
        `${p.tagline}`,
        "",
        p.summary,
        "",
        `- 역할: ${p.role}`,
        `- 스택: ${p.stack.join(", ")}`,
        p.url ? `- 배포: ${p.url}` : `- 배포: ${p.urlNote ?? "비공개"}`,
        `- 상세: ${site.url}/projects/${p.slug}`,
        metrics.length ? "- 측정 기록:" : "",
        ...metrics,
        "",
      ].filter(Boolean);
    }),
    "## 측정 원칙",
    "",
    "- 모든 수치는 실측값이며, 측정 조건(기기·네트워크·반복 횟수)을 함께 기록한다.",
    "- Lighthouse 점수는 단일 측정을 쓰지 않는다. 같은 배포본이 67·72·74·85로 흔들린 사례가 있다.",
    "- 절대 타이밍보다 전송 바이트와 캐시 히트를 1차 신호로 삼는다.",
    "- 전후 차이가 측정 편차 안에 있으면 그 최적화는 되돌린다.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
