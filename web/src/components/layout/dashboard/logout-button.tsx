'use client';

import React from 'react';

import { useLogout } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function LogoutButton() {
  const router = useRouter();
  const { logout } = useLogout({
    onSuccess: () => {
      router.push('/');
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-misused-promises, react-perf/jsx-no-new-function-as-prop
  return <Button onClick={async () => logout()}>Logout</Button>;
}
