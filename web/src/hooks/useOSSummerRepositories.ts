import { useQuery } from '@tanstack/react-query';
import { DEFAULT_URL } from '@/constants';
import { Repository } from '@/types/github';

export function useOSSummerRepositories() {
  return useQuery<Repository[]>({
    queryKey: ['useOSSummerRepositories'],
    queryFn: async () => {
      const response = await fetch(`${DEFAULT_URL}/api/github/search`);
      return response.json() as Promise<Repository[]>;
    },
  });
}
