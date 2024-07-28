import React from 'react';
import { AddProjectForm } from '@/components/forms/add-project';
import { Navigation } from '@/components/layout/navigation';

export default function AddProjectPage() {
  return (
    <div>
      <Navigation />
      <div className="container py-36">
        <h1>Submit a project to Open Source Summer</h1>
        <AddProjectForm />
      </div>
    </div>
  );
}
