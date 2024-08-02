/* eslint-disable react-perf/jsx-no-new-function-as-prop */

/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React, { useState, useEffect, useCallback } from 'react';

import Image from 'next/image';
import { toast } from 'sonner';

import { useAccount, useChainId, useSimulateContract, useReadContract } from 'wagmi';

import { useWriteContracts } from 'wagmi/experimental';
import { Button } from '@/components/ui/button';
import { EXPECTED_CHAIN } from '@/constants';
import { getChainsForEnvironment } from '@/store/supportedChains';
import { APIResponse } from '@/types/api';
import isLocal from '@/utils/isLocal';
import { useOSSummerContract } from './_contracts/useOSSummerContract';
import { CallStatus } from './CallStatus';

export enum MintSteps {
  START_MINT_STEP,
  MINT_PROCESSING_STEP,
  OUT_OF_GAS_STEP,
  MINT_COMPLETE_STEP,
}

export default function NFTCard() {
  const [isOnAllowlist, setIsOnAllowlist] = useState(false);
  const [addingToAllowlist, setAddingToAllowlist] = useState(false);
  const [hasMinted, setHasMinted] = useState(false);
  const [defaultUrl, setDefaultUrl] = useState<string>();

  useEffect(() => {
    // Use the local API URL to target the Paymaster directly without a proxy
    // if running on localhost, otherwise use the Paymaster Proxy.
    const paymasterURL = process.env.NEXT_PUBLIC_PAYMASTER_URL;
    const isLocalEnv = isLocal();
    setDefaultUrl(isLocalEnv ? paymasterURL : `${document.location.origin}/api/paymaster-proxy`);
  }, []);

  const { chain: accountChain, address } = useAccount();

  const chainId = useChainId();

  const chain =
    accountChain ?? getChainsForEnvironment().find((envChain) => EXPECTED_CHAIN.id === envChain.id);

  const contract = useOSSummerContract();

  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;

  const { data: isOnAllowlistData } = useSimulateContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'isOnAllowlist',
    args: address ? [address] : undefined,
    query: {
      enabled: onCorrectNetwork,
    },
  });

  const { data: callID, writeContracts } = useWriteContracts();

  const { data: balanceData } = useReadContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'balanceOf',
    args: address ? [address, 0] : undefined, // Assuming tokenId is 1
    chainId,
  });

  const balance = balanceData as bigint | undefined;

  useEffect(() => {
    if (balance && balance > 0n) {
      setHasMinted(true);
    }
  }, [balance]);

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
      const data = (await result.json()) as APIResponse<string>;
      if (data.success) {
        toast.success('Successfully confirmed your submissions!');
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while adding to the allowlist.');
    } finally {
      setAddingToAllowlist(false);
    }
  };

  const handleCheckEligibility = useCallback(() => {
    const isOnAllowlistResult = isOnAllowlistData?.result as unknown as boolean;
    setIsOnAllowlist(isOnAllowlistResult);
  }, [isOnAllowlistData]);

  useEffect(() => {
    if (isOnAllowlistData !== undefined) {
      handleCheckEligibility();
    }
  }, [isOnAllowlistData, handleCheckEligibility]);

  if (contract.status !== 'ready') {
    console.error('Contract is not ready');
    return null;
  }

  const handleMintWithPaymaster = () => {
    writeContracts({
      contracts: [
        {
          address: contract.address,
          abi: contract.abi,
          functionName: 'mint',
          args: [],
        },
      ],
      capabilities: {
        paymasterService: {
          url: defaultUrl,
        },
      },
    });
  };

  const mintFlowMarkup = () => {
    if (hasMinted) {
      return (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg">Already Minted!</h3>
          <Image src="/nft.png" alt="NFT" width={200} height={200} />
          <p className="text-sm">More details on what perks this NFT unlocks coming soon!</p>
        </div>
      );
    }
    return (
      <>
        <Button onClick={handleMintWithPaymaster} disabled={addingToAllowlist}>
          {addingToAllowlist ? 'Minting...' : 'Mint'}
        </Button>
        <CallStatus id={callID ?? ''} />
      </>
    );
  };

  if (!onCorrectNetwork) {
    return <div>Not on correct network</div>;
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold">Your Contributor NFT</h3>
      <div className="z-10 text-2xl font-bold">
        {hasMinted || isOnAllowlist ? (
          mintFlowMarkup()
        ) : (
          <Button onClick={handleWhitelist} disabled={addingToAllowlist}>
            {addingToAllowlist ? 'Confirming...' : 'Confirm submissions'}
          </Button>
        )}
      </div>
    </div>
  );
}
