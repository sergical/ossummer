'use client';

import { usePrivy } from '@privy-io/react-auth';
import { Button } from './ui/button';

export function LinkGithub() {
  const { linkGithub } = usePrivy();
  return <Button onClick={linkGithub}>Link GitHub</Button>;
}
