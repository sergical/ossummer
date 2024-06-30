import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

export default function LoadingCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-[25px] w-[full] rounded-xl" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[25px] w-[full] rounded-xl" />
      </CardContent>
    </Card>
  );
}
