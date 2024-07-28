import useSWR from 'swr';
import { Database } from 'types/supabase';
import fetcher from '@/lib/fetcher';

export const useSubmissions = () => {
  const { data, error, mutate } = useSWR<
    Database['public']['Tables']['pull_requests']['Row'][],
    Error
  >('/api/submissions', fetcher);

  return {
    submissions: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
