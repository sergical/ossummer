import { Repository } from '@/types/github';

export async function fetchInfo(url: string): Promise<Repository> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  return response.json() as Promise<Repository>;
}
