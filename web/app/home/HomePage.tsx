import { Navigation } from '@/components/layout/navigation';
import { Donate } from './Donate';
import { FAQ } from './FAQ';
import { FeaturedRepos } from './FeaturedRepos';
import { Hero } from './Hero';

import { Mint } from './Mint';
import { Partners } from './Partners';
import { Perks } from './Perks';

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Partners />

      <Donate />
      <Mint />
      <Perks />
      <FeaturedRepos />
      <FAQ />
    </main>
  );
}
