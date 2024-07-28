import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Navigation } from '@/components/layout/dashboard/navigation';
import { privy } from '@/server/privy';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const privyAccessToken = cookies().get('privy-token');
  if (!privyAccessToken) {
    redirect('/');
  }

  const verifiedClaims = await privy.verifyAuthToken(privyAccessToken.value);
  const privyUserId = verifiedClaims.userId;
  const privyUser = await privy.getUser(privyUserId);
  if (!privyUser) {
    redirect('/');
  }

  console.log(privyUser);
  return (
    <main className="">
      <Navigation />
      <section className="px-4 pt-24 lg:pl-72 lg:pt-8">{children}</section>
    </main>
  );
}
