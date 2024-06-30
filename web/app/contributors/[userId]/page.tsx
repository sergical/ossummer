import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import { Metadata, ResolvingMetadata } from 'next';
import { DEFAULT_URL } from '@/constants';
import { buildPrivyUserId } from '@/lib/privy';
import { privy } from '@/server/privy';

export async function generateMetadata(
  { params }: { params: { userId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const userId = params.userId;
  if (!userId) {
    return {
      title: 'Contributors',
    };
  }
  const privyUser = await privy.getUser(buildPrivyUserId(userId));

  if (!privyUser.github) {
    return {
      title: 'Contributors',
    };
  }

  const githubUsername = privyUser.github.username;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  const walletAddress = privyUser.wallet?.address ?? ('' as `0x${string}`);

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        action: 'tx',
        label: 'Donate 0.001 ETH',
        target: `${DEFAULT_URL}/api/tx?to=${walletAddress}`,
        postUrl: `${DEFAULT_URL}/api/tx-success`,
      },
      {
        action: 'link',
        label: 'Explore Open Source Summer',
        target: `${DEFAULT_URL}`,
      },
    ],
    image: {
      src: `${DEFAULT_URL}/api/og?username=${githubUsername}`,
    },
  });

  return {
    title: `Support ${githubUsername} on Open Source Summer!`,
    openGraph: {
      images: [`${DEFAULT_URL}/api/og?username=${githubUsername}`, ...previousImages],
    },
    other: {
      ...frameMetadata,
    },
  };
}

export default function ContributorPage({ params }: { params: { userId: string } }) {
  return <div>Contributor: {buildPrivyUserId(params.userId)}</div>;
}
