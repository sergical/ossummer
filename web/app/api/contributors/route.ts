import { privy } from '@/server/privy';

export async function GET() {
  const users = (await privy.getUsers()).filter((user) => Boolean(user.github?.username));
  return Response.json(users);
}
