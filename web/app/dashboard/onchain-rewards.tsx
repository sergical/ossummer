import React from 'react';
import Image from 'next/image';
import { ActionButton } from './action-button';

export function OnchainRewards({ isEligible, ownsNft }: { isEligible: boolean; ownsNft: boolean }) {
  const status = ownsNft
    ? 'You own this NFT and are eligible for rewards. Stay tuned for more details.'
    : isEligible
    ? 'Congratulations for your open source contribution! You can claim this NFT now.'
    : 'You have not met the requirements yet. Keep contributing to open source and you will be eligible soon.';
  return (
    <div className="flex flex-col space-y-4 ">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold">Status: {status}</h2>
        <div className="relative max-w-[300px]">
          {(!ownsNft || !isEligible) && (
            <div className="absolute left-0 top-0 h-full w-full rounded-4xl bg-black opacity-50" />
          )}
          <Image src="/nft.png" alt="NFT" width={300} height={300} />
        </div>
        <ActionButton isEligible={isEligible} ownsNft={ownsNft} />
      </div>
    </div>
  );
}
