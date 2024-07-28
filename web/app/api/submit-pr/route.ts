import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { privy } from '@/server/privy';
import { APIResponse } from '@/types/api';
import { PullRequest } from '@/types/github';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { pullRequestUrl } = (await request.json()) as {
    pullRequestUrl: string;
  };

  const privyAccessToken = cookies().get('privy-token');
  if (!privyAccessToken) {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'No privy access token found.',
    });
  }

  try {
    const verifiedClaims = await privy.verifyAuthToken(privyAccessToken.value);
    const privyUserId = verifiedClaims.userId;
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

    // Check if the pull request already exists using findFirst
    const existingPullRequest = await supabase
      .from('pull_requests')
      .select('*')
      .eq('api_url', pullRequestInfoJson.url);

    if (existingPullRequest) {
      return NextResponse.json<APIResponse<string>>({
        success: false,
        error: 'Duplicate PR URL.',
      });
    }

    await supabase.from('pull_requests').insert({
      api_url: pullRequestInfoJson.url,
      public_url: pullRequestInfoJson.html_url,
      title: pullRequestInfoJson.title,
      user_id: privyUserId,
      author: pullRequestInfoJson.user.login,
      state: pullRequestInfoJson.merged ? 'merged' : pullRequestInfoJson.state,
    });

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
