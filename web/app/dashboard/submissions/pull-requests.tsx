import Submission from 'app/profile/Submission';
import { getPrivyUser } from '@/server/actions';
import { createClient } from '@/utils/supabase/server';

export const revalidate = 0;

export async function PullRequests() {
  const supabase = createClient();
  const user = await getPrivyUser();
  if (!user) {
    return <div>No user</div>;
  }
  const { data, error } = await supabase
    .from('pull_requests')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (error) {
    return <div>Failed to load: {error.message}</div>;
  }
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((pr) => (
        <Submission key={pr.id} pr={pr} />
      ))}
    </div>
  );
}
