import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const rpcUrl = process.env.NEXT_PRIVATE_RPC_URL;
  if (rpcUrl === undefined) {
    return NextResponse.json(
      {},
      {
        status: 401,
        statusText:
          'You need a RPC URL! Get yours at https://www.coinbase.com/developer-platform/products/base-node?utm_source=boat',
      },
    );
  }

  // forward to Coinbase Developer Platform RPC
  return fetch(rpcUrl, {
    method: 'POST',
    headers: req.headers,
    body: req.body,
  })
    .then(async (response) => {
      // Return the response data to the client
      return NextResponse.json(await response.json(), {
        status: response.status,
        statusText: response.statusText,
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      return NextResponse.json({}, { status: 500, statusText: 'Internal Server Error' });
    });
}
