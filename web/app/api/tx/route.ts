/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';

import { DONATION_VALUE, EXPECTED_CHAIN } from '@/constants';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body: FrameRequest = await req.json();
  const requestQueryParams = req.nextUrl.searchParams;
  const to = requestQueryParams.get('to') as `0x${string}`;

  if (!to) {
    return new NextResponse('Missing to address', { status: 400 });
  }
  // Remember to replace 'NEYNAR_ONCHAIN_KIT' with your own Neynar API key
  const { isValid } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${EXPECTED_CHAIN.id}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [],

      to: to,
      value: DONATION_VALUE.toString(), // 0.001 ETH
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
