import { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const contributorId = searchParams.get('contributorId');

  if (!contributorId) {
    return Response.json({ error: 'Contributor ID is required' }, { status: 400 });
  }
  const contributions = await prisma.pullRequest.count({
    where: {
      userId: contributorId,
      state: 'merged',
    },
  });

  return Response.json(contributions);
}
