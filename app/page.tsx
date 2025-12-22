// 정적 생성으로 성능 최적화
export const dynamic = 'force-static';

import Section from "./components/Section";

export default function Home() {
  return (
    <>
      <Section id="guide" isFirst={true}>
        <h1 className="font-display text-4xl font-bold mb-4">
          The Performance Architect
        </h1>
        <p className="text-lg mb-8">
          데이터와 측정 도구를 통해 비즈니스 문제를 해결하는 퍼포먼스 엔지니어
        </p>
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-2xl font-semibold mb-4">Portfolio Guide</h2>
            <p>지표 해석 및 전체적인 사이트 탐색 가이드</p>
          </div>
        </div>
      </Section>

      <Section id="about">
        <h2 className="font-display text-3xl font-bold mb-8">About Me</h2>
        <p className="text-lg">About Me 섹션 콘텐츠가 여기에 표시됩니다.</p>
      </Section>

      <Section id="career">
        <h2 className="font-display text-3xl font-bold mb-8">Career Summary</h2>
        <p className="text-lg">Career Summary 섹션 콘텐츠가 여기에 표시됩니다.</p>
      </Section>

      <Section id="projects">
        <h2 className="font-display text-3xl font-bold mb-8">Key Projects</h2>
        <p className="text-lg">Key Projects 섹션 콘텐츠가 여기에 표시됩니다.</p>
      </Section>

      <Section id="strengths">
        <h2 className="font-display text-3xl font-bold mb-8">Technical Strengths</h2>
        <p className="text-lg">Technical Strengths 섹션 콘텐츠가 여기에 표시됩니다.</p>
      </Section>

      <Section id="writing">
        <h2 className="font-display text-3xl font-bold mb-8">Writing & Documentation</h2>
        <p className="text-lg">Writing & Documentation 섹션 콘텐츠가 여기에 표시됩니다.</p>
      </Section>
    </>
  );
}
