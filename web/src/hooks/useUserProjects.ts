import { Project } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const useUserProjects = () => {
  const { data, error, mutate } = useSWR<Project[], Error>('/api/user-projects', fetcher);

  return {
    projects: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
