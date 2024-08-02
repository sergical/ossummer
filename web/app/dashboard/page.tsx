import React from 'react';
import { OnchainRewards } from './onchain-rewards';

export const metadata = {
  title: 'Dashboard | Open Source Summer',
  description: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4 space-y-4">
        <h2 className="text-xl font-bold">Onchain rewards</h2>
        <OnchainRewards />
      </div>
    </div>
  );
}
