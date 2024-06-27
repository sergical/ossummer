/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React, { useState, useEffect, useCallback } from 'react';

import { toast } from 'sonner';
import { TransactionExecutionError } from 'viem';
import {
  useAccount,
  useChainId,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
  useReadContract,
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
  const [hasMinted, setHasMinted] = useState(false);

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

  const { data: mintData, error: mintDataError } = useSimulateContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    chainId,
    abi: contract.abi,
    functionName: 'mint',
    args: [],
    query: {
      enabled: onCorrectNetwork && isOnAllowlist,
    },
  });

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

  const { data: balanceData, refetch: refetchBalance } = useReadContract({
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
      setMintStep(MintSteps.MINT_COMPLETE_STEP);
    }
  }, [balance]);

  useEffect(() => {
    if (transactionStatus === 'success') {
      setMintStep(MintSteps.MINT_COMPLETE_STEP);
      refetchBalance();
    }

    if (errorMint) {
      const isOutOfGas =
        errorMint instanceof TransactionExecutionError &&
        errorMint.message.toLowerCase().includes('out of gas');
      setMintStep(isOutOfGas ? MintSteps.OUT_OF_GAS_STEP : MintSteps.START_MINT_STEP);
    }
  }, [transactionStatus, setMintStep, errorMint, refetchBalance]);

  const handleMint = useCallback(() => {
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

  const mintFlowMarkup = () => {
    if (hasMinted) {
      return <div className="text-lg">Already Minted!</div>;
    }

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
      {hasMinted || isOnAllowlist ? (
        mintFlowMarkup()
      ) : (
        <Button onClick={handleWhitelist} disabled={addingToAllowlist}>
          {addingToAllowlist ? 'Confirming...' : 'Confirm submissions'}
        </Button>
      )}
    </div>
  );
}
