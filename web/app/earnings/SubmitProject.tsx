/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { usePrivy } from '@privy-io/react-auth';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Confetti } from '@/components/magicui/confetti';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { useUserProjects } from '@/hooks/useUserProjects';
import { APIResponse } from '@/types/api';

const FormSchema = z.object({
  projectUrl: z.string().url(),
});

export function SubmitProject() {
  const [loading, setLoading] = useState(false);
  const { user, linkGithub } = usePrivy();

  const { mutate } = useUserProjects();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectUrl: '',
    },
  });

  const githubUser = user?.github?.username;

  if (!githubUser) {
    return (
      <div className="space-y-4">
        <p>You need to link your GitHub account to submit a Project</p>
        <Button onClick={linkGithub}>Link GitHub</Button>
      </div>
    );
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { projectUrl } = data;

    try {
      setLoading(true);
      const response = await fetch('/api/user-projects', {
        method: 'POST',
        body: JSON.stringify({ projectUrl }),
      });
      const resBody = (await response.json()) as unknown as APIResponse<string>;
      if (resBody.success) {
        toast.success('Project submitted successfully');
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
    <Card>
      <CardHeader>
        <CardDescription>
          Projects from here will show up in <Link href="/projects">/projects</Link> and you&apos;ll
          be able to share them on Farcaster to receive donations via Farcaster Frames.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-[600px]">
            <FormField
              control={form.control}
              name="projectUrl"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Repository URL</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <Input
                        placeholder="https://github.com/username/repo"
                        {...field}
                        className="w-full"
                      />
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit project'}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
