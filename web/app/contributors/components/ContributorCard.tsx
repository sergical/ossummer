import React from 'react';

type ContributorCardProps = {
  contributor: {
    id: string;
    name: string;
    pullRequestCount: number;
  };
};

export function ContributorCard({ contributor }: ContributorCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{contributor.name}</h3>
      <p>Pull Requests: {contributor.pullRequestCount}</p>
    </div>
  );
}
