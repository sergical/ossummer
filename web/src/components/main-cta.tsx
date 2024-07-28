'use client';

import React from 'react';
import { Button } from './ui/button';

export default function MainCta() {
  return (
    <Button
      onClick={() => {
        console.log('add project');
      }}
    >
      Get started
    </Button>
  );
}
