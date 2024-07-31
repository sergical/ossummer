import Link from 'next/link';

import LoginButton from '@/components/layout/login-button';
import { Button } from '@/components/ui/button';

export function ProjectsHero() {
  return (
    <section id="projects-hero" className="relative m-4 overflow-hidden rounded-4xl bg-hero-bg">
      <div className="relative flex h-full flex-col justify-center py-36">
        <div className="container z-10 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Projects</h1>
          <p className="max-w-xl text-lg">
            Explore the projects that are participating in Open Source Summer. Add your projects or
            start contributing and track your PRs in your dashboard
          </p>
          <div className="flex flex-row gap-4">
            <LoginButton inNav={false} />
            <Button asChild variant="outline">
              <Link href="/projects/add">Add project</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
