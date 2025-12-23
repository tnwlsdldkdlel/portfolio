// 정적 생성으로 성능 최적화
export const dynamic = 'force-static';

import Section from "./components/Section";
import InfoSection from "./components/InfoSection";
import ProjectsSection from "./components/ProjectsSection";

export default function Home() {
  return (
    <>
      <Section id="info">
        <InfoSection />
      </Section>

      <Section id="projects" className="bg-text text-white">
        <ProjectsSection />
      </Section>

      <Section id="media">
        <div className="max-w-4xl">
          <h2 className="font-display text-3xl font-bold mb-8">Media</h2>
          <p className="text-lg">Media 섹션 콘텐츠가 여기에 표시됩니다.</p>
        </div>
      </Section>
    </>
  );
}
