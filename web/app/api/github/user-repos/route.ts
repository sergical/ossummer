import { NextRequest, NextResponse } from 'next/server';
import { Repository } from '@/types/github';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const githubUser = searchParams.get('githubUser');
  console.log(githubUser);
  try {
    const response = await fetch(`https://api.github.com/users/${githubUser}/repos`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    console.log(response);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = (await response.json()) as Repository[];

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 });
  }
}
