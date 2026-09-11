import Link from "next/link";
import { colophon, profile } from "@/content/profile";
import { personal } from "@/content/career";
import { featuredProjects, projects } from "@/content/projects";
import { Career } from "@/components/Career";
import { HeroFacts } from "@/components/HeroFacts";
import { Kicker } from "@/components/Kicker";
import { PrincipleIcon } from "@/components/PrincipleIcon";
import { ProjectRow } from "@/components/ProjectRow";
import { Readout } from "@/components/Readout";
import { SkillLine } from "@/components/SkillLine";
import { Skills } from "@/components/Skills";

/** before/after가 모두 있는 지표만 모아 "개선 기록"으로 세운다. */
const improvements = projects
  .flatMap((p) =>
    (p.metrics ?? [])
      .filter((m) => m.before)
      .map((m) => ({ ...m, label: `${p.name} · ${m.label}` })),
  )
  .slice(0, 12);

export default function Home() {
  return (
    <>
      <section className="hero shell">
        <p className="hero__meta reveal reveal--1">
          <span>Frontend Engineer</span>
          <span aria-hidden="true">·</span>
          <span>{profile.years}</span>
          <span aria-hidden="true">·</span>
          <span>Seoul</span>
        </p>

        <h1 className="hero__greet">
          <span className="hero__hello reveal reveal--1">
            {profile.greeting}
          </span>
          <span className="hero__intro reveal reveal--2">
            {profile.oneLiner} <em>{profile.name}</em>입니다.
          </span>
        </h1>

        <div className="reveal reveal--3">
          <SkillLine />
        </div>

        <div className="reveal reveal--4">
          <HeroFacts />
        </div>

        {/* 같은 페이지 해시 이동은 Link 가 스크롤을 놓칠 때가 있다 — 순수 앵커로 둔다 */}
        <a href="#about" className="hero__scroll reveal reveal--4">
          자세히 보기
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="section shell" data-reveal="" id="about">
        <Kicker>01 — About me</Kicker>

        <div className="about">
          <div>
            <p className="h2">
              <span className="about__mark">{profile.headline}</span>
            </p>
            <p className="about__lede">{profile.intro}</p>
          </div>

          <dl className="bio">
            {personal.map((item) => (
              <div className="bio__row" key={item.key}>
                <dt>{item.key}</dt>
                <dd>
                  {item.href ? <a href={item.href}>{item.value}</a> : item.value}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="principles">
            {profile.about.map((item) => (
              <li className="principle" key={item.title}>
                <h3 className="principle__title">
                  <PrincipleIcon name={item.icon} />
                  {item.title}
                </h3>
                <p className="principle__body">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section shell" data-reveal="" id="skills">
        <Kicker>02 — Skills</Kicker>
        <Skills />
      </section>

      <section className="section shell" data-reveal="" id="projects">
        <Kicker>03 — Projects</Kicker>

        <div className="panel">
          <p className="h3" style={{ maxWidth: "26ch" }}>
            숫자가 없는 최적화는 취향이다.
          </p>
          <Readout metrics={improvements} />
          <p
            className="readout__note"
            style={{ maxWidth: "62ch", marginTop: "1.5rem" }}
          >
            같은 배포본을 네 번 재면 Lighthouse Performance가 67·72·74·85로
            흔들립니다. 그래서 점수보다 전송 바이트를 먼저 보고, 점수를 쓸 때는
            통제 조건과 3회 중앙값을 명시합니다. 아래 수치는 전부 이 프로젝트들에서
            나왔습니다.
          </p>
        </div>

        <div className="index" style={{ marginTop: "clamp(2.5rem, 5vw, 3.5rem)" }}>
          {featuredProjects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>

        <p style={{ marginTop: "2.5rem" }}>
          <Link href="/projects" className="link-out">
            전체 {projects.length}개 프로젝트 보기 →
          </Link>
        </p>
      </section>

      <section className="section shell" data-reveal="" id="career">
        <Kicker>04 — Career</Kicker>
        <Career />
      </section>

      <section className="section shell" data-reveal="" id="colophon">
        <Kicker>05 — 이 사이트</Kicker>

        <div className="panel">
          <h3 className="h3" style={{ maxWidth: "26ch" }}>
            성능을 말하는 포트폴리오는 자기 수치부터 내놓아야 합니다.
          </h3>
          <p
            className="readout__note"
            style={{ marginTop: "1rem", maxWidth: "62ch" }}
          >
            본문 서체는 Pretendard 두 벌뿐이고, 원본 1,536KB를 실제로 쓰인 726자만
            남겨 124KB로 줄였습니다. 첫 화면의 &ldquo;Hello!&rdquo;에 쓴 디스플레이
            서체도 그 여섯 글자만 남겨 15.6KB → 1.1KB입니다(서브셋 스크립트는
            저장소에 함께 뒀습니다). 장식은 전부 CSS이고 이미지는 한 장도 없습니다 —
            목록의 막대도 스크린샷이 아니라 그 프로젝트의 측정값에서 그린 것입니다.
            JS 150KB 중 직접 쓴 건 38줄뿐입니다 — 섹션이 화면에
            들어오는 걸 감지해 등장 애니메이션을 트는 관찰자 하나입니다. 나머지는
            전부 Next 런타임 몫이고, 프레임워크를 고른 비용이라 숨기지 않고 적어
            둡니다.
          </p>
          <p className="mono" style={{ marginTop: "1.25rem" }}>
            측정 조건 — {colophon.condition} · {colophon.measuredAt}
          </p>
          <dl className="colophon__grid">
            {colophon.items.map((item) => (
              <div key={item.label}>
                <dt className="colophon__label">{item.label}</dt>
                <dd className="colophon__value">{item.value}</dd>
                <dd className="colophon__note">{item.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
