'use client';

import React from 'react';

import { useContributors } from '@/hooks/useContributors';
import Contributor from './Contributor';

export default function ContributorsList() {
  const { contributors, isLoading, isError } = useContributors();
  return (
    <div>
      {isLoading && <div className="text-center">Loading...</div>}
      {isError && <div className="text-center">Error: {isError.message}</div>}
      {contributors && (
        <ul className="mx-auto max-w-[500px] space-y-4">
          {contributors.map((contributor) => (
            <Contributor key={contributor.id} contributor={contributor} />
          ))}
        </ul>
      )}
    </div>
  );
}
