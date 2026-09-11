import type { Metric } from "@/content/projects";

export function Readout({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="readout">
      {metrics.map((m) => (
        <div className="readout__row" key={m.label}>
          <dt className="readout__label">{m.label}</dt>
          <dd className="readout__values">
            {m.before && (
              <>
                <span className="readout__before">{m.before}</span>
                <span aria-hidden="true" style={{ color: "var(--ink-3)" }}>
                  →
                </span>
              </>
            )}
            <span className="readout__after">{m.after}</span>
            {m.delta && <span className="readout__delta">{m.delta}</span>}
          </dd>
          <dd className="readout__note">{m.note ?? ""}</dd>
        </div>
      ))}
    </dl>
  );
}
