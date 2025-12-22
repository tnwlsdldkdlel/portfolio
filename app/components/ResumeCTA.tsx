"use client";

import { useState } from "react";

const impactMetrics = [
  {
    category: "성능 최적화",
    description: "자동화 측정을 통해 렌더링 비용 92.7% 개선",
  },
  {
    category: "대용량 데이터",
    description: "고부하 환경 인터랙션 속도 88% 향상",
  },
  {
    category: "비즈니스 성장",
    description: "UX 개선을 통한 모바일 이탈률 50% 절감",
  },
];

export default function ResumeCTA() {
  const [showModal, setShowModal] = useState(false);

  const handleDownload = () => {
    setShowModal(true);
  };

  const handleConfirmDownload = () => {
    // TODO: PDF 다운로드 로직 구현
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleDownload}
        className="border-2 border-black px-6 py-3 font-semibold invert-on-hover"
      >
        이력서 다운로드
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-black p-8 max-w-md w-full mx-4">
            <h2 className="font-display text-2xl font-bold mb-6">핵심 역량 요약</h2>
            <ul className="space-y-4 mb-6">
              {impactMetrics.map((metric, index) => (
                <li key={index}>
                  <div className="font-semibold mb-1">{metric.category}</div>
                  <div className="text-sm">{metric.description}</div>
                </li>
              ))}
            </ul>
            <button
              onClick={handleConfirmDownload}
              className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800"
            >
              상세 이력서(PDF) 다운로드 완료
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-2 border border-black py-3 font-semibold invert-on-hover"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </>
  );
}

