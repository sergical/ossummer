'use client';

import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { base, baseSepolia } from 'viem/chains';
import { createWagmiConfig } from '@/store/createWagmiConfig';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL as string;

const ENVIRONMENT = process.env.ENVIRONMENT as string;

const wagmiConfig = createWagmiConfig(rpcUrl);

function OnchainProviders({ children }: Props) {
  const { theme } = useTheme();
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_ID as string}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          walletList: ['coinbase_wallet'],
          theme: theme === 'light' ? 'light' : 'dark',
          accentColor: '#676FFF',
          logo: `/logo.png`,
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
            chain={
              ENVIRONMENT === 'localhost' || ENVIRONMENT === 'development' ? baseSepolia : base
            }
          >
            {children}
          </OnchainKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}

export default OnchainProviders;
