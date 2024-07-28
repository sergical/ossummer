import { generateMetadata } from '@/utils/generateMetadata';
import HomePage from './home/HomePage';

export const metadata = generateMetadata({
  title: 'Oper Source Summer',
  description: 'Contribute to open source, get rewarded!',
  images: 'themes.png',
  pathname: '',
});

export default async function Page() {
  return <HomePage />;
}
