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
