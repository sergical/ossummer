import { NextResponse } from 'next/server';
import { getPrivyUser } from '@/server/actions';
import { APIResponse } from '@/types/api';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const { transactionHash, targetType, targetId } = (await req.json()) as {
    transactionHash: string;
    targetType: string;
    targetId: string;
  };

  if (!transactionHash || !targetType || !targetId) {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'Missing required fields.',
    });
  }

  const supabase = createClient();
  const user = await getPrivyUser();

  if (!user) {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'No user found.',
    });
  }

  try {
    const { error } = await supabase.from('donations').insert({
      transaction_hash: transactionHash,
      target_type: targetType,
      target_id: targetId,
      user_id: user.id,
      amount: 0.001,
    });

    if (error) {
      console.error(error);
      return NextResponse.json<APIResponse<string>>({
        success: false,
        error: 'Failed to submit donation',
      });
    }

    return NextResponse.json<APIResponse<string>>({
      success: true,
      data: 'Donation submitted',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'Failed to submit donation',
    });
  }
}
