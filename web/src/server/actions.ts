import { cookies } from 'next/headers';

import { privy } from './privy';

export async function getPivyUserId() {
  const privyAccessToken = cookies().get('privy-token');
  if (!privyAccessToken) {
    return null;
  }

  const verifiedClaims = await privy.verifyAuthToken(privyAccessToken.value);
  const privyUserId = verifiedClaims.userId;
  return privyUserId;
}

export async function getPrivyUser() {
  const privyUserId = await getPivyUserId();
  if (!privyUserId) {
    return null;
  }
  const user = await privy.getUser(privyUserId);
  return user;
}
