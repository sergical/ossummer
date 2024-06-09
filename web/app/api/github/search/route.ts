import { NextResponse } from 'next/server';
import { SearchResult } from '@/types/github';

export async function GET() {
  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=topic:ossummer`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = (await response.json()) as SearchResult;
    return NextResponse.json(data.items);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 });
  }
}
