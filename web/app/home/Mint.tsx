'use client';

import React from 'react';
import ColorChangingHeading from '@/components/color-changing-header';
import ColorTransitionImage from '@/components/color-changing-image';

export function Mint() {
  return (
    <div className="flex flex-col gap-4 px-4 py-16 lg:px-0 lg:py-24">
      <ColorChangingHeading text="Mint your NFT" color="text-foreground" />
      <div className="mx-auto flex w-full items-center justify-center">
        <ColorTransitionImage
          className="h-[300px] w-[300px]"
          src="/nft.png"
          width={300}
          height={300}
          alt="NFT"
        />
      </div>
    </div>
  );
}
