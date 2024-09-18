import React, { Suspense } from 'react';

import { EXPECTED_CHAIN, EXPECTED_CONTRACT_ADDRESS } from '@/constants';
import { getPrivyUser } from '@/server/actions';
import { engine } from '@/server/thirdweb';

import { createClient } from '@/utils/supabase/server';
import { OnchainRewards } from './onchain-rewards';

export const metadata = {
  title: 'Dashboard | Open Source Summer',
  description: 'Dashboard',
};

async function getUserRewards() {
  const supabase = createClient();
  const privyUser = await getPrivyUser();

  if (!privyUser) {
    return {
      isEligible: false,
      ownsNft: false,
    };
  }

  try {
    const { count: pullRequestCount } = await supabase
      .from('pull_requests')
      .select('*', { count: 'exact' })
      .eq('user_id', privyUser.id);

    if (!privyUser?.wallet?.address) {
      return {
        isEligible: false,
        ownsNft: false,
      };
    }
    const expectedChain = EXPECTED_CHAIN.id;
    const isEligible = pullRequestCount ? pullRequestCount >= 4 : false;

    const ownsNftResponse = await engine.erc1155.getOwned(
      privyUser.wallet?.address,
      expectedChain.toString(),
      EXPECTED_CONTRACT_ADDRESS,
    );

    const ownsNft = ownsNftResponse.result[0]?.quantityOwned === '1';
    return {
      isEligible,
      ownsNft,
    };
  } catch (error) {
    return {
      isEligible: false,
      ownsNft: false,
    };
  }
}

export default async function DashboardPage() {
  const { isEligible, ownsNft } = await getUserRewards();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4 space-y-4">
        <h2 className="text-xl font-bold">Onchain rewards</h2>
        <OnchainRewards isEligible={isEligible} ownsNft={ownsNft} />
      </div>
    </Suspense>
  );
}
