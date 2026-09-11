import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectRow } from "@/components/ProjectRow";

export const metadata: Metadata = {
  title: "프로젝트",
  description:
    "2026년 프론트엔드 전담으로 진행한 14개 프로젝트 — 마이그레이션, 성능 최적화, 퍼블리싱, 사내 도구. 각 프로젝트의 실측 개선 수치와 판단 근거를 함께 기록했습니다.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const live = projects.filter((p) => p.url).length;

  return (
    <section className="section shell">
      <p className="hero__meta reveal reveal--1" style={{ marginTop: "1.5rem" }}>
        <span>Index</span>
        <span aria-hidden="true">/</span>
        <span>{projects.length} projects</span>
        <span aria-hidden="true">/</span>
        <span>공개 URL {live}개</span>
      </p>

      <h1 className="display reveal reveal--2" style={{ maxWidth: "14ch" }}>
        전체 <em>기록</em>
      </h1>

      <p
        className="lede reveal reveal--3"
        style={{ marginTop: "1.5rem", maxWidth: "56ch" }}
      >
        서비스·어드민·캠페인 랜딩·사내 도구까지, 대부분을 프론트엔드 전담으로
        맡아 운영까지 끌고 갔습니다. 각 항목의 막대는 그 프로젝트에서 가장 크게
        움직인 지표입니다.
      </p>

      <div className="index reveal reveal--4" style={{ marginTop: "3rem" }}>
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
