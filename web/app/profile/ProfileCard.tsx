/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useCallback } from 'react';
import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { base } from 'viem/chains';
import { useAccount, useChainId } from 'wagmi';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function ProfileCard() {
  const { logout, linkGithub, user, linkFarcaster } = usePrivy();
  const { wallets } = useWallets();
  const wallet = wallets[0];
  const privyChainId = wallet?.chainId?.split(':')[1];
  const chainId = useChainId();

  const isMismatched = Number(privyChainId) !== chainId;

  const handleSwitchToRightChain = async () => {
    await wallet.switchChain(chainId);
  };

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
              <Name address={address} showAddress />
            </div>
          </div>
          <div>
            {isMismatched ? (
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              <Button size="sm" variant="outline" onClick={handleSwitchToRightChain}>
                Switch to {chainId === base.id ? 'Base' : 'Base Sepolia'}
              </Button>
            ) : (
              <Badge variant="default">{chainId === base.id ? 'Base' : 'Base Sepolia'}</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div>
            Github:{' '}
            {user?.github ? (
              user.github.username
            ) : (
              <Button variant="link" onClick={linkGithub}>
                Link Github
              </Button>
            )}
          </div>
          <div>
            Farcaster:{' '}
            {user?.farcaster ? (
              user.farcaster.username
            ) : (
              <Button variant="link" onClick={linkFarcaster}>
                Link Farcaster
              </Button>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
}
