'use client';

import React from 'react';

import { usePrivy } from '@privy-io/react-auth';

import { useAccount } from 'wagmi';
import EarningsCard from './EarningsCard';

import Projects from './Projects';
import { SubmitProject } from './SubmitProject';

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
          <h2 className="text-2xl font-medium">Earnings</h2>
          <EarningsCard />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-medium">Add project</h2>

          <SubmitProject />
        </div>
      </div>
      <hr className="!mb-4 !mt-12 border-t border-border" />
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-medium">Projects</h3>
        <Projects />
      </div>
    </div>
  );
}
