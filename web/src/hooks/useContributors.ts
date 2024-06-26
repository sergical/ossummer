import { User } from '@privy-io/server-auth';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const useContributors = () => {
  const { data, error, mutate } = useSWR<User[], Error>('/api/contributors', fetcher);

  return {
    contributors: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
