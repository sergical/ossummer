import Link from 'next/link';
import MainCta from '@/components/main-cta';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section id="hero" className="rounded-4xl m-4 bg-slate-300 ">
      <div className="relative flex h-full flex-col justify-center py-24 lg:min-h-[720px]">
        <div className="container z-10 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Empower open source</h1>
          <p className="text-lg">
            Support open-source projects with crypto.
            <br />
            Receive rewards by building the open-source future.
          </p>
          <div className="flex flex-row gap-4">
            <MainCta />
            <Button variant="outline" asChild>
              <Link href="/projects">Explore projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
