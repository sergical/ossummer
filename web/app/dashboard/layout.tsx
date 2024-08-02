import { redirect } from 'next/navigation';
import { Navigation } from '@/components/layout/dashboard/navigation';
import { getPrivyUser } from '@/server/actions';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getPrivyUser();

  if (!user) {
    redirect('/');
  }

  return (
    <main className="">
      <Navigation />
      <section className="px-4 pt-24 lg:pl-72 lg:pt-8">{children}</section>
    </main>
  );
}
