'use client';
import React from 'react';
import EarningsCard from './EarningsCard';
import NFTCard from './NFTCard/NFTCard';

export function OnchainRewards() {
  return (
    <div className="flex flex-col space-y-4 ">
      <EarningsCard />
      <NFTCard />
    </div>
  );
}
