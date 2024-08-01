import React from 'react';
import { AddSubmissionForm } from '@/components/forms/add-submission';

export const metadata = {
  title: 'Submissions | Open Source Summer',
};

export default function SubmissionsPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Submissions</h1>
      <AddSubmissionForm />
    </div>
  );
}
