// 프로젝트 타입 정의

export interface Project {
  id: string;
  title: string;
  problem: string;
  approach: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
    improvement: string;
  }[];
  technologies: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  url: string;
}

export interface ImpactMetric {
  category: string;
  description: string;
}

