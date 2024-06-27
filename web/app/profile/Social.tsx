'use client';

import { usePrivy } from '@privy-io/react-auth';

import { Button } from '@/components/ui/button';

export function Social() {
  const { user, linkFarcaster } = usePrivy();

  const farcasterUser = user?.farcaster?.username;

  if (!farcasterUser) {
    return (
      <div className="space-y-4">
        <p>Spread the word about your contributions to Open Source!</p>
        <Button onClick={linkFarcaster} variant="secondary">
          Link Farcaster
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p>You are linked to Farcaster</p>
      <p>Username: {farcasterUser}</p>
      <p>Social features coming soon!</p>
    </div>
  );
}
