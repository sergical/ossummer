'use client';

import dynamic from 'next/dynamic';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import { FAQ } from './FAQ';
import FeaturedRepos from './FeaturedRepos';
import { Hero } from './Hero';

import { Partners } from './Partners';

const HowItWorks = dynamic(async () => import('./HowItWorks'), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <Partners />
      <FeaturedRepos />
      <HowItWorks />
      <FAQ />
      <Footer />
    </main>
  );
}
