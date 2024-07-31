import { ProjectsList } from 'app/projects/components/ProjectsList';
import ColorChangingHeading from '@/components/color-changing-header';
import { HoverLink } from '@/components/hover-link';
import { createClient } from '@/utils/supabase/client';

export async function FeaturedRepos() {
  const supabase = createClient();
  const { data, error } = await supabase.from('projects').select('*');

  if (error) {
    console.error(error);
    return <div>Error loading projects</div>;
  }
  console.log(data);
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto text-center">
          <ColorChangingHeading text="Featured Projects" color="text-foreground" />
        </div>
        <ProjectsList limit={4} />
        <div className="flex justify-center pt-16">
          <HoverLink href="/projects">Explore all projects</HoverLink>
        </div>
      </div>
    </section>
  );
}
