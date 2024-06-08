import { generateMetadata } from '@/utils/generateMetadata';
import HomePage from './home/HomePage';

export const metadata = generateMetadata({
  title: 'Oper Source Summer',
  description: 'Contribute to open source, get rewarded!',
  images: 'themes.png',
  pathname: '',
});

/**
 * Server component, which imports the Home component (client component that has 'use client' in it)
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 * https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-4-migrating-pages
 * https://nextjs.org/docs/app/building-your-application/rendering/client-components
 */
export default function Page() {
  return <HomePage />;
}
