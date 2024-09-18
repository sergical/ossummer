import React from 'react';
import Image from 'next/image';
import { OssActions } from '@/components/core/OssActions';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { privy } from '@/server/privy';

type ContributorCardProps = {
  contributor: {
    id: string;
    name: string;
    pullRequestCount: number;
  };
};

export async function ContributorCard({ contributor }: ContributorCardProps) {
  const user = await privy.getUser(contributor.id);
  if (!user) {
    return null;
  }
  const githubUsername = user.github?.username;
  if (!githubUsername) {
    return null;
  }
  const githubInfo = await fetch(`https://api.github.com/users/${githubUsername}`);
  const githubData = (await githubInfo.json()) as {
    avatar_url: string;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Image src={githubData.avatar_url} alt={githubUsername} width={50} height={50} />
        <CardTitle>{contributor.name}</CardTitle>
      </CardHeader>
      <CardContent>Contributions: {contributor.pullRequestCount}</CardContent>
      <CardFooter>
        <OssActions
          walletAddress={user.wallet?.address}
          targetType="contributor"
          targetId={contributor.id}
        />
      </CardFooter>
    </Card>
  );
}
