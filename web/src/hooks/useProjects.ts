import useSWR from 'swr';
import { Database } from 'types/supabase';
import fetcher from '@/lib/fetcher';

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
