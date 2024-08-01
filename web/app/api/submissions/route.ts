import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { privy } from '@/server/privy';
import { APIResponse } from '@/types/api';
import { PullRequest } from '@/types/github';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();
  const privyAccessToken = cookies().get('privy-token');
  if (!privyAccessToken) {
    return NextResponse.json({ error: 'No privy access token found.' }, { status: 401 });
  }

  const verifiedClaims = await privy.verifyAuthToken(privyAccessToken.value);
  const privyUserId = verifiedClaims.userId;

  const pullRequests = await supabase.from('pull_requests').select('*').eq('user_id', privyUserId);

  return NextResponse.json(pullRequests);
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const body = (await request.json()) as { pullRequestUrl: string };
  const { pullRequestUrl } = body;

  const privyAccessToken = cookies().get('privy-token');
  if (!privyAccessToken) {
    return NextResponse.json({ error: 'No privy access token found.' }, { status: 401 });
  }

  const verifiedClaims = await privy.verifyAuthToken(privyAccessToken.value);
  const privyUserId = verifiedClaims.userId;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call
  await (supabase.rpc as any)('set_config', {
    parameter: 'app.current_user_id',
    value: privyUserId,
  });

  const privyUser = await privy.getUser(privyUserId);
  const githubUserName = privyUser.github?.username;
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
  const pullRequestInfoJson = (await pullRequestInfo.json()) as PullRequest;

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
      user_id: privyUserId,
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
