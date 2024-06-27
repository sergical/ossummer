import React from 'react';
import { User } from '@privy-io/server-auth';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { SpinnerIcon } from '@/components/icons/SpinnerIcon';
import { Button } from '@/components/ui/button';
import { useContributions } from '@/hooks/useContributions';

export default function Contributor({ contributor }: { contributor: User }) {
  const githubUserName = contributor.github?.username;
  const walletAddress = contributor.wallet?.address;

  const { contributions, isLoading, isError } = useContributions(contributor.id);

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-border p-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Link
            href={`https://github.com/${githubUserName}`}
            target="_blank"
            className="flex items-center gap-2"
          >
            <GitHubLogoIcon className="h-4 w-4" />
            {githubUserName}
          </Link>
          <div className="text-sm text-muted-foreground">{contributor.github?.name}</div>
        </div>
        <p className="flex items-center gap-2 text-sm font-medium">
          Contributions:{' '}
          {isLoading ? <SpinnerIcon className="h-4 w-4" /> : isError ? 'Error' : contributions}
        </p>
      </div>
      {walletAddress ? <Button variant="outline">Tip 0.001ETH</Button> : null}
    </div>
  );
}
