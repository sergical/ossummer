/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { useAccount, useSimulateContract } from 'wagmi';
import { Button } from '@/components/ui/button';
import { EXPECTED_CHAIN } from '@/constants';
import { getChainsForEnvironment } from '@/store/supportedChains';
import { useOssSummerContract } from './_contracts/useOssSummerContract';

export default function NFTCard() {
  const [isEligible, setIsEligible] = useState(false);
  const [addingToAllowlist, setAddingToAllowlist] = useState(false);
  const { chain: accountChain, address } = useAccount();
  const chain =
    accountChain ?? getChainsForEnvironment().find((envChain) => EXPECTED_CHAIN.id === envChain.id);

  const contract = useOssSummerContract();

  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;

  const { data: isOnAllowlistData } = useSimulateContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'allowlist',
    args: address ? [address] : undefined,
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
      });
      const data = (await result.json()) as { success: boolean };
      console.log(data);
      setAddingToAllowlist(false);
    } catch (error) {
      console.error(error);
    } finally {
      setAddingToAllowlist(false);
    }
  };

  const handleCheckEligibility = () => {
    const isOnAllowlist = isOnAllowlistData?.result as unknown as boolean;
    if (!isOnAllowlist) {
      toast.error('You have not filled all the submissions yet, keep building!');
    }
    setIsEligible(isOnAllowlist);
  };

  return (
    <div className="z-50 text-2xl font-bold">
      {isEligible ? (
        <Button onClick={handleWhitelist} disabled={addingToAllowlist}>
          {addingToAllowlist ? 'Adding to allowlist...' : 'Confirm submissions'}
        </Button>
      ) : (
        <Button onClick={handleCheckEligibility}>Check eligibility</Button>
      )}
    </div>
  );
}
