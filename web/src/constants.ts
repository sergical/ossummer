import { baseSepolia } from 'viem/chains';

export const MIN_SUBMISSIONS = 4;

export const EXPECTED_CHAIN = baseSepolia;

const deployUrl = process.env.BOAT_DEPLOY_URL ?? process.env.VERCEL_URL;
export const DEFAULT_URL = deployUrl
  ? `https://${deployUrl}`
  : `http://localhost:${process.env.PORT ?? 3000}`;
