import Image from 'next/image';
import Marquee from '@/components/magicui/marquee';

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
];

export function Partners() {
  return (
    <section id="companies">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold uppercase text-muted-foreground">
            *Hopefully* in partnership with
          </h3>
          <div className="relative mt-6">
            <Marquee className="max-w-full [--duration:40s]">
              {companies.map((logo, idx) => (
                <Image
                  width={112}
                  height={40}
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  src={
                    typeof logo === 'string'
                      ? `https://cdn.magicui.design/companies/${logo}.svg`
                      : logo.src
                  }
                  className="h-10 w-28 object-contain dark:brightness-0 dark:invert"
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
