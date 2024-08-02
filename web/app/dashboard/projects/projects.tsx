import { RepositoryCard } from '@/components/Repository/RepositoryCard';
import { getPrivyUser } from '@/server/actions';
import { createClient } from '@/utils/supabase/server';

export const revalidate = 0;

export async function Projects() {
  const supabase = createClient();
  const user = await getPrivyUser();
  if (!user) {
    return <div>No user</div>;
  }
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false });
  if (error) {
    return <div>Failed to load: {error.message}</div>;
  }
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((project) => (
        <RepositoryCard key={project.id} repo={project} projectId={project.id} />
      ))}
    </div>
  );
}
