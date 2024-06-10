import { useQuery } from '@tanstack/react-query';
import { DEFAULT_URL } from '@/constants';
import { Repository } from '@/types/github';

export function useOSSummerRepositories() {
  return useQuery<Repository[]>({
    queryKey: ['useOSSummerRepositories'],
    queryFn: async () => {
      const response = await fetch(`${DEFAULT_URL}/api/github/search`);
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }
      return response.json() as Promise<Repository[]>;
    },
  });
}
