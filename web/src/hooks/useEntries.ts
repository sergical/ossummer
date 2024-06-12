import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const useEntries = () => {
  const { data, error, mutate } = useSWR<number, Error>('/api/entries', fetcher);

  return {
    entries: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
