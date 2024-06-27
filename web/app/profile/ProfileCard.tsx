'use client';

import React, { useCallback } from 'react';
import { Address, Avatar, Name } from '@coinbase/onchainkit/identity';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { base } from 'viem/chains';
import { useAccount, useChainId } from 'wagmi';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';

export default function ProfileCard() {
  const { logout } = usePrivy();

  const chainId = useChainId();

  const { address } = useAccount();
  const router = useRouter();
  const handleLogout = useCallback(() => {
    logout()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error(error);
      });
  }, [logout, router]);

  if (!address) return null;

  return (
    <Card className="w-full">
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

      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
}
