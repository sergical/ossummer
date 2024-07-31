import { NextResponse } from 'next/server';
import { APIResponse } from '@/types/api';
import { Repository } from '@/types/github';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.from('projects').select('*');
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json(data);
}

export async function POST(request: Request) {
  const supabase = createClient();
  const { projectUrl, name, description, language } = (await request.json()) as {
    projectUrl: string;
    name: string;
    description: string;
    language: string;
  };

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

    const maintainer = projectInfoJson.owner?.login;
    const apiUrl = projectInfoJson.url;
    const { error } = await supabase
      .from('projects')
      .insert({
        name,
        description,

        language,
        maintainer,
        public_url: projectUrl,
        api_url: apiUrl,
      })
      .select();
    if (error) {
      return NextResponse.json<APIResponse<string>>({
        success: false,
        error: error.message,
      });
    }
    return NextResponse.json<APIResponse<string>>({
      success: true,
      data: 'Project added',
    });
  } catch (error) {
    return NextResponse.json<APIResponse<string>>({
      success: false,
      error: 'Failed to add project',
    });
  }
}
