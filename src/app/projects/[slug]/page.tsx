import { projects } from "@/data/projects";
import { getProjectImages } from "@/lib/get-images";
import ProjectDetailClient from "./ProjectDetailClient";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const { pairs, details } = getProjectImages(slug);

  return (
    <ProjectDetailClient 
      project={project} 
      pairs={pairs} 
      details={details} 
    />
  );
}