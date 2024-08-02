import { base, baseSepolia } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import OSSummerABI from './OSSummerABI';

/**
 * Returns contract data for the Custom1155 contract.
 */
export const useOSSummerContract = generateContractHook({
  abi: OSSummerABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: process.env.NEXT_PUBLIC_OSSUMMER_BASE_SEPOLIA_CONTRACT_ADDRESS as `0x${string}`,
  },

  [base.id]: {
    chain: base,
    address: process.env.NEXT_PUBLIC_OSSUMMER_BASE_CONTRACT_ADDRESS as `0x${string}`,
  },
});
