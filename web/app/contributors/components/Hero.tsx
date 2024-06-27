'use client';

import DotPattern from '@/components/magicui/dot-pattern';
import { cn } from '@/lib/utils';

function ContributorsHero() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-5 overflow-hidden bg-background p-20">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-foreground">
        Contributors
      </p>
      <p className="z-10 whitespace-pre-wrap text-center text-lg text-foreground">
        Explore the contributors who are helping us build more open source software onchain
      </p>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ',
        )}
      />
    </div>
  );
}

export default ContributorsHero;
