import React from 'react';
import { AddProjectForm } from '@/components/forms/add-project';

import { LinkGithub } from '@/components/link-github';
import { getPrivyUser } from '@/server/actions';
import { Projects } from './projects';

export const metadata = {
  title: 'Projects | Open Source Summer',
};

export default async function ProjectsPage() {
  const user = await getPrivyUser();
  const hasGithub = user?.github;
  if (!hasGithub) {
    return <LinkGithub />;
  }
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Add a project</h1>
      <AddProjectForm isDashboard />
      <h1 className="mb-4 mt-8 text-2xl font-bold">Projects</h1>
      <Projects />
    </div>
  );
}
