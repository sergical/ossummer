import { cookies } from 'next/headers';

import { privy } from '@/server/privy';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();
  const privyAccessToken = cookies().get('privy-token');
  if (!privyAccessToken) {
    return Response.json({ error: 'No privy access token found.' }, { status: 401 });
  }

  const verifiedClaims = await privy.verifyAuthToken(privyAccessToken.value);
  const privyUserId = verifiedClaims.userId;

  const pullRequests = await supabase.from('pull_requests').select('*').eq('user_id', privyUserId);

  return Response.json(pullRequests);
}
