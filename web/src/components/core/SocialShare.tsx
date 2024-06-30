'use client';

import { EllipsisVerticalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DEFAULT_URL } from '@/constants';

// Embed example
// https://warpcast.com/~/compose?text=Hello%20@farcaster!&embeds[]=https://farcaster.xyz&embeds[]=https://github.com/farcasterxyz/protocol

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Social</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => window.open(intentUrl, '_blank')}>
            Share on Farcaster
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
