import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { getPrivyUser } from '@/server/actions';

import { APIResponse } from '@/types/api';
import { PullRequest } from '@/types/github';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();
  const user = await getPrivyUser();
  if (!user) {
    return NextResponse.json({ error: 'No user found.' }, { status: 401 });
  }

  const pullRequests = await supabase.from('pull_requests').select('*').eq('user_id', user.id);

  return NextResponse.json(pullRequests);
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const body = (await request.json()) as { pullRequestUrl: string };
  const { pullRequestUrl } = body;
  const user = await getPrivyUser();
  if (!user) {
    return NextResponse.json({ error: 'No user found.' }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call
  await (supabase.rpc as any)('set_config', {
    parameter: 'app.current_user_id',
    value: user.id,
  });

  const githubUserName = user.github?.username;
  if (!githubUserName) {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'No GitHub username found.',
    });
  }

  const url = new URL(pullRequestUrl);
  const pathSegments = url.pathname.split('/');
  const owner = pathSegments[1];
  const repo = pathSegments[2];
  const number = pathSegments[4];

  const pullRequestInfo = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${number}`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const pullRequestInfoResponse = await pullRequestInfo.json();
  if (pullRequestInfoResponse.status === '404') {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'The pull request does not exist.',
    });
  }

  const pullRequestInfoJson = pullRequestInfoResponse as PullRequest;

  if (pullRequestInfoJson.user.login !== githubUserName) {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'The pull request does not belong to the GitHub user.',
    });
  }
  try {
    // Check if the pull request already exists using findFirst
    const existingPullRequestData = await supabase
      .from('pull_requests')
      .select('*')
      .eq('api_url', pullRequestInfoJson.url);

    const existingPullRequest = existingPullRequestData.data?.[0];

    if (existingPullRequest) {
      return NextResponse.json<APIResponse<string>>({
        success: false,
        error: 'Duplicate PR URL.',
      });
    }

    const { error } = await supabase.from('pull_requests').insert({
      api_url: pullRequestInfoJson.url,
      public_url: pullRequestInfoJson.html_url,
      title: pullRequestInfoJson.title,
      user_id: user.id,
      author: pullRequestInfoJson.user.login,
      state: pullRequestInfoJson.merged ? 'merged' : pullRequestInfoJson.state,
    });

    if (error) {
      console.error(error);
      return NextResponse.json<APIResponse<string>>({
        success: false,
        error: `Failed to create PR: ${error.message}`,
      });
    }

    revalidatePath('/dashboard/submissions');

    return NextResponse.json<APIResponse<string>>({
      success: true,
      data: 'PR added successfully!',
    });
  } catch (error) {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'Failed to verify privy access token or create PR.',
    });
  }
}
