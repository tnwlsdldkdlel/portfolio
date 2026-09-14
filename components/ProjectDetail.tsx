import Link from "next/link";
import type { Metric, Project } from "@/content/projects";
import { projects } from "@/content/projects";
import { site } from "@/content/profile";
import { BackLink } from "@/components/BackLink";
import { Readout } from "@/components/Readout";
import { toBullets } from "@/lib/sentences.mjs";

/** 측정값을 불릿 한 줄로. 조건(note)까지 붙여야 수치가 혼자 떠다니지 않는다. */
function metricLine(m: Metric) {
  const change = m.before ? `${m.before} → ${m.after}` : m.after;
  return [
    `${m.label} ${change}`,
    m.delta && `(${m.delta})`,
    m.note && `· ${m.note}`,
  ]
    .filter(Boolean)
    .join(" ");
}

export function ProjectDetail({
  project,
  inModal,
}: {
  project: Project;
  inModal?: boolean;
}) {
  // 단계가 가리킨 수치는 그 단계의 불릿으로, 나머지만 하단 패널로 내린다.
  const byLabel = new Map((project.metrics ?? []).map((m) => [m.label, m]));
  const claimed = new Set(
    project.highlights.flatMap((h) =>
      (h.steps ?? []).flatMap((s) => s.metricLabels ?? []),
    ),
  );
  const rest = (project.metrics ?? []).filter((m) => !claimed.has(m.label));

  const i = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    abstract: project.tagline,
    description: project.summary,
    url: `${site.url}/projects/${project.slug}`,
    inLanguage: "ko-KR",
    keywords: project.keywords.join(", "),
    author: { "@id": `${site.url}/#person` },
    creator: { "@id": `${site.url}/#person` },
    ...(project.url ? { sameAs: [project.url] } : {}),
  };

  return (
    <article className="shell doc">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="doc__body">
        {!inModal && <BackLink />}

        <p className="hero__meta">
          <span>{project.audience}</span>
          <span aria-hidden="true">/</span>
          <span>{project.status}</span>
          <span aria-hidden="true">/</span>
          <span>{project.keywords[0]}</span>
        </p>

        <h1 className="display" style={{ fontSize: "clamp(2rem, 4.6vw, 3.3rem)" }}>
          {project.name}
        </h1>

        <p className="lede" style={{ marginTop: "1.5rem", maxWidth: "46ch" }}>
          {project.about}
        </p>

        <dl className="brief">
          <div className="brief__item brief__item--wide">
            <dt className="brief__key">담당</dt>
            <dd className="brief__val">{project.role}</dd>
          </div>
          <div className="brief__item">
            <dt className="brief__key">팀</dt>
            <dd className="brief__val">{project.team}</dd>
          </div>
          <div className="brief__item">
            <dt className="brief__key">기간</dt>
            <dd className="brief__val">{project.period}</dd>
          </div>
        </dl>

        <p
          className="prose"
          style={{
            marginTop: "clamp(2.5rem, 6vw, 4rem)",
            color: "var(--ink-2)",
          }}
        >
          {project.summary}
        </p>

        <dl className="spec">
          <div className="spec__item">
            <dt className="spec__key">배포</dt>
            <dd className="spec__val">
              {project.url ? (
                <a
                  className="link-out"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {project.urlLabel ?? project.url} ↗
                </a>
              ) : (
                (project.urlNote ?? "비공개")
              )}
            </dd>
          </div>
          <div className="spec__item">
            <dt className="spec__key">스택</dt>
            <dd className="spec__val">
              <span className="tags">
                {project.stack.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </span>
            </dd>
          </div>
        </dl>

        <section style={{ marginTop: "clamp(2.5rem, 6vw, 4rem)" }}>
          <h2 className="kicker">주요 작업</h2>
          <ul className="notes">
            {project.highlights.map((h) => (
              <li className="note" key={h.title}>
                <h3 className="note__title">{h.title}</h3>
                {h.steps ? (
                  <dl className="steps">
                    {h.steps.map((s) => (
                      <div key={s.label}>
                        <dt>{s.label}</dt>
                        <dd>
                          <ul className="bullets">
                            {s.items.map((line) => (
                              <li key={line}>{line}</li>
                            ))}
                            {(s.metricLabels ?? []).map((l) => {
                              const m = byLabel.get(l);
                              return m ? (
                                <li className="bullets__metric" key={l}>
                                  {metricLine(m)}
                                </li>
                              ) : null;
                            })}
                          </ul>
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <ul className="bullets">
                    {toBullets(h.body ?? "").map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* 어느 판단에도 안 붙은 수치만 남는다. 전부 붙었으면 이 패널은 사라진다. */}
          {rest.length > 0 && (
            <div
              className="panel"
              style={{ marginTop: "clamp(1.75rem, 4vw, 2.5rem)" }}
            >
              <Readout metrics={rest} />
            </div>
          )}
        </section>

        {/* 팝업 안에서는 기록을 넘겨도 히스토리를 쌓지 않는다 — 닫으면 목록으로 한 번에 */}
        <nav className="doc__nav" aria-label="다른 기록">
          <Link
            href={`/projects/${prev.slug}`}
            replace={inModal}
            scroll={!inModal}
            className="hop hop--prev"
          >
            <span className="hop__label">← 이전 기록</span>
            <span className="hop__name">{prev.name}</span>
          </Link>

          <Link
            href={`/projects/${next.slug}`}
            replace={inModal}
            scroll={!inModal}
            className="hop hop--next"
          >
            <span className="hop__label">다음 기록 →</span>
            <span className="hop__name">{next.name}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
