'use client';

import ColorChangingHeading from '@/components/color-changing-header';
import { HoverLink } from '@/components/hover-link';
import LoadingCard from '@/components/Repository/LoadingCard';
import { RepositoryCard } from '@/components/Repository/RepositoryCard';

import { useOSSummerRepositories } from '@/hooks/useOSSummerRepositories';

export const loadingMarkup = Array.from({ length: 2 }).map((_, index) => (
  // eslint-disable-next-line react/no-array-index-key
  <LoadingCard key={index} />
));

export function FeaturedRepos() {
  const { data: repositories, isLoading } = useOSSummerRepositories();

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto text-center">
          <ColorChangingHeading text="Featured Projects" color="text-foreground" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {isLoading
            ? loadingMarkup
            : repositories?.map((repo) => <RepositoryCard key={repo.id} repo={repo} />)}
        </div>
        <div className="flex justify-center pt-8">
          <HoverLink href="/projects">Explore all projects</HoverLink>
        </div>
      </div>
    </section>
  );
}
