/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
import { Textarea } from '@/components/ui/textarea';
import { APIResponse } from '@/types/api';
import { Repository } from '@/types/github';

const FormSchema = z.object({
  projectUrl: z
    .string()
    .url({
      message: 'Project URL must be a valid URL.',
    })
    .refine(
      (url) => {
        const githubRepoRegex = /^https?:\/\/github\.com\/[^/]+\/[^/]+\/?$/;
        return githubRepoRegex.test(url);
      },
      {
        message: 'URL must be a valid GitHub repository URL.',
      },
    ),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  language: z.string().optional(),
});

export function AddProjectForm({ isDashboard = false }: { isDashboard?: boolean }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectUrl: '',
      name: '',
      description: '',
      language: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      let response;
      if (isDashboard) {
        response = await fetch('/api/user-projects', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch('/api/projects', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      }
      const responseJson = (await response.json()) as APIResponse<string>;

      if (responseJson.success) {
        toast.success('Project added');
        if (isDashboard) {
          router.refresh();
        } else {
          router.push('/projects');
        }
      } else {
        toast.error(responseJson.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchProject(url: string) {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/github/fetch-info?projectUrl=${url}`);
      const data = (await response.json()) as Repository;
      if (data.private) {
        toast.error('Private repositories are not supported');
        return;
      }
      form.setValue('name', data.name);
      form.setValue('description', data.description ?? '');
      form.setValue('language', data.language ?? '');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const disabled = isLoading || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:max-w-lg">
        <fieldset disabled={disabled} className="space-y-4">
          <FormField
            control={form.control}
            name="projectUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project URL</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="https://github.com/username/repository"
                      {...field}
                      onChange={async (e) => {
                        field.onChange(e);
                        const inputValue = e.target.value;
                        const githubRepoRegex = /^https?:\/\/github\.com\/[^/]+\/[^/]+\/?$/;
                        if (githubRepoRegex.test(inputValue)) {
                          await fetchProject(inputValue);
                        }
                      }}
                    />
                    {isLoading && (
                      <Loader2Icon className="absolute right-2 top-2 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="My awesome open source repo" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="This is a really cool open source project" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="TypeScript" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={disabled} className="mt-6">
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
