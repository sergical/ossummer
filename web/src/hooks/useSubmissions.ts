import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Database } from '@/types/supabase';

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
