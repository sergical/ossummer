import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';

import { generateMetadata } from '@/utils/generateMetadata';
import { ProjectsHero } from './components/ProjectsHero';
import { ProjectsList } from './components/ProjectsList';

export const metadata = generateMetadata({
  title: 'Contributors | Oper Source Summer',
  description: 'Explore the contributors that are participating in Open Source Summer. ',
  images: 'themes.png',
  pathname: 'contributors',
});

export default function ContributorsPage() {
  return (
    <>
      <Header />
      <Main>
        <ProjectsHero />
        <ProjectsList />
      </Main>
      <Footer />
    </>
  );
}
