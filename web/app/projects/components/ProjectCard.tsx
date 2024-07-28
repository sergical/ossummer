'use client';

import React, { useEffect, useState } from 'react';

import { Database } from 'types/supabase';
import LoadingCard from '@/components/Repository/LoadingCard';
import { RepositoryCard } from '@/components/Repository/RepositoryCard';
import { Repository } from '@/types/github';

export function ProjectCard({
  project,
}: {
  project: Database['public']['Tables']['projects']['Row'];
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [projectInfo, setProjectInfo] = useState<Repository | null>(null);
  useEffect(() => {
    fetch(project.api_url ?? '')
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
