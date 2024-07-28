import { NextRequest } from 'next/server';
import { Repository } from '@/types/github';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const projectUrl = searchParams.get('projectUrl');

  if (!projectUrl) {
    return Response.json({ error: 'Project URL is required' }, { status: 400 });
  }

  const url = new URL(projectUrl);
  const pathSegments = url.pathname.split('/');
  const owner = pathSegments[1];
  const repo = pathSegments[2];

  try {
    const projectInfo = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    const projectInfoJson = (await projectInfo.json()) as Repository;

    return Response.json(projectInfoJson, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to fetch project info' }, { status: 500 });
  }
}
