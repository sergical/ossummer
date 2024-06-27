import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const useContributions = (contributorId: string) => {
  const { data, error, mutate } = useSWR<number, Error>(
    `/api/contributions?contributorId=${contributorId}`,
    fetcher,
  );

  return {
    contributions: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
