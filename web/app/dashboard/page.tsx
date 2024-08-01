import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4">
        <p>Welcome to Open Source Summer</p>
        <p>
          If you are here because you&apos;ve contributed to an open source project, you can{' '}
          <Link href="/dashboard/submissions" className="underline">
            view and add your submissions
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
