/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-no-bind */
'use client';

import { useEffect } from 'react';
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
import { getEtherscanLink } from '@/lib/getEtherscanLink';
import { Button } from '../ui/button';

export function OssActions({ walletAddress }: { walletAddress?: string }) {
  const { isConnected, address } = useAccount();
  const { login } = usePrivy();
  const chainId = useChainId();

  const isOwner = walletAddress === address;
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
  }, [error]);

  if (!isConnected) {
    return <Button onClick={login}>Sign in</Button>;
  }

  if (isOwner) {
    return null;
  }

  async function submit() {
    if (!address) {
      toast.error('Please connect your wallet to contribute');
      return;
    }

    sendTransaction({ to: address, value: DONATION_VALUE });
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
