// 정적 생성으로 성능 최적화
export const dynamic = 'force-static';

import Section from "./components/Section";

export default function Home() {
  return (
    <>
      <Section id="info" isFirst={true}>
        <div className="max-w-4xl">
          <h1 className="font-display text-4xl font-bold mb-4">
            The Performance Architect
          </h1>
          <p className="text-lg mb-12">
            데이터와 측정 도구를 통해 비즈니스 문제를 해결하는 퍼포먼스 엔지니어
          </p>
          <h2 className="font-display text-3xl font-bold mb-8">Info</h2>
          <p className="text-lg">Info 섹션 콘텐츠가 여기에 표시됩니다.</p>
        </div>
      </Section>

      <Section id="projects">
        <div className="max-w-4xl">
          <h2 className="font-display text-3xl font-bold mb-8">Projects</h2>
          <p className="text-lg">Projects 섹션 콘텐츠가 여기에 표시됩니다.</p>
        </div>
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
