/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';
import React, { useCallback, useState } from 'react';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { Confetti } from '@/components/magicui/confetti';
import { Button } from '@/components/ui/button';
import { APIResponse } from '@/types/api';

export function RecheckStatus({ url }: { url: string }) {
  const [loading, setLoading] = useState(false);

  const recheckPullRequest = useCallback(async () => {
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
  }, [url]);

  return (
    <Button disabled={loading} variant="outline" type="button" onClick={recheckPullRequest}>
      {loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : 'Recheck'}
    </Button>
  );
}
