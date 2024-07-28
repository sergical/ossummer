'use client';

import React from 'react';
import ColorChangingHeading from '@/components/color-changing-header';

export function Donate() {
  return (
    <div className="flex flex-col gap-4 px-4 py-16 lg:px-0 lg:py-24">
      <ColorChangingHeading text="Contribute" color="text-foreground" />
      <p className="text-center text-muted-foreground">
        Wether the contributions are code or onchain donations, we appreciate your support of the
        open source community.
      </p>
    </div>
  );
}
