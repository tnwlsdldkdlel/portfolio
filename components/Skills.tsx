import { skills } from "@/content/career";
import { profile } from "@/content/profile";

export function Skills() {
  return (
    <>
      <div className="cards">
        {profile.capabilities.map((c) => (
          <div className="card" key={c.title}>
            <h3 className="card__title">{c.title}</h3>
            <ul>
              {c.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="skills">
        {skills.map((s) => (
          <div className="skills__group" key={s.group}>
            <h3 className="skills__title">{s.group}</h3>
            <span className="tags">
              {s.items.map((i) => (
                <span className="tag" key={i}>
                  {i}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
