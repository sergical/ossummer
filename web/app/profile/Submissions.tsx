'use client';

import { loadingMarkup } from 'app/home/FeaturedRepos';
import { useSubmissions } from '@/hooks/useSubmissions';
import Submission from './Submission';

function PullRequestList() {
  const { submissions, isLoading, isError } = useSubmissions();

  if (isError) return <div>Failed to load</div>;

  return submissions && submissions.length > 0 ? (
    <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8 lg:mt-14 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
      {isLoading ? loadingMarkup : submissions?.map((pr) => <Submission key={pr.id} pr={pr} />)}
    </div>
  ) : (
    <div>No submissions yet, good luck with your first one!</div>
  );
}

export default PullRequestList;
