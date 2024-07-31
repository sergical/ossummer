import React, { Suspense } from 'react';
import { StarIcon } from 'lucide-react';
import { fetchInfo } from '@/server/github';
import { Skeleton } from '../ui/skeleton';

export async function StarsCount({ apiUrl }: { apiUrl: string | null }) {
  if (!apiUrl) return null;
  const repoApiDataJson = await fetchInfo(apiUrl);
  const stars = repoApiDataJson.stargazers_count;
  return (
    <Suspense fallback={<Skeleton className="h-4 w-4" />}>
      <div className="flex flex-row items-center gap-1 text-sm text-muted-foreground">
        {stars}
        <StarIcon className="h-4 w-4" />
      </div>
    </Suspense>
  );
}
