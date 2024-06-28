'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@prisma/client';

import LoadingCard from '@/components/Repository/LoadingCard';
import { RepositoryCard } from '@/components/Repository/RepositoryCard';
import { Repository } from '@/types/github';

export function ProjectCard({ project }: { project: Project }) {
  const [isLoading, setIsLoading] = useState(true);
  const [projectInfo, setProjectInfo] = useState<Repository | null>(null);
  useEffect(() => {
    fetch(project.apiUrl)
      .then(async (res) => res.json())
      .then((data) => {
        setProjectInfo(data as Repository);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [project.apiUrl]);

  if (isLoading || !projectInfo) return <LoadingCard />;
  return <RepositoryCard repo={projectInfo} />;
}
