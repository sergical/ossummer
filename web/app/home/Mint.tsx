'use client';

import React from 'react';
import ColorChangingHeading from '@/components/color-changing-header';
import ColorTransitionImage from '@/components/color-changing-image';

export function Mint() {
  return (
    <div className="flex flex-col gap-4 px-4 py-16 lg:px-0 lg:py-24">
      <ColorChangingHeading text="Claim your OSS" color="text-foreground" />
      <div className="mx-auto flex w-full items-center justify-center">
        <ColorTransitionImage
          className="h-[300px] w-[300px]"
          src="/nft.png"
          width={300}
          height={300}
          alt="NFT"
        />
      </div>
      <p className="mx-auto mt-6 max-w-lg text-center text-muted-foreground">
        An OSS is your digital proof of contribution to the open source community via Open Source
        Summer. It&apos;s an NFT (non-fungible token) that shows your contribution to the open
        source projects. You will be able to use it to claim different rewards.
      </p>
    </div>
  );
}
