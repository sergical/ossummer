import React from 'react';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import ProfileContent from './ProfileContent';

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
