import React from 'react';
import { AddSubmissionForm } from '@/components/forms/add-submission';
import { PullRequests } from './pull-requests';

export const metadata = {
  title: 'Submissions | Open Source Summer',
};

export default function SubmissionsPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Add a submission</h1>
      <AddSubmissionForm />
      <h1 className="mb-4 mt-8 text-2xl font-bold">Submissions</h1>
      <PullRequests />
    </div>
  );
}
