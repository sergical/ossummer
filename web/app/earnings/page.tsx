import React from 'react';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import { generateMetadata } from '@/utils/generateMetadata';
import EarningsContent from './EarningsContent';

export const metadata = generateMetadata({
  title: 'Earnings | Oper Source Summer',
  description: 'Contribute to open source, get rewarded!',
  images: 'themes.png',
  pathname: '',
});

export default function EarningsPage() {
  return (
    <>
      <Header />
      <main className="container min-h-screen">
        <EarningsContent />
      </main>
      <Footer />
    </>
  );
}
