import { Navigation } from '@/components/layout/navigation';
import { generateMetadata } from '@/utils/generateMetadata';
import { ContributorsHero } from './components/ContributorsHero';
import { ContributorsList } from './components/ContributorsList';

export const metadata = generateMetadata({
  title: 'Contributors | Oper Source Summer',
  description: 'Explore the contributors that are participating in Open Source Summer. ',
  images: 'themes.png',
  pathname: 'contributors',
});

export default function ContributorsPage() {
  return (
    <main>
      <Navigation />

      <ContributorsHero />
      <div className="container mt-16">
        <ContributorsList />
      </div>
    </main>
  );
}
