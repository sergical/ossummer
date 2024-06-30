import { base, baseSepolia } from 'viem/chains';

const getEtherscanNetwork = (chainId: number) => {
  if (chainId === base.id) return 'https://basescan.org/';
  if (chainId === baseSepolia.id) return 'https://sepolia.basescan.org/';
  return 'https://etherscan.io/';
};

export function getEtherscanLink(
  chainId: number,
  hash: `0x${string}` | undefined,
  type: 'transaction' | 'address',
) {
  return `${getEtherscanNetwork(chainId)}/${type === 'transaction' ? 'tx' : 'address'}/${hash}`;
}
