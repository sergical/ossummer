import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=topic:ossummer+${query}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();
    return NextResponse.json(data.items);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 });
  }
}

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
