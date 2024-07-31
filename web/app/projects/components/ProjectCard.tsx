import { RepositoryCard } from '@/components/Repository/RepositoryCard';

import { Database } from '@/types/supabase';

export function ProjectCard({
  project,
}: {
  project: Database['public']['Tables']['projects']['Row'];
}) {
  return (
    <RepositoryCard
      repo={project}
      walletAddress={project.wallet_address ?? ''}
      projectId={project.id}
    />
  );
}
