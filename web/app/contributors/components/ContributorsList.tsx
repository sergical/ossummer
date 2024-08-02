import React, { Suspense } from 'react';

import LoadingCard from '@/components/Repository/LoadingCard';
import { createClient } from '@/utils/supabase/server';
import { ContributorCard } from './ContributorCard';

export const loadingMarkup = Array.from({ length: 2 }).map((_, index) => (
  // eslint-disable-next-line react/no-array-index-key
  <LoadingCard key={index} />
));

export async function ContributorsList({ limit }: { limit?: number }) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_top_contributors', { limit_num: limit ?? 10 });

  if (error) {
    console.error(error);
    return <div>Error loading contributors</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      <Suspense fallback={loadingMarkup}>
        {data.map((contributor) => (
          <ContributorCard
            key={contributor.user_id}
            contributor={{
              id: contributor.user_id,
              name: contributor.author,
              pullRequestCount: contributor.pull_request_count,
            }}
          />
        ))}
      </Suspense>
    </div>
  );
}
