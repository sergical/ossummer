import { NextResponse } from 'next/server';

import { EXPECTED_CHAIN, EXPECTED_CONTRACT_ADDRESS } from '@/constants';
import { getPrivyUser } from '@/server/actions';
import { engine } from '@/server/thirdweb';
import { APIResponse } from '@/types/api';

import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();
  const privyUser = await getPrivyUser();

  if (!privyUser) {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'No user found.',
    });
  }

  try {
    const { count: pullRequestCount } = await supabase
      .from('pull_requests')
      .select('*', { count: 'exact' })
      .eq('owner_id', privyUser.id);

    if (!privyUser?.wallet?.address) {
      return NextResponse.json<APIResponse<string>>({
        success: false,
        error: 'No wallet address found.',
      });
    }
    const expectedChain = EXPECTED_CHAIN.id;
    const isEligible = pullRequestCount ? pullRequestCount >= 4 : false;
    const ownsNftResponse = await engine.erc1155.getOwned(
      privyUser.wallet?.address,
      expectedChain.toString(),
      EXPECTED_CONTRACT_ADDRESS,
    );
    const ownsNft = ownsNftResponse.result[0]?.quantityOwned === '1';
    return NextResponse.json<APIResponse<{ isEligible: boolean; ownsNft: boolean }>>({
      success: true,
      data: {
        isEligible,
        ownsNft,
      },
    });
  } catch (error) {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'Failed to verify privy access token.',
    });
  }
}
