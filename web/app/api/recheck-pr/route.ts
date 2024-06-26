import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/server/prisma';
import { privy } from '@/server/privy';
import { APIResponse } from '@/types/api';
import { PullRequest } from '@/types/github';

export async function POST(request: NextRequest) {
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
    const existingPullRequest = await prisma.pullRequest.findFirst({
      where: { apiUrl: pullRequestInfoJson.url },
    });

    const pullRequestState = pullRequestInfoJson.merged ? 'merged' : pullRequestInfoJson.state;
    if (pullRequestState === existingPullRequest?.state) {
      return NextResponse.json<APIResponse<string>>({
        success: true,
        data: 'SAME',
      });
    }
    if (existingPullRequest && existingPullRequest.state !== pullRequestState) {
      await prisma.pullRequest.update({
        where: { apiUrl: pullRequestInfoJson.url },
        data: { state: pullRequestState },
      });
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
