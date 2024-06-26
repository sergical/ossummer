import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';

import { generateMetadata } from '@/utils/generateMetadata';

export const metadata = generateMetadata({
  title: 'Projects - OSS',
  description: 'Explore the projects that are participating in Open Source Summer. ',
  images: 'themes.png',
  pathname: 'projects',
});

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <Main>
        <h1>Projects</h1>
      </Main>
      <Footer />
    </>
  );
}
