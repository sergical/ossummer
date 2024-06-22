'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { useOssSummerContract } from './_contracts/useOssSummerContract';

export default function NFTCard() {
  const { chain: accountChain, address, isConnected } = useAccount();

  const contract = useOssSummerContract();

  console.log(contract);

  const handleWhitelist = () => {
    console.log('whitelist');
  };
  return (
    <div className="text-2xl font-bold">
      <Button onClick={handleWhitelist}>Confirm entries</Button>
    </div>
  );
}
