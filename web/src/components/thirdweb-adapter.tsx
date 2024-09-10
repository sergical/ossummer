/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect } from 'react';
import { useWallets } from '@privy-io/react-auth';
import { defineChain } from 'thirdweb';
import { ethers6Adapter } from 'thirdweb/adapters/ethers6';
import { viemAdapter } from 'thirdweb/adapters/viem';
import { useSetActiveWallet } from 'thirdweb/react';
import { createWalletAdapter } from 'thirdweb/wallets';
import { WalletClient } from 'viem';
import { useDisconnect, useSwitchChain, useWalletClient } from 'wagmi';
import { client } from '../utils/thirdweb';

export function ThirdwebAdapter({ children }: { children: React.ReactNode }) {
  const { wallets } = useWallets(); // from privy
  const setActiveWallet = useSetActiveWallet(); // from thirdweb/react
  const { data: walletClient } = useWalletClient(); // from wagmi
  const { disconnectAsync } = useDisconnect(); // from wagmi
  const { switchChainAsync } = useSwitchChain(); // from wagmi
  useEffect(() => {
    const setActive = async () => {
      if (walletClient) {
        // adapt the walletClient to a thirdweb account
        const adaptedAccount = viemAdapter.walletClient.fromViem({
          walletClient: walletClient as unknown as WalletClient, // accounts for wagmi/viem version mismatches
        });
        // create the thirdweb wallet with the adapted account
        const thirdwebWallet = createWalletAdapter({
          client,
          adaptedAccount,
          chain: defineChain(await walletClient.getChainId()),
          onDisconnect: async () => {
            await disconnectAsync();
          },
          switchChain: async (chain) => {
            await switchChainAsync({ chainId: chain.id });
          },
        });
        setActiveWallet(thirdwebWallet);
      }
    };
    setActive();
  }, [walletClient]);
  // whenever the privy wallet changes,
  // we adapt it to a thirdweb account and set it as the active wallet
  useEffect(() => {
    const setActive = async () => {
      const privyWallet = wallets[0];
      if (privyWallet) {
        const ethersProvider = await privyWallet.getEthersProvider();
        // adapt privy wallet to a thirdweb account
        const adaptedAccount = await ethers6Adapter.signer.fromEthers({
          signer: ethersProvider.getSigner(),
        });
        // create the thirdweb wallet with the adapted account
        const thirdwebWallet = createWalletAdapter({
          client,
          adaptedAccount,
          // chainId is in the format of "eip155:1"
          chain: defineChain(Number(privyWallet.chainId.split(':')[1])),
          onDisconnect: async () => {
            privyWallet.disconnect();
          },
          switchChain: async (chain) => {
            await privyWallet.switchChain(chain.id);
          },
        });
        setActiveWallet(thirdwebWallet);
      }
    };
    setActive();
  }, [wallets]);

  return <>{children}</>;
}
