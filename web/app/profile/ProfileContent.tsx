'use client';
import React from 'react';

import { usePrivy } from '@privy-io/react-auth';

import { useAccount } from 'wagmi';
import ProfileCard from './ProfileCard';
import { SubmitPr } from './SubmitPr';

export default function ProfileContent() {
  const { ready, authenticated, login } = usePrivy();
  const { address, isConnected } = useAccount();

  if (!ready) {
    return <div>Loading...</div>;
  }
  if (!authenticated || !isConnected || !address) {
    return (
      <button onClick={login} type="button">
        Login
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Profile</h2>
      <ProfileCard />
      <h2 className="text-2xl font-bold">Submit a PR</h2>
      <SubmitPr />
    </div>
  );
}
