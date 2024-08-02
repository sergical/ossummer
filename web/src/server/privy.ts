import { PrivyClient } from '@privy-io/server-auth';

if (!process.env.NEXT_PUBLIC_PRIVY_ID || !process.env.NEXT_PRIVATE_PRIVY_SECRET) {
  throw new Error('NEXT_PUBLIC_PRIVY_ID and NEXT_PRIVATE_PRIVY_SECRET must be set');
}
export const privy = new PrivyClient(
  process.env.NEXT_PUBLIC_PRIVY_ID,
  process.env.NEXT_PRIVATE_PRIVY_SECRET,
);
