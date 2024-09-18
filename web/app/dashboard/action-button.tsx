'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function ActionButton({ isEligible, ownsNft }: { isEligible: boolean; ownsNft: boolean }) {
  const [loading, setLoading] = useState(false);
  const handleClaimNft = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/claim-nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        toast.success('NFT claimed successfully');
      } else {
        toast.error(`Error claiming NFT: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error claiming NFT:', error);
    } finally {
      setLoading(false);
    }
  };
  if (ownsNft) {
    return null;
  }
  if (isEligible) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      <Button onClick={handleClaimNft} disabled={loading}>
        Claim NFT
      </Button>
    );
  }
  return (
    <Button asChild>
      <Link href="/dashboard/submissions">Submit a PR</Link>
    </Button>
  );
}
