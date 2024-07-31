import React, { Suspense } from 'react';

import LoadingCard from '@/components/Repository/LoadingCard';
import { RepositoryCard } from '@/components/Repository/RepositoryCard';

import { createClient } from '@/utils/supabase/server';

export const loadingMarkup = Array.from({ length: 2 }).map((_, index) => (
  // eslint-disable-next-line react/no-array-index-key
  <LoadingCard key={index} />
));

export async function ProjectsList({ limit }: { limit?: number }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .limit(limit ?? 10);

  if (error) {
    console.error(error);
    return <div>Error loading projects</div>;
  }

  return (
    <Suspense fallback={loadingMarkup}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {data.map((project) => (
          <RepositoryCard key={project.id} repo={project} />
        ))}
      </div>
    </Suspense>
  );
}
