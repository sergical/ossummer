'use client';

import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createWagmiConfig } from '@/store/createWagmiConfig';
import { EXPECTED_CHAIN } from './constants';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL as string;

const wagmiConfig = createWagmiConfig(rpcUrl);

function OnchainProviders({ children }: Props) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_ID as string}
      config={{
        defaultChain: EXPECTED_CHAIN,
        // Customize Privy's appearance in your app
        appearance: {
          walletList: ['coinbase_wallet'],
          theme: 'light',
          accentColor: '#676FFF',
          logo: `/logo-text.png`,
        },
        externalWallets: {
          coinbaseWallet: {
            // Valid connection options include 'eoaOnly' (default), 'smartWalletOnly', or 'all'
            connectionOptions: 'smartWalletOnly',
          },
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <OnchainKitProvider
            apiKey={process.env.NEXT_PUBLIC_ONCHAIN_API_KEY as string}
            chain={EXPECTED_CHAIN}
          >
            {children}
          </OnchainKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}

export default OnchainProviders;
