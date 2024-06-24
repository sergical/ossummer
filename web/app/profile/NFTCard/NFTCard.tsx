/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useAccount, useSimulateContract } from 'wagmi';
import { Button } from '@/components/ui/button';
import { EXPECTED_CHAIN } from '@/constants';
import { getChainsForEnvironment } from '@/store/supportedChains';
import { APIResponse } from '@/types/api';
import { useOSSummerContract } from './_contracts/useOSSummerContract';

export default function NFTCard() {
  const [isOnAllowlist, setIsOnAllowlist] = useState(false);
  const [addingToAllowlist, setAddingToAllowlist] = useState(false);
  const { chain: accountChain, address } = useAccount();
  const chain =
    accountChain ?? getChainsForEnvironment().find((envChain) => EXPECTED_CHAIN.id === envChain.id);

  const contract = useOSSummerContract();

  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;

  const { data: isOnAllowlistData } = useSimulateContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi, // Ensure ABI is correctly referenced
    functionName: 'isOnAllowlist',
    args: [address ? [address] : []],
    query: {
      enabled: onCorrectNetwork,
    },
  });

  const handleWhitelist = async () => {
    setAddingToAllowlist(true);
    try {
      const result = await fetch('/api/whitelist', {
        method: 'POST',
        body: JSON.stringify({ address }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = (await result.json()) as unknown as APIResponse<string>;
      if (data.success) {
        toast.success('Successfully added to the allowlist!');
      } else {
        toast.error(`Failed to add to the allowlist: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while adding to the allowlist.');
    } finally {
      setAddingToAllowlist(false);
    }
  };

  const handleMint = async () => {
    console.log('Minting...');
  };

  const handleCheckEligibility = useCallback(() => {
    console.log('isOnAllowlistData', isOnAllowlistData);
    const isOnAllowlistResult = isOnAllowlistData?.result as unknown as boolean;
    setIsOnAllowlist(isOnAllowlistResult);
  }, [isOnAllowlistData]);

  useEffect(() => {
    if (isOnAllowlistData !== undefined) {
      handleCheckEligibility();
    }
  }, [isOnAllowlistData, handleCheckEligibility]);

  return (
    <div className="z-50 text-2xl font-bold">
      {isOnAllowlist ? (
        <Button onClick={handleMint} disabled={addingToAllowlist}>
          {addingToAllowlist ? 'Minting...' : 'Mint'}
        </Button>
      ) : (
        <Button onClick={handleWhitelist} disabled={addingToAllowlist}>
          {addingToAllowlist ? 'Adding to allowlist...' : 'Confirm submissions'}
        </Button>
      )}
    </div>
  );
}
