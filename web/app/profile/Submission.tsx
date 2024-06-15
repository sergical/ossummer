/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React, { useState } from 'react';
import { PullRequest } from '@prisma/client';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Confetti } from '@/components/magicui/confetti';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useSubmissions } from '@/hooks/useSubmissions';
import { APIResponse } from '@/types/api';

export default function Submission({ pr }: { pr: PullRequest }) {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSubmissions();
  async function recheckPullRequest(url: string) {
    try {
      setLoading(true);
      const response = await fetch('/api/recheck-pr', {
        method: 'POST',
        body: JSON.stringify({ url }),
      });
      const resBody = (await response.json()) as unknown as APIResponse<string>;
      if (resBody.success) {
        if (resBody.data === 'SAME') {
          toast('PR status has not changed');
        } else {
          toast.success('PR status updated');
          await mutate();
          Confetti({});
        }
      } else {
        toast.error(resBody.error);
      }
    } catch (error) {
      toast.error(`An error occurred checking the PR: ${error}`);
    } finally {
      setLoading(false);
    }
  }
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
          <Button asChild variant="outline">
            <Link target="_blank" href={pr.publicUrl}>
              View PR
            </Link>
          </Button>
          {pr.state === 'open' && (
            <Button
              disabled={loading}
              type="button"
              onClick={async () => recheckPullRequest(pr.apiUrl)}
            >
              {loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : 'Recheck'}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
