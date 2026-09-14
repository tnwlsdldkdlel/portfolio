import { colophon, profile } from "@/content/profile";
import { personal } from "@/content/career";
import { cardProjects } from "@/content/projects";
import { Career } from "@/components/Career";
import { HeroFacts } from "@/components/HeroFacts";
import { Kicker } from "@/components/Kicker";
import { PrincipleIcon } from "@/components/PrincipleIcon";
import { ProjectCard, PublishingCard } from "@/components/ProjectCard";
import { SkillLine } from "@/components/SkillLine";
import { Skills } from "@/components/Skills";

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

        <div className="cards">
          {cardProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
          <PublishingCard />
        </div>
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
            본문 서체는 Pretendard 두 벌뿐이고, 원본 1,536KB를 실제로 쓰인 731자만
            남겨 125KB로 줄였습니다. 첫 화면의 &ldquo;Hello!&rdquo;에 쓴 디스플레이
            서체도 그 여섯 글자만 남겨 15.6KB → 1.1KB입니다(서브셋 스크립트는
            저장소에 함께 뒀습니다). 장식은 전부 CSS이고, 이미지는 프로젝트
            카드에 실린 각 서비스의 og:image 뿐입니다. JS 155KB 중 직접 쓴 건 82줄뿐입니다 — 등장
            애니메이션 관찰자, 뒤로가기 버튼, 상세 팝업 셋입니다. 나머지는
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
