import { Navigation } from '@/components/layout/navigation';
import { Donate } from './Donate';
import { FAQ } from './FAQ';
import { FeaturedRepos } from './FeaturedRepos';
import { Hero } from './Hero';

import { Mint } from './Mint';

import { Perks } from './Perks';

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <Hero />

      <Donate />
      <Mint />
      <Perks />
      <FeaturedRepos />
      <FAQ />
    </main>
  );
}
