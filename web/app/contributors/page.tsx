import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';

import { generateMetadata } from '@/utils/generateMetadata';
import ContributorsList from './components/ContributorsList';
import ContributorsHero from './components/Hero';

export const metadata = generateMetadata({
  title: 'Contributors - OSS',
  description: 'Explore the contributors that are participating in Open Source Summer. ',
  images: 'themes.png',
  pathname: 'contributors',
});

export default function ContributorsPage() {
  return (
    <>
      <Header />
      <Main>
        <ContributorsHero />
        <ContributorsList />
      </Main>
      <Footer />
    </>
  );
}
