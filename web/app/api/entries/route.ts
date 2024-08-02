import { getPrivyUser } from '@/server/actions';

import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();
  const user = await getPrivyUser();

  if (!user) {
    return Response.json({ error: 'No user found.' }, { status: 401 });
  }

  const pullRequests = await supabase.from('pull_requests').select('*').eq('user_id', user.id);

  return Response.json(pullRequests);
}
