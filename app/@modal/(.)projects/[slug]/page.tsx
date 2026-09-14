import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { Modal } from "@/components/Modal";
import { ProjectDetail } from "@/components/ProjectDetail";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <Modal>
      <ProjectDetail project={project} inModal />
    </Modal>
  );
}
