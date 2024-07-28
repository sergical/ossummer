import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { privy } from '@/server/privy';
import { APIResponse } from '@/types/api';
import { PullRequest } from '@/types/github';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { url } = (await request.json()) as {
    url: string;
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

    const pullRequestInfo = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    const pullRequestInfoJson = (await pullRequestInfo.json()) as PullRequest;

    if (pullRequestInfoJson.user.login !== githubUserName) {
      return NextResponse.json<APIResponse<string>>({
        success: false,
        error: 'The pull request does not belong to the GitHub user.',
      });
    }

    // Check if the pull request already exists using findFirst
    const { data: existingPullRequest, error } = await supabase
      .from('pull_requests')
      .select('*')
      .eq('api_url', pullRequestInfoJson.url)
      .single();
    if (error) {
      return NextResponse.json<APIResponse<string>>({
        success: false,
        error: 'Failed to find pull request.',
      });
    }

    const pullRequestState = pullRequestInfoJson.merged ? 'merged' : pullRequestInfoJson.state;
    if (pullRequestState === existingPullRequest?.state) {
      return NextResponse.json<APIResponse<string>>({
        success: true,
        data: 'SAME',
      });
    }
    if (existingPullRequest && existingPullRequest.state !== pullRequestState) {
      await supabase
        .from('pull_requests')
        .update({ state: pullRequestState })
        .eq('api_url', pullRequestInfoJson.url);
    }

    return NextResponse.json<APIResponse<string>>({
      success: true,
      data: 'PR status updated!',
    });
  } catch (error) {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'Failed to verify privy access token or create PR.',
    });
  }
}
