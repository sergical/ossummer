'use client';

import React from 'react';

import { useContributors } from '@/hooks/useContributors';
import Contributor from './Contributor';

export default function ContributorsList() {
  const { contributors, isLoading, isError } = useContributors();
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {isError.message}</div>}
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
