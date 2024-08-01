import { Navigation } from '@/components/layout/navigation';
import { generateMetadata } from '@/utils/generateMetadata';
import { ProjectsHero } from './components/ProjectsHero';
import { ProjectsList } from './components/ProjectsList';

export const metadata = generateMetadata({
  title: 'Projects | Open Source Summer',
  description: 'Explore the projects that are participating in Open Source Summer. ',
  images: 'themes.png',
  pathname: 'projects',
});

export default function ProjectsPage() {
  return (
    <main>
      <Navigation />

      <ProjectsHero />
      <div className="container mt-16">
        <ProjectsList />
      </div>
    </main>
  );
}
