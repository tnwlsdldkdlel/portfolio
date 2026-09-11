import { career, education } from "@/content/career";

export function Career() {
  return (
    <>
      <ol className="timeline">
        {career.map((entry) => (
          <li className="tl" key={entry.company + entry.period}>
            <div className="tl__head">
              <span className="tl__period">{entry.period}</span>
              <h3 className="tl__company">
                {entry.company}
                {entry.current && <span className="tl__now">현재</span>}
              </h3>
              <span className="tl__role">{entry.role}</span>
            </div>

            <div className="tl__body">
              <p className="tl__summary">{entry.summary}</p>
              {entry.results && (
                <ul className="tl__results">
                  {entry.results.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>

      <ul className="edu">
        {education.map((e) => (
          <li key={e.name}>
            <span className="edu__period">{e.period}</span>
            <span className="edu__name">{e.name}</span>
            <span className="edu__note">{e.note}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
