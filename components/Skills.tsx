import { skills } from "@/content/career";

/**
 * 쓰는 기술만 나열한다. 무엇을 어떻게 했는지는 프로젝트 섹션이 수치로 말한다.
 * 서술형 역량(profile.capabilities)은 화면에 싣지 않고 llms.txt 로만 내보낸다.
 */
export function Skills() {
  return (
    <ul className="skills">
      {skills.map((s) => (
        <li className="skill" key={s.group}>
          <h3 className="skill__group">{s.group}</h3>
          <p className="skill__items">{s.items.join(" · ")}</p>
        </li>
      ))}
    </ul>
  );
}
