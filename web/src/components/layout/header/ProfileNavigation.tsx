/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { useLogout } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ProfileNavigation() {
  const { address, isConnecting } = useAccount();
  const router = useRouter();
  const { logout } = useLogout({
    onSuccess: () => {
      router.push('/');
    },
  });

  if (isConnecting) return <p>Connecting...</p>;
  if (!address) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <Avatar address={address} className="!mr-2 h-5 w-5" />
            <Name address={address} />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              router.push('/profile');
            }}
          >
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await logout();
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
