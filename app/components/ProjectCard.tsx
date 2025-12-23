"use client";

import { useState } from "react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  skills: string[];
  features: string[];
  link: string;
  color: string;
}

interface ProjectCardProps {
  project: Project;
}

// 기술별 색상 매핑
const skillColors: Record<string, string> = {
  "React": "#61DAFB",
  "Next.js": "#000000",
  "TypeScript": "#3178C6",
  "Tailwind CSS": "#06B6D4",
  "JavaScript": "#F7DF1E",
  "Node.js": "#339933",
  "Python": "#3776AB",
  "Vercel": "#000000",
  "Zustand": "#6B46C1",
};

// 기술 이름에 맞는 색상 반환 (기본값: 강조색)
const getSkillColor = (skill: string): string => {
  return skillColors[skill] || "#35D399";
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-white border-4 cursor-pointer transition-all duration-300 hover:-translate-y-2 rounded-lg overflow-hidden"
        style={{ borderRadius: '15px' }}
      >
        {/* 프로젝트 이미지 */}
        <div className="relative w-full h-60">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        {/* 프로젝트 이름 */}
        <div className="p-4" style={{ backgroundColor: project.color }}>
          <h3 className="font-display text-[30px] font-bold text-center">
            {project.title}
          </h3>
          <p className="text-[20px] font-bold text-center">{project.description}</p>
        </div>
      </div>

      {/* 모달 팝업 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white border-4 border-black max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{ borderRadius: '15px' }}
          >
            {/* 헤더 영역 (고정) */}
            <div className="flex justify-between items-start p-8 pb-6 border-b border-gray-200">
              <h2 className="font-display text-3xl font-bold">{project.title}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-2xl font-bold hover:text-[#35D399] transition-colors"
                aria-label="닫기"
                style={{ cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* 스크롤 가능한 컨텐츠 영역 */}
            <div className="overflow-y-auto flex-1">
              <div className="p-8 space-y-6 text-left">
              <div>
                <h3 className="font-display text-xl font-bold mb-3">
                  기술스택
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => {
                    const skillColor = getSkillColor(skill);
                    const isLightColor = skillColor === "#F7DF1E" || skillColor === "#61DAFB" || skillColor === "#FFCA28";
                    return (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm font-semibold rounded"
                        style={{
                          backgroundColor: skillColor,
                          color: isLightColor ? "#000000" : "#FFFFFF"
                        }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold mb-2">
                  주요기능
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {project.features.map((feature, index) => (
                    <li key={index} className="text-lg">{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold mb-2">
                  link
                </h3>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-700 break-words break-all"
                >
                  {project.link}
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

