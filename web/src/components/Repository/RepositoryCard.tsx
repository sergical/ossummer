import React from 'react';

import { StarIcon } from '@radix-ui/react-icons';

import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Repository } from '@/types/github';
import { OssActions } from '../core/OssActions';
import { SocialShare } from '../core/SocialShare';
import { Button } from '../ui/button';
export function RepositoryCard({
  repo,
  walletAddress,
  projectId,
}: {
  repo: Repository;
  walletAddress?: string;
  projectId?: string;
}) {
  console.log(projectId);
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-1 flex-row items-center justify-between gap-2">
        <div>
          <CardTitle>{repo.full_name}</CardTitle>
          <CardDescription>{repo.description}</CardDescription>
        </div>
        {projectId && <SocialShare shareObjectId={projectId} shareObjectType="projects" />}
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <StarIcon className="h-4 w-4" />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" prefetch={false}>
              View on GitHub
            </Link>
          </Button>
          {walletAddress && <OssActions walletAddress={walletAddress} />}
        </div>
      </CardContent>
    </Card>
  );
}
