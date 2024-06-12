/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePrivy } from '@privy-io/react-auth';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Confetti } from '@/components/magicui/confetti';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSubmissions } from '@/hooks/useSubmissions';
import { APIResponse } from '@/types/api';

const FormSchema = z.object({
  pullRequestUrl: z.string().url(),
});

export function SubmitPr() {
  const [loading, setLoading] = useState(false);
  const { user, linkGithub } = usePrivy();
  const { mutate } = useSubmissions();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pullRequestUrl: '',
    },
  });

  const githubUser = user?.github?.username;

  if (!githubUser) {
    return (
      <div>
        <p>You need to link your GitHub account to submit a PR</p>
        <Button onClick={linkGithub}>Link GitHub</Button>
      </div>
    );
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { pullRequestUrl } = data;
    if (!pullRequestUrl.includes('github.com')) {
      toast.error('Invalid PR link. Please make sure it is a valid GitHub URL');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch('/api/submit-pr', {
        method: 'POST',
        body: JSON.stringify({ pullRequestUrl }),
      });
      const resBody = (await response.json()) as unknown as APIResponse<string>;
      if (resBody.success) {
        toast.success('PR submitted successfully');
        await mutate();
        Confetti({});
        form.reset();
      } else {
        toast.error(resBody.error);
      }
    } catch (error) {
      toast.error(`An error occurred submitting the PR: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-[600px]">
        <FormField
          control={form.control}
          name="pullRequestUrl"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>PR link</FormLabel>
              <FormControl>
                <div className="flex gap-4">
                  <Input
                    placeholder="https://github.com/username/repo/pull/123"
                    {...field}
                    className="w-full"
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit PR'}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
