/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_URL, EXPECTED_CHAIN } from '@/constants';
import { getEtherscanLink } from '@/utils/getEtherscanLink';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(body);

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: 'link',
          label: `Tx: ${body?.untrustedData?.transactionId ?? '--'}`,
          target: `${getEtherscanLink(
            EXPECTED_CHAIN.id,
            body?.untrustedData?.transactionId as `0x${string}`,
            'transaction',
          )}`,
        },
      ],
      image: {
        src: `${DEFAULT_URL}/api/og?tx=${body?.untrustedData?.transactionId}`,
      },
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
