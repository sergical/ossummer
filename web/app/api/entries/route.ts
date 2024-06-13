import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/server/prisma'; // Adjust the path according to your project structure
import { privy } from '@/server/privy';

export async function GET() {
  const privyAccessToken = cookies().get('privy-token');
  if (!privyAccessToken) {
    return NextResponse.json({ error: 'No privy access token found.' }, { status: 401 });
  }

  const verifiedClaims = await privy.verifyAuthToken(privyAccessToken.value);
  const privyUserId = verifiedClaims.userId;

  const pullRequests = await prisma.pullRequest.count({
    where: { userId: privyUserId, state: 'merged' },
  });

  return NextResponse.json(pullRequests);
}
