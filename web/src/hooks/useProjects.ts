import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Database } from '@/types/supabase';

export const useProjects = () => {
  const { data, error, mutate } = useSWR<Database['public']['Tables']['projects']['Row'][], Error>(
    '/api/projects',
    fetcher,
  );

  return {
    projects: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
