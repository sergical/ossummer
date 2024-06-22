import { base, baseSepolia } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import OssSummerABI from './OssSummerABI';

/**
 * Returns contract data for the Custom1155 contract.
 */
export const useOssSummerContract = generateContractHook({
  abi: OssSummerABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: process.env.OSSUMMER_BASE_SEPOLIA_CONTRACT_ADDRESS as `0x${string}`,
  },
  [base.id]: {
    chain: base,
    address: process.env.OSSUMMER_BASE_CONTRACT_ADDRESS as `0x${string}`,
  },
});
