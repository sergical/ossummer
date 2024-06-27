'use client';
import React from 'react';

import { usePrivy } from '@privy-io/react-auth';

import { useAccount } from 'wagmi';
import { Entries } from './Entries';
import ProfileCard from './ProfileCard';
import { Social } from './Social';
import Submissions from './Submissions';
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
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-medium">Profile</h2>
          <ProfileCard />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-medium">Progress</h2>
          <Entries />
        </div>
      </div>
      <hr className="!mb-4 !mt-12 border-t border-border" />
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-medium">Submit a PR</h2>
        <SubmitPr />
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-medium">Submissions</h3>
        <Submissions />
      </div>
      <hr className="!mb-4 !mt-12 border-t border-border" />
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-medium">Social</h2>
        <Social />
      </div>
    </div>
  );
}
