'use client';

import React from 'react';
import { Address, Avatar, Name } from '@coinbase/onchainkit/identity';

import { useWallets } from '@privy-io/react-auth';
import { formatEther } from 'viem';
import { base } from 'viem/chains';
import { useBalance, useChainId } from 'wagmi';
import { Badge } from '@/components/ui/badge';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function EarningsCard() {
  const chainId = useChainId();
  const { wallets } = useWallets();
  const address = wallets[0]?.address as `0x${string}`;

  const { data: balance } = useBalance({ address, chainId, query: { enabled: !!address } });

  if (!address) return null;

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar address={address} />
            <div className="flex flex-col text-sm">
              <b>
                <Name address={address} />
              </b>
              <Address address={address} />
            </div>
          </div>
          <div>
            <Badge variant="default">{chainId === base.id ? 'Base' : 'Base Sepolia'}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-medium">
            Balance: {Number(formatEther(balance?.value ?? BigInt('0'))).toFixed(5)}
            {balance?.symbol}
          </h3>
          <p className="text-sm text-muted-foreground">
            This is the amount of ETH you have in your wallet. You can use this to claim your
            earnings. Swap to USDC and offramp via Stripe + Coinbase coming soon.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
