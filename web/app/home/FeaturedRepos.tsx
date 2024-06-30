'use client';

import LoadingCard from '@/components/Repository/LoadingCard';
import { RepositoryCard } from '@/components/Repository/RepositoryCard';

import { useOSSummerRepositories } from '@/hooks/useOSSummerRepositories';

export const loadingMarkup = Array.from({ length: 3 }).map((_, index) => (
  // eslint-disable-next-line react/no-array-index-key
  <LoadingCard key={index} />
));

export default function FeaturedRepos() {
  const { data: repositories, isLoading } = useOSSummerRepositories();

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Featured Projects</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 md:text-xl">
            Explore the issues for each of these projects. Contribute to the projects and track the
            progress in your profile.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8 lg:mt-14 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
          {isLoading
            ? loadingMarkup
            : repositories?.map((repo) => <RepositoryCard key={repo.id} repo={repo} />)}
        </div>
      </div>
    </section>
  );
}
