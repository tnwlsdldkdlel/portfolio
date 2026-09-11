import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/profile";
import { Kicker } from "@/components/Kicker";
import { Readout } from "@/components/Readout";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.tagline,
    keywords: [...project.keywords, ...project.stack],
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.name} — ${project.tagline}`,
      description: project.summary,
      url: `${site.url}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.findIndex((p) => p.slug === project.slug);
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

      <aside className="doc__aside">
        <Link href="/projects" className="back">
          ← 전체 기록
        </Link>

        <dl className="spec">
          <div className="spec__item">
            <dt className="spec__key">기간</dt>
            <dd className="spec__val">{project.period}</dd>
          </div>
          <div className="spec__item">
            <dt className="spec__key">상태</dt>
            <dd className="spec__val">{project.status}</dd>
          </div>
          <div className="spec__item">
            <dt className="spec__key">역할</dt>
            <dd className="spec__val">{project.role}</dd>
          </div>
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
              <span className="tags" style={{ marginTop: "0.5rem" }}>
                {project.stack.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </span>
            </dd>
          </div>
        </dl>
      </aside>

      <div>
        <p className="hero__meta">
          <span>
            No. {String(i + 1).padStart(2, "0")} / {projects.length}
          </span>
          <span aria-hidden="true">/</span>
          <span>{project.keywords[0]}</span>
        </p>

        <h1 className="display" style={{ fontSize: "clamp(2rem, 4.6vw, 3.3rem)" }}>
          {project.name}
        </h1>

        <p className="lede" style={{ marginTop: "1.5rem", maxWidth: "46ch" }}>
          {project.tagline}
        </p>

        <p
          className="prose"
          style={{
            marginTop: "2.25rem",
            maxWidth: "68ch",
            color: "var(--ink-2)",
          }}
        >
          {project.summary}
        </p>

        {project.metrics && (
          <section style={{ marginTop: "clamp(2.5rem, 6vw, 4rem)" }}>
            <Kicker>측정 기록</Kicker>
            <div className="panel">
              <Readout metrics={project.metrics} />
            </div>
          </section>
        )}

        <section style={{ marginTop: "clamp(2.5rem, 6vw, 4rem)" }}>
          <Kicker>판단과 근거</Kicker>
          {project.highlights.map((h) => (
            <div className="note" key={h.title}>
              <h3 className="note__title">{h.title}</h3>
              <p className="note__body">{h.body}</p>
            </div>
          ))}
        </section>

        <nav
          style={{
            marginTop: "clamp(3.5rem, 8vw, 5rem)",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--line)",
          }}
        >
          <Link href={`/projects/${next.slug}`} className="row__title">
            <span className="mono" style={{ display: "block" }}>
              다음 기록
            </span>
            {next.name}
            <span className="row__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
