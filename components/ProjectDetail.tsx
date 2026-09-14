import Link from "next/link";
import type { Project } from "@/content/projects";
import { projects } from "@/content/projects";
import { site } from "@/content/profile";
import { BackLink } from "@/components/BackLink";
import { Readout } from "@/components/Readout";
import { toNumber } from "@/lib/metric.mjs";
import { toBullets } from "@/lib/sentences.mjs";

export function ProjectDetail({
  project,
  inModal,
}: {
  project: Project;
  inModal?: boolean;
}) {
  const i = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  // 크게 세울 수 있는 건 수 하나로 읽히는 값뿐 — 서술형 지표는 아래 표에서 읽힌다
  const figures = (project.metrics ?? []).filter(
    (m) => toNumber(m.after) !== null,
  );
  const improved = figures.filter((m) => m.before);
  const wins = (improved.length ? improved : figures).slice(0, 3);

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
            <dt className="brief__key">내가 맡은 것</dt>
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
            maxWidth: "68ch",
            color: "var(--ink-2)",
          }}
        >
          {project.summary}
        </p>

        <section style={{ marginTop: "clamp(2.5rem, 6vw, 4rem)" }}>
          <h2 className="kicker">판단과 근거</h2>
          <ul className="notes">
            {project.highlights.map((h) => (
              <li className="note" key={h.title}>
                <h3 className="note__title">{h.title}</h3>
                <ul className="bullets">
                  {toBullets(h.body).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {project.metrics && (
          <section style={{ marginTop: "clamp(2.5rem, 6vw, 4rem)" }}>
            <h2 className="kicker">전체 측정 기록</h2>
            <div className="panel">
              <Readout metrics={project.metrics} />
            </div>
          </section>
        )}

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
