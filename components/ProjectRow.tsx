import Link from "next/link";
import type { Project } from "@/content/projects";
import { leadMetric, toChart } from "@/lib/metric.mjs";

/** 대표 지표 한 줄 — 썸네일 대신 막대 하나로 보여준다. */
function Bar({ project }: { project: Project }) {
  const metric = leadMetric(project.metrics);
  if (!metric) return null;

  const chart = toChart(metric);

  return (
    <p className="row__metric">
      <span className="row__metric-label">{metric.label}</span>

      {chart ? (
        <>
          <span className="row__track" aria-hidden="true">
            <span
              className="row__fill row__fill--before"
              style={{ width: `${Math.max(chart.beforeRatio * 100, 3)}%` }}
            />
            <span
              className="row__fill row__fill--after"
              style={{ width: `${Math.max(chart.afterRatio * 100, 3)}%` }}
            />
          </span>
          <span className="row__figures">
            <span className="row__before">{metric.before}</span>
            <span aria-hidden="true">→</span>
            <strong>{metric.after}</strong>
            {metric.delta && <span className="row__delta">{metric.delta}</span>}
          </span>
        </>
      ) : (
        <span className="row__figures">
          <strong>{metric.after}</strong>
          {metric.note && <span className="row__before">{metric.note}</span>}
        </span>
      )}
    </p>
  );
}

export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  // 기간에 이미 "진행 중"이 들어 있으면 상태 표기와 겹친다.
  const period = project.period.replace(/\s*–\s*진행 중/, " –");

  return (
    <Link href={`/projects/${project.slug}`} className="row">
      <span className="row__no">{String(index + 1).padStart(2, "0")}</span>

      <span className="row__main">
        <span className="row__head">
          <h3 className="row__title">
            {project.name}
            <span className="row__arrow" aria-hidden="true">
              →
            </span>
          </h3>
          <span className="row__when">
            {period} · {project.status}
          </span>
        </span>

        <span className="row__desc">{project.tagline}</span>

        <Bar project={project} />

        <span className="tags">
          {project.stack.slice(0, 5).map((s) => (
            <span className="tag" key={s}>
              {s}
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}
