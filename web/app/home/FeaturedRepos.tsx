'use client';

import { StarIcon } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useOSSummerRepositories } from '@/hooks/useOSSummerRepositories';

export default function FeaturedRepos() {
  const { data: repositories, isLoading } = useOSSummerRepositories();

  const loadingMarkup = Array.from({ length: 3 }).map((_, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <Card key={index}>
      <CardHeader>
        <Skeleton className="h-[25px] w-[full] rounded-xl" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[25px] w-[full] rounded-xl" />
      </CardContent>
    </Card>
  ));

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Featured Projects</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 md:text-xl">
            Explore the issues for each of these projects. Contribute to the projects and track the
            progress here.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8 lg:mt-14 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
          {isLoading
            ? loadingMarkup
            : repositories?.map((repo) => (
                <Card key={repo.id}>
                  <CardHeader>
                    <CardTitle>{repo.full_name}</CardTitle>
                    <CardDescription>{repo.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <StarIcon className="h-4 w-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                      prefetch={false}
                    >
                      View on GitHub
                    </Link>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}
