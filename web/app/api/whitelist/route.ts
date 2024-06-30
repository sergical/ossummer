/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ethers } from 'ethers';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/server/prisma';
import { privy } from '@/server/privy';
import { APIResponse } from '@/types/api';
import abi from './abi';

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PRIVATE_RPC_URL);
const signer = new ethers.Wallet(process.env.NEXT_PRIVATE_PRIVATE_KEY as string, provider);

const contractAddress = process.env.NEXT_PUBLIC_OSSUMMER_BASE_SEPOLIA_CONTRACT_ADDRESS as string;
const contract = new ethers.Contract(contractAddress, abi, signer);

export async function POST(request: NextRequest) {
  const { address } = (await request.json()) as {
    address: `0x${string}`;
  };

  const privyAccessToken = cookies().get('privy-token');
  if (!privyAccessToken) {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'No privy access token found.',
    });
  }

  try {
    const verifiedClaims = await privy.verifyAuthToken(privyAccessToken.value);
    const privyUserId = verifiedClaims.userId;

    const pullRequests = await prisma.pullRequest.count({
      where: { userId: privyUserId, state: 'merged' },
    });

    if (pullRequests < 4) {
      return NextResponse.json<APIResponse<string>>({
        success: false,
        error: 'You need to merge at least 4 pull requests to be whitelisted.',
      });
    }

    try {
      const tx = await contract.addToAllowlist([address]);

      await tx.wait();

      return NextResponse.json<APIResponse<string>>({
        success: true,
        data: 'Successfully added to the whitelist.',
      });
    } catch (contractError) {
      console.error('Contract interaction failed', contractError);
      return NextResponse.json<APIResponse<string>>({
        success: false,
        error: 'Failed to add to whitelist on the contract.',
      });
    }
  } catch (error) {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'Failed to verify privy access token',
    });
  }
}
