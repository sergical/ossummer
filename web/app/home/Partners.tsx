import Image from 'next/image';
import Marquee from '@/components/magicui/marquee';
import { cn } from '@/lib/utils';

const companies = [
  'Coinbase',
  'Shopify',
  {
    name: 'Devfolio',
    src: '/sponsors/devfolio.png',
  },
  {
    name: 'Farcaster',
    src: '/sponsors/farcaster.png',
  },
  {
    name: 'Buildspace',
    src: '/sponsors/build.png',
  },
];

export function Partners() {
  return (
    <section id="companies">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative mt-6">
            <Marquee className="max-w-full [--duration:40s]">
              {companies.map((logo, idx) => (
                <Image
                  width={typeof logo === 'string' ? 112 : logo.name === 'Buildspace' ? 40 : 112}
                  height={typeof logo === 'string' ? 40 : logo.name === 'Buildspace' ? 40 : 112}
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  src={
                    typeof logo === 'string'
                      ? `https://cdn.magicui.design/companies/${logo}.svg`
                      : logo.src
                  }
                  className={cn(
                    'h-10 w-28 object-contain dark:brightness-0 dark:invert',
                    typeof logo !== 'string' && logo.name === 'Buildspace' && 'h-10 !w-10',
                  )}
                  alt={typeof logo === 'string' ? logo : logo.name}
                />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-background" />
            <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-background" />
          </div>
        </div>
      </div>
    </section>
  );
}
