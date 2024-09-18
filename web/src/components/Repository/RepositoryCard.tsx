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

import { Database } from '@/types/supabase';
import { OssActions } from '../core/OssActions';
import { SocialShare } from '../core/SocialShare';
import { Button } from '../ui/button';

import LanguageBadge from './LanguageBadge';
import { StarsCount } from './StarsCount';
export function RepositoryCard({
  repo,
  walletAddress,
  projectId,
}: {
  repo: Database['public']['Tables']['projects']['Row'];
  walletAddress?: string;
  projectId?: string;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-1">
          <CardTitle>{repo.name}</CardTitle>
          <CardDescription>by {repo.maintainer ?? 'Unknown'}</CardDescription>
        </div>
        <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
          <LanguageBadge language={repo.language} />
          <StarsCount apiUrl={repo.api_url} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-1">{repo.description}</CardContent>
      <CardFooter>
        <div className="flex w-full flex-row justify-between gap-2">
          <div className="flex flex-col gap-2 md:flex-row">
            {walletAddress && (
              <OssActions
                walletAddress={walletAddress}
                targetType="project"
                targetId={projectId ?? ''}
              />
            )}
            <Button variant="link" asChild>
              <Link
                href={repo.public_url ?? ''}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
              >
                <GitHubLogoIcon className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          </div>
          <div>
            {projectId && <SocialShare shareObjectId={projectId} shareObjectType="projects" />}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
