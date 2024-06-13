import { PullRequest } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const useSubmissions = () => {
  const { data, error, mutate } = useSWR<PullRequest[], Error>('/api/submissions', fetcher);

  return {
    submissions: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
