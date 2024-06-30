import { ImageResponse } from 'next/og';
import { DEFAULT_URL, EXPECTED_CHAIN } from '@/constants';
import { getEtherscanLink } from '@/lib/getEtherscanLink';
import { prisma } from '@/server/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const projectId = searchParams.get('projectId');
  const tx = searchParams.get('tx');
  const project = await prisma.project.findUnique({
    where: {
      id: projectId ?? '',
    },
  });

  const title = username
    ? `Support ${username} on Open Source Summer!`
    : project?.name
    ? `Support ${project.name} on Open Source Summer!`
    : tx
    ? `Thank you for your donation! You can see the receipt here: ${getEtherscanLink(
        EXPECTED_CHAIN.id,
        tx as `0x${string}`,
        'transaction',
      )}`
    : 'Open Source Summer';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: '#fff',
          background: '#2151F6',
          width: '100%',
          height: '100%',
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}
        >
          <img width="150" height="150" src={`${DEFAULT_URL}/logo.png`} />
          {username && (
            <img
              width="150"
              height="150"
              src={`https://github.com/${username}.png`}
              style={{
                borderRadius: 128,
              }}
            />
          )}
        </div>
        <p style={{ fontSize: 30, fontWeight: 'bold' }}>{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
