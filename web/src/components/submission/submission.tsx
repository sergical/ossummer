import React from 'react';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

import { Database } from '@/types/supabase';
import { RecheckStatus } from './recheck-status';

export default function Submission({
  pr,
}: {
  pr: Database['public']['Tables']['pull_requests']['Row'];
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">{pr.title}</h3>
          <div>
            <Badge
              variant={
                pr.state === 'merged'
                  ? 'success'
                  : pr.state === 'closed'
                  ? 'destructive'
                  : 'default'
              }
            >
              {pr.state}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0" />

      <CardFooter className="flex justify-end">
        <div className="flex gap-2">
          <Button asChild variant="ghost">
            <Link target="_blank" href={pr.public_url ?? ''}>
              View PR
            </Link>
          </Button>
          {pr.state === 'open' && <RecheckStatus url={pr.api_url ?? ''} />}
        </div>
      </CardFooter>
    </Card>
  );
}
