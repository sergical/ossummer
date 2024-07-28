import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { BackgroundAnimated } from './BackgroundAnimated';

export function Hero() {
  return (
    <section id="hero" className="relative m-4 overflow-hidden rounded-4xl bg-[#F2F2F2]">
      <BackgroundAnimated />
      <div className="relative flex h-full flex-col justify-center py-36 lg:min-h-[720px]">
        <div className="container z-10 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Empower open source</h1>
          <p className="text-lg">
            Support open-source projects with code or onchain
            <br />
            Receive rewards for contributing to the future of open source
          </p>
          <div className="flex flex-row gap-4">
            <Button asChild>
              <Link href="/projects/add">Add project</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects">Explore projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
