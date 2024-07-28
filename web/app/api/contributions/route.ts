import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const searchParams = request.nextUrl.searchParams;

  const contributorId = searchParams.get('contributorId');

  if (!contributorId) {
    return Response.json({ error: 'Contributor ID is required' }, { status: 400 });
  }
  const contributions = await supabase
    .from('pull_requests')
    .select('*')
    .eq('user_id', contributorId);

  return Response.json(contributions);
}
