import React from 'react';

import { StarIcon } from '@radix-ui/react-icons';

import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Repository } from '@/types/github';
export function RepositoryCard({ repo }: { repo: Repository }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{repo.full_name}</CardTitle>
        <CardDescription>{repo.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <StarIcon className="h-4 w-4" />
          <span>{repo.stargazers_count}</span>
        </div>
        <Link
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          prefetch={false}
        >
          View on GitHub
        </Link>
      </CardContent>
    </Card>
  );
}
