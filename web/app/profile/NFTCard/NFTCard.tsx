/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
'use client';

import React, { useState, useEffect, useCallback } from 'react';

import { useWallets } from '@privy-io/react-auth';

import { toast } from 'sonner';
import { TransactionExecutionError } from 'viem';
import {
  useAccount,
  useChainId,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { Button } from '@/components/ui/button';
import { EXPECTED_CHAIN } from '@/constants';
import { getChainsForEnvironment } from '@/store/supportedChains';
import { APIResponse } from '@/types/api';
import { useOSSummerContract } from './_contracts/useOSSummerContract';

export enum MintSteps {
  START_MINT_STEP,
  MINT_PROCESSING_STEP,
  OUT_OF_GAS_STEP,
  MINT_COMPLETE_STEP,
}

export default function NFTCard() {
  const [mintStep, setMintStep] = useState(MintSteps.START_MINT_STEP);
  const [isOnAllowlist, setIsOnAllowlist] = useState(false);
  const [addingToAllowlist, setAddingToAllowlist] = useState(false);
  const { chain: accountChain, address, connector, isConnected } = useAccount();
  const { wallets } = useWallets();
  const wallet = wallets[0];
  const privyChainId = wallet?.chainId;
  console.log('privyChainId', privyChainId);
  console.log('connector', connector);
  console.log('isConnected', isConnected);
  const chainId = useChainId();
  console.log('accountChain', accountChain);
  console.log('chainId', chainId);
  const chain =
    accountChain ?? getChainsForEnvironment().find((envChain) => EXPECTED_CHAIN.id === envChain.id);

  const contract = useOSSummerContract();

  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;
  console.log('Contract:', contract);

  const { data: isOnAllowlistData } = useSimulateContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'isOnAllowlist',
    args: address ? [address] : undefined,
    query: {
      enabled: onCorrectNetwork,
    },
  });

  const { data: mintData, error: mintDataError } = useSimulateContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    chainId,
    abi: contract.abi,
    functionName: 'mint',
    args: [],
    query: {
      enabled: onCorrectNetwork,
    },
  });

  console.log('mintData', mintData);
  if (mintDataError) {
    console.error('mintDataError', mintDataError);
  }

  const { writeContract: performMint, error: errorMint, data: dataMint } = useWriteContract();

  const { status: transactionStatus } = useWaitForTransactionReceipt({
    hash: dataMint,
    query: {
      enabled: !!dataMint,
    },
  });

  useEffect(() => {
    console.log('transactionStatus', transactionStatus);
    if (transactionStatus === 'success') {
      setMintStep(MintSteps.MINT_COMPLETE_STEP);
    }

    if (errorMint) {
      console.log('errorMint', errorMint);
      const isOutOfGas =
        errorMint instanceof TransactionExecutionError &&
        errorMint.message.toLowerCase().includes('out of gas');
      setMintStep(isOutOfGas ? MintSteps.OUT_OF_GAS_STEP : MintSteps.START_MINT_STEP);
    }
  }, [transactionStatus, setMintStep, errorMint]);

  const handleMint = useCallback(() => {
    console.log('mintData in handleMint', mintData);
    if (mintData?.request) {
      performMint?.(mintData.request);
      setMintStep(MintSteps.MINT_PROCESSING_STEP);
    } else {
      console.error('Mint data request is undefined');
    }
  }, [mintData, performMint, setMintStep]);

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

  console.log('isOnAllowlistData', isOnAllowlistData);
  const handleCheckEligibility = useCallback(() => {
    console.log('isOnAllowlistData', isOnAllowlistData);
    const isOnAllowlistResult = isOnAllowlistData?.result as unknown as boolean;
    setIsOnAllowlist(isOnAllowlistResult);
  }, [isOnAllowlistData]);

  useEffect(() => {
    if (isOnAllowlistData !== undefined) {
      console.log('isOnAllowlistData', isOnAllowlistData);
      handleCheckEligibility();
    }
  }, [isOnAllowlistData, handleCheckEligibility]);

  const mintFlowMarkup = () => {
    switch (mintStep) {
      case MintSteps.START_MINT_STEP:
        return (
          <Button onClick={handleMint} disabled={addingToAllowlist}>
            {addingToAllowlist ? 'Minting...' : 'Mint'}
          </Button>
        );
      case MintSteps.MINT_PROCESSING_STEP:
        return <div className="text-lg">Minting...</div>;
      case MintSteps.MINT_COMPLETE_STEP:
        return <div className="text-lg">Minted!</div>;
      case MintSteps.OUT_OF_GAS_STEP:
        return <div className="text-lg">Out of gas!</div>;
      default:
        return <div className="text-lg">Unknown step</div>;
    }
  };

  return (
    <div className="z-10 text-2xl font-bold">
      {isOnAllowlist ? (
        mintFlowMarkup()
      ) : (
        <Button onClick={handleWhitelist} disabled={addingToAllowlist}>
          {addingToAllowlist ? 'Adding to allowlist...' : 'Confirm submissions'}
        </Button>
      )}
    </div>
  );
}
