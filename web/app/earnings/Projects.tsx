'use client';

import { useUserProjects } from '@/hooks/useUserProjects';
import { ProjectCard } from './ProjectCard';

function Projects() {
  const { projects, isLoading, isError } = useUserProjects();

  if (isError) return <div>Failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  return projects && projects.length > 0 ? (
    <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8 lg:mt-14 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
      {projects?.map((project) => <ProjectCard key={project.id} project={project} />)}
    </div>
  ) : (
    <div>No projects yet</div>
  );
}

export default Projects;
