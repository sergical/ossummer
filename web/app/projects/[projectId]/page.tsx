import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import { Metadata, ResolvingMetadata } from 'next';
import { DEFAULT_URL } from '@/constants';
import { createClient } from '@/utils/supabase/server';

export async function generateMetadata(
  { params }: { params: { projectId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const supabase = createClient();
  // read route params
  const projectId = params.projectId;
  if (!projectId) {
    return {
      title: 'Projects',
    };
  }
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  if (!project) {
    return {
      title: 'Contributors',
    };
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  const walletAddress = project.wallet_address;

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
      src: `${DEFAULT_URL}/api/og?projectId=${projectId}`,
    },
  });

  return {
    title: `Support ${project.name} on Open Source Summer!`,
    openGraph: {
      images: [`${DEFAULT_URL}/api/og?projectId=${projectId}`, ...previousImages],
    },
    other: {
      ...frameMetadata,
    },
  };
}

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  return <div>Project: {params.projectId}</div>;
}
