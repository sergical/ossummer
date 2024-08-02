import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { privy } from '@/server/privy';
import { APIResponse } from '@/types/api';
import { Repository } from '@/types/github';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();
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

    const projects = await supabase.from('projects').select('*').eq('owner_id', privyUserId);
    return Response.json(projects);
  } catch (error) {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'Failed to verify privy access token.',
    });
  }
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { projectUrl, name, description, language } = (await request.json()) as {
    projectUrl: string;
    name: string;
    description: string;
    language: string;
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

    if (!privyUser.wallet?.address) {
      return NextResponse.json<APIResponse<string>>({
        success: false,
        error: 'User does not have a wallet',
      });
    }

    const url = new URL(projectUrl);
    const pathSegments = url.pathname.split('/');
    const owner = pathSegments[1];
    const repo = pathSegments[2];

    const projectInfo = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    const projectInfoJson = (await projectInfo.json()) as Repository;

    if (projectInfoJson.owner?.login !== githubUserName) {
      return NextResponse.json<APIResponse<string>>({
        success: false,
        error: 'The project does not belong to the GitHub user.',
      });
    }

    const { data: existingProject, error: existingProjectError } = await supabase
      .from('projects')
      .select('*')
      .eq('api_url', projectInfoJson.url);

    if (existingProjectError) {
      return NextResponse.json<APIResponse<string>>({
        success: false,
        error: 'Failed to check for duplicate project.',
      });
    }

    if (existingProject?.length) {
      return NextResponse.json<APIResponse<string>>({
        success: false,
        error: 'Duplicate project.',
      });
    }

    await supabase.from('projects').insert({
      api_url: projectInfoJson.url,
      public_url: projectInfoJson.html_url,
      name,
      description,
      language,
      maintainer: githubUserName,
      owner_id: privyUserId,
      wallet_address: privyUser.wallet.address,
    });

    return NextResponse.json<APIResponse<string>>({
      success: true,
      data: 'Project added successfully!',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'Failed to verify privy access token or create PR.',
    });
  }
}
