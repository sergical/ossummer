import { parseEther } from 'viem';
import { baseSepolia, base } from 'viem/chains';

export const MIN_SUBMISSIONS = 4;

export const DONATION_VALUE = parseEther('0.001');

const shouldBeBased =
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ||
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'staging';
export const EXPECTED_CHAIN = shouldBeBased ? base : baseSepolia;

const deployUrl = process.env.NEXT_PUBLIC_DEPLOY_URL ?? process.env.VERCEL_URL;
export const DEFAULT_URL = deployUrl
  ? `https://${deployUrl}`
  : `http://localhost:${process.env.PORT ?? 3000}`;
