'use client';

import React from 'react';

import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from './ProjectCard';

export function ProjectsList() {
  const { projects, isLoading, isError } = useProjects();
  return (
    <div>
      {isLoading && <div className="text-center">Loading...</div>}
      {isError && <div className="text-center">Error: {isError.message}</div>}
      {projects && (
        <ul className="mx-auto max-w-[500px] space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      )}
    </div>
  );
}
