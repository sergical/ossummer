/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-no-bind */
'use client';

import { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import {
  BaseError,
  useAccount,
  useChainId,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { DONATION_VALUE } from '@/constants';
import { getEtherscanLink } from '@/utils/getEtherscanLink';
import { Button } from '../ui/button';

export function OssActions({
  walletAddress,
  targetType,
  targetId,
}: {
  walletAddress?: string;
  targetType: string;
  targetId: string;
}) {
  const [fetchSent, setFetchSent] = useState(false);
  const { isConnected, address } = useAccount();
  const { login } = usePrivy();
  const chainId = useChainId();

  const { data: hash, error, isPending, sendTransaction } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (error) {
      const errorMessage =
        (error as BaseError).shortMessage || (error as BaseError).message || 'An error occurred';
      toast.error(errorMessage);
    }
    if (isConfirmed && !fetchSent) {
      setFetchSent(true);
      fetch('/api/donate', {
        method: 'POST',
        body: JSON.stringify({
          transactionHash: hash,
          targetType,
          targetId,
        }),
      }).catch((apiError) => {
        console.error(apiError);
        toast.error('Failed to update donation status');
      });
    }
  }, [error, isConnected, login, isConfirmed, hash, targetType, targetId, fetchSent]);

  if (!isConnected) {
    return (
      <Button onClick={login} variant="outline">
        Sign in to donate
      </Button>
    );
  }

  if (!walletAddress) {
    return null;
  }

  async function submit() {
    if (!address) {
      toast.error('Please connect your wallet to contribute');
      return;
    }

    if (!walletAddress) {
      toast.error('This project does not have a wallet address');
      return;
    }

    sendTransaction({ to: walletAddress as `0x${string}`, value: DONATION_VALUE });
  }

  return isConfirmed ? (
    <Button variant="outline" asChild>
      <Link href={getEtherscanLink(chainId, hash, 'transaction')} target="_blank">
        Donation successful <ExternalLinkIcon className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  ) : (
    <Button onClick={submit} disabled={isPending} variant="outline">
      {isPending ? 'Confirm donation' : isConfirming ? 'Working on it...' : 'Donate 0.001 ETH'}
    </Button>
  );
}
