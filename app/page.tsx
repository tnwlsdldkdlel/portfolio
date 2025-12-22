// 정적 생성으로 성능 최적화
export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-bold mb-4">
          The Performance Architect
        </h1>
        <p className="text-lg mb-8">
          데이터와 측정 도구를 통해 비즈니스 문제를 해결하는 퍼포먼스 엔지니어
        </p>
        <div className="space-y-8">
          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Portfolio Guide</h2>
            <p>지표 해석 및 전체적인 사이트 탐색 가이드</p>
          </section>
        </div>
      </div>
    </main>
  );
}
