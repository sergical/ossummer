/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePrivy } from '@privy-io/react-auth';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

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

const FormSchema = z.object({
  pullRequestUrl: z.string().url(),
});

export function SubmitPr() {
  const { user, linkGithub } = usePrivy();
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { pullRequestUrl } = data;
    if (!pullRequestUrl.includes('github.com')) {
      toast.error('Invalid PR link. Please make sure it is a valid GitHub URL');
      return;
    }
    if (githubUser && !pullRequestUrl.includes(githubUser)) {
      toast.error('Looks like you are not the owner of this PR');
      return;
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-[600px] items-end gap-4"
      >
        <FormField
          control={form.control}
          name="pullRequestUrl"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>PR link</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/username/repo/pull/123"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
