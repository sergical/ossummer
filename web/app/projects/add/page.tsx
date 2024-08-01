import React from 'react';
import Link from 'next/link';
import { AddProjectForm } from '@/components/forms/add-project';
import { Navigation } from '@/components/layout/navigation';

export const metadata = {
  title: 'Add a project | Open Source Summer',
  description: 'Add a project to Open Source Summer',
};

export default function AddProjectPage() {
  return (
    <div>
      <Navigation />
      <div className="container py-36">
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-2xl font-bold">Submit a project to Open Source Summer</h1>
          <p className="mb-10 max-w-xl">
            Anyone can add any open source github repo here. If you want to add a project you
            maintain, you can sign up and link your Github account and add it in your{' '}
            <Link href="/dashboard/projects">dashboard</Link>.
          </p>
          <AddProjectForm />
        </div>
      </div>
    </div>
  );
}
