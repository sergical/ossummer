import React from 'react';
import { AddProjectForm } from '@/components/forms/add-project';

import { Projects } from './projects';

export const metadata = {
  title: 'Projects | Open Source Summer',
};

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Add a project</h1>
      <AddProjectForm isDashboard />
      <h1 className="mb-4 mt-8 text-2xl font-bold">Projects</h1>
      <Projects />
    </div>
  );
}
