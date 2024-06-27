import React from 'react';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import { generateMetadata } from '@/utils/generateMetadata';
import ProfileContent from './ProfileContent';

export const metadata = generateMetadata({
  title: 'Profile | Oper Source Summer',
  description: 'Contribute to open source, get rewarded!',
  images: 'themes.png',
  pathname: '',
});

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="container min-h-screen">
        <ProfileContent />
      </main>
      <Footer />
    </>
  );
}
