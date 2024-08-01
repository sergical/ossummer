'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';

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

import { APIResponse } from '@/types/api';

const FormSchema = z.object({
  pullRequestUrl: z
    .string()
    .url({
      message: 'Project URL must be a valid URL.',
    })
    .refine(
      (url) => {
        const githubPullRequestRegex = /^https?:\/\/github\.com\/[^/]+\/[^/]+\/pull\/[0-9]+$/;
        return githubPullRequestRegex.test(url);
      },
      {
        message: 'URL must be a valid GitHub pull request URL.',
      },
    ),
});

export function AddSubmissionForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pullRequestUrl: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const responseJson = (await response.json()) as APIResponse<string>;
      if (responseJson.success) {
        toast.success('Project added');
      } else {
        toast.error(responseJson.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:max-w-lg">
        <fieldset disabled={form.formState.isSubmitting} className="space-y-4">
          <FormField
            control={form.control}
            name="pullRequestUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pull Request URL</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="https://github.com/username/repository" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-6">
            {form.formState.isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2Icon className="animate-spin" /> Submitting
              </div>
            ) : (
              'Submit'
            )}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
