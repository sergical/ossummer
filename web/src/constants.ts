import { baseSepolia, base } from 'viem/chains';

export const MIN_SUBMISSIONS = 4;

const shouldBeBased =
  process.env.ENVIRONMENT === 'production' || process.env.ENVIRONMENT === 'staging';

export const EXPECTED_CHAIN = shouldBeBased ? base : baseSepolia;

const deployUrl = process.env.BOAT_DEPLOY_URL ?? process.env.VERCEL_URL;
export const DEFAULT_URL = deployUrl
  ? `https://${deployUrl}`
  : `http://localhost:${process.env.PORT ?? 3000}`;
