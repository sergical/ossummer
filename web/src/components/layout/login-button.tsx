'use client';

import { useLogin, usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function LoginButton({ inNav = true }: { inNav?: boolean }) {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();

  const { login } = useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated, loginMethod, linkedAccount) => {
      console.log(user, isNewUser, wasAlreadyAuthenticated, loginMethod, linkedAccount);
      if (!wasAlreadyAuthenticated) {
        router.push('/dashboard');
      }
    },
    onError: (error) => {
      console.log(error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  });

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  if (authenticated) {
    return (
      <Button size={inNav ? 'sm' : 'default'} asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    );
  }
  return (
    <Button size={inNav ? 'sm' : 'default'} disabled={disableLogin} onClick={login} type="button">
      Log in
    </Button>
  );
}
