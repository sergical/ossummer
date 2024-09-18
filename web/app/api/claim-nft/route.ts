import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { EXPECTED_CHAIN, EXPECTED_CONTRACT_ADDRESS } from '@/constants';
import { getPrivyUser } from '@/server/actions';
import { engine } from '@/server/thirdweb';
import { APIResponse } from '@/types/api';

export async function GET() {
  const user = await getPrivyUser();
  if (!user) {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'No user found.',
    });
  }

  try {
    const result = await engine.erc1155.claimTo(
      EXPECTED_CHAIN.id.toString(),
      EXPECTED_CONTRACT_ADDRESS,
      process.env.NEXT_PUBLIC_THIRDWEB_ENGINE_WALLET_ADDRESS as string,
      {
        receiver: user.wallet?.address as string,
        tokenId: '0',
        quantity: '1',
      },
    );
    if (result.result.queueId) {
      revalidatePath('/dashboard');
      return NextResponse.json<APIResponse<string>>({
        success: true,
        data: 'NFT claimed successfully',
      });
    }
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'Error claiming NFT.',
    });
  } catch (error) {
    console.error('Error claiming NFT:', error);
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'Error claiming NFT.',
    });
  }
}
