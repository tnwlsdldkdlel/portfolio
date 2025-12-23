"use client";

import ProjectCard from "./ProjectCard";
import projectsData from "../../data/projects.json";

export default function ProjectsSection() {
  return (
    <div className="w-full text-center text-white">
      <h2 className="font-display text-[60px] font-bold mb-3 text-white">Projects</h2>
      <p className="text-[30px] mb-8 text-white">토이 프로젝트를 통해 배우고 성장한 경험을 공유합니다.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 text-text gap-2">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

