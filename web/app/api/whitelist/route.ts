/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ethers } from 'ethers';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { shouldBeBased } from '@/constants';

import { privy } from '@/server/privy';
import { APIResponse } from '@/types/api';
import { createClient } from '@/utils/supabase/server';
import abi from './abi';

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PRIVATE_RPC_URL);
const signer = new ethers.Wallet(process.env.NEXT_PRIVATE_PRIVATE_KEY as string, provider);

const contractAddress = shouldBeBased
  ? (process.env.NEXT_PUBLIC_OSSUMMER_BASE_CONTRACT_ADDRESS as string)
  : (process.env.NEXT_PUBLIC_OSSUMMER_BASE_SEPOLIA_CONTRACT_ADDRESS as string);
const contract = new ethers.Contract(contractAddress, abi, signer);

export async function POST(request: NextRequest) {
  const supabase = createClient();
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

    const { data: pullRequests } = await supabase
      .from('pull_requests')
      .select('*')
      .eq('user_id', privyUserId);

    if (pullRequests && pullRequests?.length < 4) {
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
