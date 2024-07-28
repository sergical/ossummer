import React from 'react';
import ColorChangingHeading from '@/components/color-changing-header';
import ColorTransitionImage from '@/components/color-changing-image';

export function Perks() {
  return (
    <div className="flex flex-col gap-4 px-4 py-16 lg:px-0 lg:py-24">
      <ColorChangingHeading text="Enjoy the perks" color="text-foreground" />
      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
        <ColorTransitionImage
          src="/mug.png"
          width={204}
          height={229}
          alt="Mug"
          className="h-[229px] w-[204px]"
        />
        <ColorTransitionImage
          src="/t-shirt.png"
          width={392}
          height={374}
          alt="Shirt"
          className="h-[374px] w-[392px]"
        />
        <ColorTransitionImage
          src="/hat.png"
          width={205}
          height={254}
          alt="Hat"
          className="h-[254px] w-[205px]"
        />
      </div>
      <p className="text-center text-sm text-muted-foreground">
        More information on the perks coming soon!
      </p>
    </div>
  );
}
