import { useCallback } from 'react';
import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { useLogout } from '@privy-io/react-auth';
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useAccount, useDisconnect } from 'wagmi';
import { NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

export function AccountInfoPanel() {
  const router = useRouter();
  const { address } = useAccount();
  const { logout } = useLogout({
    onSuccess: () => {
      router.push('/');
    },
  });
  const { disconnect } = useDisconnect();
  const handleDisconnectWallet = useCallback(async () => {
    disconnect();
    await logout();
  }, [disconnect, logout]);

  if (!address) return null;

  return (
    <ul>
      <li className="flex items-center justify-center gap-2 px-4 py-2">
        <Avatar address={address} className="h-10 w-10 rounded-full" />
        <div className="inline-flex flex-col items-start justify-center gap-1">
          <div className="font-inter w-32 text-base font-medium">
            <Name address={address} />
          </div>
          <span className="font-inter w-32 text-sm font-medium text-muted-foreground">
            <Name address={address} sliced />
          </span>
        </div>
      </li>
      <li className="flex items-center gap-2 px-4 py-2">
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <button
            type="button"
            // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
            onClick={() => {
              router.push('/profile');
            }}
            className="flex items-center gap-2"
          >
            <span className="font-inter w-32 text-left text-base font-medium">Profile</span>
            <PersonIcon className="relative h-4 w-4" />
          </button>
        </NavigationMenuLink>
      </li>
      <hr className="h-px self-stretch border-transparent bg-muted bg-opacity-20" />
      <li className="flex items-center gap-2 px-4 py-2">
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <button
            type="button"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleDisconnectWallet}
            className="flex items-center gap-2"
          >
            <span className="font-inter w-32 text-left text-base font-medium">Log out</span>
            <ExitIcon className="relative h-4 w-4" />
          </button>
        </NavigationMenuLink>
      </li>
    </ul>
  );
}
