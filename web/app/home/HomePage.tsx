import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import FeaturedRepos from './FeaturedRepos';
import { Hero } from './Hero';
import { Partners } from './Partners';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <Partners />
      <FeaturedRepos />
      <Footer />
    </main>
  );
}
