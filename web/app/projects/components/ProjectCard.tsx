/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import React, { useEffect, useState } from 'react';

import LoadingCard from '@/components/Repository/LoadingCard';
import { RepositoryCard } from '@/components/Repository/RepositoryCard';
import { Repository } from '@/types/github';
import { Database } from '@/types/supabase';

export function ProjectCard({
  project,
}: {
  project: Database['public']['Tables']['projects']['Row'];
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [projectInfo, setProjectInfo] = useState<Repository | null>(null);
  useEffect(() => {
    if (!project.api_url) return;
    fetch(project.api_url as string)
      .then(async (res) => res.json())
      .then((data) => {
        setProjectInfo(data as Repository);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [project.api_url]);

  if (isLoading || !projectInfo) return <LoadingCard />;
  return (
    <RepositoryCard
      repo={projectInfo}
      walletAddress={project.wallet_address ?? ''}
      projectId={project.id}
    />
  );
}
