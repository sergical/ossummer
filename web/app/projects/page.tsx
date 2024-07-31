import { Navigation } from '@/components/layout/navigation';
import { generateMetadata } from '@/utils/generateMetadata';
import { ProjectsHero } from './components/ProjectsHero';
import { ProjectsList } from './components/ProjectsList';

export const metadata = generateMetadata({
  title: 'Contributors | Oper Source Summer',
  description: 'Explore the contributors that are participating in Open Source Summer. ',
  images: 'themes.png',
  pathname: 'contributors',
});

export default function ProjectsPage() {
  return (
    <main>
      <Navigation />

      <ProjectsHero />
      <div className="container">
        <ProjectsList />
      </div>
    </main>
  );
}
