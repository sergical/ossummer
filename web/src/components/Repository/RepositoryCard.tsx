import React from 'react';

import { GitHubLogoIcon } from '@radix-ui/react-icons';

import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-1">
          <CardTitle>{repo.name}</CardTitle>
          <CardDescription>by {repo.owner?.login ?? 'Unknown'}</CardDescription>
        </div>
        {projectId && <SocialShare shareObjectId={projectId} shareObjectType="projects" />}
      </CardHeader>
      <CardContent className="flex flex-1">{repo.description}</CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2">
          {walletAddress && <OssActions walletAddress={walletAddress} />}
          <Button variant="link" asChild>
            <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" prefetch={false}>
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
              View on GitHub
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
