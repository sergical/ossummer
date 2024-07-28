import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Database } from '@/types/supabase';

export const useUserProjects = () => {
  const { data, error, mutate } = useSWR<Database['public']['Tables']['projects']['Row'][], Error>(
    '/api/user-projects',
    fetcher,
  );

  return {
    projects: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
