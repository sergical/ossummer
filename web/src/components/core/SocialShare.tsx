import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { DEFAULT_URL } from '@/constants';
import { FarcasterIcon } from '../icons/farcaster';

export function SocialShare({
  shareObjectId,
  shareObjectType,
}: {
  shareObjectId: string;
  shareObjectType: string;
}) {
  const shareUrl = `${DEFAULT_URL}/${shareObjectType}/${shareObjectId}`;
  const shareText = `Support this ${
    shareObjectType === 'projects' ? 'project' : 'contributor'
  } on Open Source Summer!`;
  const intentUrl = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${shareUrl}`;
  return (
    <Button variant="link" asChild>
      <Link href={intentUrl} target="_blank" rel="noopener noreferrer" prefetch={false}>
        Share on Farcaster
        <FarcasterIcon className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  );
}
